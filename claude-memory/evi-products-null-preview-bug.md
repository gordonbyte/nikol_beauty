---
name: evi-products-null-preview-bug
description: "GET /products/null 404 on product pages = Easy Variant Images (SpiceGems) app-embed bug, fires ONLY on unpublished theme previews; harmless to customers, not fixable in theme"
metadata: 
  node_type: memory
  type: project
  originSessionId: 77cdd99e-e071-4e3d-869b-8327c4390b6b
---

Diagnosed 2026-07-17, reproduced via Playwright on preview_theme_id=186589053232. The Easy Variant Images app embed (SpiceGems, cdnbevi.spicegems.com) renders an inline `sg_evi_insertScript` block on product pages that sets its script URL to `null` when `Shopify.theme.role !== "main"` but still inserts the `<script>` tag. `script.src = null` becomes the relative URL "null" → resolves to `/products/null` → 404 + MIME-refusal console errors.

**Only occurs on unpublished/dev theme previews** — never on the published storefront, so zero customer impact; the error vanishes on any theme once published. The block is app-extension-rendered, not theme code — cannot be fixed in the repo. Fix path: report to SpiceGems (guard needed: `if (sg_evi_scriptUrl) sg_evi_insertScript(...)`). Related: [[apps-inventory]]. Do not confuse with the separate "Exceeded timeout to send pdp request" console error, which is Microsoft Edge's built-in Shopping assistant (confirmed in user's `Edge Shopping/2.1.108.0/auto_open_controller.js`) and unrelated.
