---
name: dropbox-nikol-photo-sources
description: "Where Nikol's real shoot photos live in Randell's Dropbox (connected 2026-10-05) and which worked as Higgsfield references"
metadata:
  node_type: memory
  type: reference
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-10-05T18:59:07.177Z
---

Randell connected the Dropbox MCP on 2026-10-05 and said to pick the best of "all the Nikol product photos" as sources, altering them freely.

- Best and newest pro shoot: `/Nikol Beauty Team Folder/1.16.26 VALENTINES DAY SHOOT/` with `Valentine’s Day Photos` (23 files) and `Women's Day Photos` (7 files). These are 6–12MB JPEGs. They show her holding and applying lipstick in red, pink and black outfits against a lavender studio backdrop. Her hair is slicked back in some and a silver bob in others.
- Product refs: `/Nikol Beauty Team Folder/Product Assests/Lipsticks/` has `<NAME> Lipstick Color.jpg` lip close-ups per shade and `ACTUALLY I CAN smudge 2024.jpg`.
- Other: `/Holiday Photo Shoot/Scene 1-9` (raw DSC JPGs, 2024), `/Nikol Beauty Team Folder/2024/2024 Nikol Photo Shoot/`, `Website Assets/<product>/`.
- Workflow: `download_link` (max 25 per call, single-use URLs) → curl → downscale to 2400px → Higgsfield `media_upload` PUT → `media_confirm`.
- What worked: a minimal retouch of a real photo (lips and bullet only), or the same pose moved into an everyday setting (sofa by a window, bathroom vanity). Both read far less AI than generated scenes. See [[image-generation-in-higgsfield]], [[coming-soon-image-style]].
- 2026-10-05 lessons:
  - Generated close-ups cropped below the nose turned into a generic woman. Randell flagged the wrong face shape. Instead, retouch her real photo, keeping the forehead-to-collarbone framing, and give an explicit keep-list: face and bone structure, brows, smile, hair, and her **diamond eternity band** on the ring finger (= "the wedding ring"). Zoom-check that the band is there.
  - Product refs: the Dropbox "(For Graphics)" webp of the Rose All Day liner gave the wrong product. Use the Shopify product images instead (e.g. `Rose_all_D_LIP_liner_open.png`).
