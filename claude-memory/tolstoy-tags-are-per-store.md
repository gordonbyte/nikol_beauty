---
name: tolstoy-tags-are-per-store
description: "Tolstoy video product tags are per store; the connector's asset reader only shows the default (dev) store's tags, so probe live tags via get_widget with a live product id"
metadata: 
  node_type: memory
  type: project
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-09-18T16:31:16.040Z
---

Tolstoy product tags on a video are stored per Shopify store. Both Tolstoy connectors default to the app-dev store (nikolbeauty-dev-mab1srre), and `get_asset` has no store parameter, so it reports ONLY dev tags (a live-tagged video shows `productsCount: 0`). The only way to read a live tag is `get_widget(publishId, productId=<live id>)` on a live PDP-mode widget whose playlist contains the video. `tag_video_product` takes `appUrl`, so writes can target either store.

**Why:** On 2026-09-18 the dev tags were mirrored from live for 107 videos; the rule that held on every probe was "video in a product playlist ⇔ tagged with that product on live", so playlist names are the reliable proxy when no live widget exists.

**How to apply:** Never conclude a video is untagged from `get_asset` alone. When a new video must show on a dev PDP-mode widget, tag it with the dev product id (appUrl dev) and keep the live tag. Live product ids come from `browse_products`/`search_products` with `appUrl: nikolbeauty.myshopify.com`. See [[tolstoy-bubbles-account-shared]] and [[tolstoy-player-dead-on-localhost]].
