---
name: keep-dated-changelog
description: "Practice — log each working day's theme changes as bullet points in a dated changelog/YYYY-MM-DD.md file in the repo"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 275d7ad9-c5ff-4964-9040-1dea8f6a5f0c
---

The user wants a running daily changelog: for each working session, record the changes made that day as bullet points in a dated Markdown file at `changelog/<YYYY-MM-DD>.md` in the repo root (e.g. `changelog/2026-06-24.md`). The user handles the git commits separately.

**Why:** gives a human-readable, dated history of theme edits independent of git history, so the day's work is easy to review and recall later.

**How to apply:** while making changes, create or append to `changelog/<today>.md` using the current date from context. Group bullets logically (e.g. Renames, Deletions, Fixes, Notes/follow-ups), name the actual files/sections touched, and keep each bullet short. One file per day; convert relative dates to absolute. Relates to [[theme-architecture]] and [[custom-file-naming-convention]].
