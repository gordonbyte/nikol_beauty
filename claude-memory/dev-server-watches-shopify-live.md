---
name: dev-server-watches-shopify-live
description: "Randell's local `shopify theme dev` serves from shopify-live/, so theme edits must be mirrored into BOTH folders or he won't see them locally"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-09-29T19:45:36.364Z
---

Randell's local `shopify theme dev` server serves from **`shopify-live/`**, not `shopify-dev/`. Theme file edits must be copied into **both** folders, or he restarts his dev server and still sees the old version.

**Why:** on 2026-09-29 a section change (four-step layout in `custom-steps-horizontal.liquid`) was made only in `shopify-dev/` per [[work-in-live-folder-only]]. It rendered correctly on the dev store's MAIN theme but not on his local server. Diagnosis: `shopify-live/`'s copy was still the old file at 15,512 bytes — byte-identical in size to the Development theme's copy, which is what identified the source folder. This supersedes the "edit shopify-dev only" half of [[work-in-live-folder-only]] for anything he needs to see locally.

**How to apply:** after editing any theme file in `shopify-dev/`, copy it to the same path in `shopify-live/` and verify with `cmp`. The repo already keeps the two mirrored — git status routinely shows the same files modified in both. Editing the local `shopify-live/` folder is NOT deploying; pushing to the live store remains forbidden without explicit per-action permission (see [[user-always-pushes-live]]).

Symptom to recognise: content driven by metaobjects (store-wide) appears on every theme, but the CSS/Liquid that styles it only exists where the file was pushed — so a page looks half-updated rather than unchanged.
