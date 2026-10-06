# 2026-10-05: 1975 Shiny Velvet Cream Lipstick: skin-safe image, "Why Mature Women Switched", banner (DEV)

Product `1975-shiny-velvet-cream-lipstick` (gid 8112848699494) on `nikolbeauty-dev-mab1srre`. Page
`coming_soon_page` 275076612198. No theme files changed. Builds on the 2026-10-01 lipstick repaints.

## What was wrong
- Skin-safe was gallery `1975smudge2024.jpg`, a repeat of the product gallery.
- Row 2 (`nikol-lipstick-1975-row2.jpg`) and step 1 are the same frame, Q1-20252101 (hand under
  chin), so one photo appeared twice on the page.
- Rows 1 and 3 were consecutive frames of the same laugh (2094 eyes open, 2089 eyes closed).

## Real 1975 colour
- Worn on lips, from gallery `1975LipstickColor.jpg` (redness-gated median): L 39-47, C 41-44,
  h 34.
- Bullet: h 38 (L 45 / C 49 gated in the application shot; L 59 / C 32 in the bullet product shot).
- Repaint target used for lips: L 42 / C 42 / h 34.5.

## Skin-safe → generated still life (46011762344038)
- Higgsfield nano_banana_pro (job reported nano_banana_2), 2k, with gallery bullet + pose as
  references, 2 variants.
- `s1` used: lipstick centred and uncapped on linen, dish of shea butter, olive sprig (shea butter
  and olive oil are the named hydrators). The bullet's embossed NIKOL matches the real bullet.
- Both variants drew the square base white with black florals. The real tube in 2265 has a black
  base with light florals. `invert.cjs` inverted Lab lightness inside the base polygon
  (858-1187 × 1366-1729), with chroma ×0.2 and the black top rim excluded.
- Bullet hue nudged +4° (33.6 → 38), redness-gated.

## Row 2 → Feb 2024 `Nikol_Beauty_Feb_20242265.jpg` (46011762376806)
- Big smile, cream top, holding a chrome tube with a black floral base: the same packaging as 1975.
  Distinct from the black-turtleneck rows.
- Lips: Lab repaint 43.9/52.9/32.1 → 42/34.6/23.8, gated on normalised redness (R−(G+B)/2)/R
  ramping 0.38→0.52.
  - First pass left the original red along the top of the upper lip because the polygon started
    too low. Extended to y 728; continuous after.
- Bullet: 43.5/50.3/33.3 → 46/36.2/28.3.
- Measured after: h 34.7, C 41.8.
- Source is 1366×2048: square crop (0,0,1366), upscaled 1.46× to 2000 (canvas high-quality
  smoothing). Her red nails are kept as shot.
- Title/text unchanged.

## Row 3 → 2025 `Nikol-Beauty-Q1-20252113.jpg` (46011762409574)
- Side glance, closed-lip smile, lipstick raised.
- The 2025 frames 2113/2115/2117 hold a black-tube lipstick, which is not 1975's packaging; the old
  rows (2094/2101) show the chrome tube.
- Higgsfield edit of the hand crop only (1500² at 1300,1550): black lipstick → chrome tube with
  black floral base, warm nude bullet, same grip.
  - Of the 2 variants, `t1` drew the base white; `t0` was used.
  - Aligned r 0.94 (s 0.7324). Copied back only along a band around the lipstick (diff > 14,
    grow 5, feather 4).
- Lips: 44/51.4/19.3 → 42/34.6/23.8. The redness gate was lowered to 0.30→0.44 after the first pass
  left a pinkish rim; her skin measures n ≈ 0.27.
- Measured after: h 34.5, C 42.4.
- Crop (1300,0,4300), tightened so her face is larger.
- Text rewritten. The old "stays comfortable after hours of wear" isn't in the listing. Now: light
  and comfortable, shea butter and olive oil, and the listing's shade description.
- Rows now run black (2094) / cream (2265) / black (2113), so the two similar side-glance poses
  aren't adjacent.

## Kept
- Row 1 (2094): its colour already measures h 34 / C 43.
- Banner: Feb close-up with the chrome tube, 3:2, colour already right.

## Applied and verified
- `get-shop-info` dev check; `stagedUploadsCreate` + `fileCreate` (exact q0.92 bytes). All 3 files
  are READY at 2000².
- Rows 305523392614 and 305523425382 plus the page entry updated, 0 userErrors.
- Dev storefront: new skin-safe, row 2 and row 3 render, and the new row 3 text is present. The old
  row2/row3 files are unreferenced (left in Files). Gallery swatch still in the gallery.

## Pointers
- Review page: https://claude.ai/artifact/3mWdW9FyhGM5Rdc2C6kV2y
- Live Sync: KAN-232 under KAN-119.
- Working files: scratchpad `ls/` (r2.json, r3.json, ss.json), tools in `rtr/` (repan.cjs now has
  `rgate` and `hgate`; invert.cjs).
