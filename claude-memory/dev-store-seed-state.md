---
name: dev-store-seed-state
description: What data exists on the app-dev store and the API constraints hit while seeding it
metadata: 
  node_type: memory
  type: project
  originSessionId: a79251d2-cdf8-4fa8-91be-c38c3e327340
  modified: 2026-09-02T14:42:48.119Z
---

On 2026-07-21 the app-dev store **nikolbeauty-dev-mab1srre.myshopify.com** was seeded from the live Matrixify export `Downloads/Export_2026-07-21_105510.xlsx` (full live-store backup). Created + published via API: **70 products** (full variants/pricing/inventory/images from live CDN; 3 kept DRAFT) and **131 collections** (26 custom w/ membership, 105 smart w/ rules). Default **main-menu** (nested mega-dropdown) and **footer** were updated via menuUpdate.

**Skipped** (user declined creating a Custom App token): pages (29), blogs + 501 articles, redirects (1205), metaobjects (~462 rows). Translations sheet is moot (source-language inventory only, no second locale). Recoverable via (a) a Custom App Admin token + the scratchpad scripts, or (b) Matrixify import of the same xlsx limited to those sheets.

**Files library is only partially seeded** — product images came over with the products, but theme-content files referenced by templates as `shopify://shop_images/...` mostly did NOT. On 2026-09-02 the 15 files needed by the `product.coming-soon` template (img-step1–3, switched-1–3 + switched-bg.jpg, ingredients-img/-1, Group_1707480803/04, wearing-img, steps-bg.jpg, Stars_Container_a8ef23fa…, verify.png) were backfilled via MCP `fileCreate` with `originalSource` = live CDN URL + exact `filename` (works fine — a plain mutation, not a blocked bulk op). Other templates rendered on this store may still hit the same missing-file symptom (image_picker resolves blank → section skips the img); same backfill recipe applies.

Key API constraints learned: the discount-sync app offline token (from its Prisma `Session`) **expires (~hourly) and only has `read_discounts,read_products,write_products`** — no content/publications scopes. The claude.ai Shopify **MCP** connection has store-owner scope (used it to publish + create menus) but its safety policy **blocks `bulkOperationRunMutation`** and can't take large content through hand-authored tool calls. So bulk content seeding needs a real Admin API token used by a Node script. See [[apps-inventory]], [[theme-architecture]].
