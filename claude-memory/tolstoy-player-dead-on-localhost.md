---
name: tolstoy-player-dead-on-localhost
description: "Tolstoy is dead on http://127.0.0.1:9292 — as of 2026-09-02 even tile INIT fails (0 carousels render), not just the player — verify ALL Tolstoy rendering on the dev store"
metadata: 
  node_type: memory
  type: project
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-09-02T17:24:46.128Z
---

Verified 2026-09-01: on Randell's `shopify theme dev` localhost (http://127.0.0.1:9292), clicking a Tolstoy video NEVER opens the player — every cell, every delay (0.8s–12s tested). The identical template on nikolbeauty-dev-mab1srre works first-click, top and bottom cells. Mechanism: the player iframe src carries the host origin (`url=http://127.0.0.1:9292/...`) and zero postMessages ever return from play.gotolstoy.com — their player refuses the handshake with an unregistered localhost origin.

**Why:** Tolstoy embeds are keyed to the store's registered domain; localhost isn't one.

**UPDATE 2026-09-02:** it's now worse than player-only — `.tolstoy-carousel` tiles do not INITIALIZE at all on localhost (0/15 initialized on Jill's episode page `/pages/beauty-tutorial-videos/bringing-life-back-to-mature-skin-fierce-aging`, children.length 0, height 0, widget scripts + globals present). The earlier "localhost IS valid for tile layout/posters" claim no longer holds. Verify ANY Tolstoy rendering on the dev store domain only.

**How to apply:** never debug "video won't open" / add-to-cart / in-player behavior on localhost — reproduce on the dev store (storefront password: ask Randell) or a real-domain theme instead. Localhost IS valid for tile layout, posters, and autoplay (driven by the template's own script, [[theme-architecture]]). If Randell reports random dead clicks, first ask which URL he was on. Related: their player also rejects synthetic/headless clicks INSIDE the player iframe, and bot-detects HeadlessChrome UAs.
