---
name: zipify-creditsyard-xhr-conflict
description: "Console InvalidStateError on live pages = Zipify OCU extension vs CreditsYard store-credit app XHR conflict; not a theme bug, not fixable in theme"
metadata: 
  node_type: memory
  type: project
  originSessionId: 77cdd99e-e071-4e3d-869b-8327c4390b6b
  modified: 2026-08-05T20:02:39.070Z
---

Diagnosed 2026-07-17. Live-store console error on product pages (any page, reproducible in clean browser):
`Uncaught InvalidStateError: Failed to read the 'responseText' property from 'XMLHttpRequest' ... (was 'json')` at `zipify-oneclickupsell-extension.js:1`.

Root cause: Zipify OCU's checkout extension monkey-patches `XMLHttpRequest.send` and, on the FIRST `/cart.js` response it sees, runs `JSON.parse(this.responseText)` guarding only `responseType !== "blob"`. **CreditsYard** (store-credit app, `window.StoreCredit`, script_tag from creditsyard.com — NOT in the theme or app-embeds list, see [[apps-inventory]]) fetches `/cart.js?store-credit=1` with `responseType: "json"`, where reading `responseText` throws per spec.

Impact: CreditsYard still works (its own onload runs). Zipify's one-shot initial cart discount sync is consumed+skipped when CreditsYard's request wins the race. Both scripts are vendor-CDN-hosted — no theme file can fix it; the pending dev→live theme push changes nothing here. Fix path: report to Zipify support (their missing guard) and/or CreditsYard.

**NEVER UNINSTALL CREDITSYARD (Randell, 2026-08-05: "never uninstall creditsyard. we use that").** The July "dead weight" read (zero `storcred*` discount-code redemptions in order history) was WRONG/incomplete — that search doesn't capture how they actually use it. Same lesson as the HulkApps wishlist: owner knowledge beats query-based usage inference; never recommend uninstalling this app again. Store also runs Yotpo Loyalty (swell_rewards, live 2026-07-06) alongside it.

**RESOLVED 2026-07-17 via theme shim** (user keeps both apps): `snippets/custom-store-credit-xhr-shim.liquid`, rendered after the body-end `store-credit-launcher` include in `layout/theme.liquid` (both repo folders + user uploaded to the live theme). It traps assignment of `window.StoreCredit`/`.getJSON` and substitutes a text-responseType equivalent. Verified live: 5/5 probe runs clean (was ~1 in 3 failing), hook confirmed active. Polling-based shims DON'T work here (CreditsYard calls getJSON synchronously at script-eval). Remove the shim if Zipify ever fixes their responseText guard. Same day: duplicate `store-credit-launcher` include removed from `<head>` (was benign; possibly app-installer-injected — may reappear after future theme publishes).
