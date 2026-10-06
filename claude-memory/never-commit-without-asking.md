---
name: never-commit-without-asking
description: "NEVER run git commit without asking the user first — every commit needs explicit per-commit approval, even small fixes mid-task"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 169a3cbe-3eb1-4669-8dd1-de5b63f3c8fa
---

Never commit without asking first (user directive 2026-07-16).

**Why:** during the dev→live sync session, a push-blocker fix (cart-drawer schema) was committed autonomously right after an approved commit+merge task. The user wants commit control even when a task naturally continues — general approval to work on something, or a previous approved commit, does NOT extend to the next commit.

**How to apply:** stage and prepare changes freely, but before `git commit`, state what will be committed (files + one-line summary) and wait for a yes. Same pattern as the live-store push rule in CLAUDE.md — per-action approval, every time. Related: [[explain-before-changing]], [[keep-dated-changelog]].
