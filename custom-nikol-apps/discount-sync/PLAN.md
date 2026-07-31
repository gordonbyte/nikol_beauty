# Discount Sync — Build Plan

Custom app #1 in `custom-nikol-apps/`. Mirrors Shopify **automatic discounts** onto the storefront
using the theme's **existing** promo display system, with **variant-level** support.
All building/testing on the dev store (`nikolbeauty-dev.myshopify.com`); the user performs
any pushes/installs on the live store.

## Decisions locked (2026-07-20)
- **Display**: app writes the theme's existing convention — NO app theme extension, no app embed,
  no proxy feed. The theme already renders everything.
- **Variant-level**: different variants may carry different percentages via different discounts
  (like the 2026 July-4th sale, previously done by hand).

## The theme contract the app must fulfill (verified in product-price.liquid)
- Gate: theme setting `promo_badge_enable` must be ON (merchant-controlled, not the app's job).
- **Multi-variant products** → per-variant metafield `custom.promo_percent`
  (number_integer, ownerType PRODUCTVARIANT, PUBLIC_READ; definition already exists:
  gid://shopify/MetafieldDefinition/245003682096). Badge shows if ANY variant has value > 0;
  price is computed per selected variant, recalculated on variant change.
- **Single-variant products** → product TAGS: `promo-<n>` (exact) or `promo-up-to-<n>`.
  Metafields are ignored for these.
- **Clearing** = DELETE the metafields (July-4th undo used metafieldsDelete; blank string check
  `promo_percent != blank`) + remove promo tags.
- Phase 0 must complete this audit: how product-grid-item.liquid and cart-bar.liquid consume
  promo state (cards may use the `promo-up-to-` form), and what the July-4th "bundles at
  promo_percent=100 + real price edits" special case means for the app.

---

## Phase 0 — Foundations & audit
**Goal: know exactly what we're building against; nothing installed yet.**
- Full theme audit of promo consumption: `product-price.liquid`, `product-grid-item.liquid`,
  `cart-bar.liquid` (+ grep for other consumers). Produce a one-page "display contract" doc.
- Clarify the bundle special case with the user (promo_percent=100 + manual price edits last time):
  in-scope for the app, or explicitly out-of-scope (bundles stay manual)?
- Workspace: `custom-nikol-apps/` layout for multiple apps; decide git tracking
  (recommendation: track app source; ignore node_modules/.env/*.sqlite).
- Prereqs: Shopify Partners org + permission to create a custom app on the dev store;
  Node 20 (present); Shopify CLI.

## Phase 1 — Scaffold & running skeleton on the dev store
**Goal: `shopify app dev` opens an embedded admin app on the dev store.**
- `npm init @shopify/app@latest` (Remix template) in `custom-nikol-apps/discount-sync/`.
- Merge provided skeleton: routes, services, Prisma model, toml scopes
  (`read_discounts,read_products,write_products`).
- Strip what mode (c) makes unnecessary: `extensions/discount-sync-display/`, `proxy.sales.jsx`,
  app_proxy config.
- Prisma migrate; app installs on dev store; admin lists automatic discounts (read-only proof).

## Phase 2 — Variant-aware sync engine (percentage discounts)
**Goal: Track a discount → correct metafields/tags appear; sale ends → they're gone.**
- Extend discount query to variant targets: `DiscountProducts.productVariants` in addition to
  products/collections/allItems (the skeleton only reads products).
- Target resolution to VARIANT level:
  - variant targets → those variants exactly;
  - product/collection/all targets → expand to every variant of each product.
- Writer honoring the theme contract:
  - multi-variant product → `metafieldsSet` promo_percent per targeted variant;
  - single-variant product → `tagsAdd` `promo-<n>`;
  - product where targeted variants have differing % (or partial coverage) → decide in Phase 0
    audit whether cards need `promo-up-to-<max>` tag as well.
- Clearing: `metafieldsDelete` + `tagsRemove` (never write 0/false).
- Conflict policy when multiple tracked discounts hit the same variant: highest % wins; surface
  the conflict in the admin UI.
- DB: TrackedDiscount stores applied VARIANT ids + product ids + tags written, so undo is exact.
- Admin UI: discount list w/ schedule/targets/status, Track/Untrack, "Sync now", and a
  "currently applied" view (what's on sale right now, per product/variant).
- Percentage discounts only in this phase.

## Phase 3 — Scheduling & reactivity
**Goal: hands-off operation.**
- Cron endpoint (`/api/sync?secret=…`, SYNC_SECRET) — flips scheduled sales on/off (±5 min).
- Webhooks: `discounts/create|update|delete` → instant resync; `app/uninstalled` → full cleanup
  of all metafields/tags the app ever wrote.
- Collection membership re-resolved every cycle (mid-sale product additions picked up).
- Ops safety: 25-per-call metafield batching, tag mutations batched per product, basic rate-limit
  backoff, structured logs, and a DRY-RUN mode that reports what would change without writing.

## Phase 4 — End-to-end verification on the dev store
**Goal: proven correct before any thought of the live store.**
- Seed dev store: multi-variant + single-variant test products; discounts covering percentage /
  variant-targeted / collection-targeted / scheduled / overlapping.
- Push current theme to dev store (USER does pushes) so real rendering can be checked;
  enable promo_badge_enable there.
- Test matrix: scheduled activation; scheduled end; mid-sale value edit; mid-sale collection
  membership change; overlapping discounts (max wins); discount deleted in admin; Untrack;
  uninstall cleanup; verify PDP + collection card + cart-bar rendering (light Playwright probes —
  NOT 50-run batches; lesson learned 2026-07-17).
- Deliverable: test-results doc in the app folder + changelog entry.

## Phase 5 — Enhancements (each optional, user-prioritized)
- **Amount-off discounts**: ✅ BUILT 2026-07-31 (KAN-74 decision), EXACT-$ display per Randell.
  Per-ITEM amount-off (appliesOnEachItem) → per-variant metafield `custom.promo_amount` +
  `promo-amt-<x>` / `promo-amt-up-to-<x>` tags; the theme (3 snippets, amount pathway added
  same day) shows "$x OFF" badges and computes the exact sale price (price − amount, clamp 0).
  The floor(%) conversion survives internally only, for winner selection/conflict math.
  Per-ORDER amount-off stays supported:false (cannot be expressed honestly per item).
  Sub-1%-effective and unpriced variants are skipped. Testing: KAN-59 matrix, before Aug-5 deploy.
- **Sale collection automation**: additional tag (e.g. `on-sale`) driving an automated
  "Sale" collection page while any discount is live.
- **Sale end countdown**: write `endsAt` to a metafield so the theme can show "ends in…" (would
  need a small theme edit — separate approval).
- **BXGY / other discount types**: display-only badge without price math (investigate value).
- **Multi-app foundation**: extract shared auth/db/cron utilities as the base for app #2+.

## Phase 6 — Production hardening & live rollout
**Goal: reliable on the real store, without me ever touching live.**
- Hosting: pick (Vercel/Fly/Render/railway) + Postgres (SQLite is dev-only), env secrets,
  external cron (5 min), `shopify app deploy`.
- Access-scope + webhook re-verification; monitoring (at minimum: cron-failure alert).
- Install on live store (USER does it), track first real discount on a low-stakes product,
  verify, then general use.
- Runbook: how to track/untrack, what to check when a sale starts, how to emergency-clear
  (manual "clear everything" button in admin).

## Standing rules for this project
- Build/test ONLY against the dev store until Phase 6; the user performs every install/push on live.
- Per-commit git approval; dated changelog entries per working day.
- The app never edits real prices or compare-at prices — display is metafields/tags only;
  checkout math is Shopify's automatic discount.
