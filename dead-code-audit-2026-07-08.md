# Dead-code audit — 2026-07-08 (report only, nothing deleted)

Method: scripted scan of every file in `shopify-live/` (124 sections, 175 snippets, layout, templates, 55 assets) for 7 dead-code categories, with manual verification of all headline findings. Reference extraction is comment-stripped and handles both `{% render 'x' %}` and `{% liquid ... render 'x' %}` forms; sections fetched by theme JS via the Section Rendering API (`section_id=...`) were verified alive (api-cart-items, api-pickup-availability, api-product-grid-item, api-product-recommendation, api-product-upsell, predictive-search).

## A. Orphaned sections — 30 files

### A1. True theme orphans (2) — not reachable at all — ✅ REMOVED 2026-07-08 (git rm, staged)
| File | Size | Notes |
|---|---|---|
| sections/article.liquid | 691 lines | Superseded by `new-article` (both article templates use new-article). Known orphan since 2026-06-24 audit. |
| sections/header-predictive-search.liquid | 216 lines | No preset, placed nowhere, NOT fetched by JS (theme.js fetches `predictive-search` instead). Also contains a broken render (`search-empty-product-item`). Fully unreachable. |

### A2. Custom-built, intentionally unplaced (2) — editor-insertable, keep
| File | Size | Notes |
|---|---|---|
| sections/custom-feature-hero.liquid | 702 lines | Built + polished, awaiting placement |
| sections/custom-instagram-feed.liquid | 62 lines | Kept deliberately after pre-footer group removal (2026-07-06) |

### A3. Dormant stock Broadcast library (25) — unplaced but editor-insertable
featured-posts (259L), overlay-text-promo (287L), section-accordion-group (330L), section-anchor-logo (73L), section-announcement (355L), section-before-after (259L), section-blog (396L), section-collections-list-hover (283L), section-collections-list (386L), section-countdown-timer (550L), section-divider (101L), section-map (312L), section-multicolumn (618L), section-newsletter (656L), section-press-logos (319L), section-product (216L), section-products-image (335L), section-recent-products (140L), section-reviews (378L), section-sidebar (282L), section-tab-collections (700L), section-text-row (334L), section-text-with-products (572L), section-timeline (489L), section-video (272L).
Standard theme library — merchants can insert them in the editor. Only worth deleting if you decide to trim the library.

### A4. App-owned (1)
sections/index-content-zipifypages.liquid (12L) — Zipify.

## B. Orphaned snippets — 16 files (all app-owned / keep-rule; zero theme-built orphans)
- **HulkApps wishlist (5) — DO NOT DELETE per standing directive:** hulkapps-wishlist-account-btn (4L), -cart-btn (28L), -collection-btn (12L), -header-icon (28L), -saveforlater-allitems (53L)
- **Zooomy (2) — keep per wishlist rule:** ZooomyListWishlistColl (2L), ZooomyListWishlistProduct (4L)
- **Zipify (9) — app-owned:** best-value-horizontal-view (58L), best-value-offer-view (47L), best-value-view (44L), collection-content (4L), offer-box-view (61L), product-content (4L), product-view (35L), recharge-subscription-view (43L), three-products-view (28L)

### B2. Snippets alive only via dormant stock sections (2)
- snippets/brick-products.liquid ← only section-products-image (dormant stock)
- snippets/collection-grid-item.liquid ← only section-collections-list (dormant stock)

## C. Orphaned assets — 5 deletable (+2 keep-rule), ~135KB — ✅ 4 REMOVED 2026-07-08 (main.min.css, password-page-background.jpg, loading.gif, custom.js); blank.png KEPT — its filename is live in `swatch_color_list` settings ("Blank: blank.png"); swatches resolve via `file_img_url` (Files CDN) so the assets copy was unreachable, but kept to avoid confusion
| File | Size | Notes |
|---|---|---|
| assets/main.min.css | 55.2KB | Never loaded (theme loads main.css) |
| assets/password-page-background.jpg | 77.1KB | Never referenced |
| assets/loading.gif | 1.7KB | Never referenced |
| assets/custom.js | 0.9KB | Never loaded — a comment at top of theme.js says "add any minor changes to assets/custom.js", but no script tag ever includes it |
| assets/blank.png | 0.1KB | Never referenced |
| assets/wishlist.css | 0KB (empty) | **KEEP per wishlist rule** |
| assets/wishlist.js | 0KB (empty) | **KEEP per wishlist rule** |

## D. Broken render references — 13 (12 app-zone + 1 dead-on-dead)
- **Zipify zone (12):** `bold-common`, `bold-product`, `bold-variant`, `bold-subscription-widget`, `bsub-widget`, `sc-includes`, `judgeme_core`, `loop-subscriptions`, `loop-widget.css`, `oneclickupsellapp-extend`, `oneclickupsellapp-theme`, `recipekit` — Zipify-generated files render app snippets that don't exist in the theme (leftovers of Bold/Loop/Judge.me integrations). Only fire on Zipify page templates; app-owned, don't touch.
- **Theme (1):** `search-empty-product-item` ← sections/header-predictive-search.liquid (which is itself a dead file — see A1).

## E. Commented-out markup blocks — 6 files, 11 blocks — ✅ REMOVED 2026-07-08 (15 blocks incl. companion CSS/JS comment blocks, ~634 lines; header.liquid's block KEPT — it's a commented wishlist icon, wishlist rule)
| File | Blocks | Detail |
|---|---|---|
| sections/video-gallery.liquid | 3 | Tab navigation (~15L) + Spotlight section (~46L) + spotlight CSS (~46L) |
| sections/video-gallery-youtube.liquid | 3 | Same three blocks (duplicate file) |
| sections/blog.liquid | 2 | Old tag-nav block (~14L) + excerpt line |
| snippets/product-buttons.liquid | 1 | ~24 lines |
| sections/header.liquid | 1 | ~7 lines |
| snippets/related-article.liquid | 1 | 1-line html comment |

## F. Unused schema settings — 10 files, ~20 genuinely dead
(Dynamic `settings[...]` access filtered out — PDPs' `tab_richtext.title_1-5`/`raw_content_1-5`, `line-item.option_1-3`, and section-double's `collection_1/2` fields are read dynamically and are NOT dead.)

| File | Dead | Settings |
|---|---|---|
| sections/video-gallery.liquid | 4 | ✅ 2026-07-08: all four WIRED (heroes w/ hardcoded fallback, store_url, gated YouTube button) + bottom hero de-hardcoded w/ 4 new settings |
| sections/video-gallery-youtube.liquid | 4 | ✅ 2026-07-08: file DELETED (consolidated into video-gallery; template repointed, settings carried over) |
| sections/header.liquid | 3 | ✅ 2026-07-08: all three WIRED (restored the deleted assigns) and pinned to current look — stored padding set 15→0 to match the nil-era rendering; separator already false. Sliders/toggle now functional. |
| sections/custom-product-slider.liquid | 2 | ✅ 2026-07-08: WIRED — merged custom-collection-tabs' accessible tab UI into this section (tab bar with 2+ blocks; image/label conditional; single block = plain slider); custom-collection-tabs.liquid DELETED, homepage-style-2 instance repointed; dead tab CSS now live; dead section-level button_label/button_link removed |
| sections/new-article.liquid | 2 | ✅ 2026-07-08: both WIRED — show_image gates the hero photo (+ blank-src bug fix); the Related Posts strip became the `recent` block (heading editable, removable, @app functional); template block titles migrated |
| sections/custom-product-coming-soon.liquid | 1 | ✅ 2026-07-08: REMOVED — schema-only checkbox, no zoom code exists in the bespoke gallery (build zoom in the future PDP pass if wanted) |
| sections/cart-drawer.liquid | 1 | ✅ 2026-07-08: REMOVED per user decision (tested on /cart, chose no drawer upsells) — phantom block type deleted from drawer schema; saved block removed from group-overlay.json (mirroring the user's editor deletion so a push can't resurrect it). Cart PAGE's working upsell untouched. |
| sections/product.liquid | 1 | 🔍 VERIFIED 2026-07-08: **phantom block** — no `when 'upsell'` case exists in the body at all (agency removed it; product-new/coming-soon still have theirs). Saved upsell blocks on product.json/fastbundle/free-products/lipstick templates render nothing. Wiring = porting the case from product-new → upsell UI would APPEAR on live PDPs → defer to PDP pass as a feature-restoration decision. |
| sections/custom-product-waitlist.liquid | 1 | 🔍 VERIFIED 2026-07-08: same phantom-block situation as product.liquid (no `when 'upsell'` case; waitlist.json's saved upsell block is invisible). Defer to PDP pass. |
| sections/section-double.liquid | 0 confirmed | (collection.* fields are dynamic-read — false alarm) |

## G. Dead in-file CSS classes — ✅ RESOLVED 2026-07-08 (3 files edited; list re-verified against post-#1–#4 code first)
(App-DOM selectors excluded: pmslider-* = GG Slider app, wishlist-engine-* = SE Wishlist, nm-* etc. Dynamic classes excluded: template-product, product__wrapper--*.)

| File | Count | Classes |
|---|---|---|
| sections/video-gallery.liquid | 16 | ✅ 2026-07-08: re-scan found **38** dead (cleanup #3's comment removal orphaned the whole spotlight ecosystem — product card/buttons/quote/tab-nav — on top of these 16). All removed block-aware (76 rules, 1,458 → 939 lines) + thumbnail-large CSS/no-op JS handler. Re-scan: 0 dead / 24 alive. |
| sections/video-gallery-youtube.liquid | 16 | ✅ n/a — file deleted in cleanup #4 (consolidation) |
| snippets/cw-pdp-css.liquid | 14 | ✅ 2026-07-08: removed (base + mobile copies, 807 → 568 lines) incl. the full custom-qty family (its coming-soon JS provably bails) and the dead pvideo `<script>`; pvideo-section/-title are LIVE (Channelize embed container) and kept. Note: the suspected duplicate chunk was base + `@media` mobile overrides — not a paste error, no de-dupe needed. |
| sections/custom-product-slider.liquid | 5 | ✅ n/a — tab classes went LIVE in the cleanup #4 collection-tabs merge |
| sections/footer.liquid | 1 | ✅ 2026-07-08: footer-group rules removed (dormant stock section regardless) |

## H. Informational (looks dead, isn't / needs a look)
- `layout/theme.liquid` sets `window.igProductData`, `window._template`, `window.__productIdFromTemplate`, `window.__plpCollectionIdFromTemplate` — consumed by **external scripts** (Intelligems etc.), not dead.
- `templates/gift_card.liquid` line 40 calls `{%- section 'gift-card.liquid' -%}` — ✅ FIXED 2026-07-08: confirmed real bug — the `{% section %}` tag takes the name without extension, so issued-gift-card pages rendered a Liquid error instead of the branded header (logo + shop URL). Suffix removed; synced to dev.
- api-* sections + predictive-search: alive via theme.js Section Rendering API fetches (verified) — do not treat as orphans.

## Totals
| Category | Files affected | Items |
|---|---|---|
| Orphaned sections | 30 | 2 true theme orphans, 25 dormant stock, 2 kept custom, 1 app |
| Orphaned snippets | 16 (+2 dormant-support) | all app-owned/keep-rule |
| Orphaned assets | 5 (+2 keep-rule) | ~135KB |
| Broken renders | 13 refs | 12 app-zone, 1 dead-on-dead |
| Commented-out markup | 6 files | 11 blocks (~200 lines) |
| Unused schema settings | 10 files | ~20 settings |
| Dead in-file CSS classes | 5 files | 52 classes |
