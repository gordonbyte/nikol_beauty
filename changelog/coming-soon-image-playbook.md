# Coming-soon image playbook

Draft 2026-10-06, for Randell's approval. It's the working agreement for making every
coming-soon product page image: one image at a time, high quality (2K), all generation in Higgsfield.

---

## 1. The page sections and what each one is for

Every coming-soon page has **up to 8 image slots in 4 groups**:

| # | Section (on the page) | Slots | Job of the images |
|---|---|---|---|
| A | **Steps**: "… In 3 Simple Steps" | 3 (4 on palettes) | **Teach.** Show exactly how to use it, one clear action per image. The images must read as one sequence: same setting, light and wardrobe. |
| B | **Skin-safe**: "Made With Skin-Safe Ingredients You Can Trust" | 1 | **Reassure.** Clean, calm and natural, with ingredient cues. The product is the hero, and it feels safe for mature, sensitive skin. |
| C | **Why Mature Women Switched**: the rows | 2–3 | **Prove.** Each row makes one claim (creamy, no tugging, lasts, no colour, etc.), and its image should *show that claim*, not just the product. |
| D | **Banner**: "Stop … / Give … the treatment …" | 1 | **Convert.** Emotional and aspirational: Nikol, confident and happy, with the product. It's the most "ad-like" image on the page. |

Rule of thumb for the mix on one page (8 slots): **3–4 with Nikol, 4–5 without**. That means
product heroes, texture smudges and a hand. No two images on a page use the same setting and pose.

---

## 2. The shot library (we stay inside this list)

Shots 1–7 are from Randell's list. Shots 8–10 are additions that fit the same look.

| Code | Shot | What it looks like | Best used in |
|---|---|---|---|
| **S1** | Product in a hand | Close crop of a hand holding the product, no face (or face soft and out of focus). Slim hand, natural nails, Nikol's diamond band. | Steps, Rows |
| **S2** | Product hero on stone or bathroom | Product alone on marble, travertine or a vanity, morning window light, one or two props. | Skin-safe, Rows, Step 3 |
| **S3** | Product being applied | Partial-face close-up (lips, cheek, eye or jaw) mid-application. | Steps |
| **S4** | Product held next to face | Product beside her cheek or lips, frame cut at the eye line or just below. Smile, skin glow. | Banner, Rows |
| **S5** | Product mirroring itself | Product standing on a mirror or glossy surface with its reflection. | Skin-safe, Rows |
| **S6** | Texture smudge | Product smeared to show colour and texture: a cream swipe, palette pans crushed into a swatch, lipstick smear. | Rows, Step 1 (palettes) |
| **S7** | Face smudge (clear or liquid products) | Dewy swatch of a clear or liquid product on the cheekbone or back of the hand. | Rows ("no colour", "dewy") |
| **S8** | Finished-result close-up | No product in frame, just the result: lips, lids, under-eyes, cheek. | Last step, Rows |
| **S9** | Pairing flat lay | The product with its partner (lipstick plus liner, balm plus liner) and a layered swatch. | "Pair with …" steps |
| **S10** | Shade or swatch row | Several shades swatched side by side on skin or stone. | Rows on multi-shade products |

Every shot uses the same **look**, which is Randell's 35mm lifestyle style block: bright natural daylight,
warm sunlit tones, real skin texture, slight film grain, real locations (marble bathroom, bedroom
window, kitchen counter, café, car). No studio seamless backdrops.

---

## 3. The tools and what each is best at

**Identity (Nikol)**
- **Nikol reference element** (19 real photos): Nikol's face and features in any multi-reference model. Clean it to her *current* look before relying on it.
- **Real shoot photo, retouched**: the most faithful face. Best when her full face shows.
- **Nikol Soul (Soul 2.0)**: the most natural candid or phone-photo realism. It takes only 1 image input, so the product must be swapped in afterwards.

**Generation models**
- **Nano Banana Pro (Google)**: best overall at keeping an exact product *and* Nikol from references. Default for most shots.
- **GPT Image 2.5 (OpenAI)**: best small text and labels ("Nikol Beauty" on a pencil or compact). Backup when product lettering matters.
- **FLUX 3**: up to 10 reference images. Useful when a shot needs Nikol, the product and a setting together.
- **Marketing Studio Product Shot**: built for product shots, with or without people, from a product photo. A quick alternative for product heroes.
- **Soul Location**: generates an empty *setting* (our marble bathroom, bedroom window) to reuse as a background reference, so a page's steps match.

**Fixing and finishing**
- **Nano Banana 2 inpaint (mask)**: changes *only* a painted area (hand size, remove an object, fix a bullet tip). Everything else stays pixel-identical. **This replaces the whole-image edits that caused drift.**
- **Seedream 5 Pro inpaint / Ideogram 4.5 mask**: second-choice masked editors.
- **FLUX.2 Pro Outpaint**: extends or crops an exact side (for example, remove the chest or add headroom) without regenerating.
- **3D Jutsu Angles**: makes new angles of a product from one photo. Used to build product elements when we only have a front shot.
- **Background remover**: clean product cut-outs.
- **Topaz**: enhancement, with a face-enhancement option. Only if a final looks soft.

---

## 4. Setup before images (once per product)

1. **Product element.** 3–5 clean angles of the real product from the Shopify product images (closed, open, tip close-up, side), with 3D Jutsu Angles filling any missing angle. Check it against the real photo (tip shape, embossing, case colour).
2. **Nikol element check.** The same element for every product. Remove photos that aren't her current look (the chin-length bob), add January 2026 shoot photos.
3. **Setting plate (optional, for Steps).** One Soul Location image of the page's setting, reused as a reference by all 3–4 step images.
4. **Higgsfield project** named after the product, so references, attempts and finals stay together.

---

## 5. The process for each shot style (tools in order)

Every shot follows the same loop: **generate one → check once (face, hand, ring, product
shape, colour) → fix with a mask, never a whole-image edit → show Randell → place.**

| Shot | 1st choice | If the product or lettering is off | Fixes | Notes |
|---|---|---|---|---|
| **S2 hero** | Nano Banana Pro + product element (+ setting plate) | GPT Image 2.5 (high) for lettering | NB2 inpaint on the product only | Easiest; do first to prove the product element. |
| **S5 mirror** | Nano Banana Pro + product element | GPT Image 2.5 | NB2 inpaint on the reflection | Check the reflection matches the product (same tip, same case). |
| **S6 smudge** | Nano Banana Pro + product element + a **real smudge photo** from Dropbox as colour reference | — | NB2 inpaint on the smudge | Colour must match the real shade; palette smudges use the real pan colours. |
| **S9 pairing** | Nano Banana Pro + both product elements | GPT Image 2.5 (pencil lettering) | NB2 inpaint per product | One of each product, nothing else. |
| **S1 hand** | Nano Banana Pro + product element + Nikol element (for her band) | — | NB2 inpaint on the hand (size, fingers) | Ask for "slim, delicate, natural nails"; check the hand isn't oversized. |
| **S3 applied** / **S4 next to face** (partial face) | Nano Banana Pro + Nikol element + product element | Soul 2 base → NB Pro product swap | NB2 inpaint (hair, hand, product); Outpaint to crop | Frame at the eye line or nose-down so likeness risk stays low. Hair is always slicked back. |
| **S4 / banner with full face** | **Retouch a real shoot photo** (NB Pro edit: product, lips, wardrobe) | Soul 2 base → NB Pro product swap | NB2 inpaint | Full faces only from real photos or the Soul, never a free generation. |
| **S7 face smudge** | Nano Banana Pro + Nikol element + product element | — | NB2 inpaint on the swatch | Extreme close-up: cheekbone or back of hand; the swatch must look clear and dewy. |
| **S8 result** | Nano Banana Pro + Nikol element | Real photo retouch | NB2 inpaint | No product in frame; check the colour against the real shade. |
| **S10 shade row** | Nano Banana Pro + all shade elements | GPT Image 2.5 | NB2 inpaint per swatch | Order the shades as on the product page. |

---

## 6. Pose descriptions per section (defaults; adjust per product)

### A. Steps (one setting for the whole set, for example the morning marble bathroom in a white robe)
- **Step 1, Prep or start:** S3 or S1. *Lips:* side profile from nose to collarbone, smoothing balm or liner on bare lips, hand small and in the lower corner. *Eyes:* three-quarter close-up of one eye closed, brush or wand at the lid, brow and cheekbone in frame. *Face:* cheek close-up, fingertip dotting product on the high point of the cheek.
- **Step 2, Apply the main product:** S3. Same framing family as Step 1, a little tighter. The product is mid-application with the colour visibly going on. For palettes, Step 2 is the lid shade and Step 3 the crease.
- **Step 3, Finish or pair:** S8 result or S9 pairing. Either the finished area (lips, lid, cheek) with no product, or the pairing flat lay on the same marble.
- **Step 4 (palettes only), Define or highlight:** S3, outer-corner deepening or brow-bone highlight, same eye and angle as Step 2.

### B. Skin-safe (1)
- **Default S2 ingredient hero:** product uncapped or open on travertine or marble, morning light, two or three real ingredient cues from its formula (rosehip, sunflower, botanicals), one soft shadow.
- **Alternative S5 mirror:** product on a round vanity mirror with its reflection, a sprig of the product's key botanical.

### C. Why Mature Women Switched (2–3 rows; the image proves that row's claim)
- **Texture or creamy claim:** S6 smudge, a single swipe on stone next to the product, macro texture visible.
- **Colour or "no colour" claim:** S7 face smudge (clear products) or S10 swatch row (shaded products).
- **Comfort, wear or results claim:** S4 held next to face, café or window light, cut at the eye line, smile, product at cheek height. Or an S8 result close-up.
- **Ease or on-the-go claim:** S1 hand in a real place (car, handbag, café table).

### D. Banner (1)
- **S4 hero:** Nikol, warm and confident, product beside her cheek or at her lips, sunlit café or bedroom window. Head and shoulders allowed, but the face must come from a real photo or the Soul. Leave clean space on one side and keep the product sharp. This is the one image where her full face is welcome.

---

## 7. Order of work for a product (one image at a time)

1. Setup (section 4).
2. **Skin-safe S2 hero**, to prove the product element.
3. **Row smudge or texture shot** (S6 or S7).
4. **Steps 1 → 2 → 3 (→ 4)**, as a matched set in one setting.
5. **Remaining rows** (S4 or S1).
6. **Banner** last, when we know the page's look.

Each image: propose the pose → Randell OKs → generate 1 → check → fix with a mask if needed → show → place →
log it in that day's `changelog/YYYY-MM-DD.md` and the KAN Live Sync task.
