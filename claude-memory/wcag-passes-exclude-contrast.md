---
name: wcag-passes-exclude-contrast
description: "In WCAG/accessibility passes, never change colors/contrast — report ratios only; Randell decides"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-08-18T14:33:05.363Z
---

During WCAG/accessibility audits and fix passes, do NOT change any colors or contrast values. Report failing ratios with the would-be fix, then leave the colors alone unless Randell explicitly approves.

**Why:** Randell has declined contrast fixes consistently (2026-08: press page READ MORE buttons/labels, Beauty Reinvented byline, policy-page help-card button, footer audit "ignore contrast edits") — brand colors are design decisions he owns.

**How to apply:** Structural fixes (semantics, aria, link text, focus, sr-only announcements) are fine to apply when he asks for WCAG fixes; anything touching a color value goes in the report as "flagged, not changed." Related: [[check-global-element-styles]].
