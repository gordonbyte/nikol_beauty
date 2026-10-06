# 2026-09-30 — Lip glosses: new Fresh Mint Feel badge (dev store)

Store: `nikolbeauty-dev-mab1srre.myshopify.com`. Admin content + icon toolkit only — no theme code.

## What changed
- Replaced the sprig-and-plus glyph on the **Fresh Mint Feel** trust badge with a serrated leaf (midrib + veins), from Randell's leaf screenshot.
- `fileUpdate` in place on `nikol-badge-fresh-mint-feel.png` (`gid://shopify/MediaImage/34187112022118`), 520×520. Same gid, so nothing needed re-pointing. Alt set to "Fresh Mint Feel badge with a leaf icon" (was "Fresh Mint Feel").
- Added `fresh-mint-feel-leaf` to `tools/icon-badges/proposed.cjs` (label "Fresh Mint Feel", stroke 5) so it re-renders with the family.

## Blast radius (checked before writing)
Scanned the `skinsafe_features` of every `coming_soon_page` (67): the file is used only by the seven gloss pages — Champs #461, Coco 13 #259, Good Vibes #443, Upgrade #94, Defiance #62, Manifest Glow, Ignite #176 — each through its own `*-skinsafe-3` item. No other product touched.

## How the glyph was made
- No trace tool exists in the repo, so wrote one (scratch): screenshot upscaled ×4, thresholded at L < 128, Zhang-Suen thinning to a 1px centreline, walked into edges, spurs shorter than 1.2× the stroke dropped, fragments chained when endpoints sit within 2px and the continuation is straight enough (dot > 0.3), then RDP-simplified and mapped onto the 100-unit grid at 84 units extent.
- First pass gave 191 fragments — diagonal staircase pixels have 3 neighbours in 8-connectivity and read as junctions. The chaining step fixed the continuity (167 short `D` paths remain; they render as continuous strokes with round caps).
- Source stroke measured 3.7 units at that scale (ink area ÷ skeleton length); drawn at the family's 5 instead, so it matches the stroke-5 badges (sensitive-eye, waterline) rather than the screenshot.
- Rendered through `render-proposed.cjs`; output byte-identical to the scratch preview. Compared at 260 and 72 px against the old badge, the avocado sibling on the same row and sensitive-eye.

## Upload route
Staged as `nikol-stg-lip-gloss-mint-1-fresh-mint-feel-leaf.png` in `shopify-dev/assets/`, pushed under `/tmp/nikol-theme-push.lock`, 200 on CDN, `fileUpdate`, READY at 520×520, local staging copy deleted. The staged asset is still on theme 149231566950.

## Verified
Dev storefront `/products/champs-lip-gloss`: trust block serves `nikol-badge-fresh-mint-feel.png?v=1790800059` with the leaf glyph, 130px box, in line with the avocado and cruelty-free badges.

## Follow-up — Shea Butter & Avocado Oil (Randell request)
- The glosses' first trust row was "Avocado Oil & Shea Butter" on an avocado glyph. Reordered to lead with shea and moved onto the house shea-nuts glyph (the one on Shea Butter Formula / Just Peachy / Dream Melt and the lipsticks' Shea & Olive Oil).
- New toolkit entry `shea-and-avocado-oil-nuts`: ops and stroke taken by reference from `shea-butter-formula-nuts`, so the two can't drift. Arc label "Shea & Avocado Oil" (follows the lipsticks' "Shea & Olive Oil" pattern); fits at full 33px, no shrink.
- `fileUpdate` in place on `nikol-badge-avocado-oil-and-shea-butter.png` (`gid://shopify/MediaImage/34187111989350`) — used only by the seven glosses (same page scan as above). Filename kept so live replication is a straight Replace; alt → "Shea Butter & Avocado Oil badge with two shea nuts and leaves".
- Title on all seven `*-skinsafe-1` items → "Shea Butter & Avocado Oil" (Champs, Coco 13, Good Vibes, Upgrade, Defiance, Manifest & Glow, Ignite). Body text "Hydrating emollients that leave lips soft, never sticky." unchanged.
- Staged as `nikol-stg-lip-gloss-shea-1-shea-and-avocado-oil-nuts.png`, pushed under lock, 200 on CDN, READY; local staging copy deleted.
- Verified on `/products/manifest-glow-lip-gloss`: new title and shea badge (`?v=1790800737`), in line with Cruelty-Free and the new mint leaf.
