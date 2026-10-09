---
name: staging-key-is-dev-handle
description: Coming-soon staging JSON must be keyed by the DEV store product handle, which can differ from live (e.g. soft-set-technique™-brush)
metadata:
  type: project
---

`custom-coming-soon-staging.json` products are matched client-side on the dev store's `product.handle`. Some dev handles differ from live: the Soft Set brush is `soft-set-technique™-brush` on dev and `soft-set-technique-brush` on live.

**Why:** 2026-10-09. I keyed the Soft Set page by the live handle and Randell saw no images on 127.0.0.1.

**How to apply:**
- Before staging a page, look up the dev product handle with `products(query:"title:...")`. Products that have the `custom.coming_soon` metafield link to the page.
- Use the dev handle as the key, and use it in the local preview URL too.
- Part of [[cs-local-staging]].
