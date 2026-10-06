# 2026-10-05 — WaterProof Eyeliner banner: pencil tops no longer cut off (dev store)

- Page `coming_soon_page` / `nikol-cosmetics-waterproof-eyeliner`, banner "Stop Dragging Hard Pencils Across Delicate Lids".
- Cause: the banner image (`nikol-waterproof-eyeliner-banner-pool-bouquet.jpg`, 2000², set earlier today by another
  session) is square, but this page's banner slot renders 550×444 with `object-fit: cover` on desktop, so ~190 px was
  cropped off the top and bottom, including the pencil tips.
- Fix: Higgsfield `outpaint_image` extended the pool water to 5:4. New file
  **nikol-waterproof-eyeliner-banner-pool-wide.jpg** 2500×2000 (MediaImage/46011798552678), set as `banner_image` on
  this page only. The original pool-bouquet file is untouched.
- Verified on the dev storefront at 1440: all five pencil tips visible. Phone (360 square) and tablet crop only the
  sides, where there's only water.
- Live: KAN-234.

## Follow-up — three images redone to look natural (Randell's request)
Feedback: the pool background looked obviously AI-made. Brief: natural, not over the top, show the real
product and Nikol, any pose allowed. Sources: Dropbox `Nikol Beauty Team Folder/Product Assests/Eyeliners`
(real branded pencils: coloured barrels, light-blue caps, silver NIKOL BEAUTY) plus the page's real
green-blouse photos of Nikol as identity references. All generated in Higgsfield, 2 variants each.
**Nikol's face is regenerated in the skin-safe and banner images** (memory rule: flag face redraws).
- Skin-safe → `nikol-waterproof-eyeliner-skinsafe-vanity.jpg` (MediaImage/46012522332262): at a window
  vanity lining her eye with the Deep Green pencil.
- Step 3 "Define the Outer Corner" → `…-step-3-outer-corner-v2.jpg` (/46012522365030): close-up with the
  branded Deep Green pencil at the outer corner, entering from the opposite side to step 2's image.
- Banner → `nikol-waterproof-eyeliner-banner-terrace.jpg` 2500×2000 (/46012522397798): on a sunny stone
  terrace holding the five real pencils, tips clear of the desktop crop. Replaces the widened pool banner.
- Not used: Dropbox `1 - Eyeliner-04` (real eye close-up), because step 2 already uses that shot.
- Verified on the dev storefront at 1440. KAN-234 rewritten for the new files.
- Still on the page: step 1 is the poolside flat-lay (the same pool water Randell flagged as AI-looking).

## Follow-up 2: skin-safe image made to look more like Nikol, ring matched (Randell's request)
- Same vanity concept, but built by editing the **real** photo (`nikol-waterproof-eyeliner-step-3-outer-corner-original.jpg`,
  green blouse, applying the Deep Green pencil) instead of generating a new person. Higgsfield only replaced the
  background with the window vanity and extended the frame. Ring reference: the real eternity band from 2025 shoot
  `Q1-20251658` (a single row of large round diamonds).
- 3 variants; B kept her pose and face closest to the original. It had added a second eternity band to her resting
  hand, so a second Higgsfield edit removed it. Final: one band, on the hand holding the pencil, as in the real photos.
- New file `nikol-waterproof-eyeliner-skinsafe-vanity-v2.jpg` (MediaImage/46012566044774) set as `skinsafe_image`.
  The first vanity image (…-skinsafe-vanity.jpg) stays in Files, unused. KAN-234: use the v2 file for live.
- Face: still passed through Higgsfield (an edit, not a new face), so check the likeness.

## Follow-up 3: banner ring matched to her real ring (Randell's request)
- Higgsfield edit of the terrace banner with the real ring crop (2025 `Q1-20251658`) as reference. Only the ring
  changed: a plain solitaire-style band became her diamond eternity band. Face, scene and pencils unchanged.
- New file `nikol-waterproof-eyeliner-banner-terrace-v2.jpg` 2500×2000 (MediaImage/46012672442470) set as
  `banner_image`. KAN-234 comment added.
- Face likeness on this banner is still the generated one. Six attempts to swap in her real face failed: editing kept
  the old face, and generating from her photos produced a different woman. The recommended fix is Higgsfield Soul
  character training (awaiting Randell's decision).
