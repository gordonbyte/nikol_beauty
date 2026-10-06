---
name: jira-board-conventions
description: "Jira setup for NikolBeauty (KAN) - epic structure, naming, descriptions, dates, priority ladder to follow when creating/updating tasks"
metadata: 
  node_type: memory
  type: project
  originSessionId: 5a3d1f19-d248-4c3e-b719-14ac52b3e1d4
  modified: 2026-08-04T18:28:29.330Z
---

Jira site: nikolbeauty.atlassian.net (cloudId `31e24658-3776-4270-8e59-71526723b457`), project **KAN "NikolBeauty"**, team-managed Kanban. Structure set up 2026-07-29 with Randell; keep these conventions for every issue I create or edit.

**Epics (fixed streams - file new work under one of these, don't create new epics without asking):**
- KAN-1 `Promotions - Sales Campaigns` (purple) - all dated sales
- KAN-2 `Dev - Tooling & Apps` (orange) - discount-sync app, scripts, tooling
- KAN-3 `Site - Bugs & Fixes` (dark_orange) - defects on nikolbeauty.com
- KAN-4 `Site - Improvements & Redesigns` (blue) - redesigns, UX, perf
- KAN-5 `Marketing - Email & Analytics` (green) - Klaviyo, Clarity, Intelligems, PageSpeed tools
- KAN-119 `Live Sync - Dev changes pending live` (teal) - queue of dev-completed changes awaiting live application
- (KAN-16 Questions epic retired; open questions = task with label `question` + Blocks link to the work it holds up)

**Live Sync rule (STANDING DIRECTIVE, user 2026-07-30 - twice confirmed):** EVERY time anything is done on the dev store that also needs doing on live (content edits, settings, metafields, theme work, app config), create the KAN-119 Live Sync task IN THE SAME SESSION, UNPROMPTED - never wait to be asked, never leave it only in changelog notes. Label `live-sync`, step-by-step replication instructions, subtasks for multiple parts. Dev task closes when dev is done; Live Sync task closes when applied AND verified on live. First instance: KAN-121 (Read More fix -> live; subtasks KAN-128/131/132).

**API bug note:** createJiraIssue mangles multi-line descriptions (literal \\n) - either create with a single-line description and then editJiraIssue with contentFormat markdown (which handles newlines correctly), or always follow create with an edit.

**Naming:** promos `Promo: <Name> (<Mon D-D>)`, promo subtasks `<Short name>: Create discount / Create hero banner / Remove discount`; everything else verb-first and specific ("Redesign newsletter signup popup", "Fix X not working (App)").

**Promo runbook - EVERY sale task gets these 10 subtasks (user directives 2026-07-29/30), due dates relative to sale window:**
1. Decide sale colors - ~2 days before start (needed before banner/popup)
2. Create discount - day before start
3. Enable "Multiple can apply per order" on the product discount - with discount creation (day before start)
4. Create hero banner - start day
5. Create popup - start day
6. Edit mobile app banner + announcement banner (mobile) - start day
7. Disable Roses at checkout (Yotpo) - start day (rewards must not stack with sale discount)
8. Remove discount - day after end
9. Re-enable Roses at checkout (Yotpo) - day after end
10. Remove sale banners + popup (hero, popup, mobile app + announcement) - day after end
Task due date = go-live day; subtasks inherit the parent's priority. Promo details (window, %, scope) live in the parent task description. Checklist is also documented in epic KAN-1's description.

**Description template:** `**Goal:**` / `**Details:**` (dates, %, scope) / `**Done when:**` (acceptance criteria) / `**Estimate:** ~Xh`.

**Completion-record rule (STANDING DIRECTIVE, user 2026-07-30):** when completing ANY task, append an `## OUTCOME - what was actually done` section to its description (keep the original Goal above it): actual root cause if it differed from the hypothesis, ALL work performed including extra/beyond-scope work (WCAG, SEO, cleanup side-effects), iteration dead-ends worth knowing, verification performed, pointers (changelog file, follow-up task keys), and estimate-vs-actual. Comments track dated progress; the description carries the final accurate record. First instance: KAN-42. ALSO set the real Original estimate field on every issue: `editJiraIssue` fields `{"timetracking": {"originalEstimate": "3h"}}` - this WORKS even though it doesn't appear in createmeta (don't trust the field listing). Keep subtask descriptions one line + estimate. Standard promo subtask estimates: colors 30m, discount 15m, banner 1h, popup 1h, Roses toggles 15m each, remove discount 15m; promo parent ~4h total.

**Priority ladder:** Highest = revenue/live-site at risk today · High = time-bound campaign prep or due imminently · Medium = planned improvements · Low = open-ended/no deadline. Never leave default Medium unexamined.

**"What's next" ordered view (user can't rely on board rank):** JQL `project = KAN AND statusCategory != Done ORDER BY priority DESC, duedate ASC`.

**Randell's standing priorities (2026-07-29):**
1. Sale promos run High and ESCALATE by date: Medium >1 month out -> High within ~2 weeks -> Highest from ~3 days before start through teardown. Keep updated continuously.
2. JS-error elimination mission, target ~2026-08-15: error tasks carry label `js-errors`, run High, due 8/15 unless more urgent. New error findings join the mission at High.

**Daily schedule procedure (user directive 2026-07-29)** - when Randell asks "what's on my schedule today" / "what should I work on":
1. Query ALL open issues (the What's-next JQL)
2. **READ THE COMMENTS** on In Progress, question-labeled, and due-soon issues (fetch with fields ["comment"]) - comments are the status log and contain follow-up dates ("ask again Friday X") that MUST influence the schedule and advice given
3. **Re-examine every task's priority and adjust where warranted** - triggers: due/start date proximity, Blocks links, the standing priorities, promo escalation. Make the adjustments and report what changed and why.
4. Present: overdue first, then today's items, then blockers whose follow-up date is today
5. Conversely, when Randell reports progress/a follow-up date on a task, log it as a Jira comment (dated, with next action) and align the due date to the follow-up date.

Cross-machine note: these operating instructions are also in the repo's CLAUDE.md (travels via git); this memory file is machine-local.

**API notes:** epic color = customfield_10017 (allowed: purple, blue, green, teal, yellow, orange, grey, dark_* - NO red); start date = customfield_10015; board Rank (customfield_10019) CANNOT be changed via this connector (edits silently no-op - needs Agile rank endpoint); issues cannot be deleted via API (UI only); Blocks links via createIssueLink (inward = blocker); **createJiraIssue silently DROPS parentIssueKey when parenting a Task under an Epic** (caught 2026-08-04: KAN-147 landed epic-less) - after creating, verify with getJiraIssue fields ["parent"] and fix via editJiraIssue `{"parent": {"key": "KAN-119"}}` (the edit works).
