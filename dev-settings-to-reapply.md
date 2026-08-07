# Dev settings/template changes to RE-APPLY after pulling live settings

**Why this file exists (Randell, 2026-08-07):** during the dev→live transfer, Randell pulls the LIVE store's theme settings (settings_data.json + template JSONs) over the dev work. Everything below lives in those files, so it WILL be overwritten by that pull and must be re-applied afterward. CSS/schema/snippet changes are NOT listed here — they are code and ride the push untouched.

Companion: KAN-146 is the go-live checklist for applying these to the LIVE store via the editor; this file is the re-application list for whichever theme folder gets the pulled live settings.

## templates/collection.json

1. **Hero section (`collection-image-with-title`) — Custom CSS box: must be EMPTY.**
   The pulled live template carries this rule — delete it (it defeats the 24px title padding shipping in main.min.css):
   `.hero__content.hero__content--transparent {padding-top: 20px !important; padding-bottom: 0px !important;}`
2. **Top Rich text section** (renders `{{ collection.description }}`):
   - section `padding_top: 24` (live has 0)
   - section `padding_bottom: 24` (live has 0)
   - its text block `padding_bottom: 0` (live has 10)
3. **Bottom Rich text section** (renders `{{ collection.metafields.custom.bottom_description | metafield_tag }}`):
   - section `padding_top: 24` (live has 0)
   - section `padding_bottom: 44` (live has 100) — 44 not 24 on purpose: the heading inside the metafield content adds ~19px visual space above the text; 44 bottom optically matches the 43px top gap
   - its text block `padding_bottom: 0` (live has 16)

## Deleted templates (a settings pull can resurrect them — delete again if they reappear)

- `templates/product.waitlist.json` (+ its section `sections/custom-product-waitlist.liquid`, which is code — deleted from repo 2026-08-07; 10x Mirror launched, waitlist retired)
- `templates/product.new.json` (+ `sections/product-new.liquid`) — deleted earlier (KAN-144)

## settings_data.json — new schema settings that need NO action

- `card_price_color` (default `#564646`, changed from #000000 on 08-07) and `card_sale_price_color` (default `#d34270`) were added to `settings_schema.json` (code). Neither store has explicit values, so the schema defaults apply automatically. Only act if the pulled settings somehow carry values for these keys that differ from the defaults.

## settings_data.json — values the live pull brings in WRONG

- **Social media → Facebook** (`facebook_link`): live carries `https://www.facebook.com/nikolcosmetics` — change to `https://www.facebook.com/nikolfreshbeautystudio` (CONFIRMED by Randell 08-07: "should be the one used throughout the site"; the JSON-LD equivalent is fixed in code, and the repo's dev settings_data.json is already corrected). All other footer social paths (incl. TikTok `@nikolcosmetics`) confirmed correct by Randell — leave them.

## Checks after re-applying

- /collections/eyes: title band 24px above/below the heading, hairline border top+bottom; top description band 24/24; bottom description visually even (~43/44)
- /collections/best-sellers (no-image title): same 24/24 + borders (this variant is pure CSS — if it's wrong, the problem is the code push, not settings)
- Product cards: regular price black #000, sale price raspberry #d34270, old price first + smaller

## Older settings items already tracked on KAN-146 (not duplicated here)

Slideshow retired-slide deletions + autoplay off (KAN-103/140) · header link hover + sale badge colors → #fcc9c6 (KAN-141) · dormant upsell block deletion on the product template (KAN-138) · `custom.promo_amount` metafield definition (KAN-139) · 14 collection descriptions (KAN-128).
