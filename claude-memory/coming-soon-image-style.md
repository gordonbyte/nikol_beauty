---
name: coming-soon-image-style
description: "Visual direction for coming-soon page images — vibrant sunlit UGC-ad look, product held close; backgrounds need not be solid"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 29431fca-a418-4175-aad6-4aa41f632e1b
  modified: 2026-10-05T19:41:27.113Z
---

Coming-soon page images should follow a vibrant, sunlit UGC-ad style (Randell's reference 2026-10-05: Claude-branded skincare ad grid). Hard direct sunlight, saturated color, product held up close in hand or beside the face, skin with real texture.

Backgrounds do NOT need to be solid color blocks — real settings are welcome: pool water, beach/sea, blue sky, car interior, outdoor scenes, softly blurred environments, as well as colour-block sets.

**Why:** Randell rejected the soft white-studio still life with fruit props and wants the energy of the reference ads; on 2026-10-05 he clarified "the image backgrounds do not necessarily need to be solid."

Not every image needs Nikol in it (Randell, 2026-10-05): product-only shots, close-ups of lips/eyes/hands, and swatches are fine. Generated full faces drift from her real likeness, so use Nikol where a real photo (or a minimal edit of one) works, and product/detail shots elsewhere.

**How to apply:** When prompting Higgsfield, vary settings across a page (one sky, one pool, one colour block, etc.) so rows don't repeat; keep no fruit/props unless asked. Related: [[image-generation-in-higgsfield]], [[no-photo-reuse-on-page]].
- 2026-10-05 (Randell, Rose Lip Balm): "the images do not all have to have her in it". Mix in product-only shots, such as an ingredient still life or a bullet with a swatch, so not every slot is Nikol. Each page should also use different shoots and poses from the last page.
- Check the product's real shape against its Shopify product image before placing. A generated balm came out with a slanted lipstick tip, but the real balm has a tapered rounded bullet with "NIKOL" embossed on it.
- 2026-10-05: Randell's lifestyle prompt template, saved at `scratchpad/rose/testpage.cjs` context. Style block: "Shot on a 35mm film camera in bright natural daylight, real everyday location, warm sunlit tones with soft natural shadows, true-to-life skin texture with visible pores and a dewy glow, candid lifestyle editorial feel, shallow depth of field, slight film grain. Not a studio shot, no solid or seamless backdrop, no CGI or 3D render look, no distorted text, no extra fingers."
  - It has 3 shot types: product hero alone in a real setting, Nikol with the product (close crop of part of her face), and product in use.
  - The template says "woman with deep brown skin". Replace that with Nikol: element `<<<4125bdbb-8f35-4000-bc42-68273bd95315>>>`.
  - Adapt jar or skincare actions to the product type.
  - He liked: the marble bathroom counter hero, the lips close-up, and the café table with lips, chin and an iced coffee.
