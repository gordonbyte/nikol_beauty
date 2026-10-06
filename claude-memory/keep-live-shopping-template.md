---
name: keep-live-shopping-template
description: NEVER delete page.live-shopping.json (user directive 2026-07-15) — it holds the only Channelize live-show embed
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 6ff0c042-3b3a-4d0e-9ef7-a869229d7831
---

**NEVER delete `templates/page.live-shopping.json`** (in either theme folder), even though no published page is assigned to it.

**Why:** User directive 2026-07-15 ("just in case"). It contains the only copy of the working Channelize live-shopping embed — root div, "Join the show" button wired to a show ID (`2282f791-04dc-11f0-a5f9-6196bdef81a1`), and console-log-suppression script. The real Live Shopping page (`/pages/streams`) uses the default template, so this template is the sole home of that embed code. Currently only assigned to the unpublished test page "a" (handle `test`).

**How to apply:** Exclude it from every cleanup/unused-template sweep regardless of assignment status, like the wishlist files in [[apps-inventory]]. If a future audit flags it as orphaned, cite this rule instead of proposing deletion.
