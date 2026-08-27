# Test Plan — Dulux E2E

Structured per the IEEE 829 test plan outline referenced by the ISTQB Foundation Level syllabus. This document
is the formal, standards-shaped entry point; it deliberately doesn't repeat everything already written up in
[TEST_STRATEGY.md](../../TEST_STRATEGY.md) (rationale, tagging, risk-based prioritisation) or
[TEST_SCENARIOS.md](../../TEST_SCENARIOS.md) (step-by-step cases) — each section below links to the source of
truth instead of forking it.

## 1. Test plan identifier

`TP-DULUX-E2E-001` — v1.0, 2026-08-27, tracked against commit `e605b67` on `main`.

## 2. Introduction

**Project:** automated E2E regression suite for [dulux.co.uk](https://www.dulux.co.uk) (Playwright + TypeScript,
Page Object Model). **References:** [README.md](../../README.md), [TEST_STRATEGY.md](../../TEST_STRATEGY.md),
[TEST_SCENARIOS.md](../../TEST_SCENARIOS.md), [BUG_REPORTS.md](../../BUG_REPORTS.md),
[KEY_FINDINGS.md](../../KEY_FINDINGS.md).

## 3. Test items (features/software under test)

| Item                                          | Description                                        | Version under test                                          |
| --------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------- |
| dulux.co.uk — Home page                       | Landing page, navigation, cookie consent           | Live production, no build tag available (third-party site)  |
| dulux.co.uk — Colour finder & shade selection | Colour family/shade browsing flow                  | Live production                                             |
| dulux.co.uk — Basket/cart                     | Add tester, quantity, remove item                  | Live production                                             |
| Test automation code                          | This repository (page objects, specs, CI pipeline) | `playwright-typescript-dulux-uk` @ `main`, commit `e605b67` |

## 4. Features to be tested

See [TEST_STRATEGY §2 "In scope"](../../TEST_STRATEGY.md#2-scope) and the full case list in
[TEST_SCENARIOS.md](../../TEST_SCENARIOS.md). Summary: tester purchase journey (desktop + mobile), API
preconditions, accessibility (WCAG serious/critical), cross-browser check of the purchase journey.

## 5. Features not to be tested

See [TEST_STRATEGY §2 "Out of scope"](../../TEST_STRATEGY.md#2-scope): visual regression, performance/load,
security, real checkout/payment completion, backend API contract testing. The Visualizer App journey
(TC-VIS-01/02) is identified but not yet automated — see
[TEST_SCENARIOS §"Identified but not automated"](../../TEST_SCENARIOS.md#identified-but-not-automated).

## 6. Approach

Full strategy (test levels, POM design, locator strategy, storage-state setup, tagging) lives in
[TEST_STRATEGY §3–6](../../TEST_STRATEGY.md#3-test-levels--types). In brief: role/text-first locators against
the real production site, Page Object Model, fixtures-based dependency injection, tag-driven execution
(`@smoke`/`@regression`/`@api`/`@a11y`), Chromium as the default matrix with Firefox/WebKit as a non-blocking
opt-in check.

## 7. Item pass/fail criteria (entry/exit criteria)

**Entry criteria** (before a test run is considered valid):

- `npm ci` completes and `npx playwright install --with-deps` has installed the required browsers.
- Target site (`https://www.dulux.co.uk`) responds — confirmed by the `@api` project before the UI suite runs.
- `npm run lint` and `npm run format:check` pass (code quality gate, see
  [`.github/workflows/e2e-tests.yml`](../../.github/workflows/e2e-tests.yml)).

**Exit criteria** (suite/release considered complete):

- All `@regression`-tagged tests pass on `api`, `desktop-chrome`, and `mobile-chrome` (this is the CI-blocking
  gate — see [.github/workflows/e2e-tests.yml](../../.github/workflows/e2e-tests.yml)).
- `@a11y` and cross-browser (`desktop-firefox`/`desktop-webkit`) findings are reviewed but do **not** block —
  they run `continue-on-error: true` and are tracked separately (see §8 below and
  [BUG_REPORTS.md](../../BUG_REPORTS.md)).
- No new, unexplained failures in `@regression` since the last accepted baseline.

## 8. Suspension criteria and resumption requirements

- **Suspend** the run if the `@api` precondition checks fail (site is down) — no value in running the full
  browser matrix against an unreachable target.
- **Suspend** and investigate if a `@regression` test fails for a reason other than a known, already-tracked
  issue (i.e. a new/unexplained failure, not one of the tracked items in
  [BUG_REPORTS.md](../../BUG_REPORTS.md)/[KEY_FINDINGS.md](../../KEY_FINDINGS.md)).
- **Resume** once the root cause is identified and either fixed (automation bug) or explicitly accepted/tracked
  (production defect, third-party behaviour outside this suite's control).

## 9. Test deliverables

- Playwright HTML report (`playwright-report/`) and Allure report (`allure-report/`, published to GitHub Pages
  on `main` — see [README §Allure reporting](../../README.md#allure-reporting)).
- This Test Plan, the [Test Summary Report](TEST_SUMMARY_REPORT.md) per run/release, and the
  [UAT sign-off template](UAT_TEMPLATE.md) for stakeholder acceptance.
- [BUG_REPORTS.md](../../BUG_REPORTS.md) for defects found in production, [KEY_FINDINGS.md](../../KEY_FINDINGS.md)
  for the headline takeaways.

## 10. Testing tasks

| Task                                                  | Owner (this project)                                                             |
| ----------------------------------------------------- | -------------------------------------------------------------------------------- |
| Maintain page objects/fixtures                        | QA automation engineer                                                           |
| Triage new `@regression` failures                     | QA automation engineer                                                           |
| Track/report production defects (a11y, cross-browser) | QA automation engineer (files in `BUG_REPORTS.md`, out of scope to fix — see §5) |
| Review & merge PRs                                    | Repository owner (`magdaU`)                                                      |
| CI pipeline maintenance                               | QA automation engineer                                                           |

## 11. Environmental needs

- **Target:** production `https://www.dulux.co.uk` — no dedicated staging environment is available to this
  suite (see [TEST_STRATEGY §5](../../TEST_STRATEGY.md#5-environments--coverage)).
- **Runners:** local (Windows, this workstation) and GitHub Actions `ubuntu-latest`.
- **Browsers:** Chromium (`desktop-chrome`, `mobile-chrome`/Pixel 7 emulation) as the blocking matrix; Firefox
  and WebKit as opt-in, non-blocking checks.
- **Node.js 20**, `@playwright/test` ^1.60, installed via `npm ci` + `playwright install --with-deps`.
- No test accounts, payment credentials, or seeded backend data are required (see
  [TEST_STRATEGY §7](../../TEST_STRATEGY.md#7-test-data)).

## 12. Responsibilities

| Role                   | Responsibility                                                           |
| ---------------------- | ------------------------------------------------------------------------ |
| QA automation engineer | Write/maintain specs & page objects, triage failures, own this Test Plan |
| Repository owner       | Approve/merge PRs, accept or defer known production findings             |
| CI (GitHub Actions)    | Execute the suite on every push/PR, publish reports                      |

## 13. Staffing and training needs

Single-contributor portfolio project — no dedicated staffing plan. A new contributor would need familiarity
with TypeScript, Playwright Test, and the Page Object Model; onboarding material lives in
`tests/specs/showcase/**` (see [README — Playwright concepts](../../README.md#playwright-concepts--where-theyre-used))
and this document's linked references.

## 14. Schedule

Continuous, not milestone-based: the suite runs on every push to `main`/`feature/**`/`fix/**` and on every PR
into `main` (see [TEST_STRATEGY §9](../../TEST_STRATEGY.md#9-cicd-integration)). There is no fixed
release/testing calendar — this is a living regression suite, not a one-off test cycle.

## 15. Risks and contingencies

| Risk                                                                       | Contingency                                                                                                                                                                    |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Live production site changes content/markup without notice                 | Role/text-first locators (resilient to markup churn); catalogue data chosen as stable reference data (see [TEST_STRATEGY §6–7](../../TEST_STRATEGY.md#6-test-design-approach)) |
| Shared server-side state (e.g. basket) causing cross-test interference     | See the isolation bug found and fixed via `CartPage.emptyBasket()` — tracked in [KEY_FINDINGS.md #2](../../KEY_FINDINGS.md)                                                    |
| Third-party site outside this suite's control (a11y/cross-browser defects) | Findings tracked as non-blocking audits, not CI gates — [BUG_REPORTS.md](../../BUG_REPORTS.md), [TEST_STRATEGY §12](../../TEST_STRATEGY.md#12-future-improvements)             |
| Transient network/production flakiness                                     | `retries: 2` in CI, surfaced as flaky (not silently green) in Allure                                                                                                           |

## 16. Approvals

| Role                   | Name | Date | Signature |
| ---------------------- | ---- | ---- | --------- |
| QA Lead                |      |      |           |
| Product/Business Owner |      |      |           |
