// Regenerates the .min.css / .min.js assets the theme actually loads.
// Run after ANY edit to the source files below:  node scripts/minify-assets.mjs
// Requires network on first run (npx downloads esbuild).
import { execSync } from 'node:child_process';
import { statSync, copyFileSync, existsSync } from 'node:fs';

// theme.js / vendor.js ship pre-minified; swiper.css gains <2% — those stay as-is.
const FILES = [
  'theme.css', 'main.css', 'main.js',
];

for (const f of FILES) {
  const src = `shopify-live/assets/${f}`;
  const out = src.replace(/\.(css|js)$/, '.min.$1');
  execSync(`npx --yes esbuild "${src}" --minify --outfile="${out}" --allow-overwrite`, { stdio: 'inherit' });
  const a = statSync(src).size, b = statSync(out).size;
  console.log(`${f}: ${(a / 1024).toFixed(1)}KB -> ${(b / 1024).toFixed(1)}KB (-${(100 - b / a * 100).toFixed(0)}%)`);
  const devOut = out.replace('shopify-live', 'shopify-dev');
  if (existsSync('shopify-dev/assets')) copyFileSync(out, devOut);
}
console.log('done — minified copies synced to shopify-dev');
