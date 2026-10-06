# 2026-10-05: Eye Brightener: skin-safe image, "Why Mature Women Switched", banner (DEV)

Product `fbs-eye-brightener` (gid 8112847356006) on `nikolbeauty-dev-mab1srre`. Page `coming_soon_page`
275069599846. No theme files changed. Builds on `2026-09-30-eye-brightener.md`.

## Starting point
- **Skin-safe image:** gallery photo `EyeBrightener02whitebackground.png`, a repeat of the product
  gallery on the same page.
- **Row 2:** `nikol-eye-brightener-pen-and-swatch.png`, which is gallery 01 resized, so a second
  gallery repeat.
- **Row 3:** removed on 30 Sep for lack of distinct images.
- **Row 1 and banner:** real photographs.
- **Real frames of Nikol with this product:** only `Q1-20251484` (banner) and `Q1-20251497`
  (step 2), both already on the page. The 2025 frames 1601-1715 in the zips are the Beauty Stix
  color correctors and a brow product, not the brightener.
- **Formula colour:** measured from gallery 01's swatch at L 81 / C 23.4 / h 50.5 (the window reads
  L 70 / C 19 / h 44). That is a soft peach-pink; the listing calls it a "pink base tone".

## Skin-safe → generated still life, real lettering (46011693989990)
- Higgsfield nano_banana_pro (job reported nano_banana_2), 2k, with gallery 03 + 01 as references.
  Pen upright in the centre with its cap and fresh chamomile; chamomile flower water is a named
  active. Centred on purpose: the slot crops to 0.74 on desktop and 0.40 on tablet.
- The generated pen had the black stripe and a near-correct NIKOL, but "EYE BRIGHTENER" was bold
  sans; the real print is thin serif.
- `relabel.cjs`:
  - Erases the generated lettering per column: pixels above the column median plus 35 are replaced
    with that median, so the pen's own chrome stays.
  - Prints the real lettering as white alpha extracted from `Eye Brightener 03 white background.png`
    (each pixel's rise above its column median).
  - Long vertical stripe-edge lines are suppressed.
- Dead end: a flat paste of the real label section looked like a sticker, because the generated
  chrome is far darker than the product shot's.
- Window formula h 46 / C 20.5, within the real range; no colour change needed.

## Row 2 "One Universal Shade" → generated swatch on a hand (46011694022758)
- First round (2 variants) drew the pen at 45° without the black stripe, which made relabelling
  unreliable. Regenerated with the pen lying vertical.
- Chosen: `h0`, a stroke on the back of a mature hand fading sheer at one end, with the pen and cap
  vertical beside it.
- `swatchfix.cjs`: hue rotated +6.7° (h 43.8 → 50.2, real 50.5; L and C already matched). About 3.4k
  dark-red edge-speck pixels were replaced with the median of clean neighbours.
- **Label kept as generated.** Side by side with the product photo it is the same design: white
  serif NIKOL on a black stripe, thin serif EYE BRIGHTENER. The letters are about 30% taller than
  the real proportion. Both relabel and flat paste made it worse because the tall glyphs extend past
  a true-scale paste. Flagged on the review page.
- Copy rewritten: dropped "works on fair, olive and deep skin alike", which the image doesn't show.
  Lightweight, oil-free and "no heavy, cakey coverage" come from the listing and FAQ.
- Old file `nikol-eye-brightener-pen-and-swatch.png` (45963374264422) is unreferenced, left in
  Files.

## Row 3 "Blend With a Gentle Tap" → real photo, product swapped (46011694055526)
- `Nikol_Beauty_July_20240504.jpg`: eyes closed, smiling, tapping beside her eye with a fingertip.
  Her other hand held an unrelated pink compact.
- Higgsfield edit of the hands crop only (2864² at 2600,3800 → 2048²): compact → uncapped Eye
  Brightener pen. Of the 2 variants, `e5` re-posed the hand and added rings, so it was rejected;
  `e4` was used.
- Aligned by NCC (s 0.99875, offset 0,2). Copied back only where the edit differs from the original
  by more than 16, inside a hand/product polygon (grown 4, feathered 3). The polygon was widened
  once to catch the compact hinge and a white edge on the wrist. Face, hair and skin are original
  pixels.
- The generated NIKOL was about 3.5× too long. It was erased and the real lettering printed at
  true scale (0.378), bottom on the seam, rotated −18.6° to the pen's tilt.
  - Dead ends: the +18.6° sign was wrong, and a 595px erase box ran onto the window.
- Crop (0,550,5464) gives headroom above the hair. Gamma 1.2 with a highlight shoulder; corner 255.
- Reused this product's orphan `cs_content_item` `fbs-eye-brightener-switched-3` (305511366758)
  instead of creating a new one. `switched_rows` is back to 3.
- Copy: application from the FAQ; fragrance-free, chamomile flower water and sodium hyaluronate
  from the listing.

## Row 3 redone → "Dot It Where Shadows Sit" (46011720040550)
Randell: "the product placement looks weird", and gave a free hand on poses. In the 0504 version the
pen sat in front of the lower hand's fingers rather than being gripped.
- Tried two routes in one batch (2 variants each):
  - A: a new real frame, `Nikol_Beauty_July_20240637.jpg`. Nikol is mid-application with a
    pink-handled fluffy brush on her cheek under the eye, small dots of product beside it.
  - B: 0504 re-edited with a pencil grip.
- Results:
  - B's best (`b3`) still floated the pen between the fingers.
  - A `a1` drew the tip cone black; the real cone is silver.
  - A `a0` was used: the pen comes in on the brush's diagonal from the lower left, with its fine
    brush tip on the same spot.
- Composited with s 0.99719, offset (4, 3.5). Copied back only inside a 400px band along the
  pen/old-brush line (diff > 12, grown 6, feathered 6). Face, eyes and skin outside the band are
  original. Skin where the fluffy brush head was is necessarily from the edit.
- The dots and streak were beige concealer (L 80 / C 18 / h 60). Recoloured in Lab to the real
  formula (h 50.5, C 23.4), with a hue gate ramping 54→58 so skin (h 52) is left alone. Added a
  `hgate` option to `repan.cjs` for this.
- Crop (0,2550,3900): eyes to lips. The compact is out of frame; a fingertip of the other hand stays
  near her lip, as in the original. No exposure change needed (mean L 68).
- The pen lettering mostly runs off the frame edge. The visible part matches the real white serif
  NIKOL, so it was not relabelled.
- Copy retitled to match the image: "Dot It Where Shadows Sit". Brush tip under the eyes and at
  the inner corners, tap in, and "a little goes a long way" come from the FAQ.
- The first version's file `nikol-eye-brightener-nikol-tapping-with-pen.jpg` (46011694055526) is
  now unreferenced. Left in Files.
- KAN-227 updated (file 3, row 3 title/text, warning not to use the superseded file). Review page
  updated to v2.

## Kept
- **Row 1** before/after: real, and Randell chose the captioned version on 30 Sep.
- **Banner** (frame 1484, real Nikol applying the real pen): replacing it would mean going from
  real to generated.

## Applied and verified
- `get-shop-info` checked before writes: dev store.
- `stagedUploadsCreate` + `fileCreate` (exact q0.92 bytes, no theme staging). All 3 files are READY
  at 2000x2000.
- Rows 305511333990 and 305511366758 plus the page entry updated, 0 userErrors.
- Dev storefront: the new images and row titles render; the old pen-and-swatch is gone. Gallery 02
  still appears only in the product gallery.

## Note
On 30 Sep Randell asked for supplied images only, no generation and minimal editing on this page.
Today's brief allows generation, so two images are generated (skin-safe, row 2) and one is a real
photo with the product swapped. Called out on the review page for him to confirm.

## Pointers
- Review page: https://claude.ai/artifact/1ierMeUeCsyGDTQqTiiDp1
- Live Sync: KAN-227 under KAN-119.
- Working files: scratchpad `eb/` (configs rl0/rl4/r3.json), tools in `rtr/`
  (relabel.cjs, swatchfix.cjs, repan.cjs, align.cjs, final.cjs).
