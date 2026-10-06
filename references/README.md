# Reference images for Higgsfield

These are the images used as references when generating coming-soon page images. See
`changelog/higgsfield-image-process.md` for the full process.

## `nikol-shoots/`: real photos of Nikol (for face retouches)
Resized copies, 2400px on the long side, JPG. The full-resolution originals are in Dropbox.

| Folder | Shoot | Dropbox original |
|---|---|---|
| `feb24/` | Feb 2024 shoot (35 photos) | `/Nikol Beauty Team Folder/2024/…` Feb 2024 shoot |
| `jul24/` | July 2024 shoot (37 photos) | `/Nikol Beauty Team Folder/2024/2024 July Nikol Photo Shoot/` |
| `q125/` | Q1 2025 shoot (42 photos) | Q1 2025 shoot folder |

**Already used, so don't reuse them on another page:**
- **Fresh Beauty:** Q1-20251869, Q1-20251952, July_20240830
- **Le Bottled Blonde:** Q1-20251685, July_20240796
- **Naughty Nancy:** Feb_20241859 (row 1), Q1-20252065 (banner)
- **Sweet Carol:** July_20240692 (row 2), July_20241207 (banner)
- **The Cabana:** July_20241135 (row 2), Q1-20252078 (banner)
- **Strong Brew:** Q1-20251817 (row 2), July_20240917 (banner)

Tried and dropped: Feb_20242284 and Feb_20242303.

**Getting a photo into Higgsfield:** Higgsfield can't read local files. Push the photo as a temporary dev-theme asset, then
`media_import_url` it (process doc section 6d). These photos are already 2400px JPGs, so they're under the theme's size limit.

## `style-ads/`: Randell's 12 style references (other brands' ads)
These are for composition and mood only. Never copy their products or branding. Each can be given to Higgsfield as a
**pose or composition** reference alongside the real product photo.

| File | What to take from it | Good for |
|---|---|---|
| 01-dewy-face-closeup | Extreme face close-up, a glossy clear-product streak on the cheekbone, real skin texture | S7 face smudge (clear or dewy products), rows |
| 02-crushed-palette-still-life | Overhead still life, pans with crushed powder and a brush across them | Swatch or texture rows. **Note:** keep the product's own pans pristine (rule 7); put the crushed powder beside the palette instead. |
| 03-scattered-palettes-infographic | Several open palettes scattered at angles on a pale surface, with a claim list | A multi-shade or "collection" hero |
| 04-compact-held-by-face | Open compact held beside a big genuine smile, mirror lid showing | Banners (Nikol holding the palette) |
| 05-compact-in-palm-fingertip-swatches | Compact in an open palm, a swatch on each fingertip, plain backdrop | Shade rows. Used for Fresh Beauty row 2. |
| 06-forearm-shade-swatches | A neat swatch ladder down the inner forearm | Shade ranges (concealer, foundation). Swatches on skin were hard to see for pale eyeshadows. |
| 07-texture-smear-callouts | A macro cream smear filling the frame | Texture rows for creams and foundations |
| 08-pot-held-by-eye | A small pot held beside the eye, fingertip pointing to the under-eye | Concealer, brightener, eye products |
| 09-stick-free-from-callouts | A stick product on a blush backdrop | Skin-safe ("free from") images for sticks |
| 10-bottle-held-to-camera-ugc | The product held toward the camera, the person blurred behind, UGC feel | Rows: UGC-style "my favorite" |
| 11-stick-in-hand | Stick held up in a hand, clean white background | Hand shots for lip and cheek sticks |
| 12-tube-in-hand | Tube held in a hand with natural nails | Hand shots for tubes (primer, BB, scrub-type) |

## `products/`: the real product photos (ground truth for colours)
Originals from the Shopify product pages. Each folder has `open-palette`, `crumble` (swatch) and, where it exists,
`compact` (closed rose line-art lid). Strong Brew and Rewrite the Rules have no compact photo, so use any other palette's
`compact.png`. The lid is the same on all of them.

Some of these are already in Higgsfield as media (no need to re-upload):

| Image | Higgsfield media id |
|---|---|
| naughty-nancy/open-palette | `cd5d462f-e795-4032-b65a-e481f49f0871` |
| sweet-carol/open-palette | `19d0cedc-80be-4403-91fc-8f64b7fcb6b0` |
| the-cabana/open-palette | `2fea4630-1a6c-43b2-8ba1-576ab3e0c34d` |
| the-cabana/compact (shared lid) | `0203cacf-c0af-4112-8bd5-91ffd66317a3` |
| strong-brew/open-palette | `333b78f7-b714-4b92-9959-c1fb1d41d8d2` |
| strong-brew/crumble | `0d53b957-ccc5-41b7-9072-6421adf05887` |
| bottled-blonde/open-palette | `a7a6cb7f-80e0-446c-84f3-fb39dc50764c` |

Every palette also has a saved Higgsfield product reference (element) built from these photos. The IDs are in the
process doc, section 1.
