# ⛔ CRITICAL RULE — READ FIRST

**NEVER push, deploy, or sync anything to the LIVE store without clear, explicit permission.**

- Do not run any command that publishes, deploys, or pushes changes to the live/production Shopify store (e.g. `shopify theme push` against the live theme, publishing a theme, or pushing to anything that affects `shopify-live/` in production) unless the user has given clear, explicit approval **for that specific action**.
- General approval to work on a task does **not** count as permission to push live. Ask every time.
- When in doubt, stop and ask. Default to the `shopify-dev/` (development) theme for all changes.

---

## Project overview

This repo holds two Shopify themes for **Nikol Beauty**:

- `shopify-dev/` — development theme. Make and test all changes here.
- `shopify-live/` — live/production theme. Treat as protected; see the rule above.

## Workflow notes

- Default branch: `main`.
- Remote: `github.com/gordonbyte/nikol_beauty`.
- Pushing commits to GitHub is fine when the user asks; pushing to the **live Shopify store** is the action that requires explicit per-action permission.

## Jira workflow (Claude operating instructions)

All of nikolbeauty.com is tracked as ONE Jira project: **KAN "NikolBeauty"** on `nikolbeauty.atlassian.net` (Atlassian connector; cloudId `31e24658-3776-4270-8e59-71526723b457`). Follow these conventions for every task Claude creates or updates:

**Epics (fixed streams — don't create new ones without asking):**
- KAN-1 `Promotions - Sales Campaigns` · KAN-2 `Dev - Tooling & Apps` · KAN-3 `Site - Bugs & Fixes` · KAN-4 `Site - Improvements & Redesigns` · KAN-5 `Marketing - Email & Analytics`

**Every sale/promo task gets 8 subtasks** (naming `<Short name>: <action>`, due dates relative to the sale window):
1. Decide sale colors (~2 days before start) 2. Create discount (day before) 3. Enable "Multiple can apply per order" on the product discount (with discount creation) 4. Create hero banner (start day) 5. Create popup (start day) 6. Disable Roses at checkout / Yotpo (start day) 7. Remove discount (day after end) 8. Re-enable Roses at checkout / Yotpo (day after end)

**Issue format:** verb-first titles (promos: `Promo: <Name> (<Mon D-D>)`); description = `**Goal:** / **Details:** / **Done when:** / **Estimate:** ~Xh`; ALSO set the Original estimate field (`timetracking: {originalEstimate: "2h"}` — works even though createmeta doesn't list it); priority ladder: Highest = revenue/live at risk today · High = time-bound prep or shopper-visible bugs · Medium = planned work · Low = no deadline. Open questions = task with label `question` + Blocks link, not an epic.

**Randell's standing priorities (set 2026-07-29):**
1. **Sale promotions run High and escalate as their date approaches** — keep this updated continuously: Medium while >1 month out → High within ~2 weeks of the sale start → Highest from ~3 days before start through teardown. Never let a promo sit below where its date warrants.
2. **JS-error elimination mission** — remove JS/console/UX errors from nikolbeauty.com, target completion **~Aug 15, 2026**. Error tasks carry the `js-errors` label (query: `labels = js-errors AND statusCategory != Done`), run High, and are due 2026-08-15 unless more urgent. New error findings (sweeps, Clarity, Search Console) join the mission at High until the target date.

**Daily schedule procedure** — when Randell asks "what's on my schedule today" / for a day update:
1. Query ALL open issues: JQL `project = KAN AND statusCategory != Done ORDER BY priority DESC, duedate ASC`
2. **Read the comments** on In Progress, `question`-labeled, and due-soon issues — comments are the status log and contain follow-up dates ("ask again Friday X") that must shape the schedule and advice
3. **Re-examine every task's priority and adjust where warranted** — triggers: start/due date approaching or passed, an item blocking another task (Blocks links), the standing priorities above, promo escalation windows. Use judgment to keep the board matching reality; make the adjustments (they're reversible) and report what changed and why.
4. Present overdue first, then today's items, then blockers whose follow-up date is today
5. When Randell reports progress or a follow-up date on a task, log it as a dated Jira comment with the next action, and align the issue's due date to the follow-up date

**API quirks:** board Rank can't be set via this connector (edits silently no-op); issues can't be deleted via API (UI only); epic colors = `customfield_10017` (no "red"; Bugs uses `dark_orange`); start date = `customfield_10015`.
