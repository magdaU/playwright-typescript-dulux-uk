# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility/a11y.spec.ts >> Accessibility checks >> cart page has no serious or critical accessibility violations
- Location: tests/specs/accessibility/a11y.spec.ts:40:7

# Error details

```
Error: Found 1 serious/critical violation(s): html-has-lang

expect(received).toHaveLength(expected)

Expected length: 0
Received length: 1
Received array:  [{"description": "Ensure every HTML document has a lang attribute", "help": "<html> element must have a lang attribute", "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/html-has-lang?application=playwright", "id": "html-has-lang", "impact": "serious", "nodes": [{"all": [], "any": [{"data": {"messageKey": "noLang"}, "id": "has-lang", "impact": "serious", "message": "The <html> element does not have a lang attribute", "relatedNodes": []}], "failureSummary": "Fix any of the following:
  The <html> element does not have a lang attribute", "html": "<html class=\"overflow-y-scroll\" data-theme=\"dulux\">", "impact": "serious", "none": [], "target": ["html"]}], "tags": ["cat.language", "wcag2a", "wcag311", "TTv5", "TT11.a", "EN-301-549", "EN-9.3.1.1", "ACT", "RGAAv4", "RGAA-8.3.1"]}]
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Notifications alt+T"
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - link "Dulux" [ref=e6] [cursor=pointer]:
          - /url: /en
          - img "Dulux" [ref=e7]
        - img [ref=e8]
      - link "Continue shopping" [ref=e11] [cursor=pointer]:
        - /url: /en/products
        - img [ref=e12]
        - text: Continue shopping
    - main [ref=e14]:
      - generic [ref=e15]:
        - figure [ref=e16]:
          - img [ref=e17]
        - heading "Your basket is empty" [level=2] [ref=e33]
        - link "Continue shopping" [ref=e35] [cursor=pointer]:
          - /url: /en/products
          - generic [ref=e36]: Continue shopping
    - contentinfo [ref=e37]:
      - generic [ref=e38]:
        - list [ref=e39]:
          - listitem [ref=e40]:
            - link "Privacy policy" [ref=e41] [cursor=pointer]:
              - /url: /en/privacy-policy
          - listitem [ref=e42]:
            - link "Terms and Conditions" [ref=e43] [cursor=pointer]:
              - /url: /en/terms-and-conditions
        - generic [ref=e44]: Copyright @ AkzoNobel Paints 2026
```

# Test source

```ts
  1  | import AxeBuilder from '@axe-core/playwright';
  2  | import { test, expect } from '../../fixtures';
  3  | 
  4  | // Automated accessibility scans (axe-core) of the pages the purchase journey
  5  | // touches. This runs against the live, third-party-controlled production site,
  6  | // so we only fail on 'serious'/'critical' impact violations — 'minor'/'moderate'
  7  | // findings are typically cosmetic and would make this suite flaky on content we
  8  | // don't own. The full violation list is still attached to the report for review.
  9  | //
  10 | // Deliberately NOT tagged @regression: an initial run found real, pre-existing
  11 | // violations on production (see BUG_REPORTS.md) that are outside this suite's
  12 | // control to fix. Keeping this out of the default CI gate avoids a permanently
  13 | // red pipeline; it's run on demand (`npm run test:a11y`) as an audit, and can
  14 | // be promoted into @regression once the known findings are resolved upstream.
  15 | test.describe('Accessibility checks', { tag: ['@a11y', '@desktop'] }, () => {
  16 |   const SERIOUS_OR_WORSE = ['serious', 'critical'];
  17 | 
  18 |   test('home page has no serious or critical accessibility violations', async ({
  19 |     page,
  20 |     homePage,
  21 |   }, testInfo) => {
  22 |     await homePage.open();
  23 | 
  24 |     const results = await new AxeBuilder({ page }).analyze();
  25 | 
  26 |     await testInfo.attach('axe-results-home.json', {
  27 |       body: JSON.stringify(results.violations, null, 2),
  28 |       contentType: 'application/json',
  29 |     });
  30 | 
  31 |     const seriousOrWorse = results.violations.filter((v) =>
  32 |       SERIOUS_OR_WORSE.includes(v.impact ?? ''),
  33 |     );
  34 |     expect(
  35 |       seriousOrWorse,
  36 |       `Found ${seriousOrWorse.length} serious/critical violation(s): ${seriousOrWorse.map((v) => v.id).join(', ')}`,
  37 |     ).toHaveLength(0);
  38 |   });
  39 | 
  40 |   test('cart page has no serious or critical accessibility violations', async ({
  41 |     page,
  42 |     cartPage,
  43 |   }, testInfo) => {
  44 |     await cartPage.open();
  45 | 
  46 |     const results = await new AxeBuilder({ page }).analyze();
  47 | 
  48 |     await testInfo.attach('axe-results-cart.json', {
  49 |       body: JSON.stringify(results.violations, null, 2),
  50 |       contentType: 'application/json',
  51 |     });
  52 | 
  53 |     const seriousOrWorse = results.violations.filter((v) =>
  54 |       SERIOUS_OR_WORSE.includes(v.impact ?? ''),
  55 |     );
  56 |     expect(
  57 |       seriousOrWorse,
  58 |       `Found ${seriousOrWorse.length} serious/critical violation(s): ${seriousOrWorse.map((v) => v.id).join(', ')}`,
> 59 |     ).toHaveLength(0);
     |       ^ Error: Found 1 serious/critical violation(s): html-has-lang
  60 |   });
  61 | });
  62 | 
```