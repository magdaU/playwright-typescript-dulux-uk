# Bug Reports

Defects found by this suite against the live [dulux.co.uk](https://www.dulux.co.uk) production site — real
findings, not fabricated examples. BUG-001 through BUG-004 came from an automated axe-core accessibility scan
(`tests/specs/accessibility/a11y.spec.ts`, `npm run test:a11y`); since the suite doesn't own the production
site, that check is kept as a non-blocking, on-demand audit (see [TEST_STRATEGY §2](TEST_STRATEGY.md#2-scope)
and [TEST_SCENARIOS.md](TEST_SCENARIOS.md#accessibility-audit)) rather than a CI gate, so findings are tracked
here instead of failing the pipeline indefinitely. BUG-005 is a functional finding from the `@purchase` journey
itself — see its entry for why that test is left failing rather than worked around.

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

## BUG-005 — "Buy a Tester" is unavailable site-wide; the tester product can't be ordered online

- **Severity:** Critical (functional, not accessibility) — blocks the suite's highest-priority journey
  (`TC-PURCHASE-01`/`02`, see [TEST_STRATEGY §10](TEST_STRATEGY.md#10-risk-based-prioritisation))
- **Pages:** any colour-detail page (e.g. `/en/colour-details/filters/h_Violet#tabId=item0`) and the
  "Dulux Colour Tester" product page reached from it
- **Steps to reproduce:**
  1. Home → "Find a colour" → any colour family → any shade.
  2. Observe the shade-detail panel: no "Buy a Tester in this colour" button is rendered.
  3. Inspect the DOM anyway: the button element is present (`class="...js-add-cart"`,
     `title="Buy a Tester in this colour"`) but not visible — it isn't a missing feature, it's conditionally
     hidden.
  4. Follow the alternate path instead: click "Find Products in this colour" → "Go" → this navigates to
     `/en/products/filters/h_<family>/cccId_<colourId>`, a product listing that still lists "Dulux Colour
     Tester" at £2.90.
  5. Open that product card.
- **Actual result:** the product page shows a red banner: _"At the moment it is not possible to order this
  product online. Keep an eye on the website, we are working hard to replenish the stock."_ There's a quantity
  stepper but no add-to-basket control.
- **Expected result:** the tester is orderable, and the one-click "Buy a Tester in this colour" button is
  visible on the shade-detail page (the button/handler already exists in the markup, exactly as it did when
  this suite's purchase journey was last verified working).
- **Confirmed site-wide, not shade-specific:** reproduced for two unrelated colour families/shades — Violet
  ("Sugared Lilac") and Blue ("Frosted Lake") — same banner, same missing button, both times.
- **Impact on this suite:** `tests/specs/purchase/tester-product.spec.ts` (`@purchase @regression @smoke`) now
  fails at `ColorSelectionPage.buyATester()`, because there's genuinely nothing to buy. **Left failing
  deliberately** — this is a correct, honest signal (the suite's job is to confirm customers can complete this
  journey, and right now they can't), not a selector/page-object problem to "fix" around. See
  [TEST_TODO.md](TEST_TODO.md) for the follow-up once stock is confirmed restored.

## Reporting these upstream

These are defects in Dulux's production site, not in this test suite — in a real engagement they'd be filed in
the site owner's tracker with the reproduction steps above and the full axe-core JSON attached (this suite
attaches it automatically to the test report on every run, see `axe-results-home.json` /
`axe-results-cart.json` in the Playwright/Allure attachments). Filing them externally is out of scope for a
portfolio project with no access to that tracker.
