# 2026-10-05 — The Cabana 3-Well Eyeshadow Palette: skin-safe photo and switched rows (dev store)

Product `/products/the-cabana-eyeshadow-palette`, page metaobject `coming_soon_page` /
`the-cabana-eyeshadow-palette` (gid 275071696998). Dev store `nikolbeauty-dev-mab1srre` only.
Both sections are active on `templates/product.coming-soon.json` (custom-product-coming-soon);
no theme code changed. Live replication: **KAN-223** (under KAN-119, label `live-sync`).
Review page: https://claude.ai/artifact/EpNAhcyMwyR6SKwxxcE8at

## What changed

| Slot | Before | After |
|---|---|---|
| `skinsafe_image` | nikol-the-cabana-skinsafe.png (1527×1909, wrong ratio) | **nikol-the-cabana-skinsafe-v2.jpg** 1100×1280, MediaImage/46011478540390 |
| switched-1 (305519329382) | shared nikol-eyeshadow-switched-blend.png, "The One You Reach For" | **nikol-the-cabana-switched-still-life.jpg** 2000², /46011478573158, "Three Neutrals, One Finish" |
| switched-2 (305519362150) | nikol-the-cabana-palette-in-hand.png, "Three Neutrals That Cover Everything" | **nikol-the-cabana-switched-mirror.jpg** 2000², /46011478605926, "A Mirror in the Lid" |
| switched-3 (305519394918) | existed but unlisted: placeholder image, "Made for Your Eye Color" | **nikol-the-cabana-switched-applicator.jpg** 2000², /46011478638694, "Applicators Designed by Nikol" |
| `switched_rows` | 2 rows | 3 rows: switched-1, -2, -3 |

Row order was chosen for variety: the skin-safe photo directly above already shows Nikol holding the
palette, so row 1 is the product alone, row 2 Nikol with the open mirror, row 3 Nikol applying.

## Measured target shades
Median per pan from the main product shot (TheCabanaForWeb.png), Lab D65:
- crisp champagne #e2cdbf — L 83.8 a 5.1 b 9.5
- iced pink #d6bbaf — L 77.9 a 7.4 b 9.5
- toffee bronze #9a7c6f — L 54.4 a 9.7 b 11.2

Crumble shot swatches measure pinker and deeper (iced pink L 70.5 a 15.2), used only for the loose
swatches in the still life. First measurement used wrong rectangles (read off a 2× grid); re-measured.

## Images, one by one
- **Skin-safe — real photo** `2024 July/Nikol_Beauty_July_20240692.jpg`. It shows The Cabana's real
  compact: rose line-art lid, NIKOL wordmark, both N applicators in the tray. Pans were a dark brown
  palette (source L ~24–32): repainted in Lab to the targets, shimmer grain transferred as high-pass L
  from the product shot's pans (texture gain 0.65). Out: L 83.3 / 77.9 / 52.7 (toffee reads 1.7 low
  because of the lid shadow across it). The photo is 0.667 and the slot is 0.859, and cropping would have
  cut her hair or the palette, so the sides were extended with Higgsfield `outpaint_image`; the
  original sits on top untouched (it came back rescaled 0.916, located by template match, offset 364,126).
  Pad tone was gain-matched to a 16px overlap band, 22px feather; a warm horizon band in the left pad was
  flattened by flood fill from clean background. On desktop the slot renders 0.743, so about 30px of
  each 104px pad is visible.
- **Row 1 — generated still life** (Higgsfield nano_banana_pro 2k requested; the job reports
  `nano_banana_2`). References: product shot + crumble shot. The lid's NIKOL wordmark came out blank:
  transferred the real one from the frontal product shot (light-letter alpha against a local 30th-
  percentile background, ×1.46). The applicator "N" monograms were compared stroke for stroke with the
  real ones (twin diagonals, top and bottom serifs) and kept, since they match and the 800px source
  would have been softer. Pans re-coloured to target after an edge scan (the first rectangles were read
  off a preview and missed 20px of each pan, leaving stripes). Swatches weighted by chroma distance from
  the stone (a full-ΔE weight grabbed shadows).
- **Row 2 — real photo** `2025/Nikol-Beauty-Q1-20252078.jpg`, square crop x1900. She held a generic
  white powder brush (not this product's tool): removed by a Higgsfield edit, aligned (offset 0,0),
  copied back only inside a feathered diff mask confined to x<345 at 2000px; face untouched. Exposure
  lowered first (gamma 1.20 + highlight roll-off above 0.85, white stays 255: skin L 85.5 → 83.1), then
  pans + mirror reflections repainted (mirror pans take the real pans' ratios). A 10px chroma-only ring
  removes the old peach reflected on the bevels.
- **Row 3 — real photo** `2024 July/Nikol_Beauty_July_20240673.jpg`, square crop from the top, no
  edits. The tool is the palette's own silver N sponge applicator.

## Copy
All claims are from the listing (shade names, pearlized satin, two exclusive applicators designed by
Nikol Beauty) or visible in the product photos (mirror, dual-ended sponge/brush, silver case). Wording
avoids the steps (lid / brow bone / outer corner / blend) and the skin-safe icons.

## Upload route
Staged as `nikol-stg-the-cabana-eyeshadow-palette-{skinsafe-v2,row-still,row-mirror,row-applicator}.jpg`,
one push each from inside shopify-dev under the push lock; all deleted after. The theme CDN re-encodes
JPEGs (served about 62% of local bytes, same dimensions), so the size check confirms the right file, not
an identical byte count. `fileCreate` ×4 in one call, all READY at the expected sizes.

## Verified
- Dev storefront at 1440 and 390: new skin-safe image (old one gone); three square rows (578px on
  desktop) alternating sides, titles as above; the old blend and in-hand images no longer on the page.
- Shared `nikol-eyeshadow-switched-blend.png` (MediaImage/45953067810918) not edited: still READY,
  updatedAt 2026-09-30. On dev, **no other product shows it any more**: the six other palettes' row 1
  now point at their own files (set by other sessions), so the "another product still shows it" check
  had nothing left to confirm.
- Note: the theme renders row images with the row **title** as alt text, not the file's alt.

## Follow-up — banner "Eyeshadow That Flatters Instead of Settling" (Randell request)
- `banner_image` was the shared `nikol-image-coming-soon-placeholder.png` (31441077633126, used by
  every unfinished page), so a NEW file was created, **nikol-the-cabana-banner.jpg** 2000×2000
  (MediaImage/46011561017446), and set on The Cabana only. Heading and text unchanged. Fresh Beauty
  checked on the storefront: still shows the placeholder.
- Slot measured on the storefront: desktop 550×376, tablet 457×379, phone 360×360, all `cover` at
  centre. So a square file loses about 16% top and bottom on desktop; the eye and brow sit in the
  middle band.
- **Generated, by Randell's choice** (asked: every unused real photo was a near-twin of one already
  on the page, with 2065 ≈ row 2 and 0682/0653 ≈ row 3). It's a tight three-quarter close-up of one closed
  eye, matching the Sweet Carol banner made today so the palette banners read as a series. Identity
  reference: real closed-eye crop of 2065; colour references: the product and crumble shots. Two
  variants; B chosen (A's skin and brow drifted further from Nikol). Model reported `nano_banana_2`.
- The generated shadow came out plum: lid h 35°, outer corner L 39.5 h 32°, against Cabana's
  ~49–52°. Warmed only the mauve-tinted makeup zone inside a soft ellipse (hue-weighted, lashes/brow
  hairs and neutrals excluded). The first pass overshot to khaki and drew a hard line along the lashes;
  the second pass (target hue 44°, chroma 0.95, weaker dark lift, L floor 34) reads pink-beige on the lid
  with a warm toffee crease. Measured after: lid L 75.4 a 11.7 b 11.2; crease L 43.1 a 12.7 b 11.8; cheek
  skin unchanged.
- Verified on the dev storefront at all three widths.

## Leftovers / flags
- **Orphan to delete in admin:** `cs_content_item` `the-cabana-eyeshadow-palette-switched-3-1`
  (617099559014). I created it before finding the unused `-switched-3`, then used that one instead.
  Nothing references it; the API can't delete metaobjects.
- Old files no longer used by this page: nikol-the-cabana-skinsafe.png (45953107787878),
  nikol-the-cabana-palette-in-hand.png (45953107755110). Not deleted.
- Not done: no KAN-211 comment (this session's brief asked for a KAN-119 task instead).
