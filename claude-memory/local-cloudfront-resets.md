---
name: local-cloudfront-resets
description: "This machine's network intermittently resets connections to CloudFront domains — expect false-positive script failures when probing the live site"
metadata: 
  node_type: memory
  type: reference
  originSessionId: 5a3d1f19-d248-4c3e-b719-14ac52b3e1d4
  modified: 2026-07-29T14:58:21.700Z
---

Verified 2026-07-29: from Randell's machine, requests to CloudFront-hosted assets (Zipify OCU `d1npnstlfekkfz.cloudfront.net`, Awin `dr4qe3ddw9y32.cloudfront.net`, `d1u9wuqimc88kc.cloudfront.net`, and `api.juniphq.com`) intermittently fail with connection resets — the same URL alternates between HTTP 200 and `ERR_CONNECTION_RESET`/curl exit 35 within seconds. Affects both curl and headless Chromium, so it is network-level (ISP/firewall), not a site or browser issue.

**How to apply:** when probing nikolbeauty.com (Playwright sweeps, curl checks), treat `ERR_CONNECTION_RESET` on third-party scripts and Junip "Failed to fetch" pageerrors as local noise — verify with retries before reporting as site errors. Also: large crawls trigger Cloudflare bot challenges (~430 pages in on 2026-07-29) which inject `challenge-platform` scripts and cause cascading fake JS errors (theme.js JSON parse failures, app-config 429s → wishlist crash); filter any page carrying a challenge script. Related: [[zipify-creditsyard-xhr-conflict]]
