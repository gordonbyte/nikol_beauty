---
name: discount-sync-runs-locally
description: Discount Sync app runs locally (Randell triggers syncs himself); production go-live is NOT sale-critical
metadata: 
  node_type: memory
  type: project
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-08-03T13:55:13.587Z
---

The Discount Sync app does not need production hosting to support sales: Randell runs it locally via `shopify app dev` and triggers `/api/sync` manually, and is comfortable doing so for live sales (stated 2026-08-03).

**Why:** The original plan treated the go-live (deploy + cron + live install, KAN-133–136) as a hard prerequisite for Fierce Aging (Aug 12–16). Randell corrected this — manual local triggering suffices, so go-live was rescheduled to Aug 19–21 at Medium priority.

**How to apply:** Don't treat app go-live as blocking any sale; don't escalate KAN-133–136 with promo windows. Sale-day discount syncs happen via Randell's local run. Related: [[apps-inventory]], [[user-starts-dev-server]].
