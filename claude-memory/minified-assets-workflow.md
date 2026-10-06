---
name: minified-assets-workflow
description: "Theme loads theme.min.css / main.min.css / main.min.js — after editing the readable sources, ALWAYS run node scripts/minify-assets.mjs"
metadata: 
  node_type: memory
  type: project
  originSessionId: 15e3fcfa-ad1a-4bb7-ace1-053b106211f5
---

Since 2026-07-13 the theme loads minified copies: `theme.min.css`, `main.min.css`, `main.min.js` (referenced in theme.liquid, password.liquid, gift_card.liquid). The readable sources (`theme.css`, `main.css`, `main.js`) stay in assets but are NOT loaded — edit those, never the .min files directly.

**Why:** minification saved 21-51% per file; keeping readable sources avoids the maintainability trap. The old orphaned `main.min.css` (deleted 2026-07-08) went stale exactly because there was no regeneration step.

**How to apply:** after ANY edit to theme.css, main.css, or main.js in shopify-live, run `node scripts/minify-assets.mjs` from the repo root — it regenerates the .min files via esbuild and copies them to shopify-dev. Forgetting this ships stale styles/JS. theme.js/vendor.js are already-minified upstream bundles (no .min copies); swatches/font-settings are .liquid-generated and can't be pre-minified. Related: [[keep-dated-changelog]].

**⚠️ Script reads shopify-live sources only** and copies the .min output into shopify-dev. As of the 2026-07-16 dev→live sync the two folders' assets are identical again, so the script works — but it silently clobbers dev if the folders ever diverge again (as happened 07-14→07-16). After editing a dev-only source, minify it directly: `npx esbuild shopify-dev/assets/main.js --minify --outfile=shopify-dev/assets/main.min.js --allow-overwrite`. The script still deserves a rewrite to handle per-folder sources. Related: [[live-theme-drift]].
