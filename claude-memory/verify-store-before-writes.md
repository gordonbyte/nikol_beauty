---
name: verify-store-before-writes
description: Shopify MCP connection can silently switch between live and dev stores mid-session — verify get-shop-info immediately before EVERY write batch
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-08-04T16:06:04.192Z
---

The claude.ai Shopify MCP connector is store-switchable and **reverted from the live store to the dev store mid-session on 2026-08-04 without any visible signal** — a 45-item suffix sweep intended for live ran against nikolbeauty-dev instead (KAN-105; caught only because a product query returned a dev onlineStoreUrl).

**Why:** a store check at session start (or before an earlier task) does NOT guarantee the same store minutes later; Randell connects live narrowly per-task and it can switch back.

**How to apply:** immediately before EVERY mutation batch (not once per session), run `get-shop-info` AND spot-check an `onlineStoreUrl` on a queried object; confirm the domain matches the intended store (nikolbeauty.com = live, nikolbeauty-dev.myshopify.com = dev). Also note: template assignments/suffixes are per-store CONTENT — they never travel with theme pushes, so dev content edits can never leak to live. Related: [[user-always-pushes-live]], [[live-sync-code-only]], [[dev-store-seed-state]].
