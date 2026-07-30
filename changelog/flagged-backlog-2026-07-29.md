# Flagged-but-unresolved backlog (from full changelog sweep, 2026-07-29)

Extracted from every daily note 2026-06-24 → 2026-07-24, then verified against the live store
(Admin API + rendered storefront) and the `shopify-live/` folder on 2026-07-29/30.
**Keep item numbers stable** — Randell triages by number ("add #13 to Jira").
Items verified as completed were removed: ~~#1, #2, #4, #19, #82~~ (and #3/#35 reduced in scope).
Not yet filed in Jira unless noted.

## Booby traps & drift
- **#3** Create the 4 promo style metafield definitions on live (`custom.promo_badge_bg`, `promo_price_color`, `promo_badge_text`, `promo_badge_style` — all PRODUCT owner; verified absent 07-29, full definition list enumerated)
- **#13** Cart-drawer upsell block: enabled in repo `group-overlay.json` AND confirmed enabled in the live published theme ("Copy of Nikolbeauty_7/27/26 National Lipstick Sale") — the 07-17 editor deletion is gone. Decide: keep it, or disable in BOTH live editor and repo
- **#14** REOPENED 07-30: duplicate `store-credit-launcher` include in `<head>` is back — a fresh live-theme pull brought it into the repo working copy, meaning the published sale theme still carries it
- **#18** theme.js null guards are hand-edits outside the minify pipeline — regeneration silently drops them
- **#39** Phantom upsell blocks saved on 5 product templates with no rendering case — "decide later"
- **#40** `product-new.liquid` hardcoded BB Crème gallery (wrong photos for any "new" product, no alt, extra Swiper CDN) — user wants a rethink, not a band-aid
- **#12** `shopify-dev/` has no git safety net; rollback zip lives in a temp dir

## Verifications never done
- **#5** `{br}` badge line-break on storefront
- **#10** Discount-sync test matrix: collection-targeted discount + scheduled start/end flip
- **#21** Post-push visual checklist (marquee, pre-footer, video gallery, coming-soon PDP, jQuery-rewrite features)
- **#31** Typography check after font consolidation (300 body / 600 headings)
- **#32** Full visual pass after main.css −77% sweep + async swiper.css
- **#33** PageSpeed re-runs after perf campaign (tracked: KAN-30)
- **#34** Native `<select>` dropdowns after jQuery/selectboxit removal
- **#36** Wishlist heart icon click behavior after href change
- **#38** Dev best-sellers sort recompute + seed-order cleanup
- **#41** App install list (manual check, §4 of parity checklist)
- **#44** `blank.png` present in live store Files
- **#69** Stock core sections (header, cart, product, search…) never actually reviewed
- **#79** Global `.page-width` move site-wide impact
- **#80** Header background → white on formerly beige pages
- **#81** `custom-info-banner` rewrites (3 separate "needs preview" flags)

## Decisions parked with Randell
- **#8** UpPromote uninstall — LIKELY DONE ~07-29/30: app-embed entry vanished from a live settings pull + zero traces in live HTML; confirm the app is uninstalled and whether affiliate data was handled
- **#11** Amount-off discounts unsupported in discount-sync
- **#27** yt-video arrows vs product-card touch targets
- **#50** Homepage slideshow autoplay (WCAG) — disable or add pause button (verified still `autoplay: true`)
- **#54** Footer colors → universal variables
- **#55** 3 sections' backgrounds went solid/more opaque (FAQ, hero banner, product slider)
- **#56** Newsletter form has no success/error state
- **#73** `custom-alternating-rows` → slider conversion TODO
- **#77** Two widget product-title weights (pickup, cart-bar) left at old values
- **#78** De-Jost'd titles render body font pending heading relabel

## Vendor-app issues
- **#15** Zipify×CreditsYard vendor tickets never sent; shim is a temporary patch (tracked: KAN-25; shim confirmed rendering live)
- **#16** Easy Variant Images `/products/null` — report to SpiceGems
- **#17** Rare live errors: `undefined.options`, `undefined.is_enable_app` (matches SE Wishlist crash pattern from 07-29 JS sweep)
- **#25** Bing UET double-fire via GTM — pause GTM tag, re-run `scripts/probe-bing-uet.mjs`

## Accessibility backlog
- **#35** Real alt text for 4 remaining hero images in live Files (`bb_nikol_web_slide_1.webp`, `bbposter.webp`, `Nikol_holiday_group_on_white_GLITTER.jpg`, `on_left_lipsticks.jpg`; Untitled_design_1.jpg done)
- **#45** Deferred PDP heading/a11y pass (coming-soon, waitlist, product-new, product)
- **#49** `related.liquid` tabs — no ARIA tab semantics (12 templates)
- **#51** `section-double` latent autoplay
- **#52** `review-swiper-card` hardcoded heading + 66s autoplay
- **#57** Customer-quote star rating not conveyed to AT
- **#59** Stock `href="#!"` dead-link fallbacks
- **#60** Customer account pages have no `<h1>`
- **#61** Address fields lack `autocomplete`
- **#62** Video-gallery deeper heading normalization
- **#63** videos-filter/-featured a11y notes (aria-current, `<a href="#">` filters)
- **#65** Accordion `<summary>` not a heading element
- **#66** Contact-form minor items (fake heading, no ARIA live region)
- **#67** About-page non-semantic quote/title wrappers
- **#68** col-sitemap menu not in a `<nav>` landmark
- **#72** meet-nikol CTA renders with blank text

## Cleanup backlog
- **#20** Retired Feb Lip Gloss image ref in `index.json:90`
- **#22** Delete `index.context.b2b` / `index.context.canada`
- **#23** ~60 stale template suffixes on live content (confirmed: 13 "alternate" in first 50 collections alone)
- **#24** Unpublish blank Bundle Deals page + delete `rbrfb.fastbundleconf` metafield (both confirmed still present)
- **#26** ~797 blog article bodies unscanned (blocks 3 CSS/link cleanups)
- **#43** Dead-code audit leftovers: 25 dormant stock sections, 16 orphaned snippets, ~20 unused schema settings
- **#46** `custom-info-banner` BEM class rename
- **#48** custom-product-slider still reads dead Judge.me metafield
- **#71** `custom-feature-hero` built but placed nowhere
- **#74** 16 orphaned `.text-promo*` rules in theme.css (main.css clean)
- **#75** Custom-sections list re-audit (19 remain, imperfect baseline)
- **#76** Rename last `cw-*` file (`cw-pdp-css.liquid`)

## Performance nits (deliberately left)
- **#28** Image group 4 (~55 KiB) srcset granularity
- **#29** `section-collection` emits `--COLUMNS-MOBILE: 0`
- **#30** GTM container 63.5 KB unused JS
- **#47** Redundant per-section Swiper CDN loads (5 sections, confirmed)
- **#58** Remaining full-res/eager image loads (customer-quote, alternating-rows, meet-nikol, image-grid)

## Known issues / misc
- **#6** Discount-sync has no cron — `/api/sync` manual-only (Phase 6)
- **#7** Dev-store content gaps: pages, blogs, redirects, metaobjects → 404s
- **#9** Corner-ribbon curls omitted
- **#37** Dev store homepage meta description + shop description empty
- **#42** 18 draft articles not imported to dev; dev images point at live CDN
- **#53** Channelize widget background must be kept in sync manually
- **#64** `section-highlights` fragile hardcoded instance branch
- **#70** Guarantee marquee fixed 20s duration (no content scaling)
