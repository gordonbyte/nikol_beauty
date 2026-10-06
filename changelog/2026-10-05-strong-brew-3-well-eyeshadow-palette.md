# 2026-10-05: Strong Brew 3-Well Eyeshadow Palette

Coming-soon page on the **dev** store (`nikolbeauty-dev-mab1srre`), template `product.coming-soon`.
Two sections redone: the skin-safe photo and the "Why Mature Women Switched…" rows (2 rows → 3).
No theme files changed. Live replication: **KAN-222** (under KAN-119).
Review page: https://claude.ai/artifact/FfzvPw52QD598R7igWdSxv

## Shade targets (measured, not taken from the names)

- Per-channel median of a rectangle inset in each pan of `StrongBrewOPEN.jpg`. Pan edges came from a
  luminance scan: x 1140–1550 / 1620–2030 / 2090–2510, y ~1680–2490.
- Creamy nude peach `#ECDCD3` (Lab 88.8 / 4.0 / 6.4), soft taupe `#C19282` (64.6 / 15.5 / 15.4),
  rich brown `#6D4833` (34.2 / 13.2 / 19.0). These match the listing's shade dots
  (`#e9d6ca` / `#c09282` / `#6c4832`), so the names are reliable here. "Soft taupe" is a rosy
  peach-tan, not a grey taupe, so the copy avoids calling it cool.
- **The included tool, checked on the product shot:** two **dual-ended** applicators, each with a
  black sponge tip on one end and a short black brush on the other, laid head-to-tail with a silver
  "N" handle. Row 1's old image showed a fluffy pink brush that doesn't come with the palette.

## Photo selection (114 photos across the 2024 July, 2024 Feb and 2025 Q1 shoots)

- Only five photos show this silver 3-well case: July #0673, #0692 and 2025 #2054, #2065, #2078.
  July #0653 and #0682 show the real sponge applicator in use.
- **Skin-safe → 2025 #2054.** Eyes open, natural smile, case open by her face. The pans were already
  nude/peach/taupe, so only a small colour shift was needed. Its drawback: she holds a white fluffy
  blending brush that isn't this product's tool, so it had to come out.
- **Row 1 → July #0653.** Applying with the palette's own sponge-tip applicator. A wider, different
  framing from the step cards, which are eye close-ups. Chosen over #0682 so the eye-close-up look
  isn't repeated on the page.
- **Row 2 → July #0692.** The exact case (NIKOL lid with rose line-art, both "N" applicators) held below
  her chin. It's portrait and can't hold face + palette in a square, so it's cropped tight from her
  lips down to the palette. Its pans are a different, shimmery brown palette, so they were repainted.
- **Row 3 → generated product-alone shot.** Product photos on the page (gallery open and crumble shots)
  weren't reused.

## Edits

- **Brush removal (skin-safe).** Sent a 4:5 crop of the hand area (2116×2645 source px) to Higgsfield
  `nano_banana_pro` 2k. It came back 1856×2304 (≈0.806 vs 0.800). Alignment was fitted by coordinate
  search on the hand and ring, away from the brush: sx 1.161, sy 1.1566, dy −2.4, mean |Δ| 4.2 levels.
  Composited only three feathered capsules (bristles, ferrule, one ferrule-edge speck). Face, eyes,
  hair and skin stay original pixels.
  - Dead end: the first paste left a faint ghost. The edit's white was 253 vs the original's 255. Fixed
    with a per-channel gain plus lifting near-white, low-chroma pixels inside the capsule to 255.
- **Exposure.** Gamma 1.20 with a top-8% blend back to identity (white stays 255; corners checked) on
  the skin-safe and row 1 images. For the skin-safe image the gamma ran **before** the pan recolour,
  so the pans still land exactly on target.
- **Pan recolour, Lab.** L′ = T.L + (L − M.L)·k with k = min(1, T.L/M.L), a/b shifted to target,
  tanh roll-off above L 82. Mirror reflections take their real pan's ratio and shift.
  - Skin-safe: region growing (step 5, tol 18, hole-close 3). The dark pan's mirror reflection leaked
    into her fingers until it was bounded by a polygon at the mirror frame.
  - Row 2: shimmer breaks region growing (the playbook warns about this). The light pan was grown on a
    blurred copy (radius 3) inside a polygon. The middle and dark pans use polygons with a chroma
    floor of 7 (drops the black dividers and silver lid). The dark pan also has L < 60 to keep her
    fingertip out. 85–90% of the sparkle is removed. Positive L deviations are compressed (tanh, 5)
    and a/b deviations scaled ×0.35, otherwise a silver reflection on the shimmer turned into a white
    or salmon blotch on the lightened pan. The lid's shadow is kept.
  - Row 3: grown with step 7 / tol 30 / close 4. Step 3 stopped after 1–252 px because of the matte
    texture and the sunlit band. Swatches use a soft chroma mask on the linen.
- **Generated row 3, checked against the real product before use.** The applicators match the real tray
  (dual-ended, head-to-tail). The NIKOL wordmark and both "N" monograms were compared 1:1 with the
  product shot and match letter for letter, so no real-pixel paste was needed. First generation picked
  of two: a 3/4 view on marble was rejected because its applicators read wrong and its crumble was a
  single mixed piece.
- **Result vs target:**
  - Skin-safe pans: exact (#ebdad2 / #c19282 / #6d4832).
  - Row 2 light pan: ΔRGB 1–2.
  - Row 2 middle and dark pans: −8 and +10 levels at sample spots in the lid-shadow gradient (median on target).
  - Row 3: light ΔRGB 1–2; dark −2.
- Note: Higgsfield's job status labels the model `nano_banana_2` although `nano_banana_pro` was requested.

## Shopify changes (dev)

- New files, all READY:
  - `nikol-strong-brew-skinsafe-nikol.jpg` (1100×1280, MediaImage 46011479752806)
  - `…-switched-sponge-tip.jpg` (2000², 46011479785574)
  - `…-switched-compact.jpg` (2000², 46011479818342)
  - `…-switched-swatches.jpg` (2000², 46011479851110)
- Skin-safe stays 1100×1280 per the playbook's measured slot size, like the other palette pages; rows
  are 2000².
- Staged via theme push as `nikol-stg-strong-brew-3-well-eyeshadow-palette-1-*.jpg` under the
  `/tmp/nikol-theme-push.lock`. Local copies deleted. Note: the theme CDN re-encodes staged JPEGs
  (230 KB → 168 KB); dimensions unchanged.
- `coming_soon_page` 275071729766: `skinsafe_image` → new file. `switched_rows` → switched-1,
  switched-2, new 617099591782.
- Row 1 (305519624294) and row 2 (305519657062) updated in place (image, title, text). Both are
  Strong Brew's own records.
- New row 3 got handle `strong-brew-3-well-eyeshadow-palette-switched-3-1`. The plain `-switched-3`
  (305519689830, "Made for Your Eye Color", placeholder image) already existed, unreferenced, from
  the original page setup.
- **Shared files: no `fileUpdate` anywhere.** `nikol-eyeshadow-switched-blend.png` (45953067810918) is
  untouched, last updated 2026-09-30. The "another page still shows it" check couldn't be done
  because none of the ~500 `cs_content_item` rows scanned reference it any more; the other palette
  sessions repointed theirs today.

## Copy

| Row | Was | Now |
|---|---|---|
| 1 | Blends Without Dragging the Lid | Pats On With Its Own Sponge Tip (applicator facts from the product shot; Shea line from the listing) |
| 2 | Three Wells, Light to Deep | Light to Deep in One Compact (shade order from the listing, mirror from the product shot) |
| 3 | (none) | Soft, Even Matte Color (6.9g/0.24oz and Made in Italy from quick facts) |

- Row 3 doesn't claim every well has Shea butter: one of the three ingredient lists doesn't include it.

## Verified on the dev storefront

- Skin-safe shows the new photo (rendered 667×898, cover-cropped as measured).
- The switched section shows 3 rows alternating sides, each 578×578, with the new titles.

## Follow-up: banner "Eyeshadow That Flatters Instead of Settling" (Randell request)

- `banner_image` was the shared `nikol-image-coming-soon-placeholder.png` (31441077633126), which is
  used by every unfinished page. Created a NEW file, **`nikol-strong-brew-banner.jpg`** (2000×2000,
  MediaImage 46011574419558), and set it on Strong Brew only. Heading and text are unchanged.
- **Slot size, from The Cabana's storefront measurement:** desktop 550×376, tablet ~457×379, phone
  360×360, all `cover` at centre. The phone slot is square, so the file is square (as on Sweet Carol
  and The Cabana), with the brow and eye inside the middle 68% band that desktop keeps.
- **Same series as the other palettes:** a tight close-up of one closed eye, like Sweet Carol and The
  Cabana. Those two were generated because their unused real photos were near-twins of images already
  on the page.
- **This one uses a real photo instead, so no face generation.**
  - Source: 2025 #2065, cropped at full resolution to a square 810 px around her left eye and brow
    (x 2345, y 2005), with the palette edge kept out of frame.
  - Cropped this tight, it doesn't resemble the full-face skin-safe photo (#2054, same sitting).
  - Upscaled 810 → 2000 with plain bicubic (no AI upscaler), which is enough for the 550 px desktop slot.
- **Recolour of the applied shadow (Lab, lightness untouched).**
  - Her real shadow is a cool mauve-rose: lid hue 36.7°, crease 35.6°, outer corner 33.7°. Her skin
    is at hue 53°.
  - Rotated the hue toward Strong Brew: +8° at light areas (L 72, toward soft taupe at 45°), up to
    +21.5° at the deep outer corner (L 43, toward rich brown at 55°). Chroma ×1.0–1.25.
  - Each pixel's shift is weighted by three things: a soft ellipse around the lid and crease; how
    mauve it is relative to skin (none at hue ≥ 50°); and a chroma floor of 5–10, so lashes and brow
    hairs stay put.
  - Result: lid Lab 70.7 / 15.9 / 15.3 (h 44°), outer corner 43.0 / 11.5 / 17.1 (h 56°). Brow bone
    and cheek unchanged (±0.5).
- Gamma 1.20 with roll-off, like the other Nikol photos on the page.
- Staged as `nikol-stg-strong-brew-3-well-eyeshadow-palette-2-banner.jpg` under the push lock; local
  copy deleted.
- **Verified on the dev storefront:**
  - desktop 550×376: brow and eye inside the crop
  - tablet 355×354
  - phone 360×360
  - Fresh Beauty still shows the placeholder
- KAN-222 updated with step 7 (banner) and the placeholder warning; estimate now ~1h.

## Banner redone: tulle portrait instead of the eye close-up (Randell: "Use a different real photo")

- Asked what to change, and Randell chose a different real photo over fixing the eye recolour or matching the
  generated series. The closed-eye close-up above is retired.
- **New image: July 2024 #0862** (`Nikol_Beauty_July_20240862 (FULL HIGH RES).jpg`, 8192×5464). It's a
  soft beauty portrait: eyes to camera, sheer white tulle at her shoulders, white background.
  - Not used anywhere else on this page.
  - The Just Peachy banner uses a different frame from the same tulle sitting.
- **Square crop:** 5464×5464 from x 0, the full height, resized to 2000×2000. That's the right-most
  position the frame allows for her face.
  - Dead end: shifting the crop x+380 to centre her moved her face further left, so it was reverted.
  - Desktop (550×376) keeps eyes to chin and trims the top of her hair. Phone and tablet show the full square.
- **No pixel edits** beyond the crop and gamma 1.20 with roll-off; the white background stays 255.
  - Her eye makeup was not recoloured. The image doesn't show the product, and the alt text doesn't claim she's
    wearing Strong Brew.
- **New file:** `nikol-strong-brew-banner-portrait.jpg` (MediaImage 46011589525606), set as
  `banner_image`. Staged as `nikol-stg-strong-brew-3-well-eyeshadow-palette-3-banner.jpg`; local copy
  deleted.
- **Verified on the dev storefront:**
  - desktop 550×376, tablet 355×354, phone 360×360
  - Fresh Beauty still shows the placeholder
- **Left behind:** `nikol-strong-brew-banner.jpg` (46011574419558, the eye close-up) is now unreferenced in
  dev Files and can be deleted.
- KAN-222 updated: it now uses the portrait file, and its notes say not to copy the eye close-up to live.

## Banner redone again: eyeshadow close-up from a different real photo (Randell: "use another and focus on the eye shadow")

- The tulle portrait is retired. Randell wants the banner to show the eyeshadow.
- **Candidates checked:** every real photo where her lids are visible and that isn't used on the page.
  - **#1135 rejected:** the lid is a shimmery champagne (Strong Brew is fully matte), and red lips sit in any
    square that holds both eyes.
  - **#1207 chosen:** both eyes closed, matte rosy-taupe shadow, no hands or tools.
- **Final: July 2024 #1207**, her left eye and brow, square 1180 px at full resolution (x 2559, y 2585)
  → 2000×2000.
  - The earring is kept out of the bottom corner.
  - Same single closed-eye framing as the Sweet Carol and The Cabana banners, but a real photo, not generated.
- **Shadow measured before any edit:**
  - lid Lab 52.1 / 19.5 / 17.1 (hue 41°)
  - crease 64.0 / 18.8 / 18.5 (44.5°)
  - outer corner 50.1 / 16.6 / 16.4 (44.6°)
  - already within ~4° of soft taupe (44.8°)
- **Only a light hue nudge**, lightness untouched: +3° at L 68, +5° at L 52, +8° at L 42, chroma ×1.0–1.05.
  Weighted by a soft ellipse, by mauve-ness relative to skin (≥ 49° untouched), and by a chroma floor
  for lashes and brow hairs.
  - After: lid 52.2 / 18.3 / 18.3 (h 45°), crease 63.8 / 18.2 / 19.4, outer corner 49.9 / 16.0 / 17.4.
    Brow bone and cheek unchanged.
  - No gamma; the frame wasn't over-bright.
- **New file:** `nikol-strong-brew-banner-eye.jpg` (MediaImage 46011600765030), set as `banner_image`.
  Staged as `…-4-banner.jpg`; local copy deleted.
- **Verified on the dev storefront:**
  - desktop 550×376: brow, lid and lashes inside the crop
  - tablet 355×354, phone 360×360
  - Fresh Beauty still shows the placeholder
- **Left behind, unreferenced, in dev Files:**
  - `nikol-strong-brew-banner.jpg` (46011574419558)
  - `nikol-strong-brew-banner-portrait.jpg` (46011589525606)
- KAN-222 updated to the eye file. It lists both retired files as not to copy.

## Banner redone a fourth time: Nikol holding the palette (Randell picked 2025 #2078)

- Randell asked for "a different image entirely" and chose 2025 #2078 from four options:
  - Nikol applying, July #0673
  - **Nikol holding the palette, 2025 #2078 (chosen)**
  - a generated product still life
  - generated swatches on skin
- This is from the same sitting as the skin-safe photo (#2054) but a tighter, eyes-open frame. I
  flagged the resemblance when offering it.
- **Square crop:** full height, 5323×5323 from x 1896 → 2000×2000.
  - Face, both hands and the whole open palette fit.
  - Desktop (550×376) keeps the face and the full palette.
- **Brush removal:** she holds the same non-product fluffy brush as in #2054. Same method as the
  skin-safe photo:
  - a 4:5 crop of the hand region (1600×2000 at full resolution) sent to Higgsfield `nano_banana_pro`
    2k (job reports `nano_banana_2`)
  - aligned on the hand and ring: sx 1.1612, sy 1.1591, dy −5.2, mean |Δ| 4.0
  - pasted back through two capsules (bristles, ferrule) plus one 9 px speck capsule at the knuckle,
    with white-lift 215–240 / chroma ≤ 12 on the background
  - Dead end: the first capsule axes were ~100 px off because I read the brush angle from the
    proxy grid. The ferrule stayed until I re-aimed them with an overlay on the actual crop.
- **Pans recoloured in Lab** to the measured targets.
  - Order: recolour → patch → gamma 1.20 → recolour again, so the gamma doesn't pull the pans off
    target.
  - Result: pans #EBDBD2 / #C19282 / #6D4833, exact.
  - Dead end: the middle mirror reflection grew across the divider into the first one, which turned
    the cream reflection soft-taupe (L 90 → 69). Fixed by bounding each mirror region at x 1428/1436.
    Mirror after: L 86 (cream) and L 60 (soft taupe), in pan order.
- **New file:** `nikol-strong-brew-banner-holding.jpg` (MediaImage 46011632746598), set as
  `banner_image`. Staged as `…-5-banner.jpg`; local copy deleted.
- **Verified on the dev storefront:**
  - desktop 550×376, tablet 355×354, phone 360×360
  - Fresh Beauty still shows the placeholder
- **Retired banner files now unreferenced in dev Files:**
  - `nikol-strong-brew-banner.jpg`
  - `…-banner-portrait.jpg`
  - `…-banner-eye.jpg` (46011600765030)
- KAN-222 updated with the holding file; it lists all three retired files as not to copy.

## Flagged, not actioned

- Orphan `strong-brew-3-well-eyeshadow-palette-switched-3` can be deleted in the admin (the API can't).
- The switched-rows section renders each row's **title** as the image alt, not the file's alt text.
  That's a theme behaviour and affects every coming-soon page.
