---
name: image-generation-in-higgsfield
description: "Randell directive 2026-09-25 — all image generation goes directly through the Higgsfield MCP, not Claude-side canvas/Playwright composites"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-10-05T17:10:00.133Z
---

Any image that needs generating or creating (product-shot variants, step images, macro renders, icons/glyphs, mock-ups) is made **directly in Higgsfield** via the Higgsfield MCP (`generate_image` / `generate_image_batch`, `gpt_image_2_5`, references uploaded with `media_upload` → PUT → `media_confirm`). Do not build imagery in Claude with Playwright/canvas composites first.

**Why:** Randell, 2026-09-25: "any image generation we need to do can we do it directly with Higgsfield and not in Claude please." Earlier that week the step-1 mascara image went through several Claude-composited iterations before Higgsfield was tried; he wants Higgsfield first.

Reaffirmed 2026-09-30 (at the start of a coming-soon page session): "do not use image credit/token from claude because we have that direct resource to use." Don't spend Claude tokens on creating images; Higgsfield is the image resource. This applies to coming-soon playbook work too.

Restated 2026-10-05: "i am trying to use as least claude code as possible to save on tokens. but i still do not want to reduce the quality of the results." Claude-side token cost is mostly image *viewing* (contact sheets, zoom grids, before/after checks), retry loops, and long write-ups. Keep views small and few, and don't skip the checks that catch real defects.

**How to apply:**
- Brief Higgsfield with exact references (crop the reference to only what should appear — a full-wand reference reproduced the swipe when only the brush head was wanted) and explicit exclusions ("no text, no swipe, no tube").
- **2026-10-05 (Randell, time crunch, quality must not drop):** generate ONE version per slot — no option pairs to choose from. Put the effort into the brief instead (real Dropbox photo as reference, explicit keep-list); self-check once, regenerate only if it has a real defect, then place it.
- Claude-side processing is still fine for *post-processing* of a Higgsfield result (white-point lift, keying to alpha, stroke dilation, fitting into the badge frame) and for measurement/verification — that is not generation.
- 2026-10-05: Randell asked to use as little Claude Code as possible to save tokens, without lowering quality. Biggest Claude-side costs are viewing full-size images, three-width verification screenshots, script retries, and long logs and review pages. Keep previews small (≤600px contact sheets), verify with one screenshot plus the measured sizes, reuse saved scripts, and confirm slots and style before generating so nothing gets redone.
- 2026-10-05: Randell asked "are you directly using higgsfield… trying to use as least claude code as possible to save on tokens, but i still do not want to reduce the quality". The token sink that day was Claude-side pixel work on *real photos* (recolouring pans/pencils, brush paste-backs, repeated preview reads, rebuilding scripts), not generation. Keep post-processing lean: prefer photos that need no edits, reuse existing tools instead of rewriting, view fewer verification crops, one Higgsfield attempt before hand-masking.
- **DECISION 2026-10-05 (supersedes the face-paste-back rule):** Randell: "i want all images to be created in higgsfield so i can use less claude tokens". Offered: real photos crop-only, or Higgsfield edit + face paste-back, or Higgsfield for everything. He chose **Higgsfield for everything**, knowing her face may come out as a similar-looking woman. So: product swaps, recolours, brush removal and new compositions on Nikol photos all go through Higgsfield edits (real photo as the reference, product shot as the second reference). Use the result as delivered. No Claude-side Lab recolouring, masks, paste-backs or label pasting. Claude only crops, resizes, stages, uploads and does a single visual check. Always flag in the report when Nikol's face was regenerated.
- 2026-10-05: Randell said "the images do not necessarily need to be a solid background", so scenes are fine (pool, sky, vanity, textured surfaces, like the sunny reference grid he liked). Don't default prompts to a white or plain neutral background, and don't add white padding just for the look. Still keep each image distinct on the page.
- Related: [[tolstoy-player-dead-on-localhost]] (verify on dev store), [[custom-file-naming-convention]].
