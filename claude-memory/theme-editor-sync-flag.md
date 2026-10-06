---
name: theme-editor-sync-flag
description: "shopify theme dev without --theme-editor-sync silently strands Randell's theme-editor edits on the Development theme"
metadata: 
  node_type: memory
  type: project
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-08-18T15:25:10.073Z
---

Randell edits section settings in the theme editor attached to his `shopify theme dev` session. Without the `--theme-editor-sync` flag, those edits are saved ONLY to the session's Development theme (e.g. #149852258406 on app-dev, 2026-08-18) — they are never written to the local folder, and the next dev-session serve of the stale local file makes them look lost.

**Why:** CLI 3.x only pulls editor changes down to disk with `--theme-editor-sync`; observed 2026-08-18 when his homepage-style-2 padding edits (media_padding 80/70) were missing from the local template.

**How to apply:** When his editor edits are "missing," check the DEVELOPMENT-role theme's copy of the file (OnlineStoreTheme files API) and rescue-pull it into the local folder (`shopify theme pull --theme <dev-theme-id> --only <file>` after backing up local). Recommend he start sessions with `shopify theme dev --theme-editor-sync`. Related: [[restart-dev-on-tmp-files]], [[user-starts-dev-server]].
