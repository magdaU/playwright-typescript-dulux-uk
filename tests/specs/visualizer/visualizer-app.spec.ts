import { test, expect } from '../../fixtures';

test.describe('Visualizer App', { tag: ['@visualizer', '@regression'] }, () => {
  const colourFamily = 'Violet';
  const shade = 'Sugared Lilac';

  test(
    'desktop customer opens the Visualizer App in a new tab',
    { tag: ['@desktop'] },
    async ({ page, homePage, navigation, colorSelectionPage }) => {
      // GIVEN — cookie consent is already handled via storageState (see tests/setup/global-setup.ts).
      await homePage.open();
      await navigation.clickDropdownFindColour();
      await navigation.clickFindColour();
      await colorSelectionPage.chooseColour(colourFamily);
      await colorSelectionPage.chooseSpecificShade(shade);

      // WHEN
      const [popup] = await Promise.all([
        page.waitForEvent('popup'),
        colorSelectionPage.openVisualizerApp(),
      ]);

      // THEN
      await popup.waitForLoadState();
      expect(popup.url()).toContain('dulux-visualizer-app');
    },
  );

  test(
    "mobile customer's tap doesn't crash or navigate away from the colour page",
    { tag: ['@mobile'] },
    async ({ page, context, homePage, navigation, colorSelectionPage }) => {
      // GIVEN — cookie consent is already handled via storageState (see tests/setup/global-setup.ts).
      await homePage.open();
      await navigation.clickDropdownHamburgerMenu();
      await navigation.clickDropdownFindColour();
      await navigation.clickFindColour();
      await colorSelectionPage.chooseColour(colourFamily);
      await colorSelectionPage.chooseSpecificShade(shade);
      const colourPageUrl = page.url();

      // WHEN — the mobile markup points the same link at an Adjust app-deep-link URL
      // (opens the native app / app store on a real device) instead of the desktop
      // popup. There's no app to hand off to in an automated browser, so the honest
      // assertion is the negative one below: it doesn't error out or navigate away.
      await colorSelectionPage.openVisualizerApp();
      // Asserting a negative (nothing opens/navigates) — there's no positive event to
      // await instead, so a short, explicit wait is the honest way to give it a chance.
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(2000);

      // THEN
      expect(context.pages()).toHaveLength(1);
      expect(page.url()).toBe(colourPageUrl);
    },
  );
});
