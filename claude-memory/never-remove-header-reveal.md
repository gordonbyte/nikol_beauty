---
name: never-remove-header-reveal
description: "NEVER remove/override Broadcast's is-loaded desktop-header reveal (opacity:0 until DOMContentLoaded) — Randell's explicit directive 2026-08-12"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-08-12T20:48:08.993Z
---

Randell ruled (2026-08-12, during KAN-180 cart perf work): "never do B. leave that functionality alone" — B was the proposal to override `html:not(.no-js) body:not(.is-loaded) .header__desktop { opacity: 0 }` (theme.css:7081; `is-loaded` added on DOMContentLoaded in theme.dev.js) so the desktop header would paint before JS finishes.

**Why:** it's Broadcast's anti-flicker guard — the desktop nav measures menu widths at init and would visibly reflow. Randell prefers the ~1.3s desktop LCP cost over any flash risk.

**How to apply:** never propose or apply changes that reveal `.header__desktop` before `is-loaded`, even when chasing LCP. Desktop logo-LCP improvements must come from other levers (preload hints, CSS chain — see [[two-dev-stores]] for push targets). The logo preload (header.liquid, shipped 2026-08-12) is the approved approach.

**TRIAL RESOLVED (2026-08-12):** Randell authorized a one-day trial on dev, then ordered it REVERTED after seeing the data: the fade costs only ~0.2-0.5s on the two desktop logo-LCP pages (LCP counts from fade START; is-loaded fires shortly after CSS paint). The rule is now settled by evidence, not just preference — the fade is nearly free. Do not reopen; if desktop LCP needs work, the levers are the CSS chain (KAN-175) and preload hints.
