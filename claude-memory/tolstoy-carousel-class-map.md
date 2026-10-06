---
name: tolstoy-carousel-class-map
description: "Tolstoy carousel widget's real DOM class names (from their we/widget.js source) — use these exact selectors, never guess arrow/tile classes"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 9629bd3b-4bec-44b1-a06c-ad6c2a10f159
  modified: 2026-09-04T18:03:20.025Z
---

Tolstoy's carousel class map, read from https://widget.gotolstoy.com/we/widget.js on 2026-09-04 (found after 4 failed guess-based iterations wiring custom arrows):

- carousel: `tolstoy-carousel` · container: `tolstoy-carousel-container` · title: `tolstoy-carousel-title`
- **prev/next buttons: `tolstoy-previous-button` / `tolstoy-next-button`** (the clickable direction elements)
- arrows wrapper: `tolstoy-carousel-arrows-container`; per-arrow: `tolstoy-carousel-arrow-button-container` > `tolstoy-carousel-arrow-button`
- track: `tolstoy-video-carousel-container` > `tolstoy-carousel-videos-container`
- tiles: `tolstoy-carousel-tile-container` > `tolstoy-carousel-tile` (+ `tolstoy-carousel-center-tile`), video `tolstoy-carousel-video`, image `tolstoy-carousel-image`
- controls: `tolstoy-carousel-controls-container`, expand/mute/play `tolstoy-carousel-{expand,mute,play}-button`, play overlay `tolstoy-play-button-container`
- dots: `tolstoy-dots-container` > `tolstoy-dot`; product tiles: `tolstoy-product-tile` etc.
- Stories widget has a parallel map prefixed `tolstoy-stories-*` (e.g. `tolstoy-stories-previous-button`).

**Why:** their renderer is lazy-loaded and unreadable at runtime (Tolstoy renders nothing on localhost or in headless browsers), so the source class map is the only reliable DOM reference.

**How to apply:** style or drive the carousel with these exact selectors (used in `custom-videos.liquid`'s arrow forwarding + `custom-tolstoy-player.liquid`); a missing `.tolstoy-previous-button` at the start scroll position is normal — treat as no-op. Related: [[tolstoy-player-dead-on-localhost]].
