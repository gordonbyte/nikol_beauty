---
name: tolstoy-bubbles-account-shared
description: "Tolstoy Bubble widgets are account-level — a bubble created on the dev store renders on LIVE too (shared appKey, no theme block needed)"
metadata: 
  node_type: memory
  type: project
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-09-09T13:38:15.979Z
---

Tolstoy "Bubble Feed" widgets need no theme block and are configured per **account appKey**, which Nikol Beauty's live and dev stores share (appKey `b225d60e-5674-429d-bd9e-a473ff048f8c`). Any store whose theme has the Tolstoy app embed enabled renders the account's active bubble bottom-right on every page — so a bubble created as a dev-store test appears on nikolbeauty.com immediately (happened 2026-09-08 with "Bubble TEST (DEV)", caught 2026-09-09, Randell disabled it).

**Why:** the embed's `apilb.gotolstoy.com/settings/bubble` lookup resolves by account, not store; same account-level sharing as playlists (see [[tolstoy-carousel-class-map]] era findings).

**How to apply:** treat bubble widgets as live-affecting even when "created on dev" — keep test bubbles switched off except during an active test window; to check what's rendering, the bubble lives in a shadow root under `#tolstoy-bubble-root`, and `/settings/bubble` returns the active publishId.
