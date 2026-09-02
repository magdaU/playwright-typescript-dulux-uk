# Test TODO — Dulux E2E

Itemised backlog of follow-up test-suite work, tracked separately from the strategic notes in
[TEST_STRATEGY §12](TEST_STRATEGY.md#12-future-improvements) so individual items can be picked up, checked off,
and linked from commits/PRs. Findings about the Dulux site itself (not the suite) belong in
[BUG_REPORTS.md](BUG_REPORTS.md)/[KEY_FINDINGS.md](KEY_FINDINGS.md) instead.

## Open items

- [ ] Root-cause the Firefox/WebKit divergence in the purchase journey (see
      [TEST_SCENARIOS.md](TEST_SCENARIOS.md#cross-browser-check)) before promoting cross-browser out of
      non-blocking.
- [ ] Promote `@a11y` into `@regression` once the violations in [BUG_REPORTS.md](BUG_REPORTS.md) are fixed
      upstream.
- [ ] **[CODE_REVIEW.md #6](CODE_REVIEW.md#6-cartpageemptybasket-has-no-wait-between-clicks)** —
      `CartPage.emptyBasket()` has no wait between "Remove" clicks; mirror the `waitForResponse` pattern
      `ProductPage.addToCart()` already uses, since this is the same class of race the team already debugged
      once (basket isolation, [KEY_FINDINGS.md](KEY_FINDINGS.md) #2).
- [ ] **[CODE_REVIEW.md #3](CODE_REVIEW.md#3-trivial-constructor-boilerplate-defeats-the-point-of-basepage-being-abstract)**
      — make `BasePage`'s constructor `public` so its 8 subclasses can drop their identical do-nothing
      constructors.
- [ ] **[CODE_REVIEW.md #4](CODE_REVIEW.md#4-duplicated-given-block-and-test-data-across-specs)** — extract
      the repeated "empty the basket" GIVEN block and the `colourFamily`/`shade` test-data consts duplicated
      across specs.
- [ ] **[CODE_REVIEW.md #5](CODE_REVIEW.md#5-navigationcomponentalertcomponent-arent-structurally-distinct-from-page-objects)**
      — introduce a `BaseComponent` scoped to a root `Locator` (not the whole `Page`) for
      `NavigationComponent`/`AlertComponent`, and scope `findProductsInThisColour()`'s "Go" link the same way
      `openVisualizerApp()` already scopes its link, to avoid a future strict-mode violation.
- [ ] **[CODE_REVIEW.md #7](CODE_REVIEW.md#7-eslint-isnt-running-type-aware-rules)** — wire `parserOptions.project`
      and switch ESLint to `recommendedTypeChecked` for `@typescript-eslint/no-floating-promises`.
- [ ] **[CODE_REVIEW.md #8](CODE_REVIEW.md#8-mobile-variant-missing-for-colour-search)** — add a `@mobile`
      variant of the colour-search spec (hamburger menu path), matching purchase/visualizer coverage.
- [ ] **[CODE_REVIEW.md #9](CODE_REVIEW.md#9-no-basket-with-multiple-items--quantity-increment-reflects-in-total-scenario)**
      — a scenario exercising basket arithmetic with multiple line items, not just single-item quantity
      validation.
- [ ] **[CODE_REVIEW.md #10](CODE_REVIEW.md#10-minor-inconsistent-locator-getter-naming-in-cartpage)** —
      normalise `CartPage`'s locator getters to a consistent `get*` prefix (bundle with item 6 above, same
      file).

## Done

- [x] Negative test for colour search with no matching results (`TC-SEARCH-01`,
      `tests/specs/search/colour-search.spec.ts`).
- [x] Visualizer App journey (`TC-VIS-01`/`TC-VIS-02`, `tests/specs/visualizer/visualizer-app.spec.ts`) —
      desktop opens a new tab; mobile's app-deep-link is confirmed a no-op in an automated browser rather than
      the "support message" originally assumed from the ported Java/Cucumber description (see
      [TEST_SCENARIOS.md](TEST_SCENARIOS.md#visualizer-app-journey)).
- [x] **Cookie-consent banner intermittently reappearing despite `storageState`.** Hit repeatedly across three
      unrelated pieces of work (the search test, the Visualizer test, and investigating `BUG-005`) before being
      fixed: added `BasePage.dismissConsentBannerIfPresent()` (a bounded 5s wait for the OneTrust reject-all
      handler, then click if it showed up) and call it after every real navigation in `HomePage.open()`,
      `CartPage.open()`, and `NavigationComponent.clickDropdownFindColour()`. Also replaced
      `global-setup.ts`'s old unconditional `rejectAllCookies()` click with the same bounded-wait helper (via
      `HomePage.open()`), since an unconditional click could itself hang if the banner's async script hadn't
      rendered yet. Verified with 9 back-to-back runs across `@search` and `@visualizer` (desktop + mobile) after
      the fix — zero flakes, versus 5 consecutive failures beforehand.
- [x] **`BUG-005` (tester out of stock site-wide) — monitored and resolved.** Re-ran
      `tests/specs/purchase/tester-product.spec.ts` (desktop + mobile) while validating the cart-quantity work
      below and it passed cleanly, twice — "Buy a Tester in this colour" is back. See
      [BUG_REPORTS.md](BUG_REPORTS.md#bug-005--buy-a-tester-is-unavailable-site-wide-the-tester-product-cant-be-ordered-online)
      for the resolution note.
- [x] Negative/boundary test for the basket quantity input (`TC-CART-01`,
      `tests/specs/cart/cart-quantity-boundaries.spec.ts`) — `0`, negative, and above-max (`1000` vs. `max="999"`)
      values are all rejected; the above-max case additionally surfaces a generic error banner. Built against a
      regular paint product rather than the tester, since the tester was out of stock at the time (see
      [TEST_SCENARIOS.md](TEST_SCENARIOS.md#cart)).
- [x] **[CODE_REVIEW.md #1](CODE_REVIEW.md#1-missing-happy-path-assertion-in-the-cart-quantity-spec)** — added a
      valid-quantity (`5`) step to `TC-CART-01`, run after the rejection steps since the site's actual fallback
      on a rejected value turned out to be a fixed `1`, not "last value attempted" as originally assumed.
- [x] **[CODE_REVIEW.md #2](CODE_REVIEW.md#2-colour-search-has-no-positivehappy-path-case)** — added `TC-SEARCH-02`,
      a positive search case asserting a real, numbered results heading (matched by pattern, not a hardcoded
      count).
