# 2026-10-05 — Sweet Carol: skin-safe image + "Why Mature Women Switched" rows (dev)

- Source photos: Randell's three shoot zips (Downloads: 2024 July, 2024 Feb, 2025 Q1; 114 images)
  extracted to the scratchpad and reviewed on contact sheets. The July 2024 shoot has the only real
  shots with the eyeshadow palette and the kit applicator (0653, 0673, 0682, 0692) — all four used
  or considered; the Feb 2024 and 2025 shoots have no Sweet Carol-relevant shots.
- Sweet Carol pans measured from the product shot (Lab): powder pink 87/4.6/2.2, smoked grape
  58/9.3/7.1, plum brown 36/10.3/6.6.
- `skinsafe_image` -> `nikol-sweet-carol-skinsafe-v2.jpg` (46011428798566): July 0692, Nikol
  holding the open palette below her chin. The palette in the photo is a warm bronze trio, so all
  three pans were recoloured in Lab (pans2.cjs: brightness/chroma gates keep skin, dividers and the
  silver case out; slanted divider lines assign each pixel to its pan; texture kept by shifting
  relative to each pan's median). Square crop from y=2050.
- Row 1 "Matte, With One Touch of Light" -> `nikol-sweet-carol-switched-lid.jpg`: July 0682,
  extreme close-up of the kit applicator on her brow bone. Untouched photo. Text unchanged.
- Row 2 "One Case, Day and Evening" -> `nikol-sweet-carol-switched-swatches.jpg`: generated still
  life (nano_banana_pro, product + crumble + applicator refs) on blush marble. Text unchanged.
- Row 3 NEW "The Applicators Come in the Case" (617095463014) -> `nikol-sweet-carol-switched-applying.jpg`:
  July 0673, wider crop (shoulders, raised hand, applicator at the eye); its palette at the bottom
  edge was recoloured too, but falls outside the square. 0653 rejected — framed almost the same as
  0692 and would read as a repeat on the page.
- New files only (row-1 shared file untouched; Cabana verified). All READY 2000x2000.
- Live Sync: KAN-219.

## Banner — "Eyeshadow That Flatters Instead of Settling"

- `banner_image` was the shared `nikol-image-coming-soon-placeholder.png` (31441077633126, used by
  every palette page) — so a NEW file was created: `nikol-sweet-carol-banner.jpg`
  (46011487486054), set on Sweet Carol only. Fresh Beauty verified still on the placeholder.
- Section renders the image 1:1 (custom-info-banner.liquid, aspect-ratio 1/1, object-fit cover).
- The three real July 2024 palette shots were already used on the page and 0653 duplicates 0692's
  framing, so this one is generated (nano_banana_pro, real row-1 photo as identity ref + product
  shot as colour ref): tight three-quarter close-up of one closed eye in the Sweet Carol shades,
  matte sitting smooth over the lid's fine lines. Chosen over a two-eye front-on variant — less
  face shown, so less likeness drift. Heading/text unchanged. KAN-219 comment added.
