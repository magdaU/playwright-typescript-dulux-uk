# Dulux E2E Tests — Playwright + TypeScript

QA automation portfolio project: an E2E test suite for [dulux.co.uk](https://www.dulux.co.uk) built with
Playwright and TypeScript, covering UI journeys, API preconditions, CI/CD and automated Allure reporting.

[![View Allure Report](https://img.shields.io/badge/Allure%20Report-View%20latest%20results-orange?logo=qameta&logoColor=white)](https://magdau.github.io/playwright-typescript-dulux-uk/)

See [TEST_STRATEGY.md](TEST_STRATEGY.md) for scope, tagging, environments, risk-based prioritisation, and CI/CD
details, [TEST_SCENARIOS.md](TEST_SCENARIOS.md) for the concrete scenarios behind the suite — including ones
identified but deliberately not automated, and why — and [BUG_REPORTS.md](BUG_REPORTS.md) for real defects
found on production by the accessibility audit.

## Tech stack

- [Playwright Test](https://playwright.dev/docs/intro) — test runner & browser automation
- TypeScript
- Page Object Model
- [Allure Report](https://allurereport.org/) — test reporting (`allure-playwright`, `allure-commandline`)
- GitHub Actions + GitHub Pages — CI and published Allure reports
- [Docker](https://www.docker.com/) — containerised suite ([`Dockerfile`](Dockerfile), based on `mcr.microsoft.com/playwright`)

## Project structure

```
tests/
├── pages/            # Page objects (HomePage, ColorSelectionPage, CartPage, ...)
├── components/       # Shared UI components (NavigationComponent, AlertComponent)
├── setup/            # Global setup (captures storageState once for the whole suite)
├── constants.ts      # Shared values (BASE_URL, storage state path)
├── fixtures.ts       # Custom Playwright fixtures wiring page objects into tests
└── specs/
    ├── purchase/       # Tester-purchase journeys (UI, desktop + mobile)
    ├── setup/          # API-level precondition checks (no browser needed)
    ├── accessibility/  # axe-core WCAG scans (non-blocking audit, see BUG_REPORTS.md)
    └── showcase/       # Reference specs demonstrating locator/assertion strategies
```

## Playwright projects

`playwright.config.ts` splits the suite into projects, each scoped to a different concern:

| Project           | Purpose                                                                                               | In default `npm test` / CI regression? |
| ----------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `api`             | Browser-less HTTP checks confirming key pages respond before the UI suite runs                        | Yes                                    |
| `desktop-chrome`  | Full UI journeys at a 1920×1080 desktop viewport                                                      | Yes                                    |
| `mobile-chrome`   | The same UI journeys adapted for mobile (e.g. hamburger menu instead of top nav), emulating a Pixel 7 | Yes                                    |
| `desktop-firefox` | Cross-browser check of the highest-risk journey (`@purchase`) only, at 1920×1080                      | No — on demand, `npm run test:firefox` |
| `desktop-webkit`  | Same as above, WebKit                                                                                 | No — on demand, `npm run test:webkit`  |

The Firefox/WebKit projects were added deliberately narrow in scope (purchase journey only, not the full
desktop-chrome matrix) and kept out of the default run: the first run surfaced real behavioural differences from
Chrome on production (navigation and shade-selection didn't reach the same state) that need investigation before
this becomes a CI gate. See [TEST_SCENARIOS.md](TEST_SCENARIOS.md#cross-browser-check).

## Getting started

```bash
npm install
npx playwright install --with-deps chromium         # add firefox webkit for the cross-browser check
```

Or run everything in Docker, with no local Node/browser setup:

```bash
docker build -t dulux-e2e .
docker run --rm dulux-e2e
```

## Running tests

```bash
npm test                 # full suite (api + desktop + mobile projects)
npm run test:headed      # run with a visible browser
npm run test:smoke       # tests tagged @smoke
npm run test:desktop     # desktop-chrome project only
npm run test:mobile      # mobile-chrome project only
npm run test:api         # API precondition checks only
npm run test:a11y        # accessibility audit (non-blocking, not part of npm test)
npm run test:crossbrowser # @purchase on Firefox + WebKit (non-blocking, not part of npm test)
npm run test:trace       # force a full trace for every test
npm run report           # open the last Playwright HTML report
```

## Code quality

```bash
npm run lint             # ESLint (TypeScript + eslint-plugin-playwright rules)
npm run lint:fix         # ESLint with autofix
npm run format           # Prettier — write
npm run format:check     # Prettier — check only (used in CI)
```

Both run in CI on every push/PR alongside the test suite.

## Test coverage

- **Tester purchase journey** (`tests/specs/purchase/tester-product.spec.ts`, `@purchase @regression`, smoke-tagged
  on desktop) — find a colour, choose a shade, buy a tester, and verify it lands in the basket. Runs on both
  desktop and mobile, differing only in navigation entry point.
- **API preconditions** (`tests/specs/setup/`, `@api`) — confirms the home and cart pages respond before the UI
  journey runs.
- **Showcase specs** (`tests/specs/showcase/`, `@showcase`) — reference-only specs demonstrating locators &
  assertions, Trace Viewer & parallel execution, and test-runner config (timeouts, conditional skip, soft
  assertions, annotations).
- **Accessibility audit** (`tests/specs/accessibility/`, `@a11y`) — axe-core scans of the home and cart pages
  for serious/critical WCAG violations. Non-blocking: an initial run found real production defects, tracked in
  [BUG_REPORTS.md](BUG_REPORTS.md) rather than failing CI indefinitely.
- **Cross-browser check** (`desktop-firefox`/`desktop-webkit` projects, `@purchase`) — the purchase journey only,
  run on demand. Non-blocking for the same reason as the a11y audit: the first run found real behavioural
  differences from Chrome, not yet root-caused (see [TEST_SCENARIOS.md](TEST_SCENARIOS.md#cross-browser-check)).

## Allure reporting

Every push to `main` runs the suite in CI and publishes the Allure report to GitHub Pages (link above), enriched
with history/trend, environment and executor info, and a defect-category taxonomy (see
[`.github/workflows/e2e-tests.yml`](.github/workflows/e2e-tests.yml)).

To generate and view the same report locally:

```bash
npm test
npm run allure:generate
npm run allure:open      # or: npm run allure:serve
```

Trends, Environment and Executors widgets are populated only in CI, where the previous report's history and the
build context (branch, commit, run URL) are available.

## Playwright concepts — where they're used

| Concept                | Where it's applied                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Test runner config** | `playwright.config.ts`; per-test knobs (`setTimeout`, `test.skip`, `expect.soft`, annotations) in `tests/specs/showcase/test-runner-config.spec.ts`                      |
| **Browser contexts**   | `tests/fixtures.ts` (isolated `page` per test); `desktop-chrome`/`mobile-chrome`/`desktop-firefox`/`desktop-webkit` projects carry distinct viewports/engines            |
| **Storage state**      | `tests/setup/global-setup.ts` accepts cookie consent once, persisted to `playwright/.auth/storage-state.json`                                                            |
| **API testing**        | `tests/specs/setup/api-setup.spec.ts` — `request` fixture, no browser                                                                                                    |
| **Locators**           | `tests/pages/*.ts`, `tests/components/*.ts` — role/text-first (`getByRole`, `getByText`), showcased in `locators-and-assertions.spec.ts`                                 |
| **Assertions**         | Web-first, auto-retrying: `toBeVisible`, `toHaveValue`, `toHaveCount`, `toHaveURL`, `toHaveTitle`                                                                        |
| **Trace Viewer**       | `trace: 'on-first-retry'` in config; forced per-file in `trace-and-parallel.spec.ts` (`test.use({ trace: 'on' })`)                                                       |
| **Parallel execution** | `fullyParallel: true`; `test.describe.configure({ mode: 'parallel' })` in `trace-and-parallel.spec.ts`; `api`/`desktop-chrome`/`mobile-chrome` projects run side by side |
