# Dev Store Parity Checklist — nikolbeauty-dev

Snapshot of everything important on the **live** store (nikolbeauty.myshopify.com) that the dev store needs so the theme renders correctly and custom apps can read/edit the same data. Compiled read-only from the live Admin API on 2026-07-09. Orders, payments, and customer data intentionally excluded.

**How to use:** once Claude is connected to the dev store, walk this list top to bottom and check each item against dev.

---

## ✅ Dev status — verified via Admin API 2026-07-09 (connected to nikolbeauty-dev)

| Item | Status |
|---|---|
| §1 Products `custom` (45) | ✅ all 45 present (plus a stray `custom.siblings` — wrong namespace, theme reads `theme.siblings`; safe to delete) |
| §1 Products `theme` (5) | ✅ **created by Claude 2026-07-09** (were all missing) |
| §1 Variants / Collections / Pages / Articles / Shop | ✅ all present, types match |
| §2 Metaobject definition | ✅ exists with all 11 fields |
| §2 Metaobject entries | ✅ **34 of 34** — user's import landed 2026-07-09 ~18:00 UTC with correctly remapped dev variant refs (6 accidental Claude duplicates from a race were deleted same day) |
| §3 Products | ⚠️ 69 of 70 — only **`nikol-beauty-gift-card`** missing (gift-card products can't be API-created; add via dev admin → Products → Gift card if needed). "SOFT SET TECHNIQUE™ BRUSH" exists, handle differs (™ stripped: `soft-set-technique-brush`) |
| §3 Collections | ✅ 131 |
| §3 Pages | ✅ 29 |
| §3 Blogs | ⚠️ 5 of 5 blogs — `blog` (Makeup and Beauty Blog) **created by Claude 2026-07-09** with its 2 published articles; its 18 drafts saved locally, not imported. Article backfill still partial on the others (news 1/101, nikol-beauty 225/392, youtube-videos 243/273) |
| §3 Menus | ✅ 5 of 5 required — **`apr-2026-including-youtube` (header menu) created by Claude 2026-07-09** from a live-store export, all ~40 items across 3 levels remapped to dev IDs (Gift Cards item is an HTTP link until the gift-card product exists) |
| §3 Files | ✅ Nikol_logo.png (320×175), tabimg1–6, bb_creme set, `blank.png` **uploaded by Claude 2026-07-09** · bb_creme2 unconfirmed |
| Shop `custom.video_data` value | ✅ copied from live 2026-07-09 (nothing in the theme reads it; legacy/test data) |
| §3 Theme | ✅ Broadcast copy `Nikolbeauty_7/08/26` is MAIN, current incl. cleanup #4 |
| §4 Apps | ❓ connector lacks `read_apps` scope — check manually in dev admin against §4 |
| Metafield **values** on products/collections/articles | ❓ defs exist; values need the Matrixify import — not yet verified |

---

## 1. Metafield definitions — create manually (theme/custom apps read these)

App-owned namespaces (`shopify--*`, `mm-google-shopping`, `avalara`, `rbrfb`, `reviews`) are created automatically when the owning app is installed — **don't create those by hand**. Everything below is manual.

### Products — `custom` namespace (45)
| ✓ | Key | Name | Type |
|---|---|---|---|
| ☐ | `tab_content` | Ingredients | Multi-line text |
| ☐ | `instruction_title_1` … `instruction_title_6` | Instruction Title 1–6 | Single line text (×6) |
| ☐ | `instruction_content_1` … `instruction_content_6` | Instruction Content 1–6 | Multi-line text (×6) |
| ☐ | `product_review` | Product Review | Rich text |
| ☐ | `description_title` | Description title | Single line text |
| ☐ | `information_title` | Information title | Single line text |
| ☐ | `information_body` | Information body | Multi-line text |
| ☐ | `information_image` | Information image | File |
| ☐ | `information_feature_1` / `_2` / `_3` | Information feature 1–3 | Single line text (×3) |
| ☐ | `see_it_in_action_description` | See it in action description | Multi-line text |
| ☐ | `badge_title_1` / `_2` / `_3` | Badge title 1–3 | Single line text (×3) |
| ☐ | `badge_body_1` / `_2` / `_3` | Badge body 1–3 | Multi-line text (×3) |
| ☐ | `badge_photo_1` / `_2` / `_3` | Badge photo 1–3 | File (×3) |
| ☐ | `product_benefits_title` | Product benefits title | Single line text |
| ☐ | `product_benefits_body` | Product benefits body | Multi-line text |
| ☐ | `product_benefits_image` | Product benefits image | File |
| ☐ | `product_benefits_list_title_1` / `_2` | Product benefits list title 1–2 | Single line text (×2) |
| ☐ | `product_benefits_list_1` / `_2` | Product benefits list 1–2 | Multi-line text (×2) |
| ☐ | `product_benefits_quote` | Product benefits quote | Multi-line text |
| ☐ | `review_image_1` / `_2` | Review image 1–2 | File (×2) |
| ☐ | `review_name_1` / `_2` | Review name 1–2 | Single line text (×2) |
| ☐ | `review_body_1` / `_2` | Review body 1–2 | Multi-line text (×2) |
| ☐ | `ingredients_list` | Ingredients List | Multi-line text |
| ☐ | `full_list_of_ingredients` | Full list of ingredients | Multi-line text |
| ☐ | `product_video` | Product video | Single line text |
| ☐ | `shoppable_playlist` | Shoppable Playlist | Single line text |
| ☐ | `shoppable_video` | Shoppable video | Single line text |
| ☐ | `fierceaging_playlists` | Fierceaging Playlists | JSON |
| ☐ | `upsell_variant_list` | Upsell Variant List | List of variant references |

### Products — `theme` namespace (5) — the upsell/badge system reads these
| ✓ | Key | Name | Type |
|---|---|---|---|
| ☐ | `upsell` | Upsell | Product reference |
| ☐ | `upsell_list` | Upsell list | List of product references |
| ☐ | `badge` | Badge | Single line text |
| ☐ | `sibling_color` | Sibling Color | Single line text |
| ☐ | `siblings` | siblings | Single line text |

### Variants — `custom` namespace (2)
| ✓ | Key | Name | Type |
|---|---|---|---|
| ☐ | `upsell_per_variant_list` | Upsell per variant list | List of variant references |
| ☐ | `promo_percent` | Promo percent | Integer (the promo % badge system) |

### Collections — `custom` namespace (2)
| ✓ | Key | Name | Type | Notes |
|---|---|---|---|---|
| ☐ | `bottom_description` | Bottom Description | Rich text | storefront access ON — 97 collections have values |
| ☐ | `mobile_background` | mobile-background | File | storefront access ON |

### Pages — `custom` namespace (6) — video-gallery pages
| ✓ | Key | Type |
|---|---|---|
| ☐ | `makeup_tutorials_video` | URL |
| ☐ | `makeup_tutorials_featured_product` | Product reference |
| ☐ | `makeup_tutorials_featured_product_description` | Multi-line text |
| ☐ | `fierceaging_series_video` | URL |
| ☐ | `fierceaging_series_featured_product` | Product reference |
| ☐ | `fierceaging_series_featured_product_description` | Multi-line text |

### Articles — `custom` namespace (1)
| ✓ | Key | Name | Type | Notes |
|---|---|---|---|---|
| ☐ | `takeaways` | Takeaways | Rich text | 78 articles have values |

### Shop — `custom` namespace (1)
| ✓ | Key | Name | Type |
|---|---|---|---|
| ☐ | `video_data` | Video Data | JSON |

### Reviews note
`reviews.rating` and `reviews.rating_count` (product star ratings) are the standard namespace **Junip writes into** — install Junip first; create manually only if the theme errors before Junip is set up.

---

## 2. Metaobject definition — create manually (1)

Only one is custom; the 23 `shopify--*` taxonomy metaobjects (Color, Texture, etc.) are Shopify-managed and appear automatically.

| ✓ | Definition | Details |
|---|---|---|
| ☐ | **Beauty tutorial videos** (`beauty_tutorial_videos`) | 11 fields — title\*, description, video_url\* (URL), thumbnail\* (URL), category\* (values used by theme: `tutorials` / `fierceaging`), products (list of variant refs), featured_bundle (product ref), featured_bundle_description, shoppable_playlist, video_identifier, upload_date\* (Date, "Required for sorting"). Options: **Active/draft status ON, Web pages ON**. |
| ☐ | Its **34 entries** imported (Matrixify Metaobjects sheet) — powers the Videos pages |

---

## 3. Content inventory (live counts to match)

| ✓ | What | Live count | Notes |
|---|---|---|---|
| ☐ | Products | **70** (67 active, 3 draft) | with variants, images, and all metafield **values** (Matrixify: Products + Metafields) |
| ☐ | Collections | **131** = 105 smart + 26 custom | smart rules rebuild membership automatically; bottom_description values on 97 |
| ☐ | Pages | **29** | About, FAQ, Contact, Videos, Lookbook, etc. + the 6 video page metafield values |
| ☐ | Blogs | **5** | Nikol's Journal `news` (101), Makeup and Beauty Blog `blog` (1), Nikol Beauty `nikol-beauty` (392), YouTube Videos `youtube-videos` (273), Beauty Reinvented `beauty-reinvented` (30) — 797 articles total |
| ☐ | Navigation menus | **15 on live; 5 the theme actually uses** | **Required:** `apr-2026-including-youtube` (header), `main-menu`, `footer` (custom footer), `lips` ("Product Type" collection menu), `blog-tags` (blog pages). Others are historical variants — optional |
| ☐ | Files | key ones | `Nikol_logo.png` (320×175 — header), `tabimg1-6` (collection tabs), `blank.png` (swatch), `bb_creme1-6.png` (only if product-new is ever used), video-gallery hero images |
| ☐ | URL redirects | 1,205 | **skip for dev** — SEO plumbing for the live domain |
| ☐ | Theme | pushed from repo | already done — `Nikolbeauty_7/08/26` on dev |

---

## 4. Apps to install on dev

### Theme-critical (theme renders their DOM/data — install these)
| ✓ | App | Why the theme needs it |
|---|---|---|
| ☐ | **Junip** | product reviews; `reviews.rating` read in seo-jsonld + review widgets |
| ☐ | **SE Wishlist Engine** | the live wishlist (`.wishlist-engine` blocks on PDP + header icon) |
| ☐ | **GG Product Page Slider Gallery** | PDP image gallery (`pmslider-*` DOM the PDP CSS targets) |
| ☐ | **Klaviyo** | popups/forms (form `klaviyo-form-Ug8YTK`) + email/SMS embeds |
| ☐ | **ReStock** (back-in-stock) | back-in-stock embed on PDPs |
| ☐ | **Channelize (Live Shopping / Shoppable Videos)** | app blocks on coming-soon PDP + Live Shows |
| ☐ | **Zipify Pages** | `index-content-zipifypages` section + Zipify page templates |
| ☐ | **Fast Bundle** | `product.fastbundle` template + `rbrfb.fastbundleconf` shop metafield |
| ☐ | **One-Click Upsell (Zipify OCU)** | upsell embeds referenced in theme.liquid |
| ☐ | **eg-auto-add-to-cart** | active embed |
| ☐ | **Easy Variant Images** | active embed |

### Utility
| ✓ | App | Why |
|---|---|---|
| ☐ | **Matrixify** | to run the values import on dev |

### Analytics / feeds — optional on dev (skip unless testing them)
Google & YouTube (`mm-google-shopping`), UpPromote (affiliate), Triple Whale, Microsoft Clarity, Axon, AfterShip **or** Rush (order tracking — live has both; one is likely redundant), Intelligems (embed disabled on live but `window.igProductData` wiring exists), Avalara (tax).

### Do NOT install (dead on live, kept only as files)
HulkApps Wishlist, Zooomy Wishlist, Judge.me — leftovers; SE Wishlist Engine and Junip replaced them.

---

## 5. Known dev-store gaps already found (from push errors)
- ✅ `custom.bottom_description`, `custom.instruction_content_4/6` — created 2026-07-09
- ☐ `custom.instruction_title_4`, `custom.instruction_title_6` (products), `custom.mobile_background` (collections) — the current push blockers
- Dev had instruction sets 1/2/3/5 but was missing the whole _4/_6 family — pattern worth remembering when comparing the full product list above.
