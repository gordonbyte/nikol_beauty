# 2026-09-30 — WaterProof Eyeliner Pencils coming-soon page (dev store)

Product: `/products/nikol-cosmetics-waterproof-eyeliner` · page metaobject `coming_soon_page` `nikol-cosmetics-waterproof-eyeliner` (gid 275071369318). Dev store `nikolbeauty-dev-mab1srre` only. No theme code changed.

## Filled (all were on the placeholder `MediaImage/31441077633126`)
- **Steps 1–3** (`custom-steps-horizontal`, product.json, active): new 2000×2000 images; bodies rewritten so they no longer repeat the switched rows; step 3 retitled "Smudge or Sharpen the Look" → "Smudge or Define" (it was 5 words and the body said "sharpen" again).
  - 1 `nikol-waterproof-eyeliner-step-1-five-shades.png` ← `Eyeliner - FINAL 18.jpg`, crop x305 y0 1200², group spans x490–1320.
  - 2 `nikol-waterproof-eyeliner-step-2-lash-line.png` ← `1 - Eyeliner-04.png` top photo panel, crop x1250 y386 1673². The photo area was measured at x749–3750, top panel y386–2058, divider y2059–2065; cropping inside the panel removes the beige frame and the burned-in "Color: Deep Green" bar.
  - 3 `nikol-waterproof-eyeliner-step-3-rounded-tips.png` ← `Eyeliner - FINAL 9.jpg`, crop x300 y0 1200², pencils span x452–1348.
  - Steps 1 and 3 sources are only 1200px tall, so they are upscaled 1.67× (Chromium high-quality resample). They look clean at the ~390px display size.
- **Switched rows 1–3** (`custom-alternating-rows`, active): all square 2000×2000 so the rows match. Bodies expanded from about 10 words to 30–37. Row 1 retitled "No Tugging on Delicate Lids" → "Made for Mature Eyes" because the old title nearly repeated the banner heading.
  - 1 `nikol-waterproof-eyeliner-row-1-mature-eye.png` ← `1 - Eyeliner-04.png` bottom panel, crop x1400 y2066 1673². It is the same model and eye as step 2 (pencil absent). This was accepted because the folder has no other square-croppable on-eye shot.
  - 2 `nikol-waterproof-eyeliner-row-2-plum-swatch.png` ← `PLUM eyelinr SMDGE.png`, transparent background flattened to white, 3200² box centred on the subject bbox (1714–2968 × 500–3420). It is close to the gallery's `Plum.png`.
  - 3 `nikol-waterproof-eyeliner-row-3-color-matched-barrels.png` ← `1 - Eyeliner-02.png`, full frame. The burned-in "NEW Deep Green / tagline" (rows 740–1470) and "five gorgeous colors" caption (rows 3540–3760) were painted white over y700–1520 and y3500–3800. Scans confirmed the background is pure 255 at every band edge, so there is no seam.
- **Banner** (`custom-info-banner`, active): `nikol-waterproof-eyeliner-banner-five-shades.png` ← `Eyeliner - FINAL 15.jpg`, 1600² crop at x415, centred on the star's convergence point (1215, 803). That point is the mean of the five lead-tip points found by connected-component scan. A distance-transform "largest empty disc" search failed first: the light-blue shadows read as subject, so it ran to the window edge. Heading and body copy were unchanged.

## Skin-safe photo swapped (Randell's request, after the first pass)
- **Final:** `skinsafe_image` is now `nikol-waterproof-eyeliner-skinsafe-five-tips.png` (1100×1280, MediaImage 45963516346470), from `1 - Eyeliner-01.png` with its burned-in "Stress-free Makeup / New Ultra Creamy & Smooth Formula / WaterProof Eyeliner Pencils for Mature Eyes" text removed. `Navy.png` is only unlinked from this slot; it stays in the product gallery.
- **Dead end:** the first swap reused the row-3 barrels photo in a 1100×1280 re-crop (`nikol-waterproof-eyeliner-skinsafe-color-matched-barrels.png`, MediaImage 45963380785254). Randell rejected it because it repeats a photo already on the page while `-01` was unused. That file is now unreferenced in Files and can be deleted.
- **Text removal:** within box x2300–4420 y1750–2750, the ink mask was L<215 and chroma<40. From its connected components, only those not touching the box edge and under 450px were kept (92 letter components). The two pencil barrels entering the box were excluded automatically. The mask was dilated 5px and filled by 4-axis 1/d interpolation. The result checked clean at zoom, and pencils and shadows are untouched.
- **Crop:** x0–3866, full height, which gives 0.859. The five lead tips average (1582, 2249). The star sits at 41% across because the navy pencil bleeds off the left edge, so it can't be centred. The slot measures 667×898 on desktop (0.743, trimming 6.75% per side) and 390×450 on mobile, both cover. All tips stay well inside. Verified on both viewports.
- **Near-duplicate flag:** the banner (`FINAL 15`) is also a radial star from the same shoot, so the page now has two star compositions. The unused `Eyeliner - FINAL 4.jpg` (labelled horizontal stack) could replace the banner.

## Switched rows reordered (Randell's request)
- `switched_rows` is now: Waterproof, Long-Wearing Color → Made for Mature Eyes → Color-Matched Barrels. The previous order started with Made for Mature Eyes.
- Image side is not stored per row. In metaobject mode, `custom-alternating-rows.liquid:393` alternates by position (odd = image left, even = `--reverse`, image right), so the zig-zag stays intact after any reorder. Verified on dev: desktop image lefts are 110 / 752 / 110px, so left, right, left. On mobile all three rows stack image-first.

## Trust-block icon swapped (Randell's request)
- Skin-safe item 2 (`nikol-cosmetics-waterproof-eyeliner-skinsafe-2`, "Ophthalmologist-Tested") now uses image `nikol-badge-paraben-free-and-fragrance-free-aroma.png` (MediaImage 34187111825510). It previously used `nikol-badge-ophthalmologist-tested.png`.
- The badge file is shared by about 17 products' "Paraben-Free & Fragrance-Free" items. Only this product's item was repointed, and the file itself was not changed. `nikol-badge-ophthalmologist-tested.png` stays in Files for any other product using it.
- **Mismatch flag:** the badge ring reads "Paraben-Free", while the item title still says "Ophthalmologist-Tested". The body ("Paraben-free, fragrance-free, and non-comedogenic for sensitive eyes.") fits the new badge. Retitling was not asked for, so the title was left as is. Verified on dev at 130×130 desktop.

## Waterline Safe icon replaced with two drops (Randell's request)
- New badge `nikol-badge-waterline-safe-drops.png` (520×520, MediaImage 45964084576358) is set on `nikol-cosmetics-waterproof-eyeliner-skinsafe-3`. The old `nikol-badge-waterline-safe.png` (eye and waves) was left untouched in Files. It was used only by this item, but a new file avoids overwriting in place.
- Generated with `tools/icon-badges/`: new `waterline-safe-drops` entry added to `proposed.cjs`, stroke 5, label "Waterline Safe". This is a deterministic trace-and-render, not AI generation.
- Geometry comes from pixel fits of Randell's screenshot (403×349), not from eyeballing:
  - Connected components gave 5 parts: joined outlines, two highlight arcs, two dots.
  - Circles were found by Kasa least-squares fit. Big drop: centre (185.37, 221.08), centreline r 87.81, stroke 10px (matching the bbox on 3 sides). Small drop: (248.35, 174.71), r 39.58.
  - Tips are the outer apex + w/2 (round join): (185.5, 63) and (248.5, 105). Each lines up with its circle's centre x.
  - Each drop is built from its circle plus the two tangents from the tip (acos(r/d): 56.3° and 55.4°).
- **Dead end:** fitting each highlight arc to its own circle gave off-centre results (thick, short arcs bias the fit). Both arcs and their end dots turned out to sit on circles concentric with their drop (r 66.9 and 22.7). Angle ranges are 110.3–213.8° and 126.0–205.7°, after removing the round-cap overshoot (w/2 ÷ r). Dots are one stroke width across, matching the source.
- **Overlap:** the source has no gap. The big drop's outline stops where it meets the small drop, so it is drawn as a `BG` pink knock-out of the small drop, then the small stroke on top.
- Mapped to the 100-unit grid at 90 units per 255px of ink height, centred. Compared side by side with Cruelty-Free and Paraben-Free at 260 and 130px before upload. Verified on the dev storefront at 130 (desktop) and 100px (mobile).

## Two new model photos added (Randell added them to the folder, which moved to `Coming soon/eyes/1-waterproof-pencil`)
- **Step 3 "Smudge or Define"** is now `nikol-waterproof-eyeliner-step-3-outer-corner.png` (2000², MediaImage 45964265980006), from `St_Pats_green_final-1.jpg` (3000×1688; eyes open, pencil at the outer corner). Crop is x820 y0 1400², since the subject spans x840–2270. It is upscaled 1.43×. It replaces the FINAL 9 tips image, which is now unused.
- **Skin-safe photo** is now `nikol-waterproof-eyeliner-skinsafe-model.png` (1100×1280, MediaImage 45964266012774), from `St_Pats_green_final-2.jpg` (eyes closed, smiling, pencil on the lid). Crop is x665 y0 1450×1688, which gives 0.859. The pencil hand to concealer hand spans about x857–1922, which stays inside the desktop cover window (86.5% of the crop width is visible). It replaces the cleaned `-01` five-tips radial.
- Mapping rationale: the eyes-closed smile reads as "comfortable on mature and sensitive skin", and the outer-corner shot reads as "Define".
- Verified on dev: steps are 390² desktop and 360² mobile; the skin-safe photo is 667×898 desktop and 390×450 mobile. Face, pencil and both hands are in frame.
- Side effect: the page no longer has two radial-star photos, so the earlier banner near-duplicate flag no longer applies.
- **Now unreferenced in dev Files** (deletable): `nikol-waterproof-eyeliner-skinsafe-five-tips.png` (45963516346470) and `nikol-waterproof-eyeliner-step-3-rounded-tips.png` (45963138728038). The barrels skin-safe re-crop (45963380785254) was already unreferenced.
- Copy note: step 3's body (Soft Set brush or sharpener) describes finishing tools, while the photo shows pencil application. The copy was left unchanged because it wasn't asked for.

## Other products removed from both model photos (Higgsfield edit, Randell picked option B)
- Randell wanted the other products (two concealer tubes in her right hand) gone from the skin-safe photo and step 3.
- **Dead end:** a crop-only fix was not workable. The tube tops (y≈847 silver cap, y≈872 green tube) sit right under her chin (~845) and beside her jaw. A portrait crop that excludes them cuts the chin and pins her cheek to the desktop edge (tested: 1100×1325 from x1076 w714; rejected).
- Both sources were edited in **Higgsfield** (`gpt_image_2_5`, high, 2k, 16:9 → 2688×1520) with the prompt "remove the two tubes AND the hand holding them, blouse continues, everything else identical".
  - For `-2`, two variants were shown: A (hand kept, empty) and B (hand removed). Randell chose B.
  - For `-1`, two runs of the B prompt were made. Run 1 was used; it's near-identical to run 2, with the pencil matching the original's position.
- Post-processing (Claude-side, not generation): the same crops as before, rescaled ×0.896 to the edit's size.
  - skin-safe: x592 w1306 → 1100×1280
  - step 3: x735 w1254 → 2000²
- The edits came back with 253–254 backgrounds, so they were lifted to 255. This used gradient-tolerant region growing from the frame edge (seed min-channel ≥246, accept ≥238 with a luminance step under 2.5), with a soft ramp above 238, so hair and blouse are untouched.
- New files:
  - `nikol-waterproof-eyeliner-step-3-outer-corner-clean.png` (MediaImage 45964358320230) on step 3
  - `nikol-waterproof-eyeliner-skinsafe-model-clean.png` (45964358352998) on `skinsafe_image`
- Verified on dev at desktop (390² and 667×898) and mobile (360² and 390×450).
- Higgsfield jobs: skin-safe B 3e84ab51-9773-475b-82ef-de71ba554f10; step 3 700dcf73-1729-4498-93ef-b32a27fe8254.
- **Now unreferenced in dev Files** (deletable), in addition to the earlier three: `nikol-waterproof-eyeliner-step-3-outer-corner.png` (45964265980006) and `nikol-waterproof-eyeliner-skinsafe-model.png` (45964266012774).

## Banner and row 1 image swap (Randell's request)
- `banner_image` now uses `nikol-waterproof-eyeliner-step-3-outer-corner-clean.png` (45964358320230), the same file as step 3. This reuse was deliberate: Randell asked for it after being told the photo was already on the page. The square file displays 550×444 on desktop (cover trims about 9.6% top and bottom, keeping head, pencil and hand) and 360² on mobile.
- The "Waterproof, Long-Wearing Color" row (now position 1) uses `nikol-waterproof-eyeliner-banner-five-shades.png` (45963138859110), the FINAL 15 radial that was on the banner. It is square 2000², so the rows still match (578² each). The file keeps its "banner" name; only the slot changed.
- `nikol-waterproof-eyeliner-row-2-plum-swatch.png` (45963138793574) is now unreferenced and can be deleted.
- Verified on dev: desktop and mobile.

## Step 3 copy rewritten to match the photo (Randell's request)
- Before: "Smudge or Define" / "Blend it smoky with the Soft Set Technique Brush, or keep lines crisp with a rounded tip from the Nikol Beauty Pencil Sharpener." That described finishing tools, while the photo shows the pencil at the outer corner.
- After: **"Define the Outer Corner"** / "Build a little more color where your lashes end to lift and open up the eye."
- It follows on from step 2 (inner corner → along the lash line → outer corner). The title and body use different verbs (Define / Build). It avoids "crisp / smoked" (used in the Waterproof row) and "soft" (steps 2 and banner). The sharpener is still covered by the add-on block and two FAQs.
- Verified on dev desktop.

## Trust row 2 retitled (Randell's request)
- `nikol-cosmetics-waterproof-eyeliner-skinsafe-2`: title "Ophthalmologist-Tested" → **"Paraben-Free & Fragrance-Free"**. It now matches its Paraben-Free badge and the title the other products use for the same badge. The text was left unchanged.
- "Ophthalmologist-tested" still appears on the page in two FAQ answers.
- Flag: the body ("Paraben-free, fragrance-free, and non-comedogenic for sensitive eyes.") now repeats the title's first two claims.
- Verified on dev desktop.

## Trust rows reordered (Randell's request)
- `skinsafe_features` order is now: **Waterline Safe → Paraben-Free & Fragrance-Free → Cruelty-Free**. It was Cruelty-Free → Paraben → Waterline.
- The requests arrived in two steps: "put it [Paraben] under Waterline Safe", then "put Waterline Safe first". This order satisfies both.
- Verified on dev desktop.

## Left alone
- Skin-safe icons: parked for a later session at Randell's request.
- FAQ, section headings and intros, banner copy.

## Verified
- All 7 files READY at 2000×2000. The storefront (password page, desktop 1440 and mobile 390) serves every new file. Step images are 390² on desktop and 360² on mobile; rows are 578² and 330²; the banner is 550×444 on desktop and 360² on mobile.
- The banner now displays at about 550×444 on desktop, not the 580×376 the playbook quotes, so the playbook §4 figure is stale.

## Flags (not done)
- **Alt text is not used by the theme.** Steps render `alt=""`, while rows and the banner render the card title or heading. The file alt set on each image is ignored. This is a template change across all coming-soon products.
- Staging assets `nikol-stg-waterproof-eyeliner-1-*.png` were deleted locally, but they remain on dev theme 149231566950 because `--only` push does not delete.
- Found in passing: the Shopify CLI is only installed under nvm Node v20.20.2 (`AppData/Local/nvm/v20.20.2/shopify`), so it is not on PATH when Node 22 is active.
