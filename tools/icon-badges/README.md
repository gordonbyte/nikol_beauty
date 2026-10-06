# Icon badges

Generator for the circular trust badges on the coming-soon pages — pink ring, arc of text, white
glyph on a pink disc. The badges are generated rather than drawn so every new one matches the
family exactly.

- `proposed.cjs` — the icon library. Each entry is `{ key, title, label, stroke, ops }`, with `ops`
  written in a small primitive vocabulary on a 100-unit grid.
- `render-proposed.cjs` — renders every entry to `proposed/*.png` at 520px.

```bash
NODE_PATH="../../node_modules" node render-proposed.cjs
```

`proposed/` is generated output and is not kept in the repo.

Geometry, the ops vocabulary and the process for adding an icon are in
`docs/coming-soon-playbook.md` §6.
