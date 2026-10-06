# 2026-09-30 — Eye Brightener coming-soon page (dev store)

Store: `nikolbeauty-dev-mab1srre.myshopify.com` · page metaobject `coming_soon_page/fbs-eye-brightener` (`gid://shopify/Metaobject/275069599846`) · rendered by the default `product.json` template (product has no template suffix). Admin content only — no theme code touched.

## What was filled
Seven slots were on the placeholder (`MediaImage/31441077633126`): 3 steps, 3 switched rows, banner. Steps and banner filled; switched rows cut from three to two (see below). Skin-safe photo (`EyeBrightener02whitebackground.png`, also product gallery media), icons, FAQ, headings and banner copy left as they were. Icons deferred by Randell.

| Slot | File (Content → Files) | Size | Source |
|---|---|---|---|
| Step 1 · Twist to Dispense | `nikol-eye-brightener-step-1-twist-pen.png` | 2000² | `Eye Brightener 03 white background.png`, resized only |
| Step 2 · Dot the Inner Corners | `nikol-eye-brightener-step-2-dot-inner-corners.png` | 2000² | `Nikol-Beauty-Q1-20251497.jpg`, full-width square from y 1143 |
| Step 3 · Blend It In | `nikol-eye-brightener-step-3-blend.png` | 2000² | `Eye Brightener - FINAL 2.jpg`, 1200² crop from x 130 (upscaled — the source is only 1800×1200) |
| Row 1 · Neutralizes, Then Illuminates | `nikol-eye-brightener-before-after.png` | 2000² | `1 - Eye Brightener - (BEFORE AND AFTER) Picture with copy.png`, resized only, captions kept |
| Row 2 · One Universal Shade | `nikol-eye-brightener-pen-and-swatch.png` | 2000² | `Eye Brightener 01 white background.png`, resized only |
| Banner | `nikol-eye-brightener-banner.png` | 2000² | `Nikol-Beauty-Q1-20251484 - Copy.jpg`, full-height square x 355–5702 |

## Copy changes
- Step 1 body rewritten: it used "Twist" in both the title and the body.
- Step 2 body rewritten: the old one repeated the FAQ "How do I apply" almost word for word (ring finger, tap to blend). Now it describes the thin lines the photo shows.
- Step 3 retitled "Layer for More Light" → "Blend It In" to match its photo (the brush is mid-blend), and the ring-finger blend moved here from step 2.
- Switched rows lengthened from 13–16 words to 37–38 words (playbook 30–45). Row 1 now explains the colour correction instead of echoing the description and the before/after's own burned-in captions.
- Row 3 "Lightweight and Oil-Free" removed from `switched_rows`. There are only 6 distinct usable images for 7 slots, and every lifestyle shot is the same model in a near-identical pose. Randell asked for supplied images only, no generation, and minimal editing. Its lightweight/oil-free message was folded into row 2's copy.

## Decisions and measurements
- Randell (this session): little image editing, every image 1:1, adjust copy to fit the images. No Higgsfield or Claude-side generation.
- Subject extents from a luminance scan (L < 238): FINAL 2 bbox x 121–1341 × y 31–1199; Q1-1484 x 274–5782 × y 588–5341; pen 01 x 960–2880 × y 285–3447; pen 03 x 1641–2049 × y 243–3447.
- Q1-1484 subject (5508 wide) is slightly wider than the frame height (5347). The crop is centred on the face and trims about 80px of elbow and shoulder tip at the edges, which were already cut by the frame bottom.
- Banner renders 550×376 on desktop and square on phone (360²) and tablet (355²), so it was made square with the eyes at about 40% of the height, inside the 16–84% band desktop keeps. On desktop the very top of the hair is trimmed.
- A caption-free before/after was built (dark-island mask plus direction-weighted fill, clean at zoom) but not used: without the captions the middle of the frame is empty, and Randell asked for minimal editing. The version with captions is live.
- Pen 03 is a thin vertical pen that fills about 11% of the step card's width. It was the only supplied image that shows the twist base. Pen 02 (angled) was not reused because it is already the skin-safe photo.
- No pan repaint needed: single-shade product, and every photo shows the real formula.

## Upload route
Staged as `nikol-stg-eye-brightener-1-*.png` in `shopify-dev/assets/`, pushed under `/tmp/nikol-theme-push.lock` using the Shopify CLI from the nvm v20 install (it's not on PATH under v22). All 6 returned 200 on the CDN. `fileCreate` batch of 6 with `RAISE_ERROR` on duplicate names: all READY at 2000². Then `metaobjectUpdate` on 5 `cs_content_item`s and the page entry, 0 userErrors. CDN byte counts are about 80% of local because Shopify recompresses PNGs, not a cache hit (all names were new). Local staging copies deleted. The 6 remote copies are still in dev theme assets, because `themeFilesDelete` is blocked by the MCP.

## Verified
Dev storefront `/products/fbs-eye-brightener` at 1440, 820 and 390 wide. All slots serve the new files. Step cards are square (390² / 338² / 360²), switched section shows 2 rows, both square (578² / 315² / 330²), and the banner is 550×376 / 355×354 / 360×360 with the face in frame.

## Flagged — not changed
- **Theme code:** as on Eye Primer, step images render `alt=""` and switched rows and banner use the card title as alt, so the descriptive alts set on the files are ignored.
- **Skin-safe photo (existing content):** the square pen 02 shot is cropped to 0.74 on desktop (667×898), 0.87 on phone and **0.40 on tablet (394×977)**. The playbook size is 1100×1280. No portrait version was supplied.
- **FAQ contradiction:** "Has the packaging changed…" says the pen dispenses by twisting; "How long does one Eye Brightener tube last?" says "keep clicking gently".
- **Orphan:** `cs_content_item/fbs-eye-brightener-switched-3` (`gid://shopify/Metaobject/305511366758`) is no longer referenced. It can be deleted in admin; the API can't delete metaobjects.
- Icons: the backlog lists 2 product-specific badges for this product. Deferred.

## Follow-up — Paraben & Phthalate-Free icon swapped (Randell request)
- `fbs-eye-brightener-skinsafe-2` image changed from `nikol-badge-paraben-and-phthalate-free.png` (flask, arc "Phthalate-Free") to the existing `nikol-badge-paraben-free-and-fragrance-free-aroma.png` (`MediaImage/34187111825510`, scent-line glyph, arc "Paraben-Free"). The badge used by Serum Foundation, Creamy Concealer and Nikita Banana was reused, not re-uploaded or modified. Card title and text unchanged.
- The old flask badge is still in Files. This product no longer uses it; I didn't check other products.
- Verified on the dev storefront at 1440: the skin-safe block shows Cruelty-Free / Paraben-Free (scent) / Chamomile, all at 130².
