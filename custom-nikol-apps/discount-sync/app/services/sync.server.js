/**
 * sync.server.js
 * The reconciler. Computes the storefront promo state that SHOULD exist
 * (from all tracked + currently-active automatic discounts), diffs it
 * against what this app previously wrote (AppliedState), and applies only
 * the difference. Untrack, discount deletion, edits, and sale end all fall
 * out of the same recompute → diff → apply path.
 *
 * What gets written (the theme contract — see THEME-CONTRACT.md):
 *   Multi-variant products:  per-variant metafield custom.promo_percent
 *                            (number_integer) + a product tag for cards
 *   Single-variant products: product tag only
 *   Tag form: promo-<n> when every variant carries the same n,
 *             promo-up-to-<max> otherwise
 *   Clearing: metafieldsDelete + tagsRemove — never zeros.
 */

import prisma from "../db.server";
import {
  fetchAutomaticDiscounts,
  computeTargetState,
} from "./discounts.server";

const METAFIELDS_SET = `#graphql
  mutation SetPromoPercent($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      userErrors { field message }
    }
  }
`;

const METAFIELDS_DELETE = `#graphql
  mutation DeletePromoPercent($metafields: [MetafieldIdentifierInput!]!) {
    metafieldsDelete(metafields: $metafields) {
      userErrors { field message }
    }
  }
`;

const TAGS_ADD = `#graphql
  mutation AddPromoTag($id: ID!, $tags: [String!]!) {
    tagsAdd(id: $id, tags: $tags) {
      userErrors { field message }
    }
  }
`;

const TAGS_REMOVE = `#graphql
  mutation RemovePromoTag($id: ID!, $tags: [String!]!) {
    tagsRemove(id: $id, tags: $tags) {
      userErrors { field message }
    }
  }
`;

export function isDiscountActive(discount, now = new Date()) {
  const starts = new Date(discount.startsAt);
  const ends = discount.endsAt ? new Date(discount.endsAt) : null;
  return now >= starts && (!ends || now <= ends);
}

async function loadAppliedState(shop) {
  const row = await prisma.appliedState.findUnique({ where: { shop } });
  const parsed = row ? JSON.parse(row.state) : {};
  return {
    variants: parsed.variants ?? {},
    tags: parsed.tags ?? {},
    styles: parsed.styles ?? {},
    conflicts: parsed.conflicts ?? [],
    ignored: parsed.ignored ?? [], // conflict keys the merchant chose to overlook
  };
}

// Metafield keys (namespace custom) that carry per-discount styling.
const STYLE_METAFIELDS = {
  badgeBg: "promo_badge_bg",
  priceColor: "promo_price_color",
  badgeText: "promo_badge_text",
  badgeStyle: "promo_badge_style", // "ribbon"; absent = theme default circle
};

async function saveAppliedState(shop, state) {
  await prisma.appliedState.upsert({
    where: { shop },
    create: { shop, state: JSON.stringify(state) },
    update: { state: JSON.stringify(state) },
  });
}

/**
 * Build the desired writes from the computed variant/product state.
 * Returns { variants: {variantId: pct}, tags: {productId: tag},
 *           styles: {productId: {promo_badge_bg?, promo_price_color?, promo_badge_text?}} }.
 *
 * Styling is product-level and comes from the "winning" discount for that
 * product (the one behind its highest covered %). Only non-null style fields
 * are included, so a discount left on theme defaults writes no style metafields.
 */
function buildDesiredWrites(variantPct, products, variantDiscount, styleByDiscount, conflictedVariants) {
  const desired = { variants: {}, tags: {}, styles: {} };

  for (const product of products.values()) {
    const covered = product.variantIds.filter((id) => variantPct.has(id));
    if (covered.length === 0) continue;

    // Conflict policy: if ANY variant of this product is targeted by more
    // than one tracked discount at different percentages, write NOTHING for
    // the product (no tag, no metafields, no styling) rather than guessing
    // which percent to display. The conflict is surfaced in the admin UI
    // until the merchant resolves the overlap.
    if (product.variantIds.some((id) => conflictedVariants.has(id))) continue;

    const pcts = covered.map((id) => variantPct.get(id));
    const maxPct = Math.max(...pcts);
    const uniform =
      covered.length === product.variantIds.length &&
      pcts.every((p) => p === pcts[0]);

    // Tag (drives collection cards; sole signal for single-variant PDPs).
    desired.tags[product.id] =
      product.variantIds.length === 1 || uniform
        ? `promo-${maxPct}`
        : `promo-up-to-${maxPct}`;

    // Per-variant metafields only matter on multi-variant products.
    if (product.variantIds.length > 1) {
      for (const variantId of covered) {
        desired.variants[variantId] = variantPct.get(variantId);
      }
    }

    // Styling from the discount behind this product's highest covered %.
    let winnerId = null;
    let winnerPct = -1;
    for (const id of covered) {
      const p = variantPct.get(id);
      if (p > winnerPct) {
        winnerPct = p;
        winnerId = variantDiscount.get(id);
      }
    }
    const style = winnerId ? styleByDiscount.get(winnerId) : null;
    if (style) {
      const s = {};
      if (style.badgeBg) s[STYLE_METAFIELDS.badgeBg] = style.badgeBg;
      if (style.priceColor) s[STYLE_METAFIELDS.priceColor] = style.priceColor;
      if (style.badgeText) s[STYLE_METAFIELDS.badgeText] = style.badgeText;
      if (style.badgeStyle && style.badgeStyle !== "circle") s[STYLE_METAFIELDS.badgeStyle] = style.badgeStyle;
      if (Object.keys(s).length) desired.styles[product.id] = s;
    }
  }

  return desired;
}

async function graphql(admin, query, variables, mutationName) {
  const response = await admin.graphql(query, { variables });
  const { data } = await response.json();
  const errors = data?.[mutationName]?.userErrors;
  if (errors?.length) {
    console.error(`${mutationName} errors:`, JSON.stringify(errors));
    return { errors };
  }
  return {};
}

/** Apply the diff between applied and desired. Returns operation counts. */
async function applyDiff(admin, applied, desired, { dryRun = false } = {}) {
  const ops = {
    metafieldsSet: [],
    metafieldsDelete: [],
    tagsAdd: [],
    tagsRemove: [],
  };

  // Variant metafields
  for (const [variantId, pct] of Object.entries(desired.variants)) {
    if (applied.variants[variantId] !== pct) {
      ops.metafieldsSet.push({
        ownerId: variantId,
        namespace: "custom",
        key: "promo_percent",
        type: "number_integer",
        value: String(pct),
      });
    }
  }
  for (const variantId of Object.keys(applied.variants)) {
    if (!(variantId in desired.variants)) {
      ops.metafieldsDelete.push({
        ownerId: variantId,
        namespace: "custom",
        key: "promo_percent",
      });
    }
  }

  // Product tags — when the tag changes form (promo-20 → promo-up-to-30),
  // remove the old one first so a product never carries both.
  for (const [productId, tag] of Object.entries(desired.tags)) {
    const existing = applied.tags[productId];
    if (existing === tag) continue;
    if (existing) ops.tagsRemove.push({ id: productId, tags: [existing] });
    ops.tagsAdd.push({ id: productId, tags: [tag] });
  }
  for (const [productId, tag] of Object.entries(applied.tags)) {
    if (!(productId in desired.tags)) {
      ops.tagsRemove.push({ id: productId, tags: [tag] });
    }
  }

  // Per-discount style metafields (product-level). Set changed keys; delete
  // keys that no longer apply (styling removed, product off sale, untracked).
  const appliedStyles = applied.styles ?? {};
  for (const [productId, keys] of Object.entries(desired.styles)) {
    const prev = appliedStyles[productId] ?? {};
    for (const [key, value] of Object.entries(keys)) {
      if (prev[key] !== value) {
        ops.metafieldsSet.push({
          ownerId: productId,
          namespace: "custom",
          key,
          type: "single_line_text_field",
          value: String(value),
        });
      }
    }
    for (const key of Object.keys(prev)) {
      if (!(key in keys)) {
        ops.metafieldsDelete.push({ ownerId: productId, namespace: "custom", key });
      }
    }
  }
  for (const [productId, keys] of Object.entries(appliedStyles)) {
    if (productId in desired.styles) continue;
    for (const key of Object.keys(keys)) {
      ops.metafieldsDelete.push({ ownerId: productId, namespace: "custom", key });
    }
  }

  const counts = {
    metafieldsSet: ops.metafieldsSet.length,
    metafieldsDelete: ops.metafieldsDelete.length,
    tagsAdd: ops.tagsAdd.length,
    tagsRemove: ops.tagsRemove.length,
  };
  if (dryRun) return { counts, ops };

  for (let i = 0; i < ops.metafieldsSet.length; i += 25) {
    await graphql(
      admin,
      METAFIELDS_SET,
      { metafields: ops.metafieldsSet.slice(i, i + 25) },
      "metafieldsSet",
    );
  }
  for (let i = 0; i < ops.metafieldsDelete.length; i += 25) {
    await graphql(
      admin,
      METAFIELDS_DELETE,
      { metafields: ops.metafieldsDelete.slice(i, i + 25) },
      "metafieldsDelete",
    );
  }
  // Remove-before-add so promo-<n> and promo-up-to-<n> never coexist.
  for (const op of ops.tagsRemove) {
    await graphql(admin, TAGS_REMOVE, op, "tagsRemove");
  }
  for (const op of ops.tagsAdd) {
    await graphql(admin, TAGS_ADD, op, "tagsAdd");
  }

  return { counts };
}

/**
 * Full reconcile for one shop. Idempotent; called by the admin UI, the
 * cron endpoint, and discount webhooks. With dryRun, reports what would
 * change without writing anything.
 */
export async function syncShop(admin, shop, { dryRun = false } = {}) {
  const tracked = await prisma.trackedDiscount.findMany({ where: { shop } });
  const applied = await loadAppliedState(shop);

  const all = tracked.length ? await fetchAutomaticDiscounts(admin) : [];
  const byId = new Map(all.map((d) => [d.id, d]));

  const activeDiscounts = [];
  // Live OR upcoming (not yet ended) — used to warn about conflicts BEFORE
  // the discounts go live, not just while they overlap in production.
  const relevantDiscounts = [];
  const now = new Date();
  for (const record of tracked) {
    const discount = byId.get(record.discountId);

    // Deleted in admin → stop tracking; reconcile removes its writes.
    if (!discount) {
      if (!dryRun) {
        await prisma.trackedDiscount.delete({ where: { id: record.id } });
      }
      continue;
    }

    const active = isDiscountActive(discount, now) && discount.supported;
    if (active) activeDiscounts.push(discount);
    const notEnded = !discount.endsAt || new Date(discount.endsAt) >= now;
    if (discount.supported && notEnded) relevantDiscounts.push(discount);

    if (!dryRun) {
      await prisma.trackedDiscount.update({
        where: { id: record.id },
        data: {
          isActive: active,
          title: discount.title,
          valueType: discount.valueType,
          value: discount.value,
          currency: discount.currency,
        },
      });
    }
  }

  // discountId -> chosen styling (null fields = use theme default).
  const styleByDiscount = new Map(
    tracked.map((t) => [
      t.discountId,
      {
        badgeBg: t.badgeBg,
        priceColor: t.priceColor,
        badgeText: t.badgeText,
        badgeStyle: t.badgeStyle,
      },
    ]),
  );

  let desired = { variants: {}, tags: {}, styles: {} };
  let conflicts = [];
  if (relevantDiscounts.length) {
    // One resolution pass over live + upcoming discounts. Writes are derived
    // from the ACTIVE subset only; conflicts consider every discount whose
    // schedule overlaps another's, so the merchant is warned before go-live.
    const state = await computeTargetState(admin, relevantDiscounts);
    const activeIds = new Set(activeDiscounts.map((d) => d.id));
    const metaById = new Map(relevantDiscounts.map((d) => [d.id, d]));

    // Active-only percent + winning discount per variant (max-% wins).
    const activePct = new Map();
    const activeWinner = new Map();
    for (const [variantId, contribs] of state.variantContribs) {
      for (const c of contribs) {
        if (!activeIds.has(c.discountId)) continue;
        const existing = activePct.get(variantId);
        if (existing === undefined || c.pct > existing) {
          activePct.set(variantId, c.pct);
          activeWinner.set(variantId, c.discountId);
        }
      }
    }

    const windowsOverlap = (a, b) => {
      const aStart = new Date(a.startsAt);
      const aEnd = a.endsAt ? new Date(a.endsAt) : null;
      const bStart = new Date(b.startsAt);
      const bEnd = b.endsAt ? new Date(b.endsAt) : null;
      return (!aEnd || bStart <= aEnd) && (!bEnd || aStart <= bEnd);
    };

    // A conflict = one variant, two discounts, different percents, schedules
    // that coexist. scope "live" (both active now) pauses the promo display;
    // scope "upcoming" only warns.
    const liveConflictVariants = new Set();
    for (const [variantId, contribs] of state.variantContribs) {
      const perDiscount = new Map();
      for (const c of contribs) {
        const existing = perDiscount.get(c.discountId);
        if (existing === undefined || c.pct > existing) perDiscount.set(c.discountId, c.pct);
      }
      const entries = [...perDiscount.entries()];
      let isConflict = false;
      let isLive = false;
      const pcts = new Set();
      for (let i = 0; i < entries.length; i++) {
        for (let j = i + 1; j < entries.length; j++) {
          const [idA, pctA] = entries[i];
          const [idB, pctB] = entries[j];
          if (pctA === pctB) continue;
          const dA = metaById.get(idA);
          const dB = metaById.get(idB);
          if (!dA || !dB || !windowsOverlap(dA, dB)) continue;
          isConflict = true;
          pcts.add(pctA);
          pcts.add(pctB);
          if (activeIds.has(idA) && activeIds.has(idB)) isLive = true;
        }
      }
      if (isConflict) {
        conflicts.push({
          variantId,
          pcts: [...pcts].sort((x, y) => x - y),
          scope: isLive ? "live" : "upcoming",
        });
        if (isLive) liveConflictVariants.add(variantId);
      }
    }

    desired = buildDesiredWrites(
      activePct,
      state.products,
      activeWinner,
      styleByDiscount,
      liveConflictVariants,
    );

    // Enrich with product context + a stable key for ignore/dismiss.
    conflicts = conflicts.map((c) => {
      const product = [...state.products.values()].find((p) =>
        p.variantIds.includes(c.variantId),
      );
      return {
        ...c,
        key: `${c.variantId}|${c.pcts.join(",")}`,
        productTitle: product?.title ?? "",
        productHandle: product?.handle ?? "",
      };
    });
  }

  const { counts, ops } = await applyDiff(admin, applied, desired, { dryRun });

  // Persist conflicts (and surviving dismissals) so the admin UI keeps
  // warning until the overlap is actually resolved. Dismissals for conflicts
  // that no longer exist are pruned, so a re-appearing conflict warns again.
  if (!dryRun) {
    const conflictKeys = new Set(conflicts.map((c) => c.key));
    const ignored = (applied.ignored ?? []).filter((k) => conflictKeys.has(k));
    await saveAppliedState(shop, { ...desired, conflicts, ignored });
  }

  return {
    activeDiscounts: activeDiscounts.length,
    productsOnSale: Object.keys(desired.tags).length,
    variantsOnSale: Object.keys(desired.variants).length,
    conflicts,
    counts,
    ...(dryRun ? { dryRun: true, ops } : {}),
  };
}
