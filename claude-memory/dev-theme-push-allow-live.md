---
name: dev-theme-push-allow-live
description: "Pushing to dev theme #149231566950 needs --allow-live because it is the PUBLISHED theme on the dev store (not production); the CLI prompt is otherwise fatal non-interactively"
metadata: 
  node_type: memory
  type: project
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-09-23T18:17:27.738Z
---

`shopify theme push --store nikolbeauty-dev-mab1srre --theme 149231566950 --path shopify-dev --only <file> --allow-live --json`

**Why:** Theme #149231566950 is the *published* theme on the dev store `nikolbeauty-dev-mab1srre.myshopify.com`. Without `--allow-live` the CLI raises an interactive "Push theme files to the live theme?" prompt that fails with exit code 1 in a non-interactive shell. This is still the DEV store — it is not the production store, so CLAUDE.md's live-push rule does not apply. Confirmed 2026-09-23.

**How to apply:** Always include `--allow-live` for this theme. Never use it against `nikolbeauty.myshopify.com` — that is production and Randell pushes it himself ([[user-always-pushes-live]]).

**CLI location (2026-09-30):** `shopify` is not on PATH when nvm has Node v22 active — the CLI is installed only under v20: call `PATH="/c/Users/RaymondSanchez/AppData/Local/nvm/v20.20.2:$PATH" /c/Users/RaymondSanchez/AppData/Local/nvm/v20.20.2/shopify.cmd theme push …`. Don't `nvm use` to switch — it's global and breaks parallel sessions.
