# Theme promo display contract (audited 2026-07-20)

What the app must write for the theme's existing promo display to work. Verified in the
current live theme (mirrored in shopify-dev). All display is gated on the merchant-controlled
theme setting `promo_badge_enable` (+ badge colors `promo_badge_bg_color` / `promo_badge_text_color`).

## Consumers

| File | Where it shows | Reads |
|---|---|---|
| `snippets/product-price.liquid` | PDP main price + badge | 1-variant: product tag · >1-variant: per-variant metafield (JS recalcs on variant change; updates `[data-promo-new]`) |
| `snippets/product-grid-item.liquid` | Collection/grid cards: promo badge + slashed price (off `price_min`) | **tags ONLY** (`promo-<n>` → "N% OFF", `promo-up-to-<n>` → "UP TO N% OFF") |
| `snippets/cart-bar.liquid` | Sticky add-to-cart bar on PDP | same rule as product-price.liquid |

## Per-discount styling (added 2026-07-21)

Optional **product-level** metafields (namespace `custom`, type `single_line_text_field`),
written for a product only when its **winning discount** (the one behind its highest covered %)
has that field set in the app. The theme reads each with a fallback:

| Metafield | Controls | Fallback when absent |
|---|---|---|
| `custom.promo_badge_bg` | card promo-box badge bg + PDP/cart "On Sale" pill bg | `settings.promo_badge_bg_color` |
| `custom.promo_price_color` | discounted sale-price text (card, PDP, cart bar) | `settings.promo_badge_bg_color` |
| `custom.promo_badge_text` | badge text template, verbatim, contains `{n}` | built-in `{n}% OFF` (localized `off`) |
| `custom.promo_badge_style` | card badge shape: `ribbon` = glossy corner ribbon (top-right, color via `--promo-ribbon-color` CSS var, `{br}` rendered as space) | absent = circle `promo-box` |

- The theme substitutes `{n}` with the product's percent and keeps the automatic "Up to" line
  for `promo-up-to-<n>` products. `settings.promo_badge_text_color` (card text color) stays global.
- `{br}` in the badge text starts a new line inside the round badge (each segment renders as its
  own `promo-box__line` span, which the CSS stacks). Example: `Big Sale{br}{n}% OFF` → two lines.
- These are cleared (metafieldsDelete) on the same path as `promo_percent` when a product goes
  off sale / the discount is untracked / "Clear everything" runs.
- Styling is product-level (winning discount) — a product split across two discounts shows the
  higher-%'s styling for all variants. Colors are validated to a hex pattern app-side.

## Write rules (per targeted product)

- **Single-variant product** → product tag only:
  - `promo-<n>` (integer percent). Metafields ignored by the theme for these.
- **Multi-variant product** → BOTH:
  - per-variant metafield `custom.promo_percent` (number_integer, PRODUCTVARIANT,
    definition exists: gid://shopify/MetafieldDefinition/245003682096) on each targeted variant;
  - product tag for the cards: `promo-<n>` when every variant is targeted at the same %,
    otherwise `promo-up-to-<max>` (highest % among targeted variants).
- Percent must be a positive integer (theme does integer math off it; `vp > 0` checks).

## Clear rules (sale end / untrack / discount deleted / uninstall)

- DELETE the `custom.promo_percent` metafields (`metafieldsDelete`) — theme checks
  `!= blank`, so a lingering `0` would still be "blank-false" but pollutes data; July-4th
  undo used delete. Never write `false`/`0` to clear.
- REMOVE the `promo-*` tags (`tagsRemove`).
- The app must only ever remove tags/metafields it wrote (tracked in its DB), in case
  promo tags are also set manually during a campaign.

## Gotchas found in the code

- Card badge suppressed when the product is sold out (`sold_out == false` check) — fine, no app action.
- Tag parsing is order-sensitive: `promo-up-to-` is checked BEFORE `promo-`, so a product must
  never carry both forms at once.
- Cards compute the slashed price from `price_min` × the TAG percent — with mixed variant
  percents the card shows "up to N%" price from the cheapest variant; acceptable display
  approximation, matches July-4th behavior.
- Bundles special case from July-4th (promo_percent=100 + manual real price edits):
  OUT OF SCOPE pending user decision — app skips products it would map to 100%? No:
  app applies whatever the discount says; the old 100 values were a manual hack, not a
  contract. Just don't recreate that pattern.
