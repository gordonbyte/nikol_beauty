# Coming-soon page playbook

How a coming-soon product page gets built on the **dev** store. Written for a Claude Code session
that owns one product and may be running alongside four others.

Read this end to end before touching anything. `CLAUDE.md` and the session memory still apply; this
file only adds the detail specific to these pages.

---

## 0. Hard rules

- **Never push, deploy, or publish to the LIVE store.** Randell does that himself. You work on the
  dev store only: `nikolbeauty-dev-mab1srre.myshopify.com`, theme **149231566950**.
- **Never run git commands.** No commits, no branches, no stashes. Randell commits.
- **Never start a dev server.**
- **Call `get-shop-info` before every batch of writes.** The Shopify MCP silently switches between
  the live and dev stores. If `domain` is not `nikolbeauty-dev-mab1srre.myshopify.com`, stop.
- **Never edit theme code** (`shopify-dev/**`, `shopify-live/**`) except to drop a file into
  `shopify-dev/assets/` as upload staging and delete it again. See §7 for why.
- Storefront password is `nikol`.

---

## 1. Running alongside other sessions

Five of these run at once. Everything below exists to stop them colliding.

**You own exactly one product.** Its page metaobject, its `cs_content_item` children, its images.
Do not read-modify-write anything belonging to another product.

**Shared things you must not change.** Some images and metaobjects are referenced by several
products — the four eyeshadow step photos are one upload shared by all seven palettes. Before
`fileUpdate` on any existing image, check whether anything else points at it. If it is shared,
**stop and flag it in your report** instead of changing it.

**Staging names must be unique and never reused.** Theme asset URLs are *not* versioned. Pushing
changed bytes under a filename you already pushed serves the cached old copy, and the import then
silently re-imports the previous image. Use `nikol-stg-<product-slug>-<n>-<name>.png`, increment
`<n>` on every re-push, and confirm the byte count changed before importing.

**Serialise theme pushes.** Two `shopify theme push` runs against one theme can race. Take a lock:

```bash
LOCK=/tmp/nikol-theme-push.lock
for i in $(seq 1 120); do mkdir "$LOCK" 2>/dev/null && break || sleep 5; done
# ... push, verify, then:
rmdir "$LOCK"
```

Always `rmdir` the lock, including on failure.

**Write your own changelog file:** `changelog/YYYY-MM-DD-<product-slug>.md`. Do **not** append to
the shared day file — five sessions appending to one file will interleave and corrupt it.

**Jira:** add comments to **KAN-211** only, and start every comment with the product name so the
five streams stay readable. Do not create issues, do not edit other comments.

**Throttling:** five sessions hitting the Admin API will hit `THROTTLED`. Batch mutations (one
`fileCreate` with many files beats many calls), and back off and retry rather than failing.

---

## 2. What a coming-soon page is made of

One `coming_soon_page` metaobject per product, holding these fields (children are
`cs_content_item` metaobjects with `image` / `title` / `text`):

| Field | What it drives |
|---|---|
| `steps_heading`, `steps_subheading`, `steps` | the numbered how-to strip |
| `skinsafe_heading`, `skinsafe_subheading`, `skinsafe_image`, `skinsafe_features` | the trust block: copy + icon rows on the left, one photo on the right |
| `switched_title`, `switched_text`, `switched_rows` | the alternating image/copy rows below |
| `banner_heading`, `banner_text`, `banner_image` | the closing banner |
| `faq_subtitle`, `faqs` | FAQ accordion |
| `quick_facts`, `ingredients`, `review_tag`, `addon_*`, `tolstoy_top`, `tolstoy_bottom` | the rest of the page |

Find it by handle or with
`metaobjects(type: "coming_soon_page", query: "display_name:<Product>*")`.

**The placeholder image is `gid://shopify/MediaImage/31441077633126`.** Any slot pointing at it is
an empty slot waiting for content — that is what you are filling.

---

## 3. Before you make anything

Do all of this first. Most of the mistakes worth avoiding are mistakes of not looking.

1. **Inventory the supplied folder.** List it, then build a contact sheet and *actually look at the
   images* — do not go by filename. Note what each one shows and how much of the frame the subject
   fills.
2. **Read the product.** `featuredMedia` and `media` (the main shot is the truth about shade
   colours), the description, and the variant/shade names.
3. **Read the whole page metaobject, including every child's `text`.** You are about to write copy;
   you need to know what the page already says. Randell has pushed back on repeated content more
   than once — the steps, the skin-safe icons, the switched rows, the banner and the FAQ must each
   say something the others do not.
4. **Note which slots hold the placeholder** and which already hold real content. Filling an empty
   slot is safe. Replacing existing real content is a judgement call — do it only if asked, and say
   so in your report.

---

## 4. The sections, and the sizing rules that actually bite

Each section crops differently. These were measured off the served CSS, not guessed.

### Steps (`steps`)
- Three or four cards. Four is supported — `custom-steps-horizontal.liquid` has a `--four`
  modifier (cards 22.75%, gap 3%). The schema's `max_blocks: 3` only caps theme-editor blocks, not
  metaobject-driven steps, so it does not stop you.
- Images **2000×2000**, square.
- Titles: verb-first, three or four words. "Start on the Lid", "Blend It Out". Randell asked for
  simple titles with an action word; bare nouns read abrupt.
- Bodies: one short line, naming that product's real shades. Use the title's verb and the body's
  verb differently so the card does not say the same word twice.

### Skin-safe photo (`skinsafe_image`)
- **1100×1280** (ratio 0.859).
- The slot's ratio is **0.776** with `object-fit: cover`, so roughly **4.9% is trimmed off each
  side**. Keep everything that matters inside the middle 90% of the width.

### Switched rows (`switched_rows`)
- Two or three cards. `custom-alternating-rows` renders
  `img { width: 100%; max-width: 610px; height: auto; object-fit: contain }` — **aspect-free**, so
  a taller image simply renders taller and the rows stop matching. Give every row in a section the
  **same aspect ratio**. Square 2000×2000 is the safe default.
- Copy runs a little longer than the step cards — two sentences, 30–45 words.

### Banner (`banner_image`)
- `.custom-info-banner__image img { height: 100%; object-fit: cover }`, stretched to the text
  column's height, so a **square file displays about 580×376**. Compose for that crop.
- `media_fit: natural` (around line 507) would switch it to `height: auto`, but that is a template
  change affecting every coming-soon product — **flag it, do not do it.**

### Icons (`skinsafe_features`)
See §6.

---

## 5. Working with the photographs

### Derive geometry, do not eyeball it
Every measurement that matters comes from a pixel scan — a luminance or colour profile along a row
or column — not from reading a number off an annotated preview. Grid overlays draw their labels in
*source* coordinates at *scaled* positions; reading a feature's position off one has produced real
errors in this project more than once.

### Removing burned-in graphic copy
Several supplied graphics have captions, labels and leader lines burned in.
- **Crop it out if the composition allows.** Cheapest and lossless.
- **Otherwise inpaint.** On flat ground, mask "any dark island that does not touch the edge of the
  region" — that automatically excludes the big dark shapes (jacket, hair, jaw) that reach the
  boundary. Over the product, a luminance test can fail entirely: burned-in ink is often a flat
  neutral with the *same luminance* as what it sits on, and gives itself away only by having no
  chroma. Test distance to the ink's own measured colour as well as local darkness.
- Fill by **direction-weighted interpolation** — the four nearest known pixels along the axes,
  weighted 1/d. Horizontal-only interpolation smears the top and bottom of any ring or curve.

### Lifting a background to white
Use **gradient-tolerant region growing** from the frame edge (accept a neighbour only if its
luminance differs by less than a small step), not a fixed threshold. A fixed threshold leaves grey
bands on a graduated studio backdrop and eats silver hair. 238 has been the working luminance
ceiling; 215 blows out white clothing.

### Repainting the palette pans
When a photo shows the compact, its pans must carry **that product's** shades, read off the
product's own main shot. `tools/` does not hold this one yet; the method is:

1. **Measure the target.** Per-channel **median** of a rectangle set well inside each pan of the
   main product shot. Region growing fails there — grainy shimmer pans break any step rule — and a
   mean gets dragged up by sparkle highlights.
2. **Mask the wells in the photo with polygons, not boxes.** The wells are slanted parallelograms.
   Axis-aligned boxes clip the corners and leave stripes of the original palette showing. Where a
   finger occludes a well, the boundary is a **curve** — trace it row by row (the powder and the
   skin separate cleanly on the red channel) and inset ~2px for the feather.
3. Inside each polygon, take pixels above a luminance cut (the frames are far darker than any
   powder) and keep the largest connected blob. Add a saturation floor where a bright neutral
   silver case is inside the polygon.
4. **Transform in Lab.** Shading amplitude follows the pan down when it is darkened and is held
   when it is lightened; `a` and `b` shift so the average hue and chroma land on the measured
   target. Scaling L multiplicatively in both directions pushes the photograph's own highlight past
   white. Roll highlights off through a `tanh` above L 82.
5. **Mirror reflections take the ratios of their matching real pan**, not their own means —
   otherwise they scale up to full pan brightness and stop reading as reflections.
6. **Verify numerically.** Sample the repainted pans back and compare to target. Expect ΔRGB 1–2 on
   a flat pan. A larger gap on a pan with a strong lighting gradient is the gradient, not drift —
   confirm by checking where your sample rectangle sits.

### Alt text
Meaningful and specific, always. `alt=""` is only for genuinely decorative images.

---

## 6. Icons

The trust-block icons are a family of circular badges — pink ring, arc of text around the top, a
white glyph on a pink disc. They must match the existing ones exactly, so they are **generated, not
drawn**.

Toolkit: `tools/icon-badges/`
- `proposed.cjs` — the icon library. Each entry is `{ key, title, label, stroke, ops }`.
- `render-proposed.cjs` — renders every entry to PNG.

Run with `NODE_PATH="<repo>/node_modules" node render-proposed.cjs` from that directory.

**Geometry** (design grid 260, rendered at ×2 = 520):
outer ring r 128.8 w 2.6 · inner arc r 102 w 3.6 · disc r 74.5 · text r 88, Archivo 500 @ 33px,
tracking −0.5, gap 12° · glyph box 94 · pink `#d34270`, ink `#2a2724`.

**Ops vocabulary** (100-unit glyph grid): `C` circle · `E` ellipse · `L` line · `RR` rounded rect ·
`D` raw path · `DOT` filled dot · `A` arc (degrees, 0 = 3 o'clock, positive = downward) ·
`FD` filled path · `BG` pink fill. `rrot()` gives a rotated rounded rectangle.

**Making a new one from a supplied graphic:**
1. Trace or measure the source glyph — walk the pixels to get centres, radii and stroke widths.
   **Derive constrained geometry, never place by eye:** an icon that has to sit inside a shield, or
   a clock hand that has to point at a mark, is solved from the containing shape's measurements.
2. Express it in the ops vocabulary at 100 units, set `stroke` to the matched family stroke (5 for
   recent additions).
3. Render, then compare side by side against an existing badge at the same size before uploading.
4. Upload via §7 and point the `cs_content_item`'s `image` at it.

Naming follows the theme convention: `custom-` prefix on filenames, `[Custom] ` prefix on
editor-facing section names — but image files in Content → Files use
`nikol-<subject>-<what>.png`.

---

## 7. Getting an image into Shopify Files

There is no direct upload. Stage it through the theme:

```bash
# 1. copy into the dev theme's assets under a UNIQUE, never-reused name
cp out/final.png shopify-dev/assets/nikol-stg-<slug>-1-<name>.png

# 2. push from INSIDE shopify-dev (from the repo root --only silently does nothing).
#    `shopify` is NOT on PATH in the Bash tool - it sits in the active nvm4w node directory.
#    Resolve it once and call it by absolute path:
SHOPIFY=$(ls "$LOCALAPPDATA/nvm"/*/shopify 2>/dev/null | tail -1)
cd shopify-dev
"$SHOPIFY" theme push --store nikolbeauty-dev-mab1srre.myshopify.com \
  --theme 149231566950 --allow-live --only assets/nikol-stg-<slug>-1-<name>.png

# 3. confirm it is on the CDN and the byte count is what you expect
curl -s -o /dev/null -w "%{http_code} %{size_download}\n" \
  "https://nikolbeauty-dev-mab1srre.myshopify.com/cdn/shop/t/4/assets/nikol-stg-<slug>-1-<name>.png"
```

`--allow-live` is required because 149231566950 is the *published* theme on the dev store. It is
still not production.

Then `fileCreate` with that CDN URL as `originalSource`, a real `filename`, `contentType: IMAGE`
and meaningful `alt`. To replace an image already in use, `fileUpdate` with the same `id` — it
swaps the content in place and keeps the gid, so nothing needs rewiring.

Poll until `fileStatus` is `READY` and check `image { width height }` before pointing a metaobject
at it. **Delete the staging copies from `shopify-dev/assets/` when done.**

---

## 8. Verify on the storefront

Never call it done from the API response. Load the real page:

```
https://nikolbeauty-dev-mab1srre.myshopify.com/products/<handle>
```

Log in through `/password` with `nikol` first. Playwright is available —
`NODE_PATH="<repo>/node_modules"`; there is no `canvas` module, so all raster work goes through a
headless Chromium canvas, and large images load via `page.goto('file:///…')` (launch with
`--allow-file-access-from-files` when compositing several).

Screenshot each section you touched and look at it. Confirm card counts, that images are square
where they should be, and that nothing is clipped.

---

## 9. Finishing

1. **Changelog** — `changelog/YYYY-MM-DD-<product-slug>.md`. Bullets, written so someone who was
   not there understands *why*: the actual cause when it differed from the first guess, the
   measurements you relied on, dead ends worth knowing, what you verified.
2. **Jira** — one comment on **KAN-211** starting with the product name, giving Randell
   step-by-step instructions to replicate on live: filenames and sizes to upload, which slot each
   goes in, and the exact copy to paste. He applies live changes himself on his own schedule.
3. **Report back** with:
   - what you changed, per slot
   - **whether each section is active** and which template renders it
   - anything shared you did not touch, and why
   - anything needing a template change (flagged, not done)
   - orphaned metaobjects you left behind — the API cannot delete metaobjects, only the admin UI
     can, so say which ones Randell may want to remove

---

## 10. Things that have gone wrong before

- `shopify theme push --only` from the repo root silently does nothing. Run it from `shopify-dev/`.
- `shopify` is not on PATH in the Bash tool and `which shopify` finds nothing, even though the same
  command worked earlier in a session. Resolve the absolute path out of the nvm directory as in §7
  rather than assuming the command exists.
- Theme asset URLs are not versioned; re-pushing under the same name serves cached bytes.
- The same trap on the way out: after a `fileUpdate`, fetching the Files CDN URL *without* its
  `?v=` param can return the pre-update image, so a check against it wrongly reports the update
  failed. Read the current `image { url }` back from the API and fetch that. Liquid always emits
  the versioned URL, so the storefront is fine either way.
- Reading coordinates off a scaled annotated preview instead of a pixel scan.
- Assuming an occlusion boundary is a straight line when it is a finger.
- Matching a file's aspect ratio and assuming it *looks* square — check how much of the frame the
  subject actually fills.
- Naming a shade from the product name rather than the photograph.
- Flattening or cropping a box that clips the product by a few pixels — measure the subject's true
  extent first.
- Heredocs and template literals in shell one-liners mangling scripts. Write `.cjs` files and run
  them.
- Building a review Artifact that points at Shopify CDN images. Artifacts block every external
  image by CSP, silently, so the page renders broken frames with no error. Embed the images as
  data URIs instead — 56 review-size JPEGs came to 1.4MB against the 16MB page ceiling.
