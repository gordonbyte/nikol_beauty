---
name: live-theme-drift
description: "Folder relationship RESET 2026-07-20: shopify-dev is now an exact mirror of shopify-live (live pull = source of truth); old three-bucket sync rules retired; dev folder intentionally untracked in git"
metadata: 
  node_type: memory
  type: project
  originSessionId: 77cdd99e-e071-4e3d-869b-8327c4390b6b
---

**Status 2026-07-20:** the new theme went LIVE on the store 2026-07-17 (~10:00–10:13 AM ET, theme "Nikolbeauty_7/16/26"), receiving same-day hotfixes (head-dup include removal, [[zipify-creditsyard-xhr-conflict]] shim, theme.js product-images null-guards). User then pulled the up-to-date live theme into shopify-live/ and declared it the source of truth; shopify-dev/ was rebuilt as an EXACT mirror of shopify-live/ (robocopy /MIR, only `.claude/` excluded; verified 0 diffs). Dev work builds on this baseline going forward.

**Old three-bucket sync rules (code=dev / settings=live / templates=mixed) are RETIRED** — dev now intentionally carries live's settings_data.json, group JSONs, and template JSONs. Don't "fix" that.

**Git reality:** shopify-dev/ is intentionally untracked (commit 162cf88 "Update live theme; remove dev theme and exclude local tooling") — only shopify-live/ is versioned; dev edits have no git safety net. Pre-mirror dev snapshot: shopify-dev-backup-2026-07-20.zip in the 2026-07-20 session scratchpad (temp dir, may not persist).

**Standing rule:** the user ALWAYS pushes themes to the store themselves — see [[user-always-pushes-live]]. Related: [[minified-assets-workflow]] (script still reads from shopify-live sources — now consistent again since folders are identical), [[keep-live-shopping-template]].
