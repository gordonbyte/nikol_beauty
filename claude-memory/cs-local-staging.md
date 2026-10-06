---
name: cs-local-staging
description: New coming-soon images/text are staged in shopify-live/assets/custom-coming-soon-staging.json and shown only in the local preview; pushed to the dev store at the end
metadata:
  type: project
---

Set up 2026-10-06 at Randell's request: stage new coming-soon images locally first, then publish them all to the dev store at the end.

- **Staging file:** `shopify-live/assets/custom-coming-soon-staging.json`, holding `{ products: { <handle>: { skinsafe, rows:{1..3}, steps:{1..4}, banner, status } } }`.
  - Each slot has `src`, which is either a file in assets/ (resolved against the local asset path) or an https URL.
  - Each slot also has `alt`, an optional `title`/`text` (rows, steps) or `heading` (banner), and `status` (staged or published).
- **Loader:** `shopify-live/snippets/custom-cs-staging.liquid`, rendered once at the end of `custom-product-coming-soon.liquid`. It's active only on localhost/127.0.0.1.
  - It fetches the JSON through the local `/cdn/...` path, because the CDN origin is blocked cross-origin.
  - It targets the sections by class names (`.custom-icon-features__image img`, `.custom-alternating-rows__row`, `.custom-steps-horizontal__card`, `.custom-info-banner__image img` / `__title`).
- Randell said to build it in **shopify-live** (his preview serves from there). It's not mirrored to shopify-dev.
- **Publish step (later):** upload each staged image with fileCreate, set the metaobject fields and text on the dev store, then mark the entries published. Before publishing, back up and verify the store per [[verify-store-before-writes]].
- Clean-slate reset 2026-10-06; the restore file is `backups/coming-soon-image-assignments-2026-10-06.json`. Related: [[images-lead-text-follows]], [[coming-soon-image-playbook]], [[one-image-at-a-time]].
