---
name: user-starts-dev-server
description: Never start the discount-sync (or any) dev server myself — the user always starts it
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a79251d2-cdf8-4fa8-91be-c38c3e327340
  modified: 2026-07-22T19:45:52.934Z
---

The user starts `shopify app dev` (and any other dev server) themselves — NEVER start one in the background, even for verification or timed syncs (directive 2026-07-22).

**Why:** My background instance collided with the user's own `shopify app dev` — it held the Prisma query-engine DLL (EPERM on the pre-dev `npx prisma generate`) and GraphiQL port 3457, making their startup fail. Two instances can't share the project, and the user must own the one that runs. Related failure mode in [[restart-dev-on-tmp-files]].

**How to apply:** When a running app server is needed (e.g. to hit `/api/sync`), ask the user to start it, then detect the vite port read-only (netstat by process, or the CLI log). If it's down, report that and wait — do not spawn one. Killing MY OWN leftover processes to unblock the user is fine; never kill a server the user started without asking.
