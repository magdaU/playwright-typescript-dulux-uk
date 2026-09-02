# Test Scenarios & Cases — Dulux E2E

Concrete scenarios behind the automated suite, plus scenarios that were identified during test design but are
deliberately not automated (yet, or at all) — and why. See [TEST_STRATEGY.md](TEST_STRATEGY.md) for the
reasoning behind scope, risk prioritisation, and tagging; this document is the "what exactly gets checked, step
by step" view.

## How to read this

Each scenario has a stable ID (`TC-<area>-<n>`), the automation status, and a link to the spec file that
implements it (where one exists). Priority follows the risk-based prioritisation in
[TEST_STRATEGY §10](TEST_STRATEGY.md#10-risk-based-prioritisation).

## Tester purchase journey

| ID             | Scenario                                                               | Priority |
| -------------- | ---------------------------------------------------------------------- | -------- |
| TC-PURCHASE-01 | Desktop customer finds a colour via the nav dropdown and buys a tester | Highest  |
| TC-PURCHASE-02 | Mobile customer finds the same journey via the hamburger menu          | Highest  |

**TC-PURCHASE-01 — Desktop: add a tester to the basket via the colour finder**
Automated: `tests/specs/purchase/tester-product.spec.ts` · `@purchase @regression @smoke @desktop`

- **Preconditions:** cookie consent already accepted (shared `storageState`); basket starts empty.
- **Steps:**
  1. Open the basket and confirm it's empty ("Your basket is empty").
  2. Open the home page.
  3. Open the "Find a colour" nav dropdown, then "Find a colour".
  4. Choose the colour family **Violet**.
  5. Choose the shade **Sugared Lilac**.
  6. Click "Buy a Tester in this colour".
  7. Dismiss the resulting alert/notification.
  8. Open the shopping cart.
- **Expected result:** basket quantity input is visible and equals `1`; basket lists "Dulux Colour Tester" and
  "Sugared Lilac".
- **Evidence:** screenshot saved to `screenshots/tester-product/desktop-<timestamp>.png`.

**TC-PURCHASE-02 — Mobile: add a tester to the basket via the hamburger menu**
Automated: `tests/specs/purchase/tester-product.spec.ts` · `@mobile`

- Same as TC-PURCHASE-01, except step 3 first opens the hamburger menu (mobile nav is collapsed behind it)
  before reaching "Find a colour". Runs at Pixel 7 viewport instead of 1920×1080.
- **Expected result / evidence:** identical assertions and screenshot pattern as TC-PURCHASE-01
  (`screenshots/tester-product/mobile-<timestamp>.png`).

## Colour search

| ID           | Scenario                                                                       | Priority |
| ------------ | ------------------------------------------------------------------------------ | -------- |
| TC-SEARCH-01 | Searching for a non-existent colour shows a "no results" message, not an error | Medium   |

**TC-SEARCH-01 — Negative test: search with no matching results degrades gracefully**
Automated: `tests/specs/search/colour-search.spec.ts` · `@search @regression @desktop`

- **Preconditions:** cookie consent already accepted (shared `storageState`).
- **Steps:**
  1. Open the home page.
  2. Open the search field via the nav search icon.
  3. Search for a deliberately non-existent term (`zzznonexistentcolourxyz123`).
- **Expected result:** the results page (`/en/search-results?search=<query>`) shows
  `Sorry, we couldn't find any results for '<query>'` instead of an error page, a blank page, or unrelated
  results.
- **Why this scenario:** `NavigationComponent.searchForColour()` existed in the codebase but wasn't exercised by
  any spec — this closes that gap with a negative case rather than only the happy path. Confirmed against
  production first (`/en/search-results?search=violet` returns real colour matches; a nonsense query returns the
  no-results message) before writing the assertion, so the expected text is exact, not guessed.

## API preconditions

| ID        | Scenario                                                 | Priority              |
| --------- | -------------------------------------------------------- | --------------------- |
| TC-API-01 | Home page responds with a 2xx before the UI journey runs | High (fast-fail gate) |
| TC-API-02 | Cart page responds with a 2xx before the UI journey runs | High (fast-fail gate) |

Automated: `tests/specs/setup/api-setup.spec.ts` · `@api @regression`, browser-less via Playwright's `request`
fixture. These exist to fail fast and cheaply if the site itself is down, before spending time on a full browser
journey that would fail for an uninteresting reason.

## Accessibility audit

| ID         | Scenario                                          | Priority           |
| ---------- | ------------------------------------------------- | ------------------ |
| TC-A11Y-01 | Home page has no serious/critical WCAG violations | Non-blocking audit |
| TC-A11Y-02 | Cart page has no serious/critical WCAG violations | Non-blocking audit |

Automated: `tests/specs/accessibility/a11y.spec.ts` · `@a11y @desktop` — axe-core scan via `@axe-core/playwright`,
run on demand with `npm run test:a11y`. **Deliberately not tagged `@regression`:** the first run surfaced real,
pre-existing production violations (missing `<html lang>`, invalid/prohibited ARIA attributes, missing image
`alt` text, insufficient colour contrast) that are outside this suite's control to fix — see
[BUG_REPORTS.md](BUG_REPORTS.md) for the full writeup. Only `serious`/`critical` impact violations fail the
test; `minor`/`moderate` findings are attached to the report (`axe-results-*.json`) but don't fail it, since
they're often cosmetic and would make an audit of third-party content noisy rather than actionable.

## Cross-browser check

| ID             | Scenario                                                   | Priority           |
| -------------- | ---------------------------------------------------------- | ------------------ |
| TC-XBROWSER-01 | Desktop purchase journey (TC-PURCHASE-01) works on Firefox | Non-blocking check |
| TC-XBROWSER-02 | Desktop purchase journey (TC-PURCHASE-01) works on WebKit  | Non-blocking check |

Automated: `tests/specs/purchase/tester-product.spec.ts` (same spec as TC-PURCHASE-01, reused as-is) via the
`desktop-firefox`/`desktop-webkit` projects — `npm run test:crossbrowser` (or `test:firefox` / `test:webkit`
individually). **Deliberately not in the default `npm test`/CI regression run** (see
[TEST_STRATEGY §4](TEST_STRATEGY.md#4-tagging--execution-strategy) for how the project scoping works): the
first run found real failures on both —

- **Firefox:** got past colour selection but timed out waiting for the "Sugared Lilac" shade button.
- **WebKit:** timed out waiting for the "Find a colour" nav link — the page had already navigated straight to
  the colour-listing view, skipping a step the Chrome flow expects.

Root cause isn't yet isolated — it could be genuine behavioural differences in how production serves
Firefox/WebKit, or `NavigationComponent`/`ColorSelectionPage` encoding assumptions specific to Chrome's
interaction model (both page objects were originally written and only verified against `desktop-chrome`). Kept
non-blocking until that's investigated, per [TEST_STRATEGY §12](TEST_STRATEGY.md#12-future-improvements).

## Identified but not automated

Scenarios that came up during test design and are deliberately out, with the reasoning — not gaps discovered by
accident.

| ID             | Scenario                                                                           | Status            | Why                                                                                                                                                                                |
| -------------- | ---------------------------------------------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TC-VIS-01      | Desktop: opening the Visualizer App from a colour page opens it in a new tab       | Not yet automated | `ColorSelectionPage.openVisualizerApp()` already exists as a page-object method; listed as a known future addition in [TEST_STRATEGY §12](TEST_STRATEGY.md#12-future-improvements) |
| TC-VIS-02      | Mobile: Visualizer App gracefully degrades to a support message instead of opening | Not yet automated | Same as above — ported from the original Java/Cucumber suite's coverage, not yet reimplemented here                                                                                |
| TC-CHECKOUT-01 | Completing checkout and receiving an order confirmation                            | Out of scope      | Suite runs against **live production** — completing checkout would create a real order/charge (see [TEST_STRATEGY §2](TEST_STRATEGY.md#2-scope))                                   |
| TC-VISUAL-01   | Pixel-level visual regression on colour-selection/landing pages                    | Out of scope      | No visual-diff tooling wired in; screenshots are captured as evidence only, not compared (see [TEST_STRATEGY §12](TEST_STRATEGY.md#12-future-improvements))                        |

## Reference / showcase specs

`tests/specs/showcase/**` (locators & assertions, trace viewer & parallel execution, test-runner config) are
onboarding/reference material demonstrating Playwright building blocks in isolation — not customer-journey
scenarios, so they're intentionally not listed as test cases here. See the
[building-blocks table in the README](README.md#playwright-concepts--where-theyre-used) for what each one
demonstrates.
