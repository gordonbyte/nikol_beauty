# 2026-10-05 — Rose Lip Balm #100 coming-soon page (dev)

- All 8 images rebuilt from Nikol's REAL shoot photos (July 2024 + Q1 2025 shoots; poses deliberately
  different from Actually, I Can — white studio, playful/hands-at-face poses instead of lavender studio,
  sofa, vanity). Higgsfield retouches with explicit keep-list (face/bone structure, hair, rings); product
  ref = Rose Lip Balm product image (chrome tube, pink bullet); lips shown translucent/clear sheen per FAQ.
  One version each (Randell). References imported via staged dev-theme assets (nikol-ref-rose-*).
- Replaced in place (alt updated, READY):
  - Skin-safe 46011779547238 (July 0423: hand at cheek, balm near lips)
  - Row 1 "Hydrates Without Stickiness" 46011756806246 (Q1 1685: balm at jaw, glancing aside)
  - Row 2 "No Color, All Tones" 46011779580006 (Q1 1958: pink bullet up, clear lips)
  - Row 3 "Lipstick Goes On Better" 46011779612774 (Q1 2034: rose-nude lipstick in compact mirror)
  - Banner 46011756904550 (July 0796: wink + laugh holding balm)
- Steps were on the SHARED placeholder (31441077633126, untouched) → new files + step items repointed:
  - Step 1 "Smooth On Bare Lips" 46012743516262 (July 0794) → item 305528766566
  - Step 2 "Use It as a Primer" 46012743549030 (Q1 1957: balm + lipstick) → item 305528799334
  - Step 3 "Pair With Rose All Day" 46012743581798 (Q1 1952: liner + balm) → item 305528832102
- Jobs: ca2611b7, 011beb38, d771b15f, 479ac483, ab90c229, e75f9632, 2ac66e5a (retry of failed 173aecde), cd381df5.
- Live Sync: KAN-230 comment.
- Randell: "the images do not all have to have her in it" → two slots switched to product-only shots
  (Higgsfield, balm product image as ref), replaced in place, alt updated, READY:
  - Skin-safe 46011779547238: balm on travertine with rosehips, sunflower, rose petals, oil dish
    (job a35e52d0, tip reshaped from a slanted lipstick tip to the balm's rounded bullet: 16ded8eb).
  - Row 2 "No Color, All Tones" 46011779580006: pink bullet beside a clear, glossy swatch (job 69923352).
  The other 6 images keep Nikol. KAN-230 comment.
- Steps section redone (Randell, one section at a time). Used the trained Higgsfield Soul "Nikol"
  (soul_2, soul_id 27940312-ad48-4d06-af9f-dabdcfd4c3d7) for a candid at-home morning series in one
  cream cable knit: kitchen table + coffee (step 1), hallway mirror (step 2), sunny balcony (step 3).
  Soul 2 takes only one image and treats it as the whole composition (a balm ref gave 3 bullet
  close-ups), so the Soul ran text-only and the real balm / Rose All Day pencil were swapped in with a
  nano_banana_pro edit. Jobs: soul a7bd790e / f31a66cc / f95b192d → swap a45e5fb1 / 0657dcb6 / 3de3674e.
  Replaced the step files in place (46012743516262 / 46012743549030 / 46012743581798), alt updated, READY.
- Tried Randell's lifestyle prompt (35mm film, natural daylight, real locations; 9 shots, Nikol via the
  Higgsfield "Nikol" element in place of the template's placeholder woman; review artifact 9dfLypC5uhoBNYe7LvwJYk).
  He picked 3, placed in place (alt updated, READY):
  - Skin-safe 46011779547238 ← marble bathroom counter hero (job 35709e24)
  - Row 1 "Hydrates Without Stickiness" 46011756806246 ← lips close-up, balm gliding on (job 1e18f9d9;
    a tip-reshape attempt 52f6a5bc came out flatter, so the original was kept)
  - Banner 46011756904550 ← café table, lips/chin/hand with iced coffee (job d197b314)
- Steps redone again in Randell's 35mm lifestyle style (nano_banana_pro + Nikol element + balm/liner refs),
  one sunlit morning series in a white robe, close partial-face crops: bedroom window side profile (step 1),
  marble vanity with balm on the counter (step 2), kitchen counter with liner + balm (step 3).
  Steps 1-2 had loose hair → hair-only edits to slick it back into a low bun (84a6fed6, 173aebce); the
  step 1 edit widened the frame to her full face, so it was cropped back to nose-down (crop only).
  Jobs 0e786f88 / 8a8e39b0 / 93dc95a8. Replaced the step files in place, alt updated, READY. KAN-230 comment.
- Step 1 "Smooth On Bare Lips" adjusted (Randell: hand too big, show less chest). Higgsfield edit (job
  066eac2e): smaller, proportionate hand; robe wrapped higher; tight side-profile crop. Replaced
  46012743516262 in place (alt unchanged), READY. KAN-230 comment.
- Step 1 again (Randell: crop the chest out, smaller hand). A hand-only edit (e4ba9460) barely changed
  it; a recompose (7ee9ff95) shrank the hand but dropped the robe (bare shoulders) and showed her eye;
  final edit c1f2be9e: robe collar wrapped high around the neck (no chest), slimmer hand at the same
  scale as step 2, diamond band visible. Replaced 46012743516262 in place, READY. KAN-230 comment.
- Step 1: Randell liked the high-collar version, asked for a slightly smaller hand → hand-only edit
  (job 1d4e4fd1, ~15% slimmer/shorter, same pose). Replaced 46012743516262 in place, READY.
- Step 2 "Use It as a Primer": only one lipstick (Randell) → removed the bullet standing on the counter
  (job ef0bdfe0), kept the one she is applying. Replaced 46012743549030 in place, alt updated, READY.
- Step 3 "Pair With Rose All Day": completely new image (Randell) → product still life, Rose All Day
  pencil + uncapped balm on sunlit marble with a liner swatch layered with balm, roses (job 73d32f8d).
  Replaced 46012743581798 in place, alt updated, READY. KAN-230 comment.
- Row 2 "No Color, All Tones" changed (Randell). Lifestyle prompt: hands in a sunny car, pink bullet +
  clear glossy sheen on the back of her hand (job 79b606ec; lip/swatch fix 9b3f3726). Her lips kept coming
  out coral, which contradicts "no color", so they were cropped out (crop only). Replaced 46011779580006
  in place, alt updated, READY. KAN-230 comment.
- Row 2: Randell didn't like the car/hands image → swapped to the overhead bed-linen hero from the prompt
  test (job 97698cc5): uncapped balm + clear glossy swatch. Replaced 46011779580006 in place, alt updated,
  READY. KAN-230 comment.
- 2026-10-06: Skin-safe feature "Vegan & Fragrance-Free" (`rose-lip-balm-skinsafe-3`, item 305528930406). The old badge said only
  "Fragrance-Free". At Randell's request it now matches the two-leaf "Vegan & …" badges used on other pages. Higgsfield edited the
  Vegan & Talc-Free badge text (job d583cb7f) and removed the background (b13364db). Claude resized it to a 520² PNG.
  New file `nikol-badge-vegan-and-fragrance-free-leaves.png` (MediaImage/46020102520934, READY) is set on this item only;
  the old badge 34187113005158 is unchanged. KAN-230 comment.
