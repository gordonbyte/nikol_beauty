---
name: apps-inventory
description: Which apps are active vs dead/leftover in the Nikol Beauty shopify-live theme
metadata: 
  node_type: memory
  type: reference
  originSessionId: 7375c2cd-6e35-465b-ab91-8b1978681251
  modified: 2026-08-04T16:59:08.644Z
---

App embeds are in `shopify-live/config/settings_data.json` → `current.blocks`.

**ACTIVE:** Klaviyo (email/SMS + onsite popups; the ~5s first-visit popup is a Klaviyo Sign-up Form, configured in Klaviyo not the theme; form id `klaviyo-form-Ug8YTK`), **ReStock** (back-in-stock embed — separate from the custom Klaviyo pre-launch notify in `product-default-copy`), **Junip** (reviews; ratings read in `seo-jsonld.liquid`), **SE Wishlist Engine** (the live wishlist; product app block + `.wishlist-engine` styles in `cw-pdp-css.liquid`), One-Click Upsell, eg-auto-add-to-cart, GG Product Page Slider Gallery, Easy Variant Images, Triple Whale, Microsoft Clarity, Axon. **UpPromote (affiliate) UNINSTALLED 2026-07-30** by Randell (no affiliate data worth keeping; embed entry + WebPixel gone — verified). Order tracking: **Hulk Order Tracking & Upsell** (HulkApps, app handle `order-status-tracker`, "OST") — ACTIVE, powers the live Track Your Order page via `page.app-ost-tracking-page-hz13hb` + `app-ost-container-*` sections with its @app blocks (search-bar, cross-sells from best-sellers, disabled announce-bar). Verified 2026-07-15 from the live template's block types + App Store. NOT AfterShip (old note wrong), NOT Rush. **Rush was uninstalled 2024-12-30** (user-confirmed); its `app-rush-*` templates+sections were leftovers, deleted from shopify-dev 2026-07-15. Trap for the future: the app-ost section schemas contain support.rush.app doc links (HulkApps copied Rush's section scaffolding) — do not mistake app-ost for Rush; it's live Hulk infrastructure.

**DISABLED embeds:** Convert Experiences, Google/YouTube store widget, Intelligems A/B testing (though Intelligems is still deeply wired via `window.igProductData`).

**DEAD / LEFTOVER (cleanup candidates):**
- **HulkApps wishlist — NOT dead after all (corrected 2026-08-04):** 5 `hulkapps-wishlist-*` snippets + a `window.hulkappsWishlist` JS shim and `/apps/advanced-wishlist` path checks in `layout/theme.liquid`. Orphaned in the STOREFRONT theme (0 renders) but Randell explained the real reason for the keep rule: **the MOBILE APP uses this wishlist and needs it connected to work properly.** Never delete or flag as dead-code again.
- **Judge.me** — uninstalled, but stale `product.metafields.judgeme.badge` references remain in `cart-drawer.liquid` and `cw-collection-bestseller.liquid` (reviews migrated to Junip).
- **Zooomy wishlist** — `zooomy-wishlist` section + `ZooomyList*` snippets, mostly orphaned. KEEP (see wishlist rule below).
- **WISHLIST RULE (user directive, reason established 2026-08-04):** leave ALL wishlist-related files in place even if they look orphaned in the storefront theme — HulkApps snippets + theme.liquid shim, Zooomy section/snippets, and `assets/wishlist.css` + `assets/wishlist.js`. **Why: the Nikol Beauty MOBILE APP depends on the wishlist connection to work properly, even though the website doesn't render these files.** SE Wishlist Engine is the active website wishlist. EXCEPTION granted 2026-07-15: user explicitly approved deleting the `page.zooomywishlist.json` TEMPLATE (done, shopify-dev). The rule still covers everything else; `sections/zooomy-wishlist.liquid` is now template-orphaned but KEPT.
- One of AfterShip/Rush order-tracking is likely redundant — verify which tracking page is live before removing.
