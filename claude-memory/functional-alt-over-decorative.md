---
name: functional-alt-over-decorative
description: "User wants meaningful (functional) image alt text, not empty/decorative alt used just to silence warnings"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 15e3fcfa-ad1a-4bb7-ace1-053b106211f5
---

Prefer **functional `alt` over decorative `alt`**: when an image conveys meaning, give it real, descriptive alt text — don't just set `alt=""` to make a warning go away.

**Why:** The user corrected me (2026-07-07). I had "fixed" an image by setting `alt=""` (decorative). Their point was specifically about the **alt attribute**: make it meaningful/functional, not empty. (They also explicitly pushed back when I broadened this into a general "functional a11y" principle — keep it scoped to alt.)

**How to apply:**
- Image carries information → meaningful alt (e.g. the image's own `.alt`, falling back to a relevant title). Watch for the `alt="{{ settings.image }}"` bug that outputs the image object instead of `image.alt`.
- Reserve `alt=""` only for genuinely decorative images, or an icon inside a control that is already named (e.g. a `<button aria-label>`).
- Don't over-generalize this to unrelated a11y work — it's about alt text.
