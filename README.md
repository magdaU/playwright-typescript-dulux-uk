# Dulux E2E Tests — Playwright + TypeScript

QA automation portfolio project: an E2E test suite for [dulux.co.uk](https://www.dulux.co.uk) built with
Playwright and TypeScript, covering UI journeys, API preconditions, CI/CD and automated Allure reporting.

[![View Allure Report](https://img.shields.io/badge/Allure%20Report-View%20latest%20results-orange?logo=qameta&logoColor=white)](https://magdau.github.io/playwright-typescript-dulux-uk/)

See [TEST_STRATEGY.md](TEST_STRATEGY.md) for scope, tagging, environments, risk-based prioritisation, and CI/CD
details, and [TEST_SCENARIOS.md](TEST_SCENARIOS.md) for the concrete scenarios behind the suite — including
ones identified but deliberately not automated, and why.

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
    ├── purchase/     # Tester-purchase journeys (UI, desktop + mobile)
    ├── setup/        # API-level precondition checks (no browser needed)
    └── showcase/     # Reference specs demonstrating locator/assertion strategies
```

## Playwright projects

`playwright.config.ts` splits the suite into three projects, each scoped to a different concern:

| Project | Purpose |
|---|---|
| `api` | Browser-less HTTP checks confirming key pages respond before the UI suite runs |
| `desktop-chrome` | Full UI journeys at a 1920×1080 desktop viewport |
| `mobile-chrome` | The same UI journeys adapted for mobile (e.g. hamburger menu instead of top nav), emulating a Pixel 7 |

## Getting started

```bash
npm install
npx playwright install --with-deps chromium
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
npm run test:trace       # force a full trace for every test
npm run report           # open the last Playwright HTML report
```

## Test coverage

- **Tester purchase journey** (`tests/specs/purchase/tester-product.spec.ts`, `@purchase @regression`, smoke-tagged
  on desktop) — find a colour, choose a shade, buy a tester, and verify it lands in the basket. Runs on both
  desktop and mobile, differing only in navigation entry point.
- **API preconditions** (`tests/specs/setup/`, `@api`) — confirms the home and cart pages respond before the UI
  journey runs.
- **Showcase specs** (`tests/specs/showcase/`, `@showcase`) — reference-only specs demonstrating locators &
  assertions, Trace Viewer & parallel execution, and test-runner config (timeouts, conditional skip, soft
  assertions, annotations).

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

| Concept | Where it's applied |
|---|---|
| **Test runner config** | `playwright.config.ts`; per-test knobs (`setTimeout`, `test.skip`, `expect.soft`, annotations) in `tests/specs/showcase/test-runner-config.spec.ts` |
| **Browser contexts** | `tests/fixtures.ts` (isolated `page` per test); `desktop-chrome`/`mobile-chrome` projects carry distinct viewports |
| **Storage state** | `tests/setup/global-setup.ts` accepts cookie consent once, persisted to `playwright/.auth/storage-state.json` |
| **API testing** | `tests/specs/setup/api-setup.spec.ts` — `request` fixture, no browser |
| **Locators** | `tests/pages/*.ts`, `tests/components/*.ts` — role/text-first (`getByRole`, `getByText`), showcased in `locators-and-assertions.spec.ts` |
| **Assertions** | Web-first, auto-retrying: `toBeVisible`, `toHaveValue`, `toHaveCount`, `toHaveURL`, `toHaveTitle` |
| **Trace Viewer** | `trace: 'on-first-retry'` in config; forced per-file in `trace-and-parallel.spec.ts` (`test.use({ trace: 'on' })`) |
| **Parallel execution** | `fullyParallel: true`; `test.describe.configure({ mode: 'parallel' })` in `trace-and-parallel.spec.ts`; `api`/`desktop-chrome`/`mobile-chrome` projects run side by side |
