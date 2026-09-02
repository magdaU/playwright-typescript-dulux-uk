# Test TODO — Dulux E2E

Itemised backlog of follow-up test-suite work, tracked separately from the strategic notes in
[TEST_STRATEGY §12](TEST_STRATEGY.md#12-future-improvements) so individual items can be picked up, checked off,
and linked from commits/PRs. Findings about the Dulux site itself (not the suite) belong in
[BUG_REPORTS.md](BUG_REPORTS.md)/[KEY_FINDINGS.md](KEY_FINDINGS.md) instead.

## Open items

- [ ] **Monitor `BUG-005` (tester out of stock site-wide) and re-run the purchase journey once resolved.** See
      [BUG_REPORTS.md](BUG_REPORTS.md#bug-005--buy-a-tester-is-unavailable-site-wide-the-tester-product-cant-be-ordered-online)
      for the full repro. `tests/specs/purchase/tester-product.spec.ts` (`@purchase @regression @smoke`) is left
      failing deliberately — it's an honest signal, not a suite bug — but check back periodically (e.g. before
      relying on a green `@smoke` run) and close this out once "Buy a Tester in this colour" is visible again on
      a shade-detail page.
- [ ] Root-cause the Firefox/WebKit divergence in the purchase journey (see
      [TEST_SCENARIOS.md](TEST_SCENARIOS.md#cross-browser-check)) before promoting cross-browser out of
      non-blocking.
- [ ] Promote `@a11y` into `@regression` once the violations in [BUG_REPORTS.md](BUG_REPORTS.md) are fixed
      upstream.

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
