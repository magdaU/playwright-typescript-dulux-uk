# Bug Reports

Defects found by this suite against the live [dulux.co.uk](https://www.dulux.co.uk) production site. These are
real findings from an automated axe-core accessibility scan (`tests/specs/accessibility/a11y.spec.ts`,
`npm run test:a11y`) — not fabricated examples. Since the suite doesn't own the production site, this check is
kept as a non-blocking, on-demand audit (see [TEST_STRATEGY §2](TEST_STRATEGY.md#2-scope) and
[TEST_SCENARIOS.md](TEST_SCENARIOS.md#accessibility-audit)) rather than a CI gate, so these are tracked here
instead of failing the pipeline indefinitely.

## BUG-001 — `<html>` element missing a `lang` attribute (Cart page)

- **Severity:** Serious (WCAG 3.1.1, level A)
- **Page:** `/en/store/cart`
- **Steps to reproduce:**
  1. Open the cart page.
  2. Inspect the `<html>` element.
- **Actual result:** `<html class="overflow-y-scroll" data-theme="dulux">` — no `lang` attribute.
- **Expected result:** `<html lang="en">` (or equivalent), so assistive technology announces the page in the
  correct language.
- **Rule:** [`html-has-lang`](https://dequeuniversity.com/rules/axe/4.13/html-has-lang)

## BUG-002 — Invalid/prohibited ARIA attributes (Home page)

- **Severity:** Critical / Serious (WCAG 4.1.2, level A)
- **Page:** `/` (home)
- **Actual result:** axe-core flagged elements using `aria-*` attributes that are either not valid ARIA
  attribute names or not permitted for the element's role.
- **Expected result:** ARIA attributes present on an element are valid and permitted for that element's role.
- **Rules:** [`aria-valid-attr`](https://dequeuniversity.com/rules/axe/4.13/aria-valid-attr) (critical),
  [`aria-prohibited-attr`](https://dequeuniversity.com/rules/axe/4.13/aria-prohibited-attr) (serious)

## BUG-003 — Images without alternative text (Home page)

- **Severity:** Critical (WCAG 1.1.1, level A)
- **Page:** `/` (home)
- **Actual result:** one or more `<img>` elements have no alternative text and no `role="none"`/`"presentation"`.
- **Expected result:** every informative image has descriptive `alt` text; purely decorative images are marked
  `role="presentation"` (or use empty `alt=""`).
- **Rule:** [`image-alt`](https://dequeuniversity.com/rules/axe/4.13/image-alt)

## BUG-004 — Insufficient colour contrast (Home page)

- **Severity:** Serious (WCAG 1.4.3, level AA)
- **Page:** `/` (home)
- **Actual result:** axe-core flagged text/background colour pairs below the WCAG AA minimum contrast ratio.
- **Expected result:** foreground/background colour pairs meet the WCAG AA minimum contrast ratio.
- **Rule:** [`color-contrast`](https://dequeuniversity.com/rules/axe/4.13/color-contrast)

## Reporting these upstream

These are defects in Dulux's production site, not in this test suite — in a real engagement they'd be filed in
the site owner's tracker with the reproduction steps above and the full axe-core JSON attached (this suite
attaches it automatically to the test report on every run, see `axe-results-home.json` /
`axe-results-cart.json` in the Playwright/Allure attachments). Filing them externally is out of scope for a
portfolio project with no access to that tracker.
