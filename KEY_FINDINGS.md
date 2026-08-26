# Key Findings — Dulux E2E

Running this suite against a real production site surfaced findings worth calling out on their own — this is
what running it has actually shown, not aspirational coverage claims.

| #   | Area                                        | Finding                                                                                                                                                      | Evidence                                                                                                                    |
| --- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| 1   | Purchase journey (Chrome, desktop + mobile) | Functionally stable, no regressions                                                                                                                          | 13-14/14 `@regression` tests pass consistently                                                                              |
| 2   | Flakiness against production                | One test occasionally times out on the first attempt and passes on retry — expected when testing a live, uncontrolled site, not a code regression            | Absorbed by `retries: 2` in CI; surfaces as flaky in Allure, not silently green                                             |
| 3   | Accessibility (WCAG)                        | The site carries real, pre-existing technical debt: 5 serious/critical violations                                                                            | axe-core scan of home + cart pages, documented in [BUG_REPORTS.md](BUG_REPORTS.md)                                          |
| 4   | Cross-browser                               | Firefox/WebKit do **not** complete the same journey as Chrome — navigation and shade-selection behave differently                                            | Non-blocking `desktop-firefox`/`desktop-webkit` runs; details in [TEST_SCENARIOS.md](TEST_SCENARIOS.md#cross-browser-check) |
| 5   | Page objects                                | Written and verified against Chrome only until now — "working" so far meant "working in one browser"                                                         | `NavigationComponent`/`ColorSelectionPage` — root cause of the cross-browser gap not yet isolated                           |
| 6   | CI strategy                                 | New checks that touch something outside this suite's control (a third-party site, different browser engines) are kept as non-blocking audits, not hard gates | `@a11y` and cross-browser steps run with `continue-on-error: true`, excluded from the default `@regression` run             |

The overall picture: the test code itself is solid; the more interesting findings are about the Dulux site
itself (accessibility, cross-browser behaviour), not about the automation.

See [TEST_STRATEGY.md](TEST_STRATEGY.md) for how these findings shaped the suite's tagging/CI decisions,
[TEST_SCENARIOS.md](TEST_SCENARIOS.md) for the scenarios behind them, and [BUG_REPORTS.md](BUG_REPORTS.md) for
the accessibility defects in full.
