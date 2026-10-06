---
name: product-color-fix-use-gpt-image
description: "For exact product-colour corrections in Higgsfield, use gpt_image_2_5 with a real-product crop + hex values; nano_banana_pro drifts lighter/pinker"
metadata:
  node_type: memory
  type: feedback
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-10-06T17:55:48.172Z
---

When a generated image's product colours (eyeshadow pans, lipstick shade) must match the real product, edit with **gpt_image_2_5**, not nano_banana_pro.

**Why:** 2026-10-06 Le Bottled Blonde row 3. Four nano_banana_pro recolours kept repainting the pans in the scene's bright, cool light, so they came out lighter and pink or pastel (real #C5AB9F, generated #EAC0BD). One even returned unchanged. Randell: "why is it so far off… include the color and texture". A single gpt_image_2_5 edit matched the colours and the grain, and the face, ring and hand held.

**How to apply:**
- Crop the real pans or product from the Shopify product photo with flux_2_pro_outpaint, using negative expands (crop only), and pass the crop as the ground-truth reference.
- Name the hex values, say "medium-depth, do not lighten despite the bright scene", and describe the real texture (for example, foiled glitter grain).
- Never write "satin/low sparkle" into a product prompt unless the real product is satin.
- Check the result by sampling colours against the crop.
- Part of [[coming-soon-image-playbook]]; see [[image-generation-in-higgsfield]].

**Exception: never use gpt_image_2_5 on images where Nikol's face shows.** It redraws the whole image. On 2026-10-06, after two
GPT edits on a Naughty Nancy portrait, Randell said "this image does not look like her". For face images, retouch the real
photo with nano_banana_pro, pass ONLY her photo (plus the product element) as references (a second face reference made it mirror
the photo), and say "same composition, not mirrored". Prefer easy poses (three-quarter, gazing away).
