---
name: work-in-live-folder-only
description: "SUPERSEDED 2026-08-28 → edit shopify-dev/ ONLY (Randell runs `shopify theme dev` from it); sync shopify-live/ on request; watch for the Edit-tool .tmp wedge"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-08-28T17:45:26.993Z
---

**Directive history:** 2026-08-27 Randell said work in `shopify-live/` only. REVERSED 2026-08-28: "please only make changes to the -dev folder. that way the system cuts down on the time it spends with edits." — he runs `shopify theme dev` (localhost:9292) from `shopify-dev/`, so edits there reach his localhost directly.

**Current workflow:** Edit `shopify-dev/` ONLY. Sync a change into `shopify-live/` only when Randell asks (that folder is his live-push payload — before any go-live, check whether shopify-live lags shopify-dev). Dev-store test pushes run from shopify-dev: `cd shopify-dev; shopify theme push --store https://nikolbeauty-dev-mab1srre.myshopify.com --theme 149231566950 --allow-live --nodelete --only <file>`.

**Verification path (Randell 2026-08-28):** NEVER restart or touch his dev server ("it is going to take forever") — he restarts things himself. My loop: edit shopify-dev → push to the dev store published theme → verify on the dev store URL (password shegin, cache-busted). Localhost discrepancies = tell him what to check; he handles restarts.

**Standing risk:** my Edit/Write tools create atomic `*.tmp.*` files in the watched folder → the known `shopify theme dev` wedge ("Failed to Upload Theme Files", stale serving) per [[restart-dev-on-tmp-files]]. Randell was warned 2026-08-28; if localhost misbehaves after my edits, he checks the terminal and restarts theme dev. Folders last verified byte-identical 2026-08-28 (386 files, only `.claude/settings.local.json` differs).
