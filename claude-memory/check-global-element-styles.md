---
name: check-global-element-styles
description: "Before introducing a NEW html element type into a styled context, grep theme.css for global rules on that element — Broadcast styles bare elements (blockquote, h1-h6, etc.)"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: bf207d5a-7cc8-45fa-8e4f-677f87f28113
  modified: 2026-08-03T17:27:46.810Z
---

When a fix swaps or wraps markup in a new element type (div→blockquote, adding nav, p→h3), check `theme.css` for global rules on that element BEFORE claiming "zero visual change": `grep -n "^blockquote\|^nav\b..." theme.css`. Broadcast has both a reset block (~line 2158, benign) and typographic defaults (e.g. `blockquote { font-size: var(--font-3); border-left; padding-left; margin }` at ~4497) that will restyle the new element.

**Why:** 2026-08-03, KAN-100 — wrapped the About quote in `<blockquote>` and reset margin/padding/border but missed the global `font-size`, shrinking the 31px quote. Randell caught it ("make sure the quote font size matches what was there before and is appropriately responsive"). Verifying markup presence via curl is NOT verifying computed styles.

**How to apply:** (1) grep global element rules first and counter every property (or use `font-size: inherit`-style resets); (2) for responsive properties, inherit from the parent so existing media queries carry over; (3) after pushing, verify the SERVED minified CSS contains the scoped rule; (4) for layout-structure changes, ask Randell for a quick visual check. Related: [[explain-before-changing]], [[minified-assets-workflow]].
