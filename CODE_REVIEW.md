# Code Review — Dulux E2E Playwright/TypeScript Suite

Independent code review performed by a separate model (Claude Fable 5.1, via a dedicated review agent) against
the state of this repo after `TC-CART-01`/`TC-VIS-01`/`TC-VIS-02`/`TC-SEARCH-01` and the cookie-consent-banner
fix had landed. Scope: `tests/pages/*.ts`, `tests/components/*.ts`, `tests/fixtures.ts`, `tests/constants.ts`,
`tests/setup/global-setup.ts`, all `tests/specs/**/*.spec.ts`, `playwright.config.ts`, `eslint.config.js`,
`tsconfig.json`, plus every strategy/scenario doc for context. Reviewer's own framing, kept verbatim: _"The
suite is well-disciplined overall (no `any`, consistent `Promise<void>` returns, no stray hard sleeps except
one documented/justified one, good use of web-first assertions and `waitForResponse`). The gaps below are
genuine, not nitpicks manufactured to fill a quota."_

Tracked separately from [TEST_TODO.md](TEST_TODO.md) (which is the itemised suite backlog, including items
that originate here once picked up) so this document stays a stable record of the review itself. See
[TEST_TODO.md](TEST_TODO.md) for live status as items are actioned.

## Suggested order of attack (reviewer's own prioritisation)

Items 1–2 (missing happy-path assertions) first — most valuable, cheapest, closes real coverage holes in
already-built specs. Item 6 (`emptyBasket()` race) next — risks reintroducing a flakiness class already fixed
once. Items 3–5 and 7 are architecture/code-quality cleanups that pay off more the longer the suite grows.
Items 8–10 are smaller polish.

## 1. Missing happy-path assertion in the cart-quantity spec

**Effort: small · Value: high**

`tests/specs/cart/cart-quantity-boundaries.spec.ts` only ever asserts that invalid quantities (`0`, `-5`,
`1000`) are _rejected_ and revert to `1`. It never asserts that a **valid** quantity change (e.g. `5`) is
accepted and persisted. If the site's validation logic broke in a way that rejected everything — including
legitimate updates — this suite would still pass; it only proves "bad input bounces back to 1," not "the
feature works at all."

**Fix:** add a `test.step` setting quantity to a valid value (e.g. `5`) and asserting it sticks (and ideally
that the line/basket total updates) before the boundary-rejection steps.

## 2. Colour search has no positive/happy-path case

**Effort: small · Value: high**

`tests/specs/search/colour-search.spec.ts` only covers the no-results negative case (`TC-SEARCH-01`).
[TEST_SCENARIOS.md](TEST_SCENARIOS.md#colour-search) explicitly states the author manually verified
`/en/search-results?search=violet` returns real matches _before_ writing the negative test — but that
verification was never turned into an automated assertion. A basic "searching for an existing colour returns
matching results" test is conspicuously absent given the negative case already exists and
`NavigationComponent.searchForColour()` is already built.

## 3. Trivial constructor boilerplate defeats the point of `BasePage` being `abstract`

**Effort: small · Value: code-quality**

`tests/pages/BasePage.ts` declares `export abstract class BasePage` **and** a `protected constructor`. The
`abstract` keyword already prevents direct instantiation, so the `protected` modifier is redundant — but its
side effect is that every one of the 8 subclasses (`HomePage`, `CartPage`, `ColorSelectionPage`,
`SearchResultsPage`, `ProductPage`, `ProductsListingPage`, `NavigationComponent`, `AlertComponent`) is forced
to redeclare an identical do-nothing `constructor(page: Page) { super(page); }` just to become publicly
instantiable for `fixtures.ts`'s `new HomePage(page)` calls.

**Fix:** make `BasePage`'s constructor `public` (the `abstract` modifier alone still blocks `new BasePage(...)`)
so all 8 subclasses can drop their constructors entirely and inherit `BasePage`'s public one. Removes ~24
lines of pure noise across 9 files.

## 4. Duplicated GIVEN-block and test data across specs

**Effort: medium · Value: DRY / maintainability**

- The exact 3-line "open cart → empty it → assert empty" precondition
  (`cartPage.open(); cartPage.emptyBasket(); await expect(cartPage.getBasketEmptyText()).toBeVisible();`) is
  copy-pasted verbatim in `tester-product.spec.ts` (×2) and `cart-quantity-boundaries.spec.ts`.
- `colourFamily = 'Violet'` / `shade = 'Sugared Lilac'` are redeclared identically as local consts in
  `tester-product.spec.ts`, `visualizer-app.spec.ts`, and `cart-quantity-boundaries.spec.ts`.
- The cart URL `/en/store/cart` is hardcoded both in `CartPage.open()` and again in
  `tests/specs/setup/api-setup.spec.ts`.

If "Sugared Lilac" ever gets discontinued or the cart route changes, three-to-four files need synchronized
edits instead of one.

**Fix:** extract shared test data into `tests/constants.ts` (or a `tests/testdata.ts`), and either an
`emptyCart` fixture or a `CartPage.ensureEmpty()`-style helper for the repeated GIVEN block.

## 5. `NavigationComponent`/`AlertComponent` aren't structurally distinct from Page objects

**Effort: medium · Value: design-pattern correctness**

Both `tests/components/NavigationComponent.ts` and `tests/components/AlertComponent.ts` extend `BasePage`
directly and operate on `this.page` globally — identical shape to every full page object. README and
[TEST_STRATEGY §6](TEST_STRATEGY.md#6-test-design-approach) claim a Page-vs-Component distinction, but nothing
in the code enforces or expresses it: a true component object typically wraps a root `Locator` (e.g. the
`<nav>` element) rather than the whole page, so it can be instantiated multiple times, composed, and scoped
safely.

This isn't just semantic — it has a concrete failure mode: `ColorSelectionPage.findProductsInThisColour()`
clicks `getByRole('link', { name: 'Go', exact: true })` unscoped to any container, unlike `openVisualizerApp()`
two methods below it, which correctly scopes via `.filter({ hasText: ... })`. If the page ever gains a second
"Go" link (e.g. a newsletter/postcode-lookup widget), that locator becomes a strict-mode violation.

**Fix:** introduce a proper `BaseComponent` (constructed from a root `Locator`, not the whole `Page`) so this
scoping is the default rather than opt-in per method.

## 6. `CartPage.emptyBasket()` has no wait between clicks

**Effort: small–medium · Value: flakiness prevention**

```ts
// tests/pages/CartPage.ts
async emptyBasket(): Promise<void> {
  const removeButton = this.page.getByRole('button', { name: REMOVE_ITEM_BUTTON });
  while (await removeButton.count()) {
    await removeButton.first().click();
  }
}
```

This clicks "Remove" and immediately re-checks `count()` with no wait for the removal's network round-trip to
complete or the DOM to update. `ProductPage.addToCart()` already encodes the lesson that a cart mutation here
is an async POST with no visible confirmation, and explicitly awaits the response before proceeding.
`emptyBasket()` doesn't apply that same lesson to removal — it's a plausible source of the exact kind of race
this team already debugged once ([KEY_FINDINGS.md](KEY_FINDINGS.md) #2, "basket isolation").

**Fix:** mirror the `waitForResponse` pattern here, or at minimum assert the button count decreases after each
click.

## 7. ESLint isn't running type-aware rules

**Effort: small–medium · Value: systematic bug prevention**

`eslint.config.js` uses `tseslint.configs.recommended`, not `recommendedTypeChecked`/`strictTypeChecked`.
Because every method in this suite is `async` and returns a `Promise`, the highest-value rule currently missing
is `@typescript-eslint/no-floating-promises` — a missed `await` on a Playwright action is exactly the kind of
bug that produces confusing, hard-to-reproduce flakiness on a live production site (the suite already documents
fighting flakiness at length — cookie banner, basket isolation).

**Fix:** wire `parserOptions.project` to `tsconfig.json` (required for type-aware linting) and switch to
`recommendedTypeChecked`. Effort is small-medium (mostly config); payoff is a systematic guard against a whole
class of Playwright bugs rather than relying on manual review.

## 8. Mobile variant missing for colour search

**Effort: small · Value: coverage gap**

`tests/specs/search/colour-search.spec.ts` is tagged `@desktop` only. Every other feature area covered by this
suite (purchase, visualizer) deliberately tests both desktop and mobile nav paths (hamburger menu vs. top nav)
because, per [TEST_STRATEGY §10](TEST_STRATEGY.md#10-risk-based-prioritisation), "cross-device navigation
differences" are called out as high risk. Search is the odd one out with no mobile counterpart, despite
`NavigationComponent` already having both `clickDropdownHamburgerMenu()` and the search methods needed to
build it trivially, following the exact pattern already used in `tester-product.spec.ts`/`visualizer-app.spec.ts`.

## 9. No basket-with-multiple-items / quantity-increment-reflects-in-total scenario

**Effort: medium · Value: coverage gap**

Cart coverage today is entirely about single-item quantity _input validation_ (rejecting bad values). There's
no scenario that exercises the cart's actual arithmetic — e.g. adding two different products and confirming
both line items and a combined total render correctly, or confirming that increasing quantity to a valid
number (say `5`) changes the displayed line total, not just the input's own value. Given the basket is a real,
shared, server-side cart ([KEY_FINDINGS.md](KEY_FINDINGS.md) #2) with its own persistence quirks the team has
already hit once, a scenario that touches basket math/multiple items is a believable next regression surface
once boundary-input coverage (item 1 above) is closed.

## 10. Minor: inconsistent locator-getter naming in `CartPage`

**Effort: very small · Value: polish**

`CartPage` mixes `getQuantity()`, `getBasketEmptyText()` (get-prefixed) with `findText()` (find-prefixed) for
what are all just locator accessors. Not a functional issue, but a one-word inconsistency worth normalizing
(`get*` throughout) while touching this file for item 6 above.
