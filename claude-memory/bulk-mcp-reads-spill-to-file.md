---
name: bulk-mcp-reads-spill-to-file
description: MCP/Bash results over ~30KB are written to a tool-results file instead of context — use this deliberately for bulk pulls (Gorgias tickets at limit=100) and parse the files locally with node; also Gorgias cursors are forgeable base64
metadata: 
  node_type: memory
  type: reference
  originSessionId: 36fd8588-fe6c-4c49-8f1f-111b6dd4c897
  modified: 2026-09-23T18:17:27.770Z
---

Any tool result larger than roughly 30 KB is saved to `~/.claude/projects/<project>/<session>/tool-results/<tool>-<ts>.txt` (JSON `{result: string}`) and only the path enters context. Gorgias `gorgias_raw_request` at `limit=100` on `tickets` is ~250 KB per page, so ~100 pages cost almost no context; parse them with node afterwards.

Gorgias pagination cursors are plain base64 of `["next","<ISO datetime>",<id>]`, so a cursor for any date can be forged (`Buffer.from(JSON.stringify(["next","2026-03-15T00:00:00",999999999])).toString("base64")`) — this allows sampling a year in parallel instead of chaining `next_cursor` sequentially. `/api/tickets` has no date filter; `/api/search` exists but its `type` enum was never found. Rate limit (429) appears around 8–10 parallel calls; retries are safe.

Bash output over ~30 KB also spills (with a 2 KB preview) — split large reads with `sed -n 'a,bp'`.

**How to apply:** For any corpus pull (tickets, reviews, orders) request at max page size and let it spill; never `cat` a >30 KB file expecting it inline. Related: [[local-cloudfront-resets]].
