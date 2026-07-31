/**
 * app._index.jsx — the app's admin page.
 * Lists every automatic discount, shows its schedule and live state, and
 * lets the merchant choose which ones this app mirrors onto the
 * storefront — plus per-discount badge color, sale-price color, and badge
 * text. Every action ends with a full reconcile (syncShop).
 */

import { useState } from "react";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { json } from "@remix-run/node";
import {
  Page,
  Card,
  IndexTable,
  Badge,
  Button,
  Text,
  Banner,
  BlockStack,
  InlineStack,
  Modal,
  FormLayout,
  TextField,
  Select,
} from "@shopify/polaris";
import { PaintBrushFlatIcon } from "@shopify/polaris-icons";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";
import { fetchAutomaticDiscounts } from "../services/discounts.server";
import { syncShop, isDiscountActive } from "../services/sync.server";

// Theme defaults (mirror config/settings_schema.json promo_badge settings),
// shown as placeholders so a blank field == "use the theme default".
const DEFAULT_BADGE_BG = "#14448A";
const DEFAULT_BADGE_TEXT = "{n}% OFF";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const discounts = await fetchAutomaticDiscounts(admin);
  const tracked = await prisma.trackedDiscount.findMany({
    where: { shop: session.shop },
  });
  const trackedById = new Map(tracked.map((t) => [t.discountId, t]));

  const appliedRow = await prisma.appliedState.findUnique({
    where: { shop: session.shop },
  });
  const applied = appliedRow ? JSON.parse(appliedRow.state) : {};

  const now = new Date();
  return json({
    discounts: discounts
      .map((d) => {
        const t = trackedById.get(d.id);
        const live = isDiscountActive(d, now);
        return {
          ...d,
          tracked: !!t,
          live,
          // "upcoming" = scheduled for the future; everything else non-live is expired.
          upcoming: !live && new Date(d.startsAt) > now,
          badgeBg: t?.badgeBg ?? null,
          priceColor: t?.priceColor ?? null,
          badgeText: t?.badgeText ?? null,
          badgeStyle: t?.badgeStyle ?? null,
        };
      })
      // Schedule order: latest start date first (upcoming on top, expired at the bottom).
      .sort((a, b) => new Date(b.startsAt) - new Date(a.startsAt)),
    summary: {
      productsOnSale: Object.keys(applied.tags ?? {}).length,
      variantsOnSale: Object.keys(applied.variants ?? {}).length,
      lastSync: appliedRow?.updatedAt ?? null,
    },
    // Persisted at last sync; stays until a sync finds no overlap.
    conflicts: applied.conflicts ?? [],
    ignoredKeys: applied.ignored ?? [],
  });
};

// Only accept a valid hex color; anything else -> null (theme default).
const normColor = (v) => {
  const s = (v ?? "").trim();
  return /^#[0-9a-fA-F]{3,8}$/.test(s) ? s : null;
};
const normText = (v) => {
  const s = (v ?? "").trim();
  return s.length ? s.slice(0, 80) : null;
};

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  const form = await request.formData();
  const intent = form.get("intent");

  if (intent === "track") {
    await prisma.trackedDiscount.upsert({
      where: {
        shop_discountId: { shop: session.shop, discountId: form.get("id") },
      },
      create: {
        shop: session.shop,
        discountId: form.get("id"),
        title: form.get("title") ?? "",
        isActive: false,
      },
      update: {},
    });
  }

  if (intent === "untrack") {
    await prisma.trackedDiscount.deleteMany({
      where: { shop: session.shop, discountId: form.get("id") },
    });
  }

  // Save per-discount styling (upsert so it works even before an explicit
  // Track). Blank / invalid fields are stored as null -> theme falls back.
  if (intent === "style") {
    const data = {
      badgeBg: normColor(form.get("badgeBg")),
      priceColor: normColor(form.get("priceColor")),
      badgeText: normText(form.get("badgeText")),
      badgeStyle: form.get("badgeStyle") === "ribbon" ? "ribbon" : null,
    };
    await prisma.trackedDiscount.upsert({
      where: {
        shop_discountId: { shop: session.shop, discountId: form.get("id") },
      },
      create: {
        shop: session.shop,
        discountId: form.get("id"),
        title: form.get("title") ?? "",
        isActive: false,
        ...data,
      },
      update: data,
    });
  }

  // Stop tracking everything; the reconcile below then removes every tag
  // and metafield the app has written. Use before uninstalling the app.
  if (intent === "clear-all") {
    await prisma.trackedDiscount.deleteMany({
      where: { shop: session.shop },
    });
  }

  // Hide (or restore) conflict warnings. Display suppression for live
  // conflicts is unaffected — this only controls the banner.
  if (intent === "ignore-conflict" || intent === "restore-conflicts") {
    const row = await prisma.appliedState.findUnique({
      where: { shop: session.shop },
    });
    const state = row ? JSON.parse(row.state) : {};
    const ignored = new Set(state.ignored ?? []);
    if (intent === "ignore-conflict") ignored.add(form.get("key"));
    else ignored.clear();
    state.ignored = [...ignored];
    await prisma.appliedState.upsert({
      where: { shop: session.shop },
      create: { shop: session.shop, state: JSON.stringify(state) },
      update: { state: JSON.stringify(state) },
    });
    return json({ ok: true });
  }

  if (intent === "dryrun") {
    const result = await syncShop(admin, session.shop, { dryRun: true });
    return json({ ok: true, result });
  }

  // Track, untrack, style, clear-all, and "Sync now" all end in the same
  // reconcile — the diff-based writer removes anything that no longer belongs.
  const result = await syncShop(admin, session.shop);
  return json({ ok: true, result });
};

function formatValue(d) {
  return d.valueType === "percentage"
    ? `${Math.round(d.value)}% off`
    : `${d.value.toFixed(2)} ${d.currency ?? ""} off`;
}

function formatDate(value) {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function Index() {
  const { discounts, summary, conflicts, ignoredKeys } = useLoaderData();
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";
  const lastResult = fetcher.data?.result;

  // Style editor modal state.
  const [editing, setEditing] = useState(null); // the discount being styled
  const [bg, setBg] = useState("");
  const [price, setPrice] = useState("");
  const [text, setText] = useState("");
  const [shape, setShape] = useState("circle");

  const openStyle = (d) => {
    setEditing(d);
    setBg(d.badgeBg ?? "");
    setPrice(d.priceColor ?? "");
    setText(d.badgeText ?? "");
    setShape(d.badgeStyle ?? "circle");
  };
  const closeStyle = () => setEditing(null);
  const saveStyle = () => {
    fetcher.submit(
      {
        intent: "style",
        id: editing.id,
        title: editing.title,
        badgeBg: bg,
        priceColor: price,
        badgeText: text,
        badgeStyle: shape,
      },
      { method: "post" },
    );
    closeStyle();
  };

  const previewPct = editing ? Math.round(editing.value || 20) : 20;
  const previewText = (text || DEFAULT_BADGE_TEXT).replace("{n}", String(previewPct));

  // Render {br} tokens as real line breaks, mirroring the storefront badge.
  const badgeLines = (label) =>
    label.split("{br}").map((line, i) => (
      <span key={i} style={{ display: "block", whiteSpace: "nowrap" }}>
        {line.trim()}
      </span>
    ));

  return (
    <Page
      title="Discount Sync"
      subtitle="Mirror automatic discounts onto storefront prices and badges"
      primaryAction={{
        content: "Sync now",
        loading: busy,
        onAction: () => fetcher.submit({ intent: "sync" }, { method: "post" }),
      }}
      secondaryActions={[
        {
          content: "Preview changes (dry run)",
          onAction: () =>
            fetcher.submit({ intent: "dryrun" }, { method: "post" }),
        },
        {
          content: "Clear everything",
          destructive: true,
          onAction: () =>
            fetcher.submit({ intent: "clear-all" }, { method: "post" }),
        },
      ]}
    >
      <BlockStack gap="400">
        <Banner tone={summary.productsOnSale > 0 ? "success" : "info"}>
          <Text as="p">
            {summary.productsOnSale > 0
              ? `Sale live on ${summary.productsOnSale} product(s) / ${summary.variantsOnSale} variant metafield(s).`
              : "No sale currently applied to the storefront."}
            {summary.lastSync &&
              ` Last sync: ${new Date(summary.lastSync).toLocaleString()}.`}
          </Text>
        </Banner>

        {lastResult?.dryRun && (
          <Banner tone="info" title="Dry run — nothing was written">
            <Text as="p">
              {`Would set ${lastResult.counts.metafieldsSet} metafield(s), delete ${lastResult.counts.metafieldsDelete}, add ${lastResult.counts.tagsAdd} tag(s), remove ${lastResult.counts.tagsRemove} — across ${lastResult.productsOnSale} product(s) from ${lastResult.activeDiscounts} active discount(s).`}
            </Text>
          </Banner>
        )}

        {(() => {
          const visible = conflicts.filter((c) => !ignoredKeys.includes(c.key));
          const liveConflicts = visible.filter((c) => c.scope === "live");
          const upcomingConflicts = visible.filter((c) => c.scope !== "live");
          const ignoredCount = conflicts.length - visible.length;

          const conflictRow = (c) => (
            <InlineStack key={c.key} gap="200" blockAlign="center">
              <Text as="span">
                • {c.productTitle || c.productHandle || c.variantId} —{" "}
                {c.pcts.join("% vs ")}%
              </Text>
              <Button
                size="micro"
                onClick={() =>
                  fetcher.submit(
                    { intent: "ignore-conflict", key: c.key },
                    { method: "post" },
                  )
                }
              >
                Ignore
              </Button>
            </InlineStack>
          );

          return (
            <>
              {liveConflicts.length > 0 && (
                <Banner
                  tone="warning"
                  title="Overlapping discounts — promo display paused for affected products"
                >
                  <BlockStack gap="100">
                    <Text as="p">
                      These products are targeted by more than one live tracked
                      discount at different percentages. To avoid showing the
                      wrong number, no sale badge or promo price is displayed
                      for them until the overlap is resolved (edit the
                      discounts or stop tracking one):
                    </Text>
                    {liveConflicts.map(conflictRow)}
                  </BlockStack>
                </Banner>
              )}
              {upcomingConflicts.length > 0 && (
                <Banner
                  tone="attention"
                  title="Heads up — scheduled discounts will overlap"
                >
                  <BlockStack gap="100">
                    <Text as="p">
                      When these go live, the products below will be covered by
                      more than one discount at different percentages, so their
                      promo display will be paused. Resolve the overlap before
                      the start time — or ignore this warning if intentional:
                    </Text>
                    {upcomingConflicts.map(conflictRow)}
                  </BlockStack>
                </Banner>
              )}
              {ignoredCount > 0 && (
                <InlineStack gap="200" blockAlign="center">
                  <Text as="span" tone="subdued">
                    {ignoredCount} ignored conflict warning(s)
                  </Text>
                  <Button
                    size="micro"
                    onClick={() =>
                      fetcher.submit(
                        { intent: "restore-conflicts" },
                        { method: "post" },
                      )
                    }
                  >
                    Restore
                  </Button>
                </InlineStack>
              )}
            </>
          );
        })()}

        <Card padding="0">
          <IndexTable
            resourceName={{ singular: "discount", plural: "discounts" }}
            itemCount={discounts.length}
            selectable={false}
            headings={[
              { title: "Discount" },
              { title: "Value" },
              { title: "Schedule" },
              { title: "Status" },
              { title: "Badge" },
              { title: "" },
            ]}
          >
            {discounts.map((d, index) => (
              <IndexTable.Row id={d.id} key={d.id} position={index}>
                <IndexTable.Cell>
                  <Text fontWeight="semibold" as="span">
                    {d.title}
                  </Text>
                </IndexTable.Cell>
                <IndexTable.Cell>{formatValue(d)}</IndexTable.Cell>
                <IndexTable.Cell>
                  <BlockStack gap="050">
                    <Text as="span" variant="bodySm">
                      {formatDate(d.startsAt)}
                    </Text>
                    <Text as="span" variant="bodySm" tone="subdued">
                      {d.endsAt ? `→ ${formatDate(d.endsAt)}` : "→ No end date"}
                    </Text>
                  </BlockStack>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <InlineStack gap="200">
                    {d.live ? (
                      <Badge tone="success">Live</Badge>
                    ) : d.upcoming ? (
                      <Badge tone="info">Upcoming</Badge>
                    ) : (
                      <Badge>Expired</Badge>
                    )}
                    {d.tracked && <Badge tone="info">Tracked</Badge>}
                    {!d.supported && (
                      <Badge tone="attention">Amount-off — not supported</Badge>
                    )}
                  </InlineStack>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  {d.tracked ? (
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#ffffff",
                        background: d.badgeBg || DEFAULT_BADGE_BG,
                      }}
                    >
                      {(d.badgeText || DEFAULT_BADGE_TEXT)
                        .replace("{n}", String(Math.round(d.value || 0)))
                        .split("{br}")
                        .map((line) => line.trim())
                        .join(" ")}
                    </span>
                  ) : (
                    <Text as="span" tone="subdued">
                      —
                    </Text>
                  )}
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <InlineStack gap="200">
                    <Button
                      size="slim"
                      loading={busy}
                      disabled={!d.supported && !d.tracked}
                      onClick={() =>
                        fetcher.submit(
                          {
                            intent: d.tracked ? "untrack" : "track",
                            id: d.id,
                            title: d.title,
                          },
                          { method: "post" },
                        )
                      }
                    >
                      {d.tracked ? "Stop tracking" : "Track"}
                    </Button>
                    {d.tracked && (
                      <Button
                        size="slim"
                        icon={PaintBrushFlatIcon}
                        accessibilityLabel="Edit badge & price style"
                        onClick={() => openStyle(d)}
                      />
                    )}
                  </InlineStack>
                </IndexTable.Cell>
              </IndexTable.Row>
            ))}
          </IndexTable>
        </Card>
      </BlockStack>

      {editing && (
        <Modal
          open
          onClose={closeStyle}
          title={`Badge & price style — ${editing.title}`}
          primaryAction={{ content: "Save", onAction: saveStyle, loading: busy }}
          secondaryActions={[{ content: "Cancel", onAction: closeStyle }]}
        >
          <Modal.Section>
            <BlockStack gap="400">
              <InlineStack gap="200" blockAlign="center">
                <Text as="span" tone="subdued">
                  Preview:
                </Text>
                <span
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontWeight: 600,
                    color: "#ffffff",
                    background: normColorClient(bg) || DEFAULT_BADGE_BG,
                    textAlign: "center",
                  }}
                >
                  {badgeLines(previewText)}
                </span>
                <Text as="span">at</Text>
                <span
                  style={{
                    fontWeight: 700,
                    color: normColorClient(price) || DEFAULT_BADGE_BG,
                  }}
                >
                  sale price
                </span>
              </InlineStack>

              <FormLayout>
                <Select
                  label="Badge style"
                  options={[
                    { label: "Circle (default)", value: "circle" },
                    { label: "Corner ribbon", value: "ribbon" },
                  ]}
                  value={shape}
                  onChange={setShape}
                  helpText="Circle = round bubble on the card image. Corner ribbon = glossy diagonal band across the card's top-right corner (badge text renders on one line; {br} is ignored)."
                />
                <ColorField
                  label="Badge color"
                  value={bg}
                  onChange={setBg}
                  helpText="Background of the collection-card badge and the “On Sale” pill. Blank = theme default."
                />
                <ColorField
                  label="Sale-price color"
                  value={price}
                  onChange={setPrice}
                  helpText="Color of the discounted price text on cards, product pages, and the cart bar. Blank = theme default."
                />
                <TextField
                  label="Badge text"
                  value={text}
                  onChange={setText}
                  placeholder={DEFAULT_BADGE_TEXT}
                  autoComplete="off"
                  helpText="Use {n} where the percent number should appear, and {br} to start a new line inside the round badge (e.g. “Big Sale{br}{n}% OFF”). Blank = default “{n}% OFF”. Mixed-variant products still show “Up to” automatically."
                />
              </FormLayout>
            </BlockStack>
          </Modal.Section>
        </Modal>
      )}
    </Page>
  );
}

// Client-side hex check for the live preview only (server re-validates).
function normColorClient(v) {
  const s = (v ?? "").trim();
  return /^#[0-9a-fA-F]{3,8}$/.test(s) ? s : null;
}

// A hex TextField paired with a native color swatch that keeps them in sync.
function ColorField({ label, value, onChange, helpText }) {
  const swatch = normColorClient(value) || DEFAULT_BADGE_BG;
  return (
    <InlineStack gap="300" blockAlign="center" wrap={false}>
      <input
        type="color"
        aria-label={`${label} picker`}
        value={swatch}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "40px",
          height: "36px",
          padding: 0,
          border: "1px solid #ccc",
          borderRadius: "6px",
          background: "none",
          cursor: "pointer",
          flex: "0 0 auto",
        }}
      />
      <div style={{ flex: "1 1 auto" }}>
        <TextField
          label={label}
          value={value}
          onChange={onChange}
          placeholder={DEFAULT_BADGE_BG}
          autoComplete="off"
          helpText={helpText}
        />
      </div>
    </InlineStack>
  );
}
