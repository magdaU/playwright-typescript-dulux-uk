# Test Summary Report — Dulux E2E

Structured per the IEEE 829 Test Summary Report outline referenced by the ISTQB Foundation Level syllabus.
Reflects an actual run of the suite, not a hypothetical one — see §5 for the raw pass/fail counts and how they
were produced.

## 1. Test summary report identifier

`TSR-DULUX-E2E-2026-08-27-002` — covers the run executed 2026-08-27 against commit `2eb603b` on `main`.
Supersedes `TSR-DULUX-E2E-2026-08-27-001` (see §3 — that run's flagged variance is now fixed). Companion
document: [TEST_PLAN.md](TEST_PLAN.md) (`TP-DULUX-E2E-001`).

## 2. Summary

Scope executed: `npm test` (`api` + `desktop-chrome` + `mobile-chrome` projects, now correctly scoped to
`@regression` — see §3) and, separately, `npm run test:a11y`. Target: production `https://www.dulux.co.uk`.
Full scope/approach: [TEST_PLAN.md](TEST_PLAN.md).

## 3. Variances

- **Resolved since the previous report:** `npm test` was not actually scoped to `@regression` —
  `package.json`'s `test` script carried no `--grep @regression`, so `tests/specs/accessibility/a11y.spec.ts`
  (tagged `@a11y @desktop`, deliberately not `@regression`) ran as part of a plain `npm test` and its 2 known
  failures showed up there instead of only in the dedicated `npm run test:a11y` audit. Fixed by adding
  `--grep @regression` to the `test` script — `npm test` now runs 14 tests (matching CI's
  `--grep "@regression"` default) instead of 16. Verified via `npx playwright test --list` before and after
  the change.
- No other variance from the plan in [TEST_PLAN.md](TEST_PLAN.md) for this run — entry criteria were met (site
  reachable, lint/format/types clean) before running.

## 4. Comprehensiveness assessment

All features listed as in-scope in [TEST_PLAN §4](TEST_PLAN.md#4-features-to-be-tested) /
[TEST_STRATEGY §2](../../TEST_STRATEGY.md#2-scope) were exercised in this run: purchase journey (desktop +
mobile), API preconditions, accessibility audit. Cross-browser (Firefox/WebKit) was **not** re-run for this
report — its last-known result is carried from [TEST_SCENARIOS §Cross-browser check](../../TEST_SCENARIOS.md#cross-browser-check)
(non-blocking, known failures, unchanged since that finding was logged). The Visualizer App journey
(TC-VIS-01/02) remains unautomated — see [TEST_PLAN §5](TEST_PLAN.md#5-features-not-to-be-tested).

## 5. Summary of results

**`npm test` — regression matrix (`api` + `desktop-chrome` + `mobile-chrome`, `@regression`-scoped):**
**14 tests run — 14 passed, 0 failed.**

| Suite                                 | Tests | Result      |
| ------------------------------------- | ----- | ----------- |
| `@api` — precondition checks          | 2     | ✅ 2 passed |
| `@purchase` — desktop tester purchase | 1     | ✅ passed   |
| `@purchase` — mobile tester purchase  | 1     | ✅ passed   |
| `@showcase` — locators & assertions   | 4     | ✅ 4 passed |
| `@showcase` — test runner config      | 4     | ✅ 4 passed |
| `@showcase` — trace viewer & parallel | 2     | ✅ 2 passed |

**`npm run test:a11y` — accessibility audit (non-blocking, run separately per §3's fix):**
**2 tests run — 0 passed, 2 failed.**

| Suite               | Tests | Result                                                                                                               |
| ------------------- | ----- | -------------------------------------------------------------------------------------------------------------------- |
| `@a11y` — home page | 1     | ❌ failed — 4 serious/critical violations (`aria-prohibited-attr`, `aria-valid-attr`, `color-contrast`, `image-alt`) |
| `@a11y` — cart page | 1     | ❌ failed — 1 serious violation (`html-has-lang`)                                                                    |

Both `@a11y` failures are **known, pre-existing production defects**, not automation regressions — same
violations as the previous report, full reproduction steps and WCAG references are in
[BUG_REPORTS.md](../../BUG_REPORTS.md) (BUG-001 through BUG-004).

**Cross-browser check (`desktop-firefox`/`desktop-webkit`, carried from last recorded run, not re-executed for
this report):** both fail before completing the purchase journey — Firefox times out on shade selection,
WebKit skips a navigation step Chrome expects. Root cause not yet isolated between genuine Firefox/WebKit
behavioural differences and Chrome-specific assumptions in `NavigationComponent`/`ColorSelectionPage`. Full
detail: [TEST_SCENARIOS §Cross-browser check](../../TEST_SCENARIOS.md#cross-browser-check).

## 6. Evaluation

The suite is healthy: `npm test` is now 14/14 passing and correctly scoped to `@regression`, matching CI. The
`@a11y` audit's 2 failures are both pre-existing, documented production accessibility defects outside this
suite's remit to fix (see [BUG_REPORTS.md](../../BUG_REPORTS.md)) — unchanged from the previous report, so no
new regression. **Recommendation:** the core purchase journey remains release-ready; the accessibility findings
should be routed to whoever owns dulux.co.uk's frontend. The `npm test`/`@a11y` scoping variance flagged in the
previous report is now closed.

## 7. Summary of activities

- Fixed the `npm test`/`@a11y` scoping variance flagged in the previous report (`TSR-...-001`): added
  `--grep @regression` to the `test` script in `package.json`, verified with `playwright test --list`
  (16 → 14 tests) before re-running.
- Ran `npm test` (now `@regression`-scoped) against production, 2026-08-27 — 14/14 passed.
- Ran `npm run test:a11y` separately — 2 failed, both matching previously logged findings in
  [BUG_REPORTS.md](../../BUG_REPORTS.md), no new violations.
- Cross-referenced cross-browser status against the existing record in
  [TEST_SCENARIOS.md](../../TEST_SCENARIOS.md) rather than re-running (out of scope for this report cycle).

## 8. Approvals

| Role                   | Name | Date | Signature |
| ---------------------- | ---- | ---- | --------- |
| QA Lead                |      |      |           |
| Product/Business Owner |      |      |           |
