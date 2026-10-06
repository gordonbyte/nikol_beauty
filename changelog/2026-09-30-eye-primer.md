# 2026-09-30 — Eye Primer coming-soon page (dev store)

Store: `nikolbeauty-dev-mab1srre.myshopify.com` · page metaobject `coming_soon_page/eye-primer` (`gid://shopify/Metaobject/275069829222`) · rendered by the default `product.json` template (product has no template suffix). Admin content only — no theme code touched.

## What was filled
Seven slots were still on the placeholder (`MediaImage/31441077633126`): 3 steps, 3 switched rows, banner. All filled. Skin-safe photo (`PinkEyePrimerFinalCompact`, also product gallery media), icons, FAQ, headings left as they were.

| Slot | File (Content → Files) | Size | Source |
|---|---|---|---|
| Step 1 | `nikol-eye-primer-step-1-open-compact.jpg` | 2000² | `Eye Primer - FINAL 3.jpg`, 1200² crop centred on compact (x 287) |
| Step 2 | `nikol-eye-primer-step-2-fingertip-lid.jpg` | 2000² | `nikol eye primer.png` (800² source, upscaled) |
| Step 3 | `nikol-eye-primer-step-3-compact-smile.jpg` | 2000² | `Nikol_Beauty_July_20240442.jpg`, full-width square from y 1150 |
| Row 1 | `nikol-eye-primer-row-1-compact-trio.jpg` | 2000² | `Eye Primer - FINAL 5.jpg`, padded white to 1750² |
| Row 2 | `nikol-eye-primer-row-2-wide-eyed.jpg` | 2000² | `Nikol_Beauty_July_20240443.jpg`, full-width square from y 900 |
| Row 3 | `nikol-eye-primer-row-3-compact-stack.jpg` | 2000² | `Eye Primer - FINAL 8.jpg`, padded white to 1500² |
| Banner | `nikol-eye-primer-banner-compact-smile.jpg` | 2400×1558 | `Nikol_Beauty_July_20240481.jpg`, 1.54 crop x 0–6396, y 410–4563 |

## Copy changes (to stop repetition)
- "true color" appeared in step 3, switched row 1 and the banner; "small amount" in steps 1–2 and the FAQ. Rewrote step bodies and switched-row bodies; switched rows lengthened to 36–39 words (playbook 30–45).
- Step 1 retitled "Start With a Clean, Dry Lid" → "Tap Into the Pan" to match its photo; the clean/dry-lid advice already lives in the "How do I stop my eyeshadow creasing?" FAQ.
- Step 2/3 and all switched-row titles kept.

## Decisions and measurements
- Subject extents from a luminance scan (L < 232) on the product shots: FINAL 3 bbox 399–1375 × 137–1049; FINAL 5 114–1664 × 226–1063; FINAL 8 228–1541 × 166–1078. FINAL 5 / FINAL 8 subjects are wider than the 1200 frame height, so they're padded on pure white (source background is 255) instead of clipped.
- First portrait crops (y 574) cut the chin; moved down to y 1150 / 900. On 0443 that trims a little of the top of the hair — the head is taller than the frame is wide, so something had to give.
- `Nikol_Beauty_July_20240637.jpg` not used: it shows concealer dots under the eye with a brush, not primer on the lid.
- `1 - Eye Primer- Picture with copy 01–04.png` not used: burned-in headline copy, and the clean versions of the same shots are `FINAL 6` / `FINAL 8`.
- No lip-application photo in the folder, so row 3 ("Doubles as a Lip Primer") carries a product shot.
- No pan repaint needed — single-shade product, all photos show the real primer.

## Upload route
Staged as `nikol-stg-eye-primer-1-*.jpg` in `shopify-dev/assets/`, pushed under `/tmp/nikol-theme-push.lock` (Shopify CLI from the nvm v20 install — not on PATH under v22), confirmed 200 on CDN, `fileCreate` batch of 7, all READY at the expected dimensions. Local staging copies deleted. The CDN byte counts are smaller than local because Shopify recompresses JPEGs — not a cache hit (all names were new).

## Verified
Dev storefront `/products/eye-primer` at 1440 and 390 wide: all 7 slots serve the new files; step cards square (390×390 desktop), rows square (578×578), banner cover crop 550×444 desktop / 360×233 mobile keeps face and compact in frame.

## Flagged (theme code — not changed)
- Alt text is not taken from the file: step images render `alt=""`, switched rows and banner render the card title as alt. The descriptive alts set on the files are ignored. Needs `custom-steps-horizontal` / `custom-alternating-rows` / `custom-info-banner` to prefer `image.alt`.

## Follow-up — image swap (Randell request)
- Swapped the Step 1 ("Tap Into the Pan") and Row 1 ("Neutralizes Lid Darkness") images: Step 1 now uses `nikol-eye-primer-row-1-compact-trio.jpg`, Row 1 uses `nikol-eye-primer-step-1-open-compact.jpg`. References only — no re-upload, both 2000², alt text on each file still describes its content. Filenames' slot prefixes are now swapped relative to where they sit. Re-verified on the dev storefront (desktop + mobile), KAN-211 comment updated.

## Follow-up 2 — switched rows cut to two (Randell request)
- Row 1 ("Neutralizes Lid Darkness") image → `nikol-eye-primer-row-3-compact-stack.jpg` (the image that was on "Doubles as a Lip Primer").
- Removed "Doubles as a Lip Primer" from the page: `switched_rows` on `coming_soon_page/eye-primer` now lists only `eye-primer-switched-1` and `-2`. The `eye-primer-switched-3` metaobject still exists (API can't delete metaobjects) — orphaned, safe to delete in admin. `nikol-eye-primer-step-1-open-compact.jpg` is now unused by the page.
- Lip-primer benefit still appears in the product description; nowhere else on the coming-soon sections.
- Re-verified on the dev storefront: switched section renders 2 rows, both square (578² desktop / 330² mobile).
