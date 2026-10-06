---
name: live-sync-code-only
description: "Randell's go-live policy: live store SETTINGS are kept — only functioning CODE is pushed; template/settings changes need editor actions on live"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-08-04T15:13:38.060Z
---

At dev→live sync time, Randell pushes **code only** (sections, snippets, assets, config/settings_schema). He **keeps the live store's settings** — `settings_data.json` and `templates/*.json` on live are live-owned and are NOT overwritten by his push (stated 2026-08-04: "i keep live settings and only update functioning code").

**Why:** live templates/settings carry merchant content (slides, block placements, colors) that must not be clobbered by dev-side state.

**How to apply:** any dev change to a template JSON or settings_data does NOT reach live via the sync — it needs an explicit theme-editor (or approved API) action on live, tracked on the go-live checklist task **KAN-146** under KAN-119. When completing a dev task that touches templates/settings, add its editor step to KAN-146 instead of assuming the file rides the push. Related: [[user-always-pushes-live]], [[live-theme-drift]].
