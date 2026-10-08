# Coming-soon page images: the Higgsfield process (run book)

Written 2026-10-06 so Randell can pick up this work from any computer. It covers the exact process used today for
Fresh Beauty, Le Bottled Blonde, Naughty Nancy, Sweet Carol, The Cabana and Strong Brew.
Day-by-day detail, including every Higgsfield job id, is in `changelog/2026-10-06.md`. The earlier draft plan is
`changelog/coming-soon-image-playbook.md`. Where the two differ, **this file wins**: it records what actually worked.

---

## 0. Where we left off (status on 2026-10-06, end of day)

| Status | Pages |
|---|---|
| Kept (not touched) | `bb-creme`: all its images were kept on purpose. The 4 step images on every eyeshadow palette were also kept. |
| **Staged locally, NOT yet on the dev store** | `fresh-beauty-studio-eye-shadow-palette`, `bottled-blonde`, `naughty-nancy-eye-shadow-palette-limited-edition`, `limited-edition-sweet-carol-3-well-eye-shadow-palette`, `the-cabana-eyeshadow-palette`, `strong-brew-3-well-eyeshadow-palette`. Each has skin-safe, rows 1–3 and the banner staged. |
| **Also staged (2026-10-07)** | `rewrite-the-rules-eye-shadow-palette`. All 7 eyeshadow palettes are now staged locally (see `changelog/2026-10-07.md`). Next: pick a non-palette page from section 11. |
| Still on the placeholder | Every other coming-soon page (59 in total incl. Rewrite the Rules). The full list is in section 11. |

**Open questions for Randell:**
1. **Applicator wording.** The Cabana row 3 and Strong Brew row 1 text said the applicator has "a sponge tip at one end and a brush at the other".
   The product photos show a sponge at **both** ends, so the staged text was changed to "a soft sponge tip at both ends".
   If the real applicator has a brush end, revert both staged texts in the staging JSON.
2. **Two staged images break the "product must look new" rule** (the rule was set after they were made):
   - Naughty Nancy row 2: the applicator lifts out of the darkest pan, which has a dip mark.
   - Le Bottled Blonde row 2: one pan is crushed, with powder spilling.
   Redo both if wanted.

**Not done yet (do at the very end, only when Randell says so):** the final publish to the dev store (section 9) and the
KAN-119 Live Sync tasks.

---

## 1. The tools and where things live

| Thing | Where | Notes |
|---|---|---|
| Image generation and editing | **Higgsfield** (Higgsfield AI MCP connector in Claude) | ALL image generation and editing happens here. Claude only stages, crops (via Higgsfield's free crop), checks and uploads. Ultra plan, credits shared across the account. |
| Real photos of Nikol | **In the repo: `references/nikol-shoots/{feb24,jul24,q125}/`** (2400px JPG copies of all 3 shoots). Originals are in **Dropbox** (Dropbox MCP connector). Product photos: **`references/products/<palette>/`**. Randell's 12 style-reference ads: **`references/style-ads/`**. See `references/README.md` for what each is good for. | Best sources: `/Nikol Beauty Team Folder/2024/2024 July Nikol Photo Shoot/`, the Feb 2024 shoot, the Q1 2025 shoot (`Nikol-Beauty-Q1-2025xxxx.jpg`), and `/Nikol Beauty Team Folder/1.16.26 VALENTINES DAY SHOOT/`. |
| Product photos | Shopify product media (open palette, crumble swatch, closed rose compact) | Read via the Shopify MCP connector. |
| The pages | Shopify DEV store `nikolbeauty-dev-mab1srre.myshopify.com`. Each product has a `custom.coming_soon` metafield pointing to a `coming_soon_page` metaobject. | Image fields: `skinsafe_image`, `banner_image`, `steps[]` and `switched_rows[]`. Steps and rows are `cs_content_item` entries with `image`, `title` and `text`. Placeholder image = MediaImage `31441077633126`. |
| Local preview | `http://127.0.0.1:9292/products/<handle>` | Randell starts `shopify theme dev` himself, serving from `shopify-live/`. Claude never starts dev servers. |
| Staging file | `shopify-live/assets/custom-coming-soon-staging.json` | Every new image goes here first (section 3). |
| Daily log | `changelog/YYYY-MM-DD.md` | Log every image, job id and decision, every day. |
| Jira | KAN project. Live Sync tasks go under epic **KAN-119**. | Created at publish time. |

### Higgsfield reference elements already saved (reuse them, don't recreate them)

Elements are product references you drop into a prompt as `<<<element_id>>>`.

| Element | ID | Pans (left to right), hex sampled from the real product photo |
|---|---|---|
| Fresh-Beauty-Palette | `de5906f9-4aa9-479e-9d18-70fa53924ed9` | seashell, warm rose pink, mid-toned lavender (pearlized) |
| Le-Bottled-Blonde-Palette | `e5ddf667-6112-442b-a78c-2dbaa273a44d` | rose gold `#C5AB9F`, golden taupe/caramel `#A78272`, bronze toffee `#826A5D` (foiled glitter grain) |
| Naughty-Nancy-Palette | `1576bc5d-14ba-48f1-a3f2-f7548be5bc30` | sparkling mauve `#B99186`, plum pink `#BF938F`, sugar deep plum `#927B7A` (pearlized) |
| Sweet-Carol-Palette | `f08b10b8-9cc4-48bd-9619-b27345f0b91f` | MATTE powder pink `#E5D7D6`, PEARL smoked grape `#A28781`, MATTE rich plum brown `#674C49` |
| The-Cabana-Palette | `cecc9d55-9bf4-4695-a1e1-04b909f3d665` | crisp champagne `#E1CBBD`, iced pink `#D6BBAE`, toffee bronze `#9E7F73` (pearlized) |
| Strong-Brew-Palette | `09a29c22-e85d-4e61-9115-d0ff923a7a81` | MATTE creamy nude peach `#EDDDD4`, soft taupe `#BF9080`, rich brown `#6C4832` |
| Nikol (character) | `4125bdbb-8f35-4000-bc42-68273bd95315` | 19 real photos. Mixes her old bob and current slicked-back looks, so it's rarely used now (see section 5). |
| Nikol Soul (soul_2) | soul_id `27940312-ad48-4d06-af9f-dabdcfd4c3d7` | Trained Soul. Rarely used now: real-photo retouches look more like her. |

Useful Higgsfield media ids:
- Shared rose line-art compact (closed lid): `0203cacf-c0af-4112-8bd5-91ffd66317a3`
- Strong Brew open palette: `333b78f7-b714-4b92-9959-c1fb1d41d8d2`
- Cabana open palette: `2fea4630-1a6c-43b2-8ba1-576ab3e0c34d`
- Sweet Carol open palette: `19d0cedc-80be-4403-91fc-8f64b7fcb6b0`
- Naughty Nancy open palette: `cd5d462f-e795-4032-b65a-e481f49f0871`

---

## 2. Randell's rules (non-negotiable)

1. **Higgsfield only** for every image and every edit. No Claude-side recolours, masks or paste-backs.
2. **One image at a time, one version each.** Propose the image in words first, wait for "yes go ahead", then generate.
   Exception: when a job stalls, a duplicate run is fine (use whichever finishes first).
3. **2K, not 4K.**
4. **Images lead, text follows.** Pick the best, most accurate image; the slot's text may be rewritten to match it.
5. **No near-duplicates on one page.** Vary setting, pose and type: product hero, texture, hand, Nikol.
6. **People:** Nikol in several slots per page (typically row 1 or 2 and the banner). Her look: slicked-back silver hair,
   natural nude nails. Rings: one slim diamond eternity band, or none. On Naughty Nancy row 2 Randell asked for the ring
   to be removed, so "none" is always fine.
7. **Product must look NEW.** Pans smooth and untouched. **Applicators/brushes never touch or dip into the eyeshadow.**
   They can be held above the palette, laid beside it or sit in the tray.
8. **Pan colours must match the real product exactly.** Randell checks this closely. Sample the hex from the product photo.
9. **Banners:** cheerful but calm, close crop (hairline to chin, or to just below a hand-held palette), and eyeshadow blended
   like the step images. Less sparkle is better.
10. **Crop tight to the neck** on Nikol shots. Randell has repeatedly asked to "crop up to the neck" and "bring the product up".
11. **Never push anything to the LIVE store.** Everything here is the DEV store, and Randell pushes live himself.
12. **Never commit to git without asking.** Each commit needs his OK.

---

## 3. Local staging: how new images reach the preview

New images are NOT put on the dev store one by one. They're recorded in
`shopify-live/assets/custom-coming-soon-staging.json`. A small script,
`shopify-live/snippets/custom-cs-staging.liquid` (rendered from `custom-product-coming-soon.liquid`), swaps them into
the page **only when the hostname is 127.0.0.1 or localhost**, so the dev and live storefronts never see them.

JSON shape:
```json
{
  "_readme": "...",
  "products": {
    "<product-handle>": {
      "skinsafe": { "src": "<higgsfield cloudfront url>", "alt": "...", "status": "staged", "higgsfield_job": "<job id>" },
      "rows":  { "1": { "src": "...", "alt": "...", "title": "(optional new title)", "text": "(optional new text)", "status": "staged", "higgsfield_job": "..." }, "2": {}, "3": {} },
      "steps": { "1": { "src": "...", "title": "...", "text": "..." } },
      "banner": { "src": "...", "alt": "...", "heading": "(optional)", "status": "staged", "higgsfield_job": "..." }
    }
  }
}
```
- `src` is the Higgsfield result URL: `https://d8j0ntlcm91z4.cloudfront.net/user_3DwnD5UUMymyD1K8GMrLQ06ryOh/hf_<date>_<time>_<jobid>.png`.
- `title`, `text` and `heading` are optional. Only set them when the text changes ("images lead, text follows").
- Always write meaningful `alt` text that describes the image.
- After editing the JSON, refresh the local preview page to see it.

---

## 4. Per-product setup (do this once when starting a product)

1. **Find the product and its page** (Shopify GraphQL, read-only):
   `products(query:"title:*<Name>*") { handle media { … } metafield(namespace:"custom", key:"coming_soon") { reference { … on Metaobject { fields … } } } }`.
   Note the handle, the 3 product photos (open palette, crumble swatch, closed compact), the step images and the row
   titles and text. Check whether the text describes something the photo contradicts (the applicator brush, for example).
2. **Sample the real pan colours** from the open-palette photo. Average a small box in the middle of each pan and convert
   to hex. These hex values go into every prompt.
3. **Import the product photos into Higgsfield** with `media_import_url`, using the Shopify CDN URL.
4. **Create a prop element** with `manage_reference_elements` (action `create`, category `prop`, name `<Product>-Palette`).
   Pass the 3 media, and write a description that lists the pans left to right with hex values and finish (matte or pearl).
   If the product has no closed-compact photo, use the shared compact media `0203cacf-…`.
5. **Log the setup** in the day's changelog: element id, hex values, current titles, any text problems.

**Page order that worked:** skin-safe → a texture/swatch row → a hand or product row → a Nikol row → banner.
Propose each one first.

---

## 5. Which Higgsfield model to use (the most important lessons)

| Situation | Model | Why |
|---|---|---|
| **Product-only shots** (no face): heroes, swatches, hands, flat lays, reflections | **`gpt_image_2_5`**, references = the real product photo (+ compact photo, + crumble photo for swatches) and hex values in the prompt | It copies real pan colours, lid art and applicators far better. Most of these matched on the first try. |
| **Fixing product colours or details** in a no-face image | **`gpt_image_2_5`** edit: the image + the product photo + hex values | Nano Banana kept drifting lighter and pinker (Le Bottled Blonde took 4 tries; GPT fixed it in 1). |
| **Anything where Nikol's face shows** | **`nano_banana_pro`**, retouching a REAL photo, with **her photo as the ONLY face reference** | GPT Image redraws the whole image, and her face drifted ("this image does not look like her"). **Never run GPT on an image with her face.** |
| Fixing a product detail in an image WITH her face (e.g. wrong lid art) | `nano_banana_pro`: the image + a product-only reference (e.g. the compact photo) | The second reference has no face, so it doesn't confuse her identity. |
| Cropping | `flux_2_pro_outpaint` with **negative** `expand_top/bottom/left/right` | A pure crop: free, and nothing is redrawn. |
| Hands only (no face) | `gpt_image_2_5`, prompt "mature woman's slim, elegant hand, natural sheer nude nails, no rings" | Check the finger count and that any ring sits on a finger. One came out floating on the palm. |

**Settings:** `aspect_ratio: "1:1"`, `resolution: "2k"` (Nano Banana), `use_unlim: false`.
Element placeholder: `<<<element_id>>>` inside the prompt.
Polling: `jobs_wait` with a 15 s timeout, repeated. If a job is still running after about 75 s, submit an identical
duplicate and take whichever finishes first. They stall sometimes.

---

## 6. Recipes (prompts that worked)

### 6a. Product hero / skin-safe (GPT Image 2.5, refs: open-palette photo, compact photo)
> Photorealistic 35mm lifestyle product photo, no people. The open eyeshadow palette from image 1, an exact copy: square
> silver compact, mirror lid with NIKOL lettering, three upright rectangular pans with straight silver dividers, left to
> right `<shade #hex>`, `<shade #hex>`, `<shade #hex>` (`<matte / pearlized with fine shimmer>`); dual-tip sponge applicator
> in the lower well. It rests on `<SETTING>`. Beside it, the closed compact with the exact lid from image 2: white, covered
> in black line-art roses and leaves, large serif N monogram (thick and thin double strokes). Props: `<2–3 props>`.
> `<LIGHT>`, slight film grain, shallow depth of field, palette sharp and the hero, clean composition.

Settings already used, so don't repeat them: Fresh Beauty = sunlit travertine with a rose · Le Bottled Blonde = mirror
tray at golden hour with wheat · Naughty Nancy = blush marble at evening with heather · Sweet Carol = pale pink linen over
oak with jojoba, sunflower and oil · Cabana = poolside cabana table with palm shadows · Strong Brew = walnut café counter
with shea, rice powder and coffee. **Good habit:** use props from the product's real ingredient list.

### 6b. Swatches (GPT Image 2.5, refs: open-palette + crumble photos)
> Exactly THREE clean, wide, parallel swatch swipes side by side on `<SURFACE darker or lighter than the swatches so all
> three show>`, colours copied from image 2 and image 1, left to right `<#hex ×3>`, each with a little crumbled powder at
> the starting end, `<finish>`. The open palette (exact copy) sits partly cropped at one corner…

Always say "exactly THREE". Nano Banana once drew four. Keep the palette's own pans pristine (rule 7).

### 6c. Nikol real-photo retouch (Nano Banana Pro, ref = ONLY her photo; the palette as an element)
> Minimal photo retouch of image 1, a real photo of this woman. Keep the composition EXACTLY as image 1 — NOT mirrored,
> NOT flipped: `<describe pose, gaze, hands, top>`. Her face, features, expression, skin texture and slicked-back silver
> hair must stay faithful to image 1; do not redraw her face. Only these changes: 1) Replace the `<object>` in her hand
> with the open `<<<ELEMENT_ID>>>` palette … pans `<#hex ×3>`. 2) Eyeshadow, clearly visible: `<lid shade #hex>` on the
> lid, `<deep shade #hex>` at the outer corner/crease, `<light shade #hex>` under the brow, seamless, `<satin/matte>`,
> not purple. 3) Lips: `<muted rose / warm nude>` (instead of red). 4) Nails natural sheer nude; no rings.
> 5) Background: `<plain warm colour / setting>`. Square framing. Photorealistic.

Then crop with FLUX (6e). If the palette comes out sideways or the lid art is wrong, run a second Nano Banana edit with
only that fix and "keep her face EXACTLY the same — NOT mirrored".

**Real photos already used, so don't reuse them on another page:**
- Q1-2025: 1869, 1952 (Fresh Beauty), 1685 (Le Bottled Blonde), 2065 (Naughty Nancy banner), 2078 (Cabana banner), 1817 (Strong Brew row 2)
- Jul-2024: 0830 (Fresh Beauty), 0796 (Le Bottled Blonde), 0692 (Sweet Carol row 2), 1207 (Sweet Carol banner), 1135 (Cabana row 2), 0917 (Strong Brew banner)
- Feb-2024: 1859 (Naughty Nancy row 1)
- Rejected or unused: Feb 2284 and Feb 2303
- Easy poses hold her likeness best: three-quarter view, gazing away, eyes closed, holding something near her face.

### 6d. Getting a real photo into Higgsfield
Higgsfield can't read local files, so publish the photo temporarily as a dev-theme asset:
```bash
cp "<photo>.jpg" shopify-dev/assets/nikol-ref-<name>.jpg
SHOPIFY=$(ls "$LOCALAPPDATA/nvm"/*/shopify | tail -1)      # Shopify CLI lives under nvm v20.20.2
cd shopify-dev && "$SHOPIFY" theme push --store nikolbeauty-dev-mab1srre.myshopify.com --theme 149231566950 --allow-live --only assets/nikol-ref-<name>.jpg
rm assets/nikol-ref-<name>.jpg
```
Then `media_import_url` with `https://nikolbeauty-dev-mab1srre.myshopify.com/cdn/shop/t/4/assets/nikol-ref-<name>.jpg`.
- Theme assets max out around 20 MB. One 48 MB PNG silently failed (404), so convert big files to a 2400px JPG first.
- Theme 149231566950 is the DEV store's published theme. `--allow-live` is required by the CLI, but it is NOT production.
- Check that the URL returns 200 before importing.

### 6e. Crop (FLUX.2 Pro Outpaint, free)
`model: "flux_2_pro_outpaint"`, `medias: [{value: <job id>, role: "image_references"}]`, `prompt: "crop"`, and negative
`expand_top`, `expand_bottom`, `expand_left`, `expand_right` in pixels (Nano Banana 2K output = 2048×2048, but **GPT Image 2.5 output = 1024×1024**: check the size first. Cropping a 1024 image leaves it small, so ask GPT to recompose instead).
Keep it square: total vertical cut = total horizontal cut. Check the result; one crop cut off the side of her head and
had to be redone wider.

### 6f. Colour fix on a product-only image (GPT Image 2.5, refs: image + real product photo)
> Edit image 1. Change ONLY the colours of the palette pans (and their mirror reflection) to exactly match the real
> product in image 2: left `<#hex>`, middle `<#hex>`, right `<#hex>` — medium-depth, do NOT lighten them despite the bright
> scene, `<finish/texture>`. Keep everything else identical: …

Optional: crop the real pans out of the product photo with FLUX (negative expands) and pass that crop as the reference.

---

## 7. Checking every image before showing Randell

1. Download the result: `curl -sf --retry 3 --retry-delay 3 --retry-all-errors -o x.png <url>`. This network
   intermittently resets CloudFront connections, so retry in a loop.
2. Build a side-by-side contact sheet: the result next to the real product photo (and, for Nikol shots, next to the
   original photo). The helpers used were small Playwright scripts that draw images onto a canvas. Any image viewer works.
3. Check:
   - pan colours, count and order
   - the lid art (all-over roses, double-stroke N)
   - applicators (sponge at both ends; never touching the pans)
   - pans untouched
   - her face against the original
   - hair slicked back
   - rings (one band or none) and nails
   - finger count
   - nothing mirrored
4. If something is wrong, fix it with one targeted edit (section 5) before showing Randell, and tell him what was fixed.

---

## 8. Logging (every image)

Add to `changelog/YYYY-MM-DD.md` under the product's heading:
- the slot and title
- the concept
- the source (generated, or the REAL photo name)
- the model and job id
- the problems found and the fix job ids
- the staged job id
- any text change, quoted

Note when her face was regenerated.

---

## 9. Final publish to the DEV store (later, ONLY when Randell says so)

For each staged entry:
1. Check the store first: `get-shop-info` must say `nikolbeauty-dev-mab1srre`. The Shopify connector has silently
   switched stores before.
2. Upload the image to Shopify Files with `fileCreate` (from the Higgsfield URL, with alt text). Wait for READY and get the
   MediaImage gid.
3. `metaobjectUpdate` on the page's `coming_soon_page` (skinsafe_image / banner_image), or on the row or step
   `cs_content_item` (image, plus title and text if changed). Batch with aliases.
4. Re-query to verify, then set that entry's `status` to `published` in the staging JSON.
5. Create or refresh a **KAN-119 Live Sync** task per product: step-by-step replication for live, label `live-sync`.
6. Log it in the changelog.

The restore point for the old images is `backups/coming-soon-image-assignments-2026-10-06.json`.

---

## 10. Starting a session at home

1. `git pull` on branch `develop`.
2. Copy the files in `claude-memory/` into Claude's memory folder for this project on the home computer:
   `~/.claude/projects/<the-project-path-with-dashes>/memory/`. The folder name is based on where the repo lives on that
   machine; Claude creates it the first time you open Claude Code in the repo. These files hold the rules above in Claude's
   own format.
3. Start the local theme preview yourself: `shopify theme dev` in `shopify-live/`, at 127.0.0.1:9292.
4. Make sure the Higgsfield, Shopify, Dropbox and Atlassian connectors are connected in Claude.
5. Tell Claude: *"Read changelog/higgsfield-image-process.md and changelog/2026-10-06.md, then continue with Rewrite the
   Rules (or answer the open questions in section 0 first)."*

---

## 11. All coming-soon pages (as of 2026-10-06)

**Eyeshadow palettes:**
- Kept: bb-creme (all images)
- Staged: fresh-beauty, bottled-blonde, naughty-nancy, sweet-carol, the-cabana, strong-brew
- **To do: rewrite-the-rules-eye-shadow-palette**

**Still on the placeholder:**
- **Face:** serum-foundation, custom-concealer-trio-in-buffed-cool, fbs-eye-brightener, nikita-banana-translucent-pressed-color-corrector-powder,
  fiercely-smooth-face-primer, just-peachy-color-corrector, no-redness-beauty-stix, extreme-cancel-color-corrector, color-corrector-collection-2
- **Eyes and brows:** eye-primer, mascara-intense-curling-volumizing, nikol-cosmetics-waterproof-eyeliner, skinny-brow-pencil, brow-fixx,
  nikol-cosmetics-precision-eyebrow-stencils
- **Cheek:** lip-and-cheek-cream, classic-beach-palette, new-blush-palette-ageless, after-glow-blush-palette, in-full-bloom-blush-palette, creme-brulee
- **Lips:**
  - Lipsticks: nikray-lipstick, actually-i-can, beach-house-lipstick, pretty-smart-lipstick, 1975-shiny-velvet-cream-lipstick,
    confidence-shiny-velvet-cream-lipstick, aperitif-shiny-velvet-cream-lipstick, fleur-shiny-velvet-cream-lipstick-34
  - Glosses: champs-lip-gloss, coco-13-lip-gloss, good-vibes-lip-gloss, upgrade-lip-gloss, defiance-lip-gloss, manifest-glow-lip-gloss,
    ignite-lip-gloss-176
  - Liners and care: lip-liners-waterproof, nikol-cosmetics-stay-put-lip-liner, rose-lip-balm, dream-melt-lip-mask
- **Tools and accessories:** nikol-cosmetics-lipstick-case, travel-makeup-brushes, foundation-buffing-brush, angled-concealer-brush,
  nikol-beauty-eyeshadow-blending-brush, nikol-beauty-blending-brush, soft-set-technique-brush, lux-brush-soap, pencil-sharpener, gua-sha,
  cooling-eye-roller, 10x-mirror, no-crease-beauty-clips, these-bags-are-designer-eye-mask
- **Bundles:** the-best-seller-beauty-bundle, beginner-beauty-bundle, perfect-complexion-bundle, volume-up-mascara-bundle

**Notes for products that aren't palettes:**
- The slots are the same: steps, skin-safe, rows and banner. Non-palette pages also need their **steps** made, so plan
  3 matching step images in one setting.
- Make a prop element from that product's photos.
- Check its exact shade or finish.
- For lip products, check the tip shape against the real photo (Nano Banana once slanted a lipstick tip).
