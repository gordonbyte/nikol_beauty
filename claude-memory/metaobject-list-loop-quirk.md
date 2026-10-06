---
name: metaobject-list-loop-quirk
description: "Liquid can't for-loop a metaobject list.metaobject_reference field inline — assign field.value to a variable first"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-09-09T18:04:12.565Z
---

In Shopify Liquid, `{% for item in entry.listfield.value %}` on a metaobject's `list.metaobject_reference` field silently yields ZERO iterations, even when the Admin API shows the references stored and resolving. Assigning first works: `{% assign items = entry.listfield.value %}{% for item in items %}`. Single-value fields (text, file_reference, metaobject_reference) read fine inline either way.

**Why:** hit 2026-09-09 building the coming-soon metaobject system (steps/features/rows rendered empty while the FAQ list — which happened to use the assign-first pattern — worked; cost an hour of debugging).

**How to apply:** whenever looping any metaobject list field in theme code (see coming_soon_page usage in custom-steps-horizontal / custom-icon-features / custom-alternating-rows / custom-faq), always `assign` the `.value` to a local variable before the `for`. Related: [[tolstoy-carousel-class-map]] era coming-soon work; the definitions live on both stores per KAN-211.
