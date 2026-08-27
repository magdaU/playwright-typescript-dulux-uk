# QA Feature Guide — Dulux E2E

A feature-by-feature reference for QA work on this project: what each customer-facing area does, how to
exercise it (manually and via automation), what's already covered, and what to watch out for. Where
[TEST_SCENARIOS.md](../../TEST_SCENARIOS.md) answers "what exactly gets checked, step by step" for a given test
case, this guide answers "what do I need to know about this feature before I test it" — the onboarding-level
context. Pair it with [TEST_STRATEGY.md](../../TEST_STRATEGY.md) for the _why_ behind scope/tagging decisions.

## How to use this guide

Each feature area lists: what it is, how to run its automated coverage, how to check it manually, and known
caveats a tester should know going in. "Tags" refer to the Playwright tags in
[TEST_STRATEGY §4](../../TEST_STRATEGY.md#4-tagging--execution-strategy) — use them with
`npx playwright test --grep "<tag>"`.

---

## Cookie consent & storage state

**What it is:** a one-time banner ("reject all" flow) that must be dismissed before any journey can proceed.

- **Automated coverage:** handled once, globally, in `tests/setup/global-setup.ts` — not a per-test scenario.
  Every test starts already past the banner via a shared `storageState` (`playwright/.auth/storage-state.json`).
- **Manual check:** open `https://www.dulux.co.uk` in a fresh/incognito session, confirm the consent banner
  appears and "Reject all" dismisses it without errors.
- **Caveat for testers:** if you're debugging a test that seems to start in a weird state, check whether
  `playwright/.auth/storage-state.json` is stale (delete it and re-run `global-setup` — it regenerates
  automatically on the next `npx playwright test`). It's gitignored, so it won't be shared between machines.

## Tester purchase journey

**What it is:** the core, revenue-critical flow — find a colour family, pick a specific shade, buy a tester,
confirm it lands in the basket. Covers both desktop (top nav) and mobile (hamburger menu) entry points.

- **Automated coverage:** `tests/specs/purchase/tester-product.spec.ts` — tags `@purchase @regression`,
  `@smoke @desktop` (desktop) / `@mobile` (mobile). Run with `npm run test:smoke` (desktop only, fast) or
  `npm run test:desktop` / `npm run test:mobile` for the full device-specific run. Case detail:
  [TC-PURCHASE-01/02](../../TEST_SCENARIOS.md#tester-purchase-journey).
- **Manual check:** same steps as the automated case — worth doing manually after any Dulux-side navigation or
  colour-picker redesign, since that's exactly the kind of change that breaks the role/text-based locators in
  `ColorSelectionPage`/`NavigationComponent`.
- **Known caveat — shared basket state:** the basket is a **real, shared server-side cart** on production,
  keyed to a persistent anonymous visitor ID baked into `storageState.json` (see
  [KEY_FINDINGS.md #2](../../KEY_FINDINGS.md)). `CartPage.emptyBasket()` clears leftover items before each
  purchase test relies on an empty basket — if you're writing a new test that touches the basket, call it too,
  don't assume a fresh basket by default.
- **Test data:** colour family "Violet" / shade "Sugared Lilac" are treated as stable catalogue reference data
  (see [TEST_STRATEGY §7](../../TEST_STRATEGY.md#7-test-data)) — not seasonal, safe to keep hardcoding in new
  scenarios in this area.

## Basket / cart

**What it is:** the cart page (`/en/store/cart`) — quantity, product/shade display, empty-state messaging,
remove-item action.

- **Automated coverage:** exercised as part of the purchase journey above (`CartPage` page object,
  `tests/pages/CartPage.ts`); also directly in `tests/specs/showcase/trace-and-parallel.spec.ts` (empty-basket
  rendering, as a Trace Viewer/parallel-execution demo, tag `@showcase`).
- **Manual check:** add an item, verify quantity controls and remove-item both work, and that the empty-basket
  message reappears once the basket is cleared.
- **Caveat:** no checkout completion is ever tested (in production, on purpose — see
  [TEST_STRATEGY §2](../../TEST_STRATEGY.md#2-scope)). Don't add a scenario that completes a real order.

## API preconditions

**What it is:** fast, browser-less HTTP checks confirming the home and cart pages respond with a 2xx before
spending time on a full UI run.

- **Automated coverage:** `tests/specs/setup/api-setup.spec.ts`, tags `@api @regression`, its own `api`
  project (no browser/device emulation). Run with `npm run test:api`.
- **Manual check:** `curl -I https://www.dulux.co.uk/` / `curl -I https://www.dulux.co.uk/en/store/cart` and
  confirm a 2xx status.
- **When to use it:** if a UI test is failing in a confusing way, run `npm run test:api` first to rule out
  "the site is just down" before debugging locators.

## Accessibility (WCAG)

**What it is:** an axe-core scan of the home and cart pages for `serious`/`critical` WCAG violations.

- **Automated coverage:** `tests/specs/accessibility/a11y.spec.ts`, tag `@a11y @desktop`. Run with
  `npm run test:a11y`. **Deliberately not part of `npm run test:smoke`/`@regression`-gated CI** — see
  [TEST_STRATEGY §4](../../TEST_STRATEGY.md#4-tagging--execution-strategy) for why (real, pre-existing
  production violations outside this suite's control — see next point).
  `npm test` was previously not scoped to `@regression`, so it ran these too — fixed (see
  [TEST_SUMMARY_REPORT §3](TEST_SUMMARY_REPORT.md#3-variances)); `npm test` now excludes `@a11y` and only
  `npm run test:a11y` runs it, matching CI.
- **Known, already-filed findings:** missing `<html lang>` (cart), invalid/prohibited ARIA attributes (home),
  images without alt text (home), insufficient colour contrast (home) — full repro steps in
  [BUG_REPORTS.md](../../BUG_REPORTS.md), BUG-001 through BUG-004. Don't re-file these; check there first.
- **Manual check:** run a browser extension (axe DevTools, WAVE) or a screen reader spot-check on the home/cart
  pages if you suspect a _new_ violation beyond the four already tracked.

## Cross-browser (Firefox/WebKit)

**What it is:** the same purchase journey (TC-PURCHASE-01), run against Firefox and WebKit instead of Chrome,
to catch engine-specific behavioural differences.

- **Automated coverage:** `desktop-firefox`/`desktop-webkit` Playwright projects (not a tag — see
  [TEST_STRATEGY §4](../../TEST_STRATEGY.md#4-tagging--execution-strategy) for why), reusing
  `tests/specs/purchase/tester-product.spec.ts` as-is. Run with `npm run test:crossbrowser` (or
  `test:firefox`/`test:webkit` individually).
- **Known caveat:** both currently fail before completing the journey — Firefox times out on shade selection,
  WebKit skips a navigation step Chrome expects. Root cause not yet isolated (genuine site behaviour vs.
  Chrome-specific assumptions baked into `NavigationComponent`/`ColorSelectionPage`) — full detail in
  [TEST_SCENARIOS §Cross-browser check](../../TEST_SCENARIOS.md#cross-browser-check). Treat new failures here
  as expected until that's root-caused; don't file a fresh bug report without checking that section first.

## Visualizer App (not yet automated)

**What it is:** a "Try our Visualizer App" experience reachable from the colour-selection page — opens in a new
tab on desktop, degrades to a support message on mobile. `ColorSelectionPage.openVisualizerApp()` already
exists as a page-object method, but no spec calls it yet.

- **Status:** identified, not automated — see [TC-VIS-01/02](../../TEST_SCENARIOS.md#identified-but-not-automated)
  and [TEST_STRATEGY §12](../../TEST_STRATEGY.md#12-future-improvements).
- **Manual check:** on desktop, click "Try our Visualizer App" from a colour page and confirm it opens in a new
  tab; on mobile, confirm the graceful-degradation message instead.
- **If you're picking this up:** the page-object method is ready; what's missing is the spec file + assertions
  (new tab opened / correct message shown) and a `@visualizer` tag per the existing tagging scheme.

---

## Where to look next

| Question                                               | Document                                                                                   |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Why is X in/out of scope, or tagged the way it is?     | [TEST_STRATEGY.md](../../TEST_STRATEGY.md)                                                 |
| What exactly does test case TC-X check, step by step?  | [TEST_SCENARIOS.md](../../TEST_SCENARIOS.md)                                               |
| What production defects are already known?             | [BUG_REPORTS.md](../../BUG_REPORTS.md)                                                     |
| What did the last full run actually find?              | [KEY_FINDINGS.md](../../KEY_FINDINGS.md), [TEST_SUMMARY_REPORT.md](TEST_SUMMARY_REPORT.md) |
| I'm running UAT for a release — where's the checklist? | [UAT_TEMPLATE.md](UAT_TEMPLATE.md)                                                         |
| What's the formal test plan (IEEE 829/ISTQB style)?    | [TEST_PLAN.md](TEST_PLAN.md)                                                               |
