# 2026-09-30 — Creamy Concealer coming-soon page (dev store)

Product: Creamy Concealer (`/products/custom-concealer-trio-in-buffed-cool`), page metaobject
`gid://shopify/Metaobject/275069567078`. Dev store `nikolbeauty-dev-mab1srre` only; no theme code
changed. Source photos: `Pictures/Coming soon/1-creamy-concealer` (13 images).

## Switched rows ("Why Mature Women Switched…") — filled all three placeholder slots
- Checked the page first: steps, skin-safe and gallery already use `(APPLY) 01/02/03`,
  `FINAL 11` and the group shot, so rows only draw from photos not yet on the page (Randell:
  no repeats except the banner).
- Row 1 **Covers Without Weight** ← `(APPLY) Picture with copy 04.png` (swatches on three arms),
  full frame resized 4500→2000². File `nikol-creamy-concealer-switched-1-swatches.png`
  (MediaImage 45962352558182). The Fair/Light/Med labels are Nikol's own design and are kept.
- Row 2 **Won't Crease or Cake** ← `Nikol_holding_creamy_concealer-1.jpg`, native 1000² (not
  upscaled — AI upscaling a face risks changing it; still ≥1.6× the 610px render).
  File `nikol-creamy-concealer-switched-2-smile.png` (45962352590950).
- Row 3 **Luminous, Not Flat** ← `Concealer editorial 01 white.png` (3868×3492). Pixel scan
  (lum < 235) put the tubes at x 146–3608, too tight for a 3492² crop, so padded with white to
  3868² instead, then 2000². File `nikol-creamy-concealer-switched-3-trio.png` (45962352623718).
- All three rows are square so `custom-alternating-rows` (aspect-free `height:auto`) renders
  them equal. Bodies rewritten to 30–45 words each, matched to their photo, avoiding what steps
  (shades, dots, tap/set), skin-safe (chamomile, cruelty-free) and FAQ already say. Titles and
  intro line unchanged.

## Banner ("Stop Wearing Concealer That Settles Into Every Line")
- `banner_image` ← `Creamy Concealer - FINAL 4.jpg`, native 1800×1200. File
  `nikol-creamy-concealer-banner.png` (45962352656486). Heading/text unchanged.
- Served box measured on dev: desktop 550×444 (not the ~580×376 the playbook quotes; the text
  column is taller with the rating + price rows), mobile 360×240. `cover` trims ~8.7% per side
  on desktop; face stays centred.
- Dead end: the first staging copy was the JPG; the theme CDN re-encoded it lossily
  (931 KB → 172 KB). Re-staged as PNG (`-2-`), which comes back lossless (2.33 MB, same px).
  Theme-CDN PNGs are losslessly re-optimised (byte counts drop, pixels intact).

## Process notes
- `shopify` CLI isn't on PATH under the active Node v22 (nvm); it lives in
  `AppData/Local/nvm/v20.20.2/shopify.cmd` — called directly rather than switching nvm, which
  would affect parallel sessions.
- Staged via `nikol-stg-creamy-concealer-{1,2}-*` under the push lock; local staging copies
  deleted. The staged assets (incl. the unused `-1-banner.jpg`) remain on dev theme
  149231566950 — harmless, unreferenced.
- Verified on the dev storefront at 1440 and 390 wide: 3 square cards (578² desktop, 330²
  mobile), banner renders, all images complete, no clipping.

## Follow-up — Row 1 background to white (Randell request)
- The swatch graphic carried a flat beige frame (#F7F2ED, exactly 247,242,237) in two bands,
  rows 0–165 and 1834–1999 of the 2000² file; the backdrop inside the photo was already #FFF.
- Edge-seeded flood fill (±3 per channel) turned only frame-connected beige to white (664,022 px,
  = 2000 × 166 × 2), plus 2,072 blended seam px near those rows; 0 beige px remain. Skin, labels
  and swatches untouched.
- Staged as `nikol-stg-creamy-concealer-3-switched-swatches-white.png`, `fileUpdate` in place on
  MediaImage 45962352558182 (same gid, filename unchanged). Served copy sampled: corners and bands
  read 255,255,255. Storefront re-checked at 1440 — image now blends into the white card.
