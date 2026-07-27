// Regenerates the .min.css / .min.js assets the themes actually load.
// Run after ANY edit to the source files below:  node scripts/minify-assets.mjs
//
// Each theme folder is minified from ITS OWN sources (since the 2026-07-20
// reset, shopify-dev is the source of truth for development work and no
// longer derives from shopify-live; shopify-live only changes when a feature
// is deliberately ported for a production push).
// Requires network on first run (npx downloads esbuild).
import { execSync } from 'node:child_process';
import { statSync, existsSync } from 'node:fs';

// theme.js / vendor.js ship pre-minified; swiper.css gains <2% — those stay as-is.
const FILES = ['theme.css', 'main.css', 'main.js'];
const THEMES = ['shopify-dev', 'shopify-live'];

for (const theme of THEMES) {
  if (!existsSync(`${theme}/assets`)) continue;
  for (const f of FILES) {
    const src = `${theme}/assets/${f}`;
    if (!existsSync(src)) continue;
    const out = src.replace(/\.(css|js)$/, '.min.$1');
    execSync(`npx --yes esbuild "${src}" --minify --outfile="${out}" --allow-overwrite`, { stdio: 'inherit' });
    const a = statSync(src).size, b = statSync(out).size;
    console.log(`${theme}/${f}: ${(a / 1024).toFixed(1)}KB -> ${(b / 1024).toFixed(1)}KB (-${(100 - b / a * 100).toFixed(0)}%)`);
  }
}
console.log('done — each theme folder minified from its own sources');
