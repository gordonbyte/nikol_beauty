---
# ⚠ 2026-08-03: Broadcast-Original/ is Broadcast 8.1.1 (Presidio Creative) — NOT the store's 5.5.0 (Invisible Themes). It's an upgrade reference, not pristine current-version stock: 3 major versions newer, restructured (top-level blocks/, no customers templates). Never cite it as "our stock" for diffs; there is no local true-5.5.0 copy.
name: theme-architecture
description: "Map of the Nikol Beauty shopify-live theme — what it is, the 3 theme folders, and key custom architecture gotchas"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 7375c2cd-6e35-465b-ab91-8b1978681251
  modified: 2026-08-04T14:12:57.260Z
---

`shopify-live` is **Broadcast 5.5.0** (Invisible Themes), heavily customized for Nikol Beauty. Non-obvious facts worth remembering:

**Theme folders (updated 2026-08-04):** `shopify-dev/` = the WORKING COPY / source of truth — all changes happen here; git-tracked since 2026-07-31 (commit 2e29d8e); the dev store's published theme #186425934130 fully matches it since the 2026-08-03 full push. `shopify-live/` = git-tracked mirror of the live store; updated only at dev→live sync time (Randell pushes live). `Broadcast-Original/` = untracked upgrade reference (Broadcast **8.1.1**, NOT our 5.5.0 — see header warning). `delete_later/` = untracked pre-cleanup snapshot.

**Footer:** live footer is `{% section 'custom-footer' %}` (static section) in `layout/theme.liquid`; stock `group-footer` is commented out. Content lives in `settings_data.json` → `current.sections.custom-footer`.

**Two design generations of sections:** `cw-*` = previous agency's build (Swiper/GSAP/Judge.me-heavy). `custom-*` = newer in-house, cleaner. Custom sections (as of 2026-06-24): `custom-footer`, `custom-feature-hero`, `custom-instagram-feed`, `custom-product-coming-soon`, `custom-product-waitlist`, `custom-hero-banner`, `custom-info-banner`, `custom-product-slider`. See [[custom-file-naming-convention]]. Ongoing effort: rename bespoke `cw-*` sections into the `custom-*` convention as they're touched. Editor title must be set in BOTH the schema top-level `name` AND every `presets[].name`.

**PDP variants** (each template's main section differs): `product`(default) · `product.new`→`product-new` · `product.coming-soon`→`custom-product-coming-soon` section · `product.waitlist`→`custom-product-waitlist` section · lipstick/free-products/fastbundle use tuned `product`. Removed 2026-06-24: the `product.bb-cream` template and its `productv2` main section — bb-cream was unused (no product on that suffix) and redundant with `product.coming-soon`.

**Pre-launch notify:** `custom-product-waitlist.liquid` uses a custom **Klaviyo client subscriptions API** (public key + list id via section settings) — NOT the ReStock app. `custom-product-coming-soon.liquid` is the larger sibling (~3000 lines); both embed the SE Wishlist app block. (The old auto best-sellers mechanism — `custom-best-sellers` section + its `collection.custom-best-sellers` `{% layout none %}` template — has been removed.)

**Banners (consolidated 2026-06-24):** `custom-hero-banner` (formerly `cw-banner_vb`) is the kept hero banner — placed on `index.json` (disabled) and `index.homepage-style-2.json` (enabled). The duplicate `cw-banner.liquid` was deleted. `custom-info-banner` (formerly `cw-banner-bottom`) is a 2-column promo banner, now fully self-contained (own `.info-banner-*` styles + image toggle). Gotcha: the `.cw-desktop`/`.cw-mobile` responsive utility classes are defined ONLY in the PDP-only `snippets/cw-pdp-css.liquid` (not global), so sections using them outside a product page need their own toggle rules.

**Homepage + markets:** `index.context.{b2b,canada}.json` are parent-pointer templates. Homepage templates are `index.json` (live default) and `index.homepage-style-2.json` (a full `cw-*`-section redesign, formerly `index.new`). Removed 2026-06-24: `index.vb` / `index.vc` (A/B variants that differed only by one banner image) and the old `index.new` (renamed). ⚠️ Intelligems A/B testing may route to these via `?view=<suffix>` — update the app config if variant suffixes change/disappear. `cw-collection-bestseller` (used only on `index.homepage-style-2`) is a tabbed collection carousel, NOT real best-sellers logic; `custom-product-slider` is its decoupled fork used on PDPs.

See also [[keep-dated-changelog]] for the daily change-log practice and [[apps-inventory]].
