const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { PROPOSED } = require('./proposed.cjs');

const S = 2;
const SIZE = 260 * S;
const GEO = {
  cx: (SIZE - 1) / 2, cy: (SIZE - 1) / 2,
  outerR: 128.8 * S, outerW: 2.6 * S,
  arcR: 102 * S, arcW: 3.6 * S,
  discR: 74.5 * S,
  textR: 88 * S, textSize: 33 * S, textWeight: 500, textTrack: -0.5 * S,
  gapDeg: 12,
  glyphBox: 94 * S,      // matches the originals' white-ink extent (r ~46-48 at 260)
  glyphStroke: 2 * S,    // measured median stroke of the originals
  pink: '#d34270', ink: '#2a2724', white: '#ffffff',
};

const OUT = path.join(__dirname, 'proposed');
fs.mkdirSync(OUT, { recursive: true });
const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/%/g, 'pct').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

(async () => {
  const jobs = PROPOSED.map((p) => ({ title: p.title, label: p.label, ops: p.ops, stroke: p.stroke, file: p.key + ".png" }));

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(`<!doctype html><html><head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600&display=block">
    </head><body style="margin:0"><canvas id="c" width="${SIZE}" height="${SIZE}"></canvas></body></html>`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.load('500 66px "Archivo"', 'Paraben-Free'));
  await page.waitForTimeout(1200);
  const ok = await page.evaluate(() => {
    const x = document.createElement('canvas').getContext('2d');
    x.font = '500 40px "Archivo", monospace'; const a = x.measureText('Paraben-Free').width;
    x.font = '500 40px monospace'; const b = x.measureText('Paraben-Free').width;
    return Math.abs(a - b) > 0.5;
  });
  if (!ok) throw new Error('Archivo did not load');

  const results = [];
  for (const job of jobs) {
    const out = await page.evaluate(({ job, GEO, SIZE }) => {
      const c = document.getElementById('c');
      const x = c.getContext('2d');
      x.clearRect(0, 0, SIZE, SIZE);
      const { cx, cy, pink, ink, white } = GEO;
      const rad = (d) => (d * Math.PI) / 180;

      // arc text layout
      x.font = `${GEO.textWeight} ${GEO.textSize}px "Archivo"`;
      const chars = [...job.label];
      const tracking = GEO.textTrack;
      let size = GEO.textSize;
      let widths = chars.map((ch) => x.measureText(ch).width);
      let total = widths.reduce((a, b) => a + b, 0) + tracking * (chars.length - 1);
      const maxArc = rad(205) * GEO.textR;
      if (total > maxArc) {
        size = Math.floor(size * (maxArc / total));
        x.font = `${GEO.textWeight} ${size}px "Archivo"`;
        widths = chars.map((ch) => x.measureText(ch).width);
        total = widths.reduce((a, b) => a + b, 0) + tracking * (chars.length - 1);
      }
      const halfSpanDeg = ((total / GEO.textR) * 180) / Math.PI / 2;

      x.strokeStyle = pink; x.lineCap = 'butt'; x.lineJoin = 'round';
      x.lineWidth = GEO.arcW;
      x.beginPath();
      x.arc(cx, cy, GEO.arcR, rad(-90 + halfSpanDeg + GEO.gapDeg), rad(-90 - halfSpanDeg - GEO.gapDeg + 360));
      x.stroke();

      x.lineWidth = GEO.outerW;
      x.beginPath(); x.arc(cx, cy, GEO.outerR, 0, Math.PI * 2); x.stroke();

      x.fillStyle = pink;
      x.beginPath(); x.arc(cx, cy, GEO.discR, 0, Math.PI * 2); x.fill();

      x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'alphabetic';
      let ang = rad(-halfSpanDeg);
      for (let i = 0; i < chars.length; i++) {
        ang += widths[i] / (2 * GEO.textR);
        x.save();
        x.translate(cx, cy); x.rotate(ang); x.translate(0, -GEO.textR);
        x.fillText(chars[i], 0, 0);
        x.restore();
        ang += widths[i] / (2 * GEO.textR) + tracking / GEO.textR;
      }

      // ---- glyph ----
      const k = GEO.glyphBox / 100;
      x.save();
      x.translate(cx, cy);
      x.scale(k, k);
      x.translate(-50, -50);
      x.strokeStyle = white; x.fillStyle = white;
      x.lineWidth = (job.stroke || GEO.glyphStroke) / k;
      x.lineCap = 'round'; x.lineJoin = 'round';
      for (const op of job.ops) {
        const t = op[0];
        x.beginPath();
        if (t === 'c') { x.arc(op[1], op[2], op[3], 0, Math.PI * 2); x.stroke(); }
        else if (t === 'e') { x.ellipse(op[1], op[2], op[3], op[4], rad(op[5] || 0), 0, Math.PI * 2); x.stroke(); }
        else if (t === 'l') { x.moveTo(op[1], op[2]); x.lineTo(op[3], op[4]); x.stroke(); }
        else if (t === 'p') {
          op[1].forEach((pt, i) => (i ? x.lineTo(pt[0], pt[1]) : x.moveTo(pt[0], pt[1])));
          if (op[2]) x.closePath();
          x.stroke();
        } else if (t === 'rr') { x.roundRect(op[1], op[2], op[3], op[4], op[5]); x.stroke(); }
        else if (t === 'a') { x.arc(op[1], op[2], op[3], rad(op[4]), rad(op[5])); x.stroke(); }
        else if (t === 'd') { x.stroke(new Path2D(op[1])); }
        else if (t === 'fd') { x.fill(new Path2D(op[1])); }
        else if (t === 'bg') { x.save(); x.fillStyle = pink; x.fill(new Path2D(op[1])); x.restore(); }
        else if (t === 'dot') { x.arc(op[1], op[2], op[3], 0, Math.PI * 2); x.fill(); }
      }
      x.restore();

      return { png: c.toDataURL('image/png'), halfSpanDeg: +halfSpanDeg.toFixed(1), size };
    }, { job, GEO, SIZE });

    fs.writeFileSync(path.join(OUT, job.file), Buffer.from(out.png.split(',')[1], 'base64'));
    results.push({ title: job.title, label: job.label, file: job.file, halfSpanDeg: out.halfSpanDeg, textSize: out.size });
  }
  fs.writeFileSync(path.join(__dirname, 'proposed-render.json'), JSON.stringify(results, null, 1));
  const shrunk = results.filter((r) => r.textSize < GEO.textSize);
  console.log('rendered', results.length, 'proposed badges');
  if (shrunk.length) console.log('label shrunk to fit:', shrunk.map((r) => r.label + ' (' + r.textSize + ')').join(', '));
  await browser.close();
})();
