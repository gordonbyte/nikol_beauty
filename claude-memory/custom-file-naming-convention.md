---
name: custom-file-naming-convention
description: "How to name custom/created theme files so they're distinct from stock Broadcast files"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7375c2cd-6e35-465b-ab91-8b1978681251
---

In the `shopify-live` Broadcast theme, custom (non-stock) files the user creates must be named so they're instantly distinguishable from default Broadcast files and from the previous agency's `cw-` files:

- **Filename:** prefix with `custom-` → e.g. `custom-footer.liquid`, `custom-feature-hero.liquid`, `custom-best-sellers.liquid`.
- **Section names live in THREE layers — update all three** with the `[Custom] ` prefix: (1) the section file's schema top-level `"name"`; (2) every `presets[].name` (what shows in the "Add section" picker); (3) **per-instance `"name"` overrides stored in each *template* JSON** (`templates/*.json` → `sections.<key>.name`). Layer 3 is the editor-sidebar label the agency typed per placed instance; it OVERRIDES the schema name in the customizer, so a section can still show the old "CW …" name even after layers 1-2 are fixed. This was missed across ~12 instances during the cw-→custom- renames (caught 2026-06-26). Audit with: `grep -rn '"name":\s*"CW ' shopify-live/templates/`, or parse each template and print `type | name` per section.
- **Shopify caps the schema `name` (and preset name) at 25 characters.** The `[Custom] ` prefix is 9 chars, so the descriptive part must be ≤16. If a name exceeds 25, Shopify rejects the section ("Invalid schema: name is too long (max 25)") AND the template referencing it then errors with "Section type … does not refer to an existing section file" (cascade). Keep names short, e.g. "[Custom] Waitlist" not "[Custom] Product · Waitlist" (27).
- **Avoid** `new` / `v2` / `v3` / `copy` style names (e.g. `footer-new`, `productv3`) — they read as versioning cruft.

**Why:** custom files then cluster under `custom-` in Edit code, and custom sections show as "[Custom] …" in the customizer, so it's obvious what is the user's work vs. stock theme vs. the old agency's `cw-` files.

**How to apply when renaming an existing custom section:** rename the file AND update every reference — layout `{% section %}` / `{% sections %}` tags, `config/settings_data.json` (`current.sections` key + its `type`), template & section-group JSON `type` fields, and any `render`/`section` calls. Verify `grep -rn '<old-name>' shopify-live/` returns 0 afterward. First example applied: `footer-new.liquid` → `custom-footer.liquid` ("[Custom] Footer"). Watch the [[restart-dev-on-tmp-files]] issue while editing.
