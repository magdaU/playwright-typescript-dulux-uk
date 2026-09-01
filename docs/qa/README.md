# 📋 QA Documentation — how to work with this folder

This folder holds the formal QA documentation set for the Dulux E2E suite. This page is the folder's entry
point: what's here, who touches what, when, and how a change to any of these documents actually flows through
git — so working with them stays a five-minute task, not a ceremony.

## What's here

| Document                                         | Purpose                                                                      | Changes...                                |
| ------------------------------------------------ | ---------------------------------------------------------------------------- | ----------------------------------------- |
| [TEST_PLAN.md](TEST_PLAN.md)                     | IEEE 829/ISTQB-style test plan — scope, approach, entry/exit criteria, risks | Rarely — only when scope/approach changes |
| [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) | Results of the most recent meaningful run against production                 | Per release / notable run                 |
| [UAT_TEMPLATE.md](UAT_TEMPLATE.md)               | Reusable sign-off template — never edited in place, always copied            | Never (it's the template)                 |
| [QA_FEATURE_GUIDE.md](QA_FEATURE_GUIDE.md)       | Feature-by-feature "what to know before testing this" reference              | As features/specs change                  |
| `uat/` (created on demand)                       | Filled-in UAT cycles, one file per release (e.g. `uat/2026-Q3.md`)           | New file per UAT cycle                    |

Root-level docs these link out to rather than duplicate: [TEST_STRATEGY.md](../../TEST_STRATEGY.md) (the _why_
behind scope/tagging), [TEST_SCENARIOS.md](../../TEST_SCENARIOS.md) (step-by-step cases),
[BUG_REPORTS.md](../../BUG_REPORTS.md) (production defects), [KEY_FINDINGS.md](../../KEY_FINDINGS.md) (headline
takeaways). If you're about to write something new, check those four first — this folder is for the
standards-shaped documents (plan/report/UAT/onboarding guide), not a second home for strategy or case detail.

## Working with each document

### Test Plan — update on scope/approach changes only

This is the low-churn one. Update it when something in [TEST_PLAN §1–16](TEST_PLAN.md) actually changes: scope
grows/shrinks, entry/exit criteria change, a new environment or browser enters the matrix, a new risk surfaces.
Bump the identifier in [§1](TEST_PLAN.md#1-test-plan-identifier) (`v1.0` → `v1.1`) and the commit reference
when you do. Don't touch it just because a test run happened — that's what the Test Summary Report is for.

### Test Summary Report — regenerate per release / notable run

This file always reflects the **most recent** meaningful run, not a running log — git history is the archive,
so don't create dated copies of this one (unlike UAT cycles, see below). Regenerate it:

1. Run the suite you want reported on, e.g. `npm test` for the default regression matrix, or add
   `npm run test:a11y` / `npm run test:crossbrowser` if you want those sections refreshed too.
2. Update the identifier ([§1](TEST_SUMMARY_REPORT.md#1-test-summary-report-identifier)) with the new date and
   commit SHA (`git log -1 --format="%h %ad" --date=short`).
3. Update §2–7 with what actually happened — pass/fail counts, any new variances from the plan, an honest
   evaluation. Cross-check any failure against [BUG_REPORTS.md](../../BUG_REPORTS.md)/[KEY_FINDINGS.md](../../KEY_FINDINGS.md)
   before treating it as new — most failures against this production target are already-known findings, not
   regressions.
4. Leave §8 (Approvals) blank for the reviewing human to fill in — don't sign it on someone's behalf.

**When to bother:** before a release sign-off, or whenever you want a dated, defensible snapshot to point
someone at. Not required after every routine CI run — the Allure/Playwright HTML reports already cover that.

### UAT Template — copy, never edit in place

1. Copy [UAT_TEMPLATE.md](UAT_TEMPLATE.md) to `docs/qa/uat/<cycle-id>.md` (e.g. `docs/qa/uat/2026-Q3.md`,
   `docs/qa/uat/release-4.2.md` — whatever identifies the cycle).
2. Fill in Document control, run through the scenarios table, log any defects raised.
3. Get the Sign-off section actually signed (names + decisions), not left blank — a UAT file with an empty
   sign-off table isn't a completed cycle, it's an abandoned one.
4. Once signed off, the file is a historical record — don't edit it after sign-off; start a new copy for the
   next cycle instead.

### QA Feature Guide — living document, update alongside the code

Update [QA_FEATURE_GUIDE.md](QA_FEATURE_GUIDE.md) in the **same PR** as the code change that makes it stale —
same discipline as updating a docstring next to the function it describes. Concretely, touch it when:

- A new feature area gets its first automated spec (add a new `##` section, same shape as the existing ones).
- A known caveat is fixed (e.g. once the Firefox/WebKit root cause is found, update or remove that caveat
  rather than leaving a stale warning).
- A new tag or npm script is added to the execution strategy.

If a change doesn't affect what a tester needs to know before touching that feature, it doesn't belong here —
that's what commit messages and `TEST_STRATEGY.md`'s rationale sections are for.

## Git workflow for doc changes

Same pattern already in use across this project's other changes — small, single-purpose branches, not one
giant "update docs" commit:

1. Branch off `main` with a descriptive name: `docs/<what-changed>` (e.g. `docs/update-test-summary-report`,
   `docs/uat-2026-q3`).
2. Make the change, run `npx prettier --check docs/qa/*.md --end-of-line=auto` (Windows checkouts normalize
   line endings — pass `--end-of-line=auto` locally; plain `--check .` is what CI runs and is authoritative).
3. Commit with a message that says _why_, not just _what changed_ — e.g. "regenerate Test Summary Report after
   the cart-isolation fix landed," not "update docs".
4. Push and open a PR (`gh` isn't set up in this environment — push gives you a ready-made compare/PR link;
   visiting it and clicking "Create pull request" pre-fills the form from the branch).
5. After merge: `git checkout main && git pull --ff-only origin main` to sync, then delete the now-merged local
   branch (`git branch -d <branch>`).

One document change per PR keeps review small and makes it trivial to revert a single report without touching
unrelated docs — the same reasoning behind keeping the cart-isolation fix and the `KEY_FINDINGS.md` correction
in separate PRs earlier in this project's history.

## Quick reference

| I want to...                                              | Do this                                                                            |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Report today's test results                               | Update [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) in place, new branch/PR    |
| Start a UAT cycle for a release                           | Copy [UAT_TEMPLATE.md](UAT_TEMPLATE.md) → `docs/qa/uat/<cycle-id>.md`              |
| Document a new feature area                               | Add a section to [QA_FEATURE_GUIDE.md](QA_FEATURE_GUIDE.md)                        |
| Change what's in/out of scope                             | Update [TEST_PLAN.md](TEST_PLAN.md) §4/§5, bump the identifier                     |
| Understand _why_ something is scoped/tagged a certain way | Go to [TEST_STRATEGY.md](../../TEST_STRATEGY.md) instead — don't duplicate it here |
