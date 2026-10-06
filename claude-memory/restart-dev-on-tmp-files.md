---
name: restart-dev-on-tmp-files
description: "Claude's own Edit-tool .tmp writes wedge `shopify theme dev`; edit shopify-live first, Copy-Item into shopify-dev; only Randell restarts the server"
metadata: 
  node_type: memory
  type: project
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-08-25T13:52:46.201Z
---

`shopify theme dev` wedges into a latched "Failed to Upload Theme Files" state (every URL serves the Polaris error page, or silently serves stale files) when its watcher catches a transient `*.tmp.*` file — "contains illegal characters". ROOT CAUSE IDENTIFIED 2026-08-25: it is Claude's own Edit/Write tools, which save atomically via `file.liquid.tmp.<pid>.<hash>` inside the watched `shopify-dev/` folder; the watcher races the rename and latches the error even after the tmp file vanishes.

**Why:** every editing session wedges the server repeatedly, blocking Randell's preview and all verification, and only a restart clears the latched state.

**How to apply:** (1) NEVER Edit/Write files directly in `shopify-dev/` while the dev server runs — make the edit in the unwatched `shopify-live/` copy first, then `Copy-Item` it into `shopify-dev/` (direct overwrite, no tmp file), reversing the usual mirror direction; hash-verify both afterwards as usual. (2) If wedged anyway, only Randell restarts: Ctrl+C then `! cd shopify-dev && shopify theme dev --store https://nikolbeauty-dev-mab1srre.myshopify.com` (run from the theme directory — repo root fails with "not a theme directory"; if port 9292 is reported in use, the old process is still dying — retry). (3) Detect the wedge by fetching any page and checking the `<title>` for "Failed to Upload Theme Files" — the error page names the offending file. See [[two-dev-stores]], [[theme-editor-sync-flag]].
