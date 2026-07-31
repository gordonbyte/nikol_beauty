/**
 * discounts.server.js
 * Reads automatic discounts from the Shopify Admin GraphQL API and
 * resolves their targets down to the VARIANT level, with enough product
 * context (handle, full variant list) for the theme-contract writer.
 *
 * Supported for writing: DiscountAutomaticBasic percentage discounts, and
 * per-item amount-off discounts (appliesOnEachItem) which are converted to
 * a per-variant effective percent — floor(amount / variant price * 100),
 * capped at 100. Floor, never round up: the theme derives the displayed
 * sale price from this percent, and it must never show a price lower than
 * checkout will actually charge.
 *
 * Per-ORDER amount-off discounts (appliesOnEachItem: false) remain
 * supported:false — one order-level amount cannot be expressed honestly as
 * per-item percentages — and the admin UI explains why.
 */

const AUTOMATIC_DISCOUNTS_QUERY = `#graphql
  query AutomaticDiscounts($cursor: String) {
    automaticDiscountNodes(first: 50, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        automaticDiscount {
          __typename
          ... on DiscountAutomaticBasic {
            title
            status
            startsAt
            endsAt
            customerGets {
              value {
                __typename
                ... on DiscountPercentage { percentage }
                ... on DiscountAmount { amount { amount currencyCode } appliesOnEachItem }
              }
              items {
                __typename
                ... on AllDiscountItems { allItems }
                ... on DiscountProducts {
                  products(first: 100) {
                    pageInfo { hasNextPage endCursor }
                    nodes { id }
                  }
                  productVariants(first: 100) {
                    pageInfo { hasNextPage endCursor }
                    nodes { id product { id } }
                  }
                }
                ... on DiscountCollections {
                  collections(first: 50) {
                    nodes { id }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const COLLECTION_PRODUCT_IDS_QUERY = `#graphql
  query CollectionProducts($id: ID!, $cursor: String) {
    collection(id: $id) {
      products(first: 250, after: $cursor) {
        pageInfo { hasNextPage endCursor }
        nodes { id }
      }
    }
  }
`;

const ALL_PRODUCT_IDS_QUERY = `#graphql
  query AllProducts($cursor: String) {
    products(first: 250, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      nodes { id }
    }
  }
`;

const PRODUCTS_BY_ID_QUERY = `#graphql
  query ProductsById($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        tags
        variants(first: 100) {
          nodes { id price }
        }
      }
    }
  }
`;

/** Fetch every automatic discount, normalized. */
export async function fetchAutomaticDiscounts(admin) {
  const discounts = [];
  let cursor = null;

  do {
    const response = await admin.graphql(AUTOMATIC_DISCOUNTS_QUERY, {
      variables: { cursor },
    });
    const { data } = await response.json();
    const page = data.automaticDiscountNodes;

    for (const node of page.nodes) {
      const d = node.automaticDiscount;
      if (d.__typename !== "DiscountAutomaticBasic") continue;

      const value = d.customerGets.value;
      const items = d.customerGets.items;
      const isPercentage = value.__typename === "DiscountPercentage";
      const perItemAmount = !isPercentage && value.appliesOnEachItem === true;

      discounts.push({
        id: node.id,
        title: d.title,
        status: d.status, // ACTIVE | SCHEDULED | EXPIRED
        startsAt: d.startsAt,
        endsAt: d.endsAt,
        valueType: isPercentage ? "percentage" : "amount",
        // per-order amount-off (appliesOnEachItem: false) stays unsupported
        supported: isPercentage || perItemAmount,
        perItemAmount,
        // percentage arrives as 0.2 for 20% — normalize to 20
        value: isPercentage
          ? value.percentage * 100
          : parseFloat(value.amount.amount),
        currency: isPercentage ? null : value.amount.currencyCode,
        targets: {
          allProducts:
            items.__typename === "AllDiscountItems" && items.allItems,
          productIds:
            items.__typename === "DiscountProducts"
              ? items.products.nodes.map((p) => p.id)
              : [],
          variants:
            items.__typename === "DiscountProducts"
              ? items.productVariants.nodes.map((v) => ({
                  id: v.id,
                  productId: v.product.id,
                }))
              : [],
          collectionIds:
            items.__typename === "DiscountCollections"
              ? items.collections.nodes.map((c) => c.id)
              : [],
        },
      });
    }

    cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
  } while (cursor);

  return discounts;
}

/** Expand a discount's product-level targets into product IDs. */
async function resolveTargetProductIds(admin, discount) {
  const ids = new Set(discount.targets.productIds);
  discount.targets.variants.forEach((v) => ids.add(v.productId));

  if (discount.targets.allProducts) {
    let cursor = null;
    do {
      const response = await admin.graphql(ALL_PRODUCT_IDS_QUERY, {
        variables: { cursor },
      });
      const { data } = await response.json();
      data.products.nodes.forEach((p) => ids.add(p.id));
      cursor = data.products.pageInfo.hasNextPage
        ? data.products.pageInfo.endCursor
        : null;
    } while (cursor);
  }

  for (const collectionId of discount.targets.collectionIds) {
    let cursor = null;
    do {
      const response = await admin.graphql(COLLECTION_PRODUCT_IDS_QUERY, {
        variables: { id: collectionId, cursor },
      });
      const { data } = await response.json();
      const page = data.collection?.products;
      if (!page) break;
      page.nodes.forEach((p) => ids.add(p.id));
      cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
    } while (cursor);
  }

  return ids;
}

/** Load handle + full variant list + current tags for a set of product IDs. */
export async function hydrateProducts(admin, productIds) {
  const products = new Map(); // id -> { id, handle, tags, variantIds }
  const ids = [...productIds];
  for (let i = 0; i < ids.length; i += 100) {
    const batch = ids.slice(i, i + 100);
    const response = await admin.graphql(PRODUCTS_BY_ID_QUERY, {
      variables: { ids: batch },
    });
    const { data } = await response.json();
    for (const node of data.nodes) {
      if (!node) continue; // product deleted since discount created
      products.set(node.id, {
        id: node.id,
        title: node.title,
        handle: node.handle,
        tags: node.tags,
        variantIds: node.variants.nodes.map((v) => v.id),
        variantPrices: Object.fromEntries(
          node.variants.nodes.map((v) => [v.id, parseFloat(v.price)]),
        ),
      });
    }
  }
  return products;
}

/**
 * Compute the merged desired storefront state for a set of ACTIVE,
 * supported discounts (percentage, or per-item amount-off converted to
 * per-variant effective percents).
 *
 * Returns:
 *   variantPct:      Map<variantId, pct>        — targeted variants, max % wins
 *   variantDiscount: Map<variantId, discountId> — which discount set the winning %
 *   products:        Map<productId, product>    — hydrated product context
 *   conflicts:       [{variantId, pcts}]        — variants hit by >1 differing %
 */
export async function computeTargetState(admin, activeDiscounts) {
  const variantPct = new Map();
  const variantDiscount = new Map();
  const variantContribs = new Map(); // variantId -> [{discountId, pct}] every targeting discount
  const conflicts = new Map();
  const allProductIds = new Set();
  const perDiscount = [];

  for (const discount of activeDiscounts) {
    const productIds = await resolveTargetProductIds(admin, discount);
    productIds.forEach((id) => allProductIds.add(id));
    perDiscount.push({ discount, productIds });
  }

  const products = await hydrateProducts(admin, allProductIds);

  const priceByVariant = new Map();
  for (const product of products.values()) {
    for (const [id, price] of Object.entries(product.variantPrices ?? {})) {
      priceByVariant.set(id, price);
    }
  }

  // Percentage discounts carry one fixed percent; per-item amount-off
  // discounts convert per variant: floor(amount / price * 100), capped at
  // 100 (amount >= price means free at checkout). Returns 0 (= skip) for
  // sub-1% results and unpriced variants.
  const pctFor = (discount, variantId) => {
    if (discount.valueType === "percentage") return Math.round(discount.value);
    const price = priceByVariant.get(variantId);
    if (!price || price <= 0) return 0;
    return Math.min(100, Math.floor((discount.value / price) * 100));
  };

  const applyPct = (variantId, pct, discountId) => {
    const contribs = variantContribs.get(variantId) ?? [];
    contribs.push({ discountId, pct });
    variantContribs.set(variantId, contribs);
    const existing = variantPct.get(variantId);
    if (existing !== undefined && existing !== pct) {
      const entry = conflicts.get(variantId) ?? new Set([existing]);
      entry.add(pct);
      conflicts.set(variantId, entry);
    }
    if (existing === undefined || pct > existing) {
      variantPct.set(variantId, pct);
      variantDiscount.set(variantId, discountId);
    }
  };

  for (const { discount, productIds } of perDiscount) {
    const variantTargets = discount.targets.variants;
    const variantTargetProductIds = new Set(
      variantTargets.map((v) => v.productId),
    );

    // 1. Explicit variant targets get the percent directly.
    for (const v of variantTargets) {
      const pct = pctFor(discount, v.id);
      if (pct >= 1) applyPct(v.id, pct, discount.id);
    }

    // 2. Product-level targets (direct, collection, all-products) cover every
    //    variant. A product present ONLY because one of its variants was
    //    targeted must not have its other variants covered.
    for (const productId of productIds) {
      const viaVariantOnly =
        variantTargetProductIds.has(productId) &&
        !discount.targets.productIds.includes(productId) &&
        !discount.targets.allProducts &&
        discount.targets.collectionIds.length === 0;
      if (viaVariantOnly) continue;
      const product = products.get(productId);
      if (!product) continue;
      for (const variantId of product.variantIds) {
        const pct = pctFor(discount, variantId);
        if (pct >= 1) applyPct(variantId, pct, discount.id);
      }
    }
  }

  return {
    variantPct,
    variantDiscount,
    variantContribs,
    products,
    conflicts: [...conflicts.entries()].map(([variantId, pcts]) => ({
      variantId,
      pcts: [...pcts],
    })),
  };
}
