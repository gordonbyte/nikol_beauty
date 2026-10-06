# 2026-10-05 — No Redness: skin-safe, "Why Mature Women Switched" rows, banner (dev)

- Page `no-redness-beauty-stix` (275069730918). All three rows and the banner were on the shared
  `nikol-image-coming-soon-placeholder.png`; the skin-safe image duplicated step 2's photo. All five
  replaced with NEW files; titles/text untouched.
- Shoots reviewed: only 2025 Q1 1685 shows the real No Redness stick (1601 fans three different
  correctors; 1658/1670 hold Just Peachy, and recolouring would leave "JUST PEACHY" printed on the
  tube — rejected). 1685 -> skin-safe (`nikol-no-redness-skinsafe-v2.jpg`, 46011630190694).
- Generated (nano_banana_pro; product shots + the real after-photo as skin/identity reference):
  - row 1 "Green Cancels Red" -> cheek close-up, fingertip blending mint over redness beside the
    nose (46011630223462). The model put her eyes in frame despite the prompt; cropped below the
    eyes (1408px source -> 2000).
  - row 2 "Creamy, Not Crumbly" -> creamy swatch blended on the back of a hand (46011630256230).
  - row 3 "Less Concealer Needed" -> uncapped stick on blush stone with a mint swatch (46011630288998).
  - banner -> jaw/neck crop, even skin, capped stick held beside it, no eyes (46011630321766).
  - Label text checked on both product shots (NIKOL BEAUTY / NO REDNESS / COLOR CORRECTOR, 3.2g).
- Live Sync: KAN-224.

## Product colour matched to the real photos

- Randell: generated images made the product colour look too strong. Measured (Lab, cream/tip
  pixels only): real swatch L86 / hue 125 / C13.6, real stick tip in photo 1685 L95 / hue 126 / C17.
  Generated creams hue 140-150 (bluer mint), tips C20-21.
- `mint.cjs`: green-hue pixels with L > ~76 (label ink excluded — it already matches the real
  label) rotated to hue 126; chroma scaled so ~21 -> ~17, soft creams (<=12) unchanged; tips +3 L.
  After: swatches hue 126-127 / C11-13, tips C16.7. Visual check against 1685 — now the same
  soft sage-mint.
- 4 files replaced in place (v=1791216905). KAN-224 comment added.

## Thinner smears + new "Less Concealer Needed"

- Randell kept everything except row 3, and asked for thinner smears in rows 1 and 2.
- Rows 1 and 2: Higgsfield edit on the colour-matched images ("change only the swatch, ~half the
  width, sheer"), real product swatch as reference. Everything else held. Re-ran `mint.cjs`:
  greens at hue 126-127, C 12.6 / 15.8 (real swatch 128 / 14.2).
- Row 3: new generated still life on off-white stone — capped stick + a thin mint stroke with a
  sheer beige concealer veil over half, illustrating "a thin layer of concealer does the rest".
  Label checked. Colour-matched.
- 3 files replaced in place (v=1791217258/9), alt text updated. KAN-224 comment.
