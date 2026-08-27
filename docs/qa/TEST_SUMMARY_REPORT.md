# Test Summary Report — Dulux E2E

Structured per the IEEE 829 Test Summary Report outline referenced by the ISTQB Foundation Level syllabus.
Reflects an actual run of the suite, not a hypothetical one — see §5 for the raw pass/fail counts and how they
were produced.

## 1. Test summary report identifier

`TSR-DULUX-E2E-2026-08-27-001` — covers the run executed 2026-08-27 against commit `e605b67` on `main`.
Companion document: [TEST_PLAN.md](TEST_PLAN.md) (`TP-DULUX-E2E-001`).

## 2. Summary

Scope executed: the default regression matrix (`api` + `desktop-chrome` + `mobile-chrome` projects, i.e.
`npm test`) plus the `@a11y` audit, which — see §3 — ran as part of the same invocation rather than separately.
Target: production `https://www.dulux.co.uk`. Full scope/approach: [TEST_PLAN.md](TEST_PLAN.md).

## 3. Variances

Deviations from the documented plan, found while producing this report:

- **`npm test` is not actually scoped to `@regression`.** [TEST_STRATEGY.md](../../TEST_STRATEGY.md) and the
  README both state the `@a11y` audit is "non-blocking, not part of `npm test`". In practice, `package.json`'s
  `test` script (`playwright test --project=api --project=desktop-chrome --project=mobile-chrome`) carries no
  `--grep @regression`, and `desktop-chrome` in `playwright.config.ts` only excludes `@mobile`
  (`grepInvert: /@mobile/`) — it doesn't exclude `@a11y`. So `tests/specs/accessibility/a11y.spec.ts` (tagged
  `@a11y @desktop`, deliberately not `@regression`) executed as part of this run and its 2 known failures are
  included in §5 below. **CI is unaffected** — the GitHub Actions workflow explicitly passes
  `--grep "${{ ... || '@regression' }}"`, which correctly excludes `@a11y` from the blocking job and runs it as
  a separate `continue-on-error: true` step. This is a local-script/documentation inconsistency, not a
  pipeline defect; recommended fix is adding `--grep @regression` to the `test` script in `package.json`.
- No other variance from the plan in [TEST_PLAN.md](TEST_PLAN.md) — entry criteria were met (site reachable,
  lint/format clean) before this run.

## 4. Comprehensiveness assessment

All features listed as in-scope in [TEST_PLAN §4](TEST_PLAN.md#4-features-to-be-tested) /
[TEST_STRATEGY §2](../../TEST_STRATEGY.md#2-scope) were exercised in this run: purchase journey (desktop +
mobile), API preconditions, accessibility audit. Cross-browser (Firefox/WebKit) was **not** re-run for this
report — its last-known result is carried from [TEST_SCENARIOS §Cross-browser check](../../TEST_SCENARIOS.md#cross-browser-check)
(non-blocking, known failures, unchanged since that finding was logged). The Visualizer App journey
(TC-VIS-01/02) remains unautomated — see [TEST_PLAN §5](TEST_PLAN.md#5-features-not-to-be-tested).

## 5. Summary of results

**Regression matrix + a11y audit (`api` + `desktop-chrome` + `mobile-chrome`, this invocation includes `@a11y`
per §3):** **16 tests run — 14 passed, 2 failed.**

| Suite                                 | Tests | Result                                                                                                               |
| ------------------------------------- | ----- | -------------------------------------------------------------------------------------------------------------------- |
| `@api` — precondition checks          | 2     | ✅ 2 passed                                                                                                          |
| `@purchase` — desktop tester purchase | 1     | ✅ passed                                                                                                            |
| `@purchase` — mobile tester purchase  | 1     | ✅ passed                                                                                                            |
| `@showcase` — locators & assertions   | 4     | ✅ 4 passed                                                                                                          |
| `@showcase` — test runner config      | 4     | ✅ 4 passed                                                                                                          |
| `@showcase` — trace viewer & parallel | 2     | ✅ 2 passed                                                                                                          |
| `@a11y` — home page                   | 1     | ❌ failed — 4 serious/critical violations (`aria-prohibited-attr`, `aria-valid-attr`, `color-contrast`, `image-alt`) |
| `@a11y` — cart page                   | 1     | ❌ failed — 1 serious violation (`html-has-lang`)                                                                    |

Both `@a11y` failures are **known, pre-existing production defects**, not automation regressions — full
reproduction steps and WCAG references are in [BUG_REPORTS.md](../../BUG_REPORTS.md) (BUG-001 through BUG-004).

**Cross-browser check (`desktop-firefox`/`desktop-webkit`, carried from last recorded run, not re-executed for
this report):** both fail before completing the purchase journey — Firefox times out on shade selection,
WebKit skips a navigation step Chrome expects. Root cause not yet isolated between genuine Firefox/WebKit
behavioural differences and Chrome-specific assumptions in `NavigationComponent`/`ColorSelectionPage`. Full
detail: [TEST_SCENARIOS §Cross-browser check](../../TEST_SCENARIOS.md#cross-browser-check).

## 6. Evaluation

The suite itself is healthy: every test covering functionality this project controls (purchase journey, API
preconditions, showcase/reference specs) passed. The two failures are both pre-existing, documented production
accessibility defects outside this suite's remit to fix (see [BUG_REPORTS.md](../../BUG_REPORTS.md)) — they do
not indicate a regression in the automation or in the purchase journey's core functionality. **Recommendation:**
safe to consider the core purchase journey release-ready; the accessibility findings should be routed to
whoever owns dulux.co.uk's frontend, and the `npm test`/`@a11y` scoping variance in §3 should be fixed so local
runs match the documented (and CI-actual) behaviour.

## 7. Summary of activities

- Ran `npm test` (api + desktop-chrome + mobile-chrome projects) against production, 2026-08-27.
- Reviewed the resulting Playwright report and axe-core violation attachments for the two `@a11y` failures,
  cross-checked against previously logged findings in [BUG_REPORTS.md](../../BUG_REPORTS.md) — same violations,
  no new ones.
- Cross-referenced cross-browser status against the existing record in
  [TEST_SCENARIOS.md](../../TEST_SCENARIOS.md) rather than re-running (out of scope for this report cycle).

## 8. Approvals

| Role                   | Name | Date | Signature |
| ---------------------- | ---- | ---- | --------- |
| QA Lead                |      |      |           |
| Product/Business Owner |      |      |           |
