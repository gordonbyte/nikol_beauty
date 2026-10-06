# 2026-10-05: Color Corrector Collection (`color-corrector-collection-2`)

Coming-soon page on the **dev** store (`nikolbeauty-dev-mab1srre`), template `product.coming-soon`.

Redone:
- the skin-safe photo
- all 3 "Why Mature Women Switched" rows
- the "Stop Guessing Which Corrector You Need" banner

No theme files changed. Live replication: **KAN-228** (under KAN-119).

## Starting state

- **Skin-safe image:** the product's own gallery shot (`color_corrector_product_image_group_swatch.png`).
  Repointed only; the file is untouched because the product gallery uses it.
- **Rows 1–3 and banner:** the shared `nikol-image-coming-soon-placeholder.png`. Repointed; the placeholder is
  untouched (Fresh Beauty verified still showing it).
- **Steps:** all three still show the placeholder. Not in scope, left as is.

## Product facts used (listing + product shots)

- The collection is three white jumbo crayons:
  - **Just Peachy:** peach. "Dark under eyes & discoloration, fair, light to medium."
  - **No Redness:** mint green. "Redness, hyperpigmentation, blemishes, all skin tones."
  - **Simply Apricot:** apricot. "Dark under eyes & discoloration, light to medium."
- Formula: creamy, Shea Butter, medium to full coverage, fragrance-free, made in the USA.
- **Tip colours measured** (median Lab of each tip in its own product shot):
  - Just Peachy 69.8 / 19.2 / 21.9
  - No Redness 74.0 / −22.2 / 27.7
  - Simply Apricot 49.0 / 27.2 / 29.4
- **Swatch colours measured:**
  - Just Peachy 81.2 / 17.3 / 21.7
  - No Redness 89.5 / −15.4 / 11.3
  - Simply Apricot 76.6 / 28.8 / 20.3

## Photo selection (2025 Q1 shoot: the corrector session, Nikol with corrector lines on her face)

- **Old Simply Apricot packaging.** The red-tipped stick in this shoot is the old "EXTREME CANCEL" print
  (readable on #1658). Simply Apricot's real tip is a deep terracotta, not red.
- **Skin-safe → #1685:** Nikol applying the green No Redness stick to her cheek, label readable. Real
  product, no edits beyond crop and gamma. 1100×1280 portrait to match the other pages.
- **Row 1 → #1670:** Nikol dabbing **Just Peachy** beside her chin, label readable. No edits beyond crop and
  gamma.
- **Row 2 → #1658:** close-up of the red-tipped stick at her under-eye, cropped 1250 px square.
  - The "EXTREME CANCEL" print is out of frame; only the white barrel and tip remain.
  - Tip recoloured in Lab to the measured Simply Apricot tip.
  - The coral swatch on her cheek is left as is: it measures L 72–78 / a 29–36 / b 18–28, against the
    Simply Apricot swatch at 76.6 / 28.8 / 20.3.
- **Row 3 → generated product-alone shot** (Higgsfield `nano_banana_pro` 2k, reported `nano_banana_2`).
  - Input: the collection group shot plus Simply Apricot and No Redness singles. Variant B (linen) chosen
    over A (stone); A's lettering was weaker.
  - **Real labels pasted over the generated ones.** The generated print had errors, e.g. "TEINT DE PÉCILI".
    Each real label (x 442–548, y 526–838 of its own product shot) was scaled ×1.70 onto its barrel.
  - Each column's tone was matched to the clean generated barrel above it, so the scene lighting carries over.
    The generated print was first wiped across the full barrel width.
    - Dead end: a narrow wipe left ghost letters at the edges.
  - **Tips and swatches set in Lab** to the measured values, using polygon + chroma masks.
    - Dead end: region growing leaked into the linen shadows.
  - Measured after:
    - tips 63.4/23.2/25.8, 73.0/−25.9/31.1, 47.2/32.0/34.5
    - swatches 82.9/17.0/20.4, 89.5/−15.5/10.7, 76.8/29.5/21.1
- **Banner → #1601:** Nikol, hand at cheek, holding all three sticks between her fingers. Square crop from
  x 2249.
  - The red-tipped stick's tip was recoloured to the Simply Apricot tip with a redness-weighted mask, so the
    barrel and skin are untouched.
    - Dead end: region growing left a red rim.
  - The last two blurred letters of the old name, where the barrel meets her finger, were replaced by copying
    clean barrel from further along the same cylinder (offset 88, 66). Only "NIKOL BEAUTY" stays legible on that stick.
    - Dead end: blur-inpainting smeared skin tone into the barrel.
- **No face generation anywhere:** every image of Nikol is the original photo; only stick tips and print were
  edited.
- Gamma 1.20 with roll-off on all four Nikol photos (corners 255).

## Copy (rows)

| Row | Was | Now |
|---|---|---|
| 1 | One Set, Every Concern Covered | Just Peachy for Shadows and Spots |
| 2 | Creamy Twist-Up Sticks | Simply Apricot Under the Eyes |
| 3 | Better Results With Less Concealer | A Match for Every Discoloration |

- "Twist-up" and "no sharpener" were dropped: neither is shown in the photos or stated in the listing.
- The 15% saving is already in `switched_text`, so it isn't repeated.

## Shopify (dev)

- **Files (all READY):**

| File | Size | MediaImage |
|---|---|---|
| `nikol-color-corrector-skinsafe-no-redness.jpg` | 1100×1280 | 46011708997734 |
| `…-switched-just-peachy.jpg` | 2000² | 46011709030502 |
| `…-switched-simply-apricot.jpg` | 2000² | 46011709063270 |
| `…-switched-trio.jpg` | 2000² | 46011709096038 |
| `nikol-color-corrector-banner-trio.jpg` | 2000² | 46011709128806 |

- Staged as `nikol-stg-color-corrector-collection-2-1-*.jpg` under the push lock; local copies deleted.
- `cs_content_item` 305513627750 / …660518 / …693286 updated in place. These are this product's own records,
  with no other references.
- `coming_soon_page` 275069796454: `skinsafe_image` and `banner_image` repointed.

## Verified on the dev storefront

- Skin-safe 667×898.
- Rows 578×578 ×3, alternating.
- Banner: desktop 550×383, tablet 355×359, phone 360×360.
- Fresh Beauty still shows the placeholder.

## Flagged, not actioned

- **The page has only one FAQ**, the "What goes with" item.
- **The three step images are still the placeholder.** Same session photos could fill them if wanted.
- **The 2025 shoot shows Simply Apricot's predecessor packaging ("Extreme Cancel", red tip).** Any future use
  of those frames needs the same tip recolour and print check.
