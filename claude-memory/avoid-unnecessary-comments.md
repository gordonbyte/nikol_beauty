---
name: avoid-unnecessary-comments
description: User prefers no unnecessary code comments left in theme files
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 15e3fcfa-ad1a-4bb7-ace1-053b106211f5
---

When editing theme files, do NOT add explanatory code comments (Liquid `{% comment %}`, HTML `<!-- -->`, CSS, or JS comments) unless they are genuinely necessary. Keep code self-documenting; put rationale in the changelog instead.

**Why:** The user explicitly asked to refrain from leaving comments that aren't necessary (2026-07-07, during the section-audit cleanup). They value clean, uncommented code.

**How to apply:** Write self-explanatory code. Reserve comments for non-obvious gotchas that can't be expressed in code. Explanations of *what a change does* belong in the dated changelog ([[keep-dated-changelog]]), not inline. This applies to the section-audit heading/a11y pass and all future theme edits.
