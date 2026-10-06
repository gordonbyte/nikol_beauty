# 2026-10-05: Just Peachy Color Corrector, skin-safe photo + switched rows (dev store)

Store: `nikolbeauty-dev-mab1srre.myshopify.com` · page metaobject `coming_soon_page/just-peachy-color-corrector` (`gid://shopify/Metaobject/275069698150`) · rendered by the default `product.json` template (no template suffix). Admin content only, no theme code touched.

## What changed

| Slot | File (Content → Files) | Source |
|---|---|---|
| Skin-safe photo | `nikol-just-peachy-skinsafe-nikol-applying.jpg` (`MediaImage/46011460517990`) | 2025 shoot `Nikol-Beauty-Q1-20251670.jpg`, square crop x 0 / y 250 / 5331², no edits |
| Row 1 · Peach for Dark Circles, Green for Redness | `nikol-just-peachy-switched-1-corrector-trio.jpg` (`46011460550758`) | 2025 shoot `Nikol-Beauty-Q1-20251601.jpg`, full-height square from x 2660, no edits |
| Row 2 · Creamy, Not Crumbly | `nikol-just-peachy-switched-2-flat-lay-swatch.jpg` (`46011460583526`) | Higgsfield flat lay + real label transplant + Lab recolour |
| Row 3 · Tap It In With a Fingertip | `nikol-just-peachy-switched-3-fingertip-blend.jpg` (`46011460616294`) | Higgsfield hands + real stick cutout composited in |

All 2000×2000 JPEG q0.92 with descriptive alt text, all READY. The three rows existed already (`just-peachy-color-corrector-switched-1/2/3`), so they were updated and no new `cs_content_item` was needed.

- **Skin-safe photo replaced (it held real content, but Randell asked for it):** the old `just-peachy-skinsafe-after.png` was a crop of the same "after" photo used in step 2, so the page showed one face twice.
- **Rows were all on the placeholder.** Titles and text were rewritten to match the new images:
  - Row 1 "Peach Cancels Darkness" → "Peach for Dark Circles, Green for Redness". The photo shows the stick trio, so the copy explains picking by concern. Facts come from the listing and FAQ (fair to light-medium, brownish circles and dark spots; No Redness for redness).
  - Row 2 title kept, text rewritten around the visible swatch: shea butter, lightweight, medium buildable coverage, layers under concealer. The fingertip moved to row 3.
  - Row 3 "Less Concealer Needed" → "Tap It In With a Fingertip". The "thin layer of concealer" point closes the new text.

## Why these photos
- The three shoots hold 117 photos. Only two show Nikol with this product: 1670 (applying a stick labelled Just Peachy at her chin) and 1601 (the corrector trio fanned between her fingers). 1658 shows Extreme Cancel and 1685 shows No Redness, so both were excluded.
- Both real photos are used untouched, so Nikol's face is all original pixels and nothing of her was generated.
- Both show the shoot's color-correcting demo streaks: white, green, and an orange mark under her eye from a different corrector. None of the copy claims those marks are Just Peachy.
- 1601's third stick is labelled with the old name "Extreme Cancel" (now Simply Apricot). The row copy leaves it out rather than name a label shoppers won't recognise.

## Measurements
- **Just Peachy, measured from the product photos (per-area median, Lab):**
  - swirl on white: L 80.0 / a 19.3 / b 22.6
  - swatch: L 71.7 / a 22.9 / b 26.4
  - bullet tip: L 70.6 / a 18.9 / b 21.9
  - hue 48–49° throughout
- **Targets used:** swatch L 76 / a 21 / b 24.5, tip L 73.5 / a 18.9 / b 21.9.
- **Skin-safe slot as served:** 667×898 desktop, 394×973 tablet, 390×450 phone (`object-fit: cover`). Rows are square at 578 / 315 / 330.

## Row 2 (flat lay), the steps
- 4 Higgsfield variants (nano_banana_pro 2k, product photos as references). The job status reports the model as `nano_banana_2`, presumably Higgsfield's internal name.
- **Picked a2,** the only one with the correct white bottom end cap. a1 had a silver bottom end.
- **Label transplant:** the generated logo and French line were warped.
  - Label ink extents measured by pixel scan: generated 522×190 px, real 290×106 px, giving a scale of 1.80 along and 1.74 across with a 90° clockwise rotation.
  - The real p1 label pixels were mapped in and re-shaded per pixel by a2's white profile across the tube divided by p1's own, so the label keeps the scene's top light.
- **Recolour:** the first pass used a chroma-ramp mask and left the tip two-tone and a band in the swatch. Low-chroma highlights got partial weight, the same flaw as the 10-01 lipstick lips. Replaced with a solid mask (largest component, closed 8–10 px, 2 px feather) moved by one shared L shift, chroma scale and hue rotation. Result: swatch 76.0 / 21.1 / 24.6, tip 73.5 / 18.9 / 21.9.
- A garbled orange "label" the model printed on the cap rim was filled with each row's clean median.

## Row 3 (hands), the steps
- Both b variants had a silver bottom end and a garbled label ("3.3g", "2.2g").
- A regenerated hands-only pair failed differently: c1 had a hard seam across its lower third, and c2 a pinkish swatch with blown highlights.
- **Kept b1 and covered its stick with the real capped stick** cut from `just-peachy_product_image_2.png` (flood-fill background removal, cut 247).
  - Axis from the neutral-pixel mask: about 21.3°, 149 px across.
  - The first placement sat 25 px low and the old tube showed along the top edge. Final placement: centre (886.5, 1587), 112.3°, scale 1.36, soft shadow down and to the right.
  - brightness(1.05) blew out the chrome cap, so it was dropped.
- The hand swatch measures L 75.2 / a 17.5 / b 21.5, within ΔE 5 of target. Not recoloured, because separating it from the skin underneath would risk tinting her hand.

## Upload route
- Staged as `nikol-stg-just-peachy-color-corrector-1-{skinsafe,row1,row2,row3}.jpg`, pushed from `shopify-dev/` under `/tmp/nikol-theme-push.lock`. All 4 returned 200 on the CDN; the byte counts there are lower because Shopify recompresses, and every name was new.
- Local staging copies deleted. The remote copies remain in dev theme assets.
- `fileCreate` ×4 (`RAISE_ERROR`), then one batched `metaobjectUpdate` for the page plus the 3 rows: 0 userErrors.
- `get-shop-info` was confirmed before each write batch.

## Verified
- Dev storefront at 1440 / 820 / 390: the skin-safe block serves the new photo, the switched section shows 3 square rows alternating sides with the new titles, and all images load.
- Shared placeholder (`MediaImage/31441077633126`) was never modified, only repointed away from. `/products/no-redness-beauty-stix` still renders it in its 3 rows and banner.

## Follow-up: banner "Stop Piling On Concealer to Hide Dark Circles" (Randell request)
- `banner_image` now points at `nikol-just-peachy-banner-nikol-portrait.jpg` (`MediaImage/46011493253222`), 2000×2000, READY. It was on the shared placeholder, which was repointed away from, not modified.
- Source: real, unedited July 2024 shoot `Nikol_Beauty_July_20240821.jpg`, full-width square from y 400. A direct-gaze close portrait with bright, even under-eyes, which shows what the banner text promises without claiming a product is on her face.
- Both real photos with this stick were already used on the page, so the banner had to be a different photo. Runner-up was `July_20240862` (softer gaze, more tulle).
- Banner heading and text unchanged; they already match the image.
- Randell first named "Eyeshadow That Flatters Instead of Settling". That's the banner heading on all 7 eyeshadow palette pages, which other sessions own, so he confirmed he meant this product's banner. No palette page was touched.
- Staged as `nikol-stg-just-peachy-color-corrector-2-banner.jpg` under the push lock; local copy deleted.
- Verified at 1440 / 820 / 390: 550×472, 355×454 and 360×360, the face in frame at every width. KAN-221 updated with the banner step.
- **Recropped to the eye area** (Randell asked to focus more on the eyes).
  - New crop of the same photo: a 3550 px square from x 1033 / y 1292, eye line at 45% of the height.
  - A first try at 2700 px put her outer eye corners on the frame edge, and tablet's centre-78% crop would have cut both eyes.
  - The eyes span about 2480 source px, so 3550 keeps them inside the tablet window.
  - Replaced in place with `fileUpdate` on `MediaImage/46011493253222`. The file was created this session and is used only by this banner, so nothing shared was touched.
  - Alt text changed to "Close-up of Nikol's eyes and under-eye area, bright and even, framed by her brows and silver hair".
  - Staged as `nikol-stg-just-peachy-color-corrector-3-banner-eyes.jpg`.
  - Re-verified at 1440 / 820: both eyes and under-eyes in frame. KAN-221 comment added with the new alt text.

## Flagged, not changed
- **Tablet skin-safe crop:** at 820 the slot is 394×973 (0.40), so a square image keeps only its centre 40%. The stick tip stays in frame but the label is cut. This needs a template/CSS change across all coming-soon products.
- **Net weight mismatch:** the packaging reads 3.2g / 0.11oz, while the page's `quick_facts` say 3.5g / .12 oz.
- **Old file:** `just-peachy-skinsafe-after.png` (`MediaImage/41598365433958`) is no longer used by this page and was left in Files.
- Live replication: **KAN-221** (under KAN-119). Review page: https://claude.ai/artifact/7mt3uKSRDkdVAE1W3h9prf
