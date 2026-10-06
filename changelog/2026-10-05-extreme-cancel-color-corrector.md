# 2026-10-05 — Simply Apricot (/products/extreme-cancel-color-corrector): skin-safe photo, switched rows, banner (dev store)

Product title "Simply Apricot" (renamed from Extreme Cancel), page metaobject `coming_soon_page` /
`extreme-cancel-color-corrector` (gid 275069763686). Dev store only. All three sections are active on
`templates/product.coming-soon.json`; no theme code changed. Live replication: **KAN-226** (under KAN-119).

## What changed

| Slot | Before | After |
|---|---|---|
| `skinsafe_image` | product gallery photo 2 (`simply_apricot_product_image_2..png`), so it repeated the gallery | **nikol-simply-apricot-skinsafe.jpg** 1100×1280 (MediaImage/46011685830758) |
| switched-1 (305513332838) | placeholder; 15-word text | **nikol-simply-apricot-switched-eye.jpg** (/46011685863526), "Apricot Cancels Blue and Purple" |
| switched-2 (305513365606) | placeholder | **nikol-simply-apricot-switched-texture.jpg** (/46011685896294), "Creamy, Not Crumbly" |
| switched-3 (305513398374) | placeholder | **nikol-simply-apricot-switched-portrait.jpg** (/46011685929062), "Less Concealer Needed" |
| `banner_image` | shared placeholder | **nikol-simply-apricot-banner.jpg** (/46011685961830) |

Row titles were kept and the texts rewritten to two sentences, using listing and FAQ facts only:
colour theory for blue/purple, a step deeper than Just Peachy, reformulated with Shea Butter, glides,
buildable, twist-up, "Follow with Nikol Beauty concealer for a smooth, bright finish". The banner
heading and text are unchanged.

**Steps are NOT done:** all three step images are still the shared placeholder (not in this brief).

## Measured product colours (product shots, per-area median, Lab)
- Bullet (stick tip) `#ab5b3b`: L 47.6 a 29.4 b 32
- Swatch on white `#f99a8b`: L 73 a 34.4 b 22.6 (thin edge `#f5b0a2`)
- Label ink/band `#cc7344`: L 58.1 a 29 b 37.2
- The old **Extreme Cancel** stick in the 2025 photo is a different product colour: tip and dab are a
  vivid coral `#fd624d` (L 62 C 72), and its label ink is red-orange.

## Images
- **Skin-safe: real photo** `2025/Nikol-Beauty-Q1-20251658.jpg`, the only shoot photo with this
  product (the Just Peachy session reached the same conclusion). Crop x 3400 / y 0 / 4579×5331 → 1100×1280.
  It shows the old *Extreme Cancel* stick, so the product was corrected with maths only (no generation):
  - **Label:** cleared the old ink to the stick's own body shading, then stamped the real Simply Apricot label from
    the product shot as Lab offsets (NIKOL / BEAUTY / SIMPLY APRICOT / COLOR CORRECTOR, down to the
    rule). Below the rule, the old label's own "CORRECTEUR ÉCLAT INTENSE" and band, identical on both
    labels, were kept and only recoloured red-orange → `#cc7344`. That avoids reworking the pixels around
    the thumbnail.
  - **Geometry:** measured, not eyeballed. Stick axis −50.9°, half-width 30.8 px at final scale (cross-scans);
    across scale 0.497× the product shot. The along-axis scale came out **0.609**, not the 0.556 first assumed.
    It was found by matching the rule line: old −96 vs new −86 on the first pass, which doubled the French lines.
  - **Tip and the coral dab under her eye:** treated as product over skin. α = share of coral along the
    skin→coral vector, new = pixel + α·(target − coral); tip → bullet colour, dab → swatch colour. Her skin,
    features and the rest of the face are untouched. Dead ends: a plain Lab shift turned the skin-dab pixels
    grey-green; and gamma before the relabel inflated the dab mask from 5.7k to 15.4k pixels. So the
    gamma 1.20 + roll-off was applied last, to the finished image.
- **Row 1: generated**, tight eye-area close-up (eyes only), with identity reference a real eye crop of
  `July_20240830`. Variant A chosen: cleaner, no generated hand, and the likeness is closer than B (which had a fingertip).
  Its dabs came out peach-yellow (h 58°); recoloured to a slightly muted Simply Apricot (L 74 a 28 b 22).
  Pure `#f99a8b` read neon in this light. Explicit gate centre on the dab colour, because wide boxes let
  skin dominate the median.
- **Row 2: generated product-only macro** of the bullet and a creamy swipe, label out of frame. A first
  attempt at a full-stick still life was dropped: its generated label was 60% too long for the real
  proportions, and transplanting the real label onto a white stick on white stone left a visible patch.
  Bullet set to L 50 (real 47.6) and swipe to L 71 a 33 b 24, toward the real swatch.
- **Row 3: real, unedited** `July_20240830`, square from y 150. Direct gaze, bright even under-eyes.
- **Banner: real, unedited** `2025/Nikol-Beauty-Q1-20252186`, 3300 px square from x 2470 / y 0.
  A different look from the tulle row. This page's banner renders 550×431 on desktop.
- Higgsfield again reported the model as `nano_banana_2` for `nano_banana_pro` requests.

## Verified
- Dev storefront at 1440 and 390: the new skin-safe photo; three square rows alternating sides with the new
  titles and text; the banner shows the new portrait. Old images are gone from these slots.
- Shared files not touched: the placeholder (31441077633126) and the gallery photo (27305984950374)
  were only un-pointed from this page's fields.

## Flags
- The label's NIKOL wordmark is the real artwork, but at ~60 px across the stick it reads a little soft.
- The skin-safe photo still shows the shoot's white corrector stripes on her forehead, nose and chin.
  They're real and original.
- The step images are still placeholders.
