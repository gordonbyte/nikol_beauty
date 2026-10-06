---
name: two-dev-stores
description: There are TWO dev stores — theme work targets nikolbeauty-dev.myshopify.com; MCP usually points at the app-dev store (nikolbeauty-dev-mab1srre)
metadata: 
  node_type: memory
  type: project
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-08-11T20:41:40.347Z
---

Nikol Beauty has TWO development stores (discovered 2026-08-11 after a push landed on the wrong one):

1. **Theme dev store — `nikolbeauty-dev.myshopify.com`** (public, no password). Published theme #186425934130 "Nikolbeauty_7/08/26". This is where PageSpeed scans run and where theme-code changes get pushed for verification (`shopify theme push --store nikolbeauty-dev.myshopify.com --theme 186425934130 --only ... --nodelete --allow-live` — the `--allow-live` refers to this dev store's published role, NOT the real live store).
2. **App-dev store — `nikolbeauty-dev-mab1srre.myshopify.com`** (password-protected, Shopify Plus App Development plan). Discount Sync app installed here; seeded 2026-07-21 from live export ([[dev-store-seed-state]]). The Shopify MCP connector typically points HERE — `get-shop-info` returning name "nikolbeauty-dev" with domain `-mab1srre` means app-dev, not the theme dev store.

**Why:** the stores share the name "nikolbeauty-dev", so an MCP identity check can pass while a theme push targets the wrong store.

**How to apply:** before any theme push, match on the full domain, not the store name. MCP says `-mab1srre` → app data/discount work; theme pushes always name `nikolbeauty-dev.myshopify.com` explicitly. Related: [[verify-store-before-writes]].
