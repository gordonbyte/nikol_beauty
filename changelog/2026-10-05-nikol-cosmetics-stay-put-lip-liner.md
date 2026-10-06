# 2026-10-05: Crystal Clear Invisible Water-Proof Lip Liner (`nikol-cosmetics-stay-put-lip-liner`)

Coming-soon page on the **dev** store, template `product.coming-soon`.

Sections redone:
- skin-safe photo
- all 3 "Why Mature Women Switched" rows
- "The Liner You Never See…" banner

No theme files changed. Live replication: **KAN-231** (under KAN-119).

## Starting state

- **Skin-safe:** the product's own gallery photo `Crystal_Clr_LIP_liner_open.png`. Repointed only; the file is untouched.
- **Rows 1–3 and banner:** the shared placeholder. Repointed; the placeholder is untouched (Fresh Beauty verified).
- **Steps:** still placeholders. Not in scope.

## The product, from its own photos

- Wooden pencil with a glossy white barrel.
- Silver serif "NIKOL BEAUTY" print, plus "Crystal Clear / Cristal".
- Pale natural-wood cone, near-white lead, silver end and silver cap.
- Measured on `Crystal_Clr_LIP_liner_open.png` (Lab):

| Part | L | a | b |
|---|---|---|---|
| Barrel, lit side | 97.6 | 0 | 0 |
| Barrel, shaded side | 85.3 | 0 | 0 |
| Wood cone | 90.2 | 3.7 | 9.6 |
| Lead | 88.5 | 0 | 0 |

## Photos

**No shoot photo shows the Crystal Clear pencil.** The 2025 lip session (#1941–#2034) has Nikol holding a *pink* tinted liner, a gloss and lipsticks. In two of those frames the pink pencil was repainted to the Crystal Clear pencil in Lab.

**Skin-safe → 2025 #1958** (1100×1280)
- Nikol smiling, hands at her face, lipstick in one hand, pencil and gloss in the other.
- Pencil recoloured using polygon + chroma masks:
  - barrel → white, shading kept
  - cone → wood colour
  - lead → near-white
  - lower segment behind the gloss → white
- Its grey end already reads as the product's silver end.

**Row 1 → 2025 #1957**, lips close-up with the pencil and gloss beside her chin. The pencil is strongly out of focus, so the hard polygon edges left pink rims and a cut-out look.
- **Dead end:** a Higgsfield pencil swap (pencil-region crop + product reference). It moved the pencil *in front of* her fingers, in sharp focus, so it was rejected.
- **Final:** new `whiten.cjs`:
  - weights come from a 3–4 px blurred a/b map, so the edits follow the photo's own blur
  - chroma is removed by a hue gate (hue < 28–30°, so skin at ~42° is untouched)
  - lightness is lifted in proportion to pinkness, with a tanh roll-off above L 90
  - the small lower segment by the chin is lifted less (+18) to sit with the shaded grey end cap
- Lips, skin, fingers and gloss are original pixels.

**Row 2 → 2025 #2034**, Nikol applying a rosy nude lipstick with a compact mirror. Crop only.

**Row 3 → product alone, generated in Higgsfield** (nano_banana_pro 2k, reported nano_banana_2) from the product photo.
- The pencil lies on a stone tray with its silver cap and a nude lipstick swatch.
- The lettering was compared 1:1 with the real pencil: "NIKOL BEAUTY" plus "Crystal Clear / Cristal". It matches, so no paste was needed.
- The barrel is neutral white.

**Banner → 2025 #2101**, Nikol with crisp red lips, chin on her hand holding a red lipstick. Square crop centred on the face; desktop keeps eyes to hand. Crop only.

All Nikol photos: gamma 1.20 with roll-off; white backgrounds stay 255.

## Copy (rows)

| Row | Was | Now |
|---|---|---|
| 1 | Stops Feathering Invisibly | Trace Where Color Tends to Bleed |
| 2 | Zero Color Matching | Clear Under Every Shade |
| 3 | Layers With Tinted Liners | Light, Creamy and Waterproof |

- **Sources:** the listing (transparent, universal, anti-feathering, lightweight smooth creamy, vegan), the product name (waterproof) and quick facts (made in the USA, 1.20 g).
- The intro line already says "works with every lipstick", so row 2 talks about colour staying true instead.

## Shopify (dev)

- **Files (all READY):**

| File | Size | MediaImage |
|---|---|---|
| `nikol-crystal-clear-liner-skinsafe.jpg` | 1100×1280 | 46011757035622 |
| `…-switched-lips.jpg` | 2000² | 46011757068390 |
| `…-switched-lipstick.jpg` | 2000² | 46011757101158 |
| `…-switched-product.jpg` | 2000² | 46011757133926 |
| `nikol-crystal-clear-liner-banner.jpg` | 2000² | 46011757166694 |

- Staged as `nikol-stg-nikol-cosmetics-stay-put-lip-liner-1-*.jpg` under the push lock; local copies deleted.
- `cs_content_item` 305528275046 / …340582 / …373350 updated in place (this product's own records).
- `coming_soon_page` 275080314982: `skinsafe_image` and `banner_image` repointed.

## Verified on the dev storefront

- Skin-safe 667×898.
- Rows 578×578 ×3, alternating.
- Banner: desktop 550×444, tablet 355×401, phone 360×360.
- Fresh Beauty still shows the placeholder.

## Flagged, not actioned

- **Row 1's lower pencil segment** (by her chin, behind the gloss) is the softest edit. Check it at full size.
- **The 3 step images are still placeholders.**
