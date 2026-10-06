# Coming-soon page prompt

Paste one of these per Claude Code session. Fill the four bracketed fields. Give each session a
different product — never two sessions on the same one.

---

```
Read docs/coming-soon-playbook.md in full before doing anything. It is the process for this
work and it is not optional — sizing rules, the upload route, the icon toolkit, and the rules
that stop five parallel sessions colliding are all in there.

PRODUCT: [product title, e.g. "Le Bottled Blonde" 3-Well Eyeshadow Palette]
IMAGE FOLDER: [full path, e.g. C:\Users\RaymondSanchez\Pictures\Coming soon\bottled blonde]
SECTIONS TO FILL: [e.g. steps, skin-safe photo, switched rows, banner — or "whatever is still
                   on the placeholder"]
STAGING PREFIX: nikol-stg-[short-slug]-

Work on the DEV store only. Do not push anything to live, do not run git, do not edit theme
code, and call get-shop-info before every batch of writes.

What I want:

1. Look at every image in the folder — build a contact sheet and actually view them, do not go
   by filename. Then read the product's main shot, description and existing page metaobject so
   you know what the page already says.

2. Tell me what you plan to do before you do it: which image goes in which slot, and the copy
   you propose for each. Show me the cropped/edited images. Then apply it.

3. Fill the sections I listed, following the playbook's sizing rules for each one. Copy must
   not repeat what another section on the same page already says.

4. If a photo shows the palette or compact, repaint the pans to this product's real shades from
   its own main product shot (playbook §5).

5. If a trust-block icon is missing or wrong, build it with tools/icon-badges/ so it matches the
   existing family exactly (playbook §6).

6. Verify on the dev storefront with a screenshot of every section you touched — not just the
   API response.

7. Finish with: changelog/YYYY-MM-DD-[short-slug].md, a KAN-211 comment starting with the
   product name giving me step-by-step live replication instructions, and a report that says
   whether each section is active, what you left alone and why, and anything that needs a
   template change.

Stop and ask me if: an image would have to replace existing real content rather than a
placeholder, a change would touch a file or metaobject shared with another product, or a
section needs a theme-code change.
```

---

## Running five at once

- **One product per session.** Assign them up front; do not let two sessions pick their own.
- **Different `STAGING PREFIX` per session.** This is what keeps theme-asset uploads from
  overwriting each other.
- **Different changelog file per session** — the prompt already asks for a per-product one.
- Sessions that need to replace a *shared* image (the eyeshadow step photos are one upload used by
  all seven palettes) will stop and ask rather than fight each other over it.
- If two finish at once and both want to push theme assets, the playbook's lock makes them queue.
- Expect Shopify API throttling with five sessions; they will back off and retry.

## Suggested first batch

| Session | Product | Folder |
|---|---|---|
| 1 | Le Bottled Blonde 3-Well Eyeshadow Palette | `…\Coming soon\bottled blonde` |
| 2 | Fresh Beauty 3-Well Eyeshadow Palette | `…\Coming soon\fresh beauty` |
| 3 | Naughty Nancy 3-Well Eyeshadow Palette | `…\Coming soon\naughty nancy` |
| 4 | Sweet Carol 3-Well Eye Shadow Palette | `…\Coming soon\sweet carol` |
| 5 | The Cabana 3-Well Eyeshadow Palette | `…\Coming soon\the cabana` |

The seven palettes already share their step photos and now have per-palette palette-in-hand and
skin-safe images uploaded, so those five sessions are mostly copy, switched rows and banners — a
good first run to see whether the prompt holds up before pointing it at products that need
everything built from scratch.
