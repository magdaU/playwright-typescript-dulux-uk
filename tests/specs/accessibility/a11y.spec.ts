import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '../../fixtures';

// Automated accessibility scans (axe-core) of the pages the purchase journey
// touches. This runs against the live, third-party-controlled production site,
// so we only fail on 'serious'/'critical' impact violations — 'minor'/'moderate'
// findings are typically cosmetic and would make this suite flaky on content we
// don't own. The full violation list is still attached to the report for review.
//
// Deliberately NOT tagged @regression: an initial run found real, pre-existing
// violations on production (see BUG_REPORTS.md) that are outside this suite's
// control to fix. Keeping this out of the default CI gate avoids a permanently
// red pipeline; it's run on demand (`npm run test:a11y`) as an audit, and can
// be promoted into @regression once the known findings are resolved upstream.
test.describe('Accessibility checks', { tag: ['@a11y', '@desktop'] }, () => {
  const SERIOUS_OR_WORSE = ['serious', 'critical'];

  test('home page has no serious or critical accessibility violations', async ({
    page,
    homePage,
  }, testInfo) => {
    await homePage.open();

    const results = await new AxeBuilder({ page }).analyze();

    await testInfo.attach('axe-results-home.json', {
      body: JSON.stringify(results.violations, null, 2),
      contentType: 'application/json',
    });

    const seriousOrWorse = results.violations.filter((v) =>
      SERIOUS_OR_WORSE.includes(v.impact ?? ''),
    );
    expect(
      seriousOrWorse,
      `Found ${seriousOrWorse.length} serious/critical violation(s): ${seriousOrWorse.map((v) => v.id).join(', ')}`,
    ).toHaveLength(0);
  });

  test('cart page has no serious or critical accessibility violations', async ({
    page,
    cartPage,
  }, testInfo) => {
    await cartPage.open();

    const results = await new AxeBuilder({ page }).analyze();

    await testInfo.attach('axe-results-cart.json', {
      body: JSON.stringify(results.violations, null, 2),
      contentType: 'application/json',
    });

    const seriousOrWorse = results.violations.filter((v) =>
      SERIOUS_OR_WORSE.includes(v.impact ?? ''),
    );
    expect(
      seriousOrWorse,
      `Found ${seriousOrWorse.length} serious/critical violation(s): ${seriousOrWorse.map((v) => v.id).join(', ')}`,
    ).toHaveLength(0);
  });
});
