# 2026-10-05: WaterProof Eyeliner Pencils, real-face restore, banner and row 2 (dev store)

Product `/products/nikol-cosmetics-waterproof-eyeliner` · page metaobject `coming_soon_page/nikol-cosmetics-waterproof-eyeliner` (`gid://shopify/Metaobject/275071369318`) · default `product.json` template, all sections active. Dev store only, no theme code touched. Follows the 09-30 build (`changelog/2026-09-30-waterproof-eyeliner.md`). Randell: "do all you think that is best with the images".

## Why
An audit against today's rules found three problems:
1. **Nikol's face had been regenerated.** The 09-30 skin-safe photo and step 3 photo came from full-image Higgsfield edits (`gpt_image_2_5`) made to remove two concealer tubes. That regenerated her whole face (brows, teeth, eye makeup visibly different from `St_Pats_green_final-*.jpg`) and garbled the pencil's "NIKOL BEAUTY" print to "NATOOL EWALLP".
2. **Banner = step 3**, the exact same file (`MediaImage/45964358320230`).
3. **Row 2 "Made for Mature Eyes" and step 2** were crops of the same eye photo (`1 - Eyeliner-04.png`, with and without the pencil).

## What changed

| Slot | New file | Source |
|---|---|---|
| Skin-safe photo | `nikol-waterproof-eyeliner-skinsafe-nikol-original.jpg` (`46011652407398`) | `St_Pats_green_final-2.jpg` restored; square x600 y0 1688² |
| Step 3 "Define the Outer Corner" | `nikol-waterproof-eyeliner-step-3-outer-corner-original.jpg` (`46011652440166`) | `St_Pats_green_final-1.jpg` restored; same crop as before, x820 y0 1400² |
| Banner "Stop Dragging Hard Pencils…" | `nikol-waterproof-eyeliner-banner-soft-rounded-tips.jpg` (`46011652472934`) | `Eyeliner - FINAL 9.jpg` (unused since 09-30), x200 1400×1200 placed under 200px of white padding |
| Row 2 "Made for Mature Eyes" | `nikol-waterproof-eyeliner-row-2-five-shades-on-eye.jpg` (`46011652505702`) | `1 - Eyeliner-03.png` (all five shades worn on the eye, labelled), whole graphic |

All four are 2000×2000 JPEG q0.92 and READY.
- **Row 2 text rewritten** to match its new image: "Every shade is shown here on a mature eye, from soft Dark Chocolate through Plum, Navy and Charcoal to Deep Green. It's a soft pencil, not a hard eye pencil, so color releases with the lightest touch and the line stays smooth on thinner skin." Title unchanged. The "not a hard eye pencil" and mature-eye claims come from the listing.
- Unchanged: banner copy, step 3 copy, rows 1 and 3, steps 1–2, icons, FAQ.

## How the real face was restored
- **Reused Randell's chosen edits** (Higgsfield jobs `3e84ab51…`, "hand removed", and `700dcf73…`), so no new generation was needed. They're used only as a source for the tube-and-hand area.
- **Registration:** the edits are 2688×1520 against 3000×1688 originals, a slightly different aspect ratio. A grid search of scale x/y and offset, run on a ÷8 luminance image, scored mean |diff| over hair, blouse and background. The face and patch box were excluded from scoring.
  - St_Pats-2: sx 1.11147, sy 1.11213, offset (2,0), residual 7.3 levels.
  - St_Pats-1: sx 1.11307, sy 1.11033, offset (0,1), residual 4.7.
- **Patch:** a box around the tubes and hand only, well below the chin:
  - St_Pats-2: x 1600–2010, y 830–frame bottom.
  - St_Pats-1: x 1720–2210, y 880–frame bottom.

  Inside the box the mask is max-channel |edit − orig| > 30, closed 6px, dilated 10px and feathered 10px, fading to 0 at the box edge except at the frame edge. Every pixel outside the box, including all of her face and the pencil, is original.
- **Dead end:** the first boxes ended at y 1600/1610, leaving a hard seam where the original's cuff of the removed arm began. Running the box to the frame bottom fixed it.
- The white background stays at 255 across both box edges (profiled), so there's no grey step.

## Banner framing
- `FINAL 9` is 1800×1200, so a square crop has to use the full height. That put the pencil tips 6% from the top, inside the desktop cover trim (7%), so they would be clipped.
- Placed it under 200px of white padding instead. Its top row measures pure 255, so the padding is seamless.
- Tips now sit at about 20% from the top. The pencils span 18–82% of the width, inside tablet's centre-78% window.

## Verified (dev storefront, 1440 / 820 / 390)
- Steps are 390² / 338² / 360²; step 3 serves the restored file.
- Skin-safe photo is 667×898 / 394×892 / 390×450.
- Rows are 578² / 315² / 330², all three loading.
- Banner is 550×444 / 355×401 / 360², with all five tips in frame.
- No broken images. No image is repeated on the page.

## Now unreferenced on dev (deletable in admin)
- `nikol-waterproof-eyeliner-skinsafe-model-clean.png` (45964358352998)
- `nikol-waterproof-eyeliner-step-3-outer-corner-clean.png` (45964358320230)
- `nikol-waterproof-eyeliner-row-1-mature-eye.png` (45963138760806)

These are in addition to the 6 files the 09-30 log already listed. Staging copies `nikol-stg-waterproof-eyeliner-2-*.jpg` were deleted locally but remain in dev theme assets.

## Flagged, not changed
- **Two pencil designs on the page:**
  - Clear/silver cap: the product gallery, the St Pats photos.
  - Light-blue cap and "Ultimate Stay Eyeliner" print: step 1, rows 1 and 3, and now the banner. `FINAL 9` is that design too, but it was already on the page on 09-30.
  - Randell isn't sure which is current. If the light-blue design is discontinued, those four images need replacing.
- **Skin-safe tablet crop:** at 820 the slot narrows to 0.44, which cuts the pencil hand from the square photo. Same theme issue as on other pages.
- **Alt text unused by the theme** (rows and banner render the title) — carried over from the 09-30 log.
- Live replication: **KAN-225** (under KAN-119). The 09-30 work is still pending live via KAN-211.

## Follow-up: generated poses for variety (Randell: "generate different poses so all the images do not look the same… keep it as real as possible")
- **Rule kept:** generated images never show Nikol's full face. New poses are a single-eye close-up, a closed-lid close-up, and a product scene. The skin-safe photo stays the real restored photo of Nikol.
- All three were generated in Higgsfield (nano_banana_pro, 2k). References: the real step 2 eye photo and the gallery's open Plum and Dark Chocolate pencils. Prompts asked for unretouched mature skin texture, no caps and no printing, so there's no garbled logo and no packaging conflict.

| Slot | New file | Notes |
|---|---|---|
| Step 3 "Define the Outer Corner" | `nikol-waterproof-eyeliner-step-3-plum-outer-corner.jpg` (`46011708407910`) | One eye in side view, Plum pencil at the outer corner. Cropped to the eye only (no nose or second eye). |
| Banner | `nikol-waterproof-eyeliner-banner-closed-lid-glide.jpg` (`46011708440678`) | Relaxed closed lid with a Dark Chocolate pencil gliding at the lash line, matching "Stop Dragging Hard Pencils Across Delicate Lids". |
| Row 3 "Color-Matched Barrels" | `nikol-waterproof-eyeliner-row-3-vanity-cup.jpg` (`46011708473446`) | The five pencils in a glass tumbler on a marble vanity. Silver end caps match the gallery design; this replaces the light-blue-cap stack. |

- **Colour checks against the real pencils (Lab medians):**
  - Plum liner on the eye came out wine-brown (L 20.3 / a 16.7 / b 4.5). It was moved toward the worn Plum seen in `Eyeliner-03` to 23.5 / 15.4 / −4.1. A first, stronger pass (27 / 22 / −6) turned magenta and was rejected.
  - Vanity Plum barrel: hue ~0° moved to the real barrel's 36.8 / 11.4 / −6.8 target. Result 32 / 11.6 / −6.7.
  - Dark Chocolate barrel in the banner: 38 / 11.7 / 13.1 against real 42.3 / 9.5 / 14.5. Close enough, left as is.
- **Dead ends:**
  - The first vanity pair: cup1 had grey textured collars and cup2 had pointed tips. Recolouring cup1's collars by mask left blotchy patches, so it was regenerated.
  - plum1 had a garbled cap ring and bright magenta liner. choc1 timed out and wasn't needed.
- Copy unchanged: step 3, banner and row 3 text already describe the new images.
- Verified at 1440 / 820 / 390: all slots load at the expected sizes, and no image repeats.
- **Now also unreferenced** (from earlier today): `…-step-3-outer-corner-original.jpg` (46011652440166), `…-banner-soft-rounded-tips.jpg` (46011652472934) and `…-row-3-color-matched-barrels.png` (45963138826342).
- The page's light-blue-cap images are now step 1 and row 1 only.

## Follow-up: step 3 reverted, row 2 changed again (Randell request)
- **Step 3 "Define the Outer Corner"** went back to the restored real photo of Nikol, `nikol-waterproof-eyeliner-step-3-outer-corner-original.jpg` (`46011652440166`). Randell didn't like the generated Plum close-up. `…-step-3-plum-outer-corner.jpg` (46011708407910) is now unused.
- **Row 2 "Made for Mature Eyes"** asked for something different from the five-shades graphic. Now `nikol-waterproof-eyeliner-row-2-navy-swatch.jpg` (`46011739078758`): the real `NAVY eyelinr SMDGE.png` cutout on white, in the current silver-end packaging. Real photography, not generated.
  - Framed from the alpha bounding box (x 1714–3132, y 499–3421) in a centred 3400 px square. Two earlier crops clipped the pencil end.
  - Navy wasn't featured elsewhere on the page.
- Checked first: 2025 shoot photos 1715 and 1760 show Nikol with the Skinny Brow Pencil, not this eyeliner, so they don't fit.
- Row 2 text: "This is a soft pencil, not a hard eye pencil, so one light stroke leaves a smooth, even line like this Navy swatch. The ultra-creamy formula was made for the thinner skin around mature eyes, so there's no need to press or tug."
- `…-row-2-five-shades-on-eye.jpg` (46011652505702) is now unused.
- Verified at 1440 / 820 / 390: both slots load and are square.

## Follow-up: sunny lifestyle images (Randell: "create images like these" from a reference grid of bright, sunlit ad photos; "add it, I want to see how it looks")
- Six concepts generated in Higgsfield (nano_banana_pro 2k) with the gallery family shot `image_1.png` as reference: blue sky, pool, hard sun, terracotta and figs. No full faces and no printed text. Review page: https://claude.ai/artifact/FooGAMVLyBkBZbiv628fjf
- Placed my three recommended picks. Rows 1 and 3 kept, as Randell asked.
  - **Step 1 "Pick From Five Shades"** → `nikol-waterproof-eyeliner-step-1-poolside-five-shades.jpg` (`46011776335974`): five pencils fanned on a sunny pool edge. Replaces the light-blue-cap line-up.
  - **Row 2 "Made for Mature Eyes"** → `nikol-waterproof-eyeliner-row-2-wrist-swatches.jpg` (`46011776368742`): five swatches on a mature wrist against the sky, with a Navy pencil in hand. New text: "It's a soft pencil, not a hard eye pencil, so every shade goes on in one light stroke, as these five swatches show. The ultra-creamy formula was made for the thinner skin around mature eyes, so there's no need to press or tug."
  - **Banner** → `nikol-waterproof-eyeliner-banner-pool-bouquet.jpg` (`46011776401510`): a hand holding all five pencils over sparkling pool water.
- Checked at zoom: hands natural, wood collars cream, silver end caps match the gallery. Minor: a faint printing ghost on the Plum barrel in the banner, not noticeable at 550px.
- Not placed: concepts 1 (sky hand), 3 (figs) and 5 (sunlit eye), held in reserve.
- Now unused: `…-step-1-five-shades.png` (45963138662502), `…-row-2-navy-swatch.jpg` (46011739078758), `…-banner-closed-lid-glide.jpg` (46011708440678).
- Verified at 1440 / 820 / 390: all three slots load at the expected sizes.
- Light-blue-cap images remaining on the page: row 1 (the radial star) only.
