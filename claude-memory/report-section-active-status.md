---
name: report-section-active-status
description: "When working on any theme section, always report whether it's active and where it's placed"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 1f446e1f-d160-4ff4-957c-2fd460819827
---

When working on (or discussing) a section, ALWAYS tell the user whether it is **active** and **where** it is active — before/after making changes.

**Why:** the user needs to know the blast radius of each edit — whether it's customer-facing right now or safe to change.

**How to apply:** for each section, report:
- Which templates / section groups place it (`grep "\"type\": \"<section>\""` across `shopify-live/templates` + `shopify-live/sections/*.json`).
- Whether the instance is enabled (not `"disabled": true`) and in the template's `order`/`block_order`.
- Whether that placement is **customer-facing**: e.g. `index.homepage-style-2` is a **dormant** alt homepage (NOT live), while `product.coming-soon` / default `product` / live `index.json` **are** live-capable.

Relates to the ongoing section-by-section WCAG/BEM/setting-driven cleanup. See [[theme-architecture]].
