---
name: flagged-backlog-location
description: The 74-item flagged-but-unresolved backlog lives in changelog/flagged-backlog-2026-07-29.md - Randell will return to it to triage into Jira
metadata: 
  node_type: memory
  type: project
  originSessionId: 5a3d1f19-d248-4c3e-b719-14ac52b3e1d4
  modified: 2026-07-30T13:44:42.570Z
---

The full sweep of daily notes (2026-06-24 to 07-24) produced 82 flagged-but-never-resolved items; after live-store verification 74 remain, recorded with stable item numbers in **`changelog/flagged-backlog-2026-07-29.md`** (committed to the repo). Randell triages by number ("add #13 and #40 to Jira").

**How to apply:** when Randell says "back to the list" / references item numbers, read that file. When filing items into Jira, follow [[jira-board-conventions]]; update the file's status annotations as items get resolved or filed. Notable: #13 (cart upsell resurrected on live), #14 (head dup include back per 07-30 live pull), #8 (UpPromote likely uninstalled - confirm), #40 (BB Crème gallery rethink).

**Connector caution (2026-07-30):** Randell switches the Shopify MCP connector between the LIVE store (nikolbeauty.com) and the DEV store - ALWAYS run get-shop-info to confirm which store is connected before any store checks or reporting "live" findings. In-flight when he switched to dev: backlog triage against the live store was mid-stream; on reconnect to live, pending follow-ups are #8 (confirm UpPromote uninstall), #13 (upsell keep/remove decision), #3 (create 4 promo style metafield definitions, needs his approval).
