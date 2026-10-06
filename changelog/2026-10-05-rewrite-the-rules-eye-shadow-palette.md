# 2026-10-05: Rewrite The Rules: skin-safe image and "Why Mature Women Switched" (DEV)

Product `rewrite-the-rules-eye-shadow-palette` (gid 8112848044134) on `nikolbeauty-dev-mab1srre`.
Page `coming_soon_page` 275071631462. No theme files changed.

## Source photos
Randell supplied three shoot zips (`Downloads/2024 July Nikol Photo Shoot.zip`, `2024 Nikol Photo
Shoot.zip`, `2025 Nikol Photo Shoot.zip`, 114 frames). The July 2024 shoot has the only real frames
of Nikol with the 3-well silver compact and its double-ended sponge applicator. Those beat anything
generated, so three of the four slots are real photographs.

## Real pan colours (measured, not trusted from the names)
Median Lab over the three pans of `ReWRITEOPEN.jpg`:
- Beige: L 88.9, C 8.1, h 59°
- Soft Gray: L 62.5, C 12.7, h 49°
- Deep Smoke: L 34.1, C 7.6, h 44°

"Soft Gray" photographs as a warm taupe, not a grey. Copy uses the real names and does not claim a
colour temperature beyond the listing's own words.

## Skin-safe image: `Nikol_Beauty_July_20240692.jpg` → MediaImage 46011460649062
- Nikol holds the open compact under her chin, with the real NIKOL lid and two applicators in the
  tray. That palette's pans were shimmery bronzes (L 24-31, C 18-20).
- Recoloured per pan in Lab inside traced pan outlines: hue rotated, chroma scaled to the target,
  and lightness mapped to the target at 0.35-0.5 of the source texture so the sparkle reads matte.
  Target L is about 0.9 × the studio value, because the pans sit in the lid's shade.
- First pass left two faults: speckle, from dark sparkle pixels gated out, and an unpainted strip
  at the foot of each pan, because the outlines were short. Both were fixed by re-tracing the
  outlines on a 50px grid and dropping the low gate to 3-8.
- Square crop (0,1950,5464) from mid-forehead to the pans. A square can't hold both her whole head
  and the palette from a 2:3 frame.
- Gamma 1.2 with a highlight shoulder. Near-white pixels dropped from 8.8% to 0.1%.
- Replaces `nikol-rewrite-the-rules-skinsafe.png` (45953107853414), which is left in Files. On
  2026-10-02 this palette was held back from the generated skin-safe set; it now has a real photo
  instead.

## Row 1 "Beige, Soft Gray and Deep Smoke": generated still life → 46011460681830
- Higgsfield `generate_image`, nano_banana_pro requested, 2k, 1:1, 2 variants, with
  `ReWRITEOPEN.jpg` and `ReWRITEcrumble.jpg` as references. The job reported `nano_banana_2` as
  the model.
- Variant A kept the pan order light to deep, left to right. Variant B put the deep pan top-left.
- The model drew the middle pan mauve (h 26°, C 7.3). It was recoloured in Lab to Soft Gray, along
  with its mirror reflection and the deep pan. The crumbled swatches already measured 64.8/C 13.4/
  h 45 and 35.1/C 9.4/h 41 and were left as generated.
- No lid text was generated, so there was no logo to correct.
- Replaces the shared `nikol-eyeshadow-switched-blend.png` (45953067810918) on this page only. That
  file was not touched. The Cabana's row 1 still references it (verified via API and storefront).
- Copy was "Flat Matte, No Shine at All". It now names the three shades and the brow/lid/corner
  order from this page's own steps section.

## Row 2 "Two Applicators in the Case": `Nikol_Beauty_July_20240682.jpg` → 46011460714598
- The kit's own applicator (chrome handle, N monogram, black sponge) at her lid. Square crop only
  (300,150,4600); no pixel edits and no grade.
- Copy was "Cool Tones, Light to Deep", which said "Two exclusive brushes". The tray holds two
  double-ended sponge applicators (visible in the product photo and in 692), so the copy now says
  that.
- Replaces `nikol-rewrite-the-rules-palette-in-hand.png` (45953107820646), which is left in Files.

## Row 3 "Matte Comfort for Mature Lids" (NEW): `Nikol-Beauty-Q1-20252065.jpg` → 46011460747366
- Eyes closed, laughing, palette held beside her face. Not used on any other palette page; Le
  Bottled Blonde used 2054, the eyes-open frame.
- Pans and their mirror reflection recoloured in Lab. This shoot is high-key (source pans
  L 93/84/58), so target L = 100 - (100 - studio L) × 0.75.
- The pan rims carried a copper tint from the original peach palette. Chroma ×0.3 there, with the
  pans and bright chrome excluded.
- She held a generic white "Blending Brush":
  - The square crop starts at x=1210, which drops the brush head without touching anything.
  - The pink handle printed "Blending Brush" ran between her palm and jaw. Three local fixes failed:
    a texture copy from an offset (missed the strip, because it is wider than read off the grid), a
    colour-selected copy (cleared the text but left the handle's rounded end), and a diffusion fill
    and flat shadow fill (both left a visible cap outline).
  - Final fix: a 1000x800 crop of the hand/jaw only was edited in Higgsfield (nano_banana_pro,
    "remove the handle, change nothing else"). The edit was aligned to the original by NCC
    (s 0.4304, offset 5,0, r 0.94). Only pixels inside the handle outline that differ from the
    original by more than 16 were copied back, grown 4px and feathered 3px. Eyes, mouth, skin and
    hair are original pixels.
- Gamma 1.2 with a highlight shoulder. Background corners stay at 255.
- New `cs_content_item` 617097887846. Its handle is `rewrite-the-rules-eye-shadow-palette-switched-3-1`
  because an older unreferenced `-switched-3` (305519100006, "Made for Your Eye Color",
  last updated 2026-09-23) already exists. That one was left alone.
- All copy facts come from the listing and FAQ: one of two fully matte palettes, shea butter,
  comfortable on mature or drier lids, vegan, talc-free, made in Italy.

## Applied
- `get-shop-info` checked before each write batch: nikolbeauty-dev-mab1srre.
- Exact bytes uploaded via `stagedUploadsCreate` + `fileCreate`. All 4 files are READY at
  2000x2000 JPEG q0.92, with alt text.
- Rows 305519034470 and 305519067238 updated; row 617097887846 created. `skinsafe_image` and
  `switched_rows` (3 entries) set on the page. 0 userErrors.
- Verified on the dev storefront: all 4 new images and 3 new titles render, and the old images and
  titles are gone.
- Theme staging copies `nikol-stg-rewrite-the-rules-eye-shadow-palette-{ss1,r1a,r2a,r3a}.jpg` (4) are
  on dev theme 149231566950, unreferenced. They join the `nikol-stg-` cleanup. Local copies deleted.
- Note: the files CDN serves an optimised copy (about 60% of the bytes) whichever upload route is
  used. That is delivery compression; the source files are intact.

## Banner "Eyeshadow That Flatters Instead of Settling": eyes-only close-up → 46011631861862
- Before: `banner_image` was the shared `nikol-image-coming-soon-placeholder.png` (31441077633126),
  used by about 20 pages. Repointed this page only; Serum Foundation still references the placeholder.
- Sweet Carol, The Cabana and Strong Brew all use closed-eye lid close-ups, and the headline is
  about how shadow sits on a mature lid. No shoot frame shows these shades on her lids, so this one
  was generated, eyes-only per the face rules.
  - Higgsfield, nano_banana_pro requested (reported nano_banana_2), 2k, 1:1, 2 variants.
  - References: this page's real step 4 image and `ReWRITEOPEN.jpg`.
  - Variant A showed the nose tip and ear, so it was rejected. Variant B is framed brow to cheek
    only.
  - Considered and not used: the real 2025 frame 2078 (Nikol holding the palette). It would need
    another brush removal and repeats the "holding the palette" motif already used twice on this
    page.
- Measured against the pans, the worn shadow was about 9° warm: lid h 40 / C 17, outer corner
  h 35 / C 12.
  - `worn.cjs` rotated the hue +9° and scaled chroma ×0.75, weighted by how far below bare-skin L 70
    each pixel sits (span 25), inside a feathered lid polygon that excludes the brow.
  - Result: lid h 43, outer corner h 44 / C 9, against Soft Gray h 49 and Deep Smoke h 44 / C 7.6.
    Lightness and texture are unchanged.
- 2000x2000 JPEG q0.92, no grade (mean L 66.5). Uploaded straight via `stagedUploadsCreate`, with no
  theme staging copy. READY. The banner heading and text were left unchanged because they already
  describe the image.
- Verified on the dev storefront: the banner image renders and the placeholder is gone from this
  page.
- KAN-220 updated with step 7 and the second shared-file warning; estimate raised to 1h.

## Pointers
- Review page: https://claude.ai/artifact/XVZLaVqkTt9nY8CJygs5do
- Live Sync: KAN-220 under KAN-119, with the shared-file warning.
- Working files: session scratchpad `rtr/` (repan.cjs, align.cjs, final.cjs, configs ss.json /
  still.json / r3.json).
