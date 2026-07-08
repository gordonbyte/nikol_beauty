# Promo metafield manifest — 2026-07-02 (4th of July sale)

> **✅ FULLY UNDONE 2026-07-07.** All remaining `custom.promo_percent` values (100, on the 3 multi-variant bundles) were deleted via `metafieldsDelete`; verified `metafieldsCount: 0`. The metafield definition was kept for future sales. The 8 non-bundle products' values and the `promo-25` tags had already been cleared earlier. **Bundle prices were also reverted** to the pre-sale "Old price" values below via `productVariantsBulkUpdate` (101 variants, verified live; compare-at untouched) — restoring the built-in ~15% markdown display.

Record of the one-time manual `custom.promo_percent` write applied via the Shopify Admin API (Option A). Display-only per-variant sale % for the PDP; the real discount is the Shopify automatic discount at checkout. **Temporary — remove after the sale (see Undo below).**

## Metafield definition
- **ID:** `gid://shopify/MetafieldDefinition/245003682096`
- namespace/key: `custom.promo_percent`
- type: `number_integer`, ownerType: `PRODUCTVARIANT`, storefront access: `PUBLIC_READ`, pinned

## Values written (31 variants, 8 products)

| Product | Handle | Variant | Variant ID | % |
|---|---|---|---|---|
| Brow Mascara | brow-fixx | Blonde | 44969135112496 | 30 |
| Brow Mascara | brow-fixx | Clear | 44969135079728 | 40 |
| Brow Mascara | brow-fixx | Milk Chocolate | 44969135145264 | 40 |
| Brow Mascara | brow-fixx | Cocoa | 44969135046960 | 40 |
| Creamy Concealer | custom-concealer-trio-in-buffed-cool | Light | 46696544764208 | 25 |
| Creamy Concealer | custom-concealer-trio-in-buffed-cool | Fair | 46696544731440 | 30 |
| Creamy Concealer | custom-concealer-trio-in-buffed-cool | Med | 46696544829744 | 30 |
| WaterProof Lip Liner | lip-liners-waterproof | Silk | 44969137832240 | 25 |
| WaterProof Lip Liner | lip-liners-waterproof | Rose All Day | 44969137865008 | 25 |
| WaterProof Lip Liner | lip-liners-waterproof | Cameo | 44969137897776 | 25 |
| WaterProof Lip Liner | lip-liners-waterproof | Unapologetic | 44969138389296 | 30 |
| WaterProof Lip Liner | lip-liners-waterproof | Organza | 44969137963312 | 50 |
| WaterProof Lip Liner | lip-liners-waterproof | Coral | 44969138192688 | 50 |
| BB Crème | bb-cream | Fair | 44969140420912 | 25 |
| BB Crème | bb-cream | Light | 44969140814128 | 25 |
| BB Crème | bb-cream | Light/Medium | 44969140846896 | 25 |
| BB Crème | bb-cream | Tan | 44969140879664 | 50 |
| Serum Foundation | serum-foundation | Fair | 48702325293360 | 30 |
| Serum Foundation | serum-foundation | Light | 48702325326128 | 30 |
| Serum Foundation | serum-foundation | Ivory | 50382781743408 | 30 |
| Serum Foundation | serum-foundation | Light Medium | 48702325358896 | 50 |
| Lux Brush Soap | lux-brush-soap | Large | 48725196996912 | 25 |
| Lux Brush Soap | lux-brush-soap | Travel Size | 48725197029680 | 30 |
| Cream Blush Stick | lip-and-cheek-cream | Palm Beach | 44969134686512 | 50 |
| Cream Blush Stick | lip-and-cheek-cream | St. Barths | 44969134719280 | 50 |
| Cream Blush Stick | lip-and-cheek-cream | Paris | 47363734569264 | 50 |
| Cream Blush Stick | lip-and-cheek-cream | Coconut Row Bronzer | 47363734602032 | 50 |
| Skinny Brow Pencil | skinny-brow-pencil | Dark Blonde | 44969134948656 | 30 |
| Skinny Brow Pencil | skinny-brow-pencil | Taupe | 44969134915888 | 30 |
| Skinny Brow Pencil | skinny-brow-pencil | Brownie | 44969134981424 | 30 |
| Skinny Brow Pencil | skinny-brow-pencil | Soft Gray | 44969135014192 | 30 |

## Undo after the sale (any one of these)
1. **Instant hide:** turn OFF theme setting "Show promo % badge" (`promo_badge_enable`) — hides all promo display sitewide.
2. **Wipe all values in one action:** delete the metafield definition `gid://shopify/MetafieldDefinition/245003682096` (Settings → Custom data → Variants → "Promo percent" → Delete, and choose to delete the values). Removes `custom.promo_percent` from every variant at once.
3. **Remove the PDP code:** revert the theme commit that reads the metafield.

Source of truth: the four active "…Off 4th of July Sale" automatic discounts (25/30/40/50%), read 2026-07-02. If discount membership changes, re-run/adjust to match.

---

## Bundles added to the 25% sale (2026-07-02, later same day)

Bundles were added to the "25% Off 4th of July Sale" discount. They had a **built-in 15% markdown** (price = 85% of compare-at), which stacked with the 25% discount. Per request, the built-in sale was removed so the **25% discount is the only discount**, and the promo system was applied.

### Price change — removed the built-in 15% sale (set price = compare-at)
Original prices recorded for undo. To revert, set `price` back to the "Old price" below (compare-at was left unchanged).

| Bundle | Product ID | Variants | Old price | New price (= compare-at) |
|---|---|---|---|---|
| The Best Seller Beauty Bundle | 9489814683952 | 64 | $229.50 | $270.00 |
| Beginner Beauty Bundle | 9489879728432 | 24 | $129.20 | $152.00 |
| Perfect Complexion Bundle | 9493969043760 | 12 | $114.75 | $135.00 |
| Volume Up Mascara Bundle | 10094974370096 | 1 | $40.80 | $48.00 |

### Promo applied
- **Tag `promo-25`** added to all 4 bundles (drives the card badge + card price calc; drives the single-variant Mascara Bundle PDP).
- **Metafield `custom.promo_percent = 25`** written to all variants of the 3 multi-variant bundles (100 variants: 64 + 24 + 12) for the PDP calc. The single-variant Mascara Bundle uses the tag only (no metafield).

Net effect: bundles now show a clean single 25% off (e.g. Best Seller $270 → $202.50), matching the other sale products. Undo the price change by restoring the "Old price" values; undo the promo via the three options above (the tag would also need removing from these 4 bundles).
