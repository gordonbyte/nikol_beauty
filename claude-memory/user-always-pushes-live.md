---
name: user-always-pushes-live
description: "User ALWAYS pushes/uploads themes to the live store themselves — never offer to push, never do it, not even with permission"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 77cdd99e-e071-4e3d-869b-8327c4390b6b
---

Directive 2026-07-17: "i will always be the one to push the theme live. i never want you to do it."

**Why:** The user wants sole control over anything that reaches the production storefront (stronger than the CLAUDE.md ask-first rule — the answer is always: the user does it).

**How to apply:** Make changes in the repo folders, tell the user exactly which files changed and need uploading, then wait. Never run `shopify theme push` against live, never use Admin API mutations to write theme files, never offer to. After the user confirms they've pushed, verify/test against the live site (read-only probes are fine and appreciated).
