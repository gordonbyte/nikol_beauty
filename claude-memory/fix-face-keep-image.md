---
name: fix-face-keep-image
description: When Randell asks to make a face "look like Nikol" in an existing image, keep the image/pose exactly and change only the face — never rebuild the shot
metadata:
  type: feedback
---

When Randell asks to "make sure the face looks like Nikol" in an image he already likes, keep that image exactly and change only the facial likeness: the same composition, crop, pose, hands, product and light. Never rebuild the shot from a different photo.

**Why:** 2026-10-07, eyeliner step 3. I rebuilt it from a different real photo. Randell: "i was hoping you keep the image and the pose the same. you change the entire things which is not what i am looking for."

**How to apply:**
- Use nano_banana_pro. Image 1 = the existing image (the base to keep). Image 2 = a real Nikol photo at a similar angle, as the likeness reference only.
- Prompt: "keep everything in image 1 EXACTLY … change ONLY the facial identity to match image 2 (thick dark brows, green-hazel eyes, softer nose, skin)".
- Show a 3-way comparison: original, fixed, and her real photo.
- See [[product-color-fix-use-gpt-image]]: never GPT on faces.
