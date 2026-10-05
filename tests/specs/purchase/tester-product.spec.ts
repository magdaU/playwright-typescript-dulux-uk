import { test, expect } from '../../fixtures';

test.describe('Purchase a colour tester', { tag: ['@purchase', '@regression'] }, () => {
  const colourFamily = 'Violet';
  const shade = 'Sugared Lilac';

  // Multi-page journey against a live production site (several 5–10s page loads); the 30s
  // default is too tight and made the test fail at whichever step happened to cross it.
  test.setTimeout(60_000);

  test(
    'desktop customer adds a tester to the basket via the colour finder',
    { tag: ['@smoke', '@desktop'] },
    async ({ page, homePage, navigation, colorSelectionPage, cartPage, alert }, testInfo) => {
      // GIVEN — cookie consent is already handled via storageState (see tests/setup/global-setup.ts).
      // Each test runs in its own browser context, which starts with its own empty basket.

      // WHEN
      await homePage.open();
      await navigation.clickDropdownFindColour();
      await navigation.clickFindColour();
      await colorSelectionPage.chooseColour(colourFamily);
      await colorSelectionPage.chooseSpecificShade(shade);
      await colorSelectionPage.buyATester();
      await alert.closeAlert();
      await navigation.openShoppingCart();

      // THEN
      await expect(cartPage.getQuantity()).toBeVisible();
      await expect(cartPage.getQuantity()).toHaveValue('1');
      await expect(cartPage.findText('Dulux Colour Tester')).toBeVisible();
      await expect(cartPage.findText(shade)).toBeVisible();
      await testInfo.attach('basket-desktop', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    },
  );

  test(
    'mobile customer adds a tester to the basket via the hamburger menu',
    { tag: ['@mobile'] },
    async ({ page, homePage, navigation, colorSelectionPage, cartPage, alert }, testInfo) => {
      // GIVEN — cookie consent is already handled via storageState (see tests/setup/global-setup.ts).
      // Each test runs in its own browser context, which starts with its own empty basket.

      // WHEN
      await homePage.open();
      await navigation.clickDropdownHamburgerMenu();
      await navigation.clickDropdownFindColour();
      await navigation.clickFindColour();
      await colorSelectionPage.chooseColour(colourFamily);
      await colorSelectionPage.chooseSpecificShade(shade);
      await colorSelectionPage.buyATester();
      await alert.closeAlert();
      await navigation.openShoppingCart();

      // THEN
      await expect(cartPage.getQuantity()).toBeVisible();
      await expect(cartPage.getQuantity()).toHaveValue('1');
      await expect(cartPage.findText('Dulux Colour Tester')).toBeVisible();
      await expect(cartPage.findText(shade)).toBeVisible();
      await testInfo.attach('basket-mobile', {
        body: await page.screenshot(),
        contentType: 'image/png',
      });
    },
  );
});
