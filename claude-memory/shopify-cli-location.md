---
name: shopify-cli-location
description: "Shopify CLI is only installed under nvm Node v20.20.2 — not on PATH when Node 22 is active; prepend its dir before `shopify theme push`"
metadata:
  node_type: memory
  type: reference
  originSessionId: af6debab-3d9b-4364-829d-d700dd1784e2
  modified: 2026-09-30T15:31:19.178Z
---

`shopify` is not found in Git Bash or PowerShell by default (active Node is v22.14.0). The CLI (3.94.3) lives at `C:\Users\RaymondSanchez\AppData\Local\nvm\v20.20.2\shopify` (+ `.cmd`/`.ps1`).

In Bash: `export PATH="/c/Users/RaymondSanchez/AppData/Local/nvm/v20.20.2:$PATH"` then run `shopify ...` from `shopify-dev/`. Verified working 2026-09-30 for coming-soon staging pushes. Related: [[dev-theme-push-allow-live]], [[two-dev-stores]].
