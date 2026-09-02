import { test, expect } from '../../fixtures';

test.describe(
  'Cart quantity boundary values',
  { tag: ['@cart', '@regression', '@desktop'] },
  () => {
    const colourFamily = 'Violet';
    const shade = 'Sugared Lilac';
    const productName = 'Dulux Paint Mixing Easycare Washable & Tough Matt';

    test('quantity input accepts valid values and rejects zero, negative and above-max values', async ({
      page,
      homePage,
      navigation,
      colorSelectionPage,
      productsListingPage,
      productPage,
      cartPage,
    }) => {
      // This flow has more real page navigations than other specs (colour -> product
      // listing -> product detail -> cart), so it needs more than the 30s default.
      test.setTimeout(60_000);

      // GIVEN — cookie consent is already handled via storageState (see tests/setup/global-setup.ts).
      // Uses a regular paint product rather than the colour tester: the tester was unorderable
      // site-wide when this was written (see BUG-005 in BUG_REPORTS.md, since resolved), but the
      // quantity input's validation behaviour doesn't depend on which product is in the basket.
      await cartPage.open();
      await cartPage.emptyBasket();
      await expect(cartPage.getBasketEmptyText()).toBeVisible();

      await homePage.open();
      await navigation.clickDropdownFindColour();
      await navigation.clickFindColour();
      await colorSelectionPage.chooseColour(colourFamily);
      await colorSelectionPage.chooseSpecificShade(shade);
      await colorSelectionPage.findProductsInThisColour();
      await productsListingPage.openProduct(productName);
      await productPage.addToCart();

      await cartPage.open();
      await expect(cartPage.getQuantity()).toHaveValue('1');

      // WHEN / THEN
      await test.step('0 is rejected, quantity reverts to the last valid value', async () => {
        await cartPage.setQuantity('0');
        await expect(cartPage.getQuantity()).toHaveValue('1');
      });

      await test.step('a negative quantity is rejected, quantity reverts to the last valid value', async () => {
        await cartPage.setQuantity('-5');
        await expect(cartPage.getQuantity()).toHaveValue('1');
      });

      await test.step('a quantity above the input max (999) is rejected and surfaces an error', async () => {
        await cartPage.setQuantity('1000');
        await expect(cartPage.getQuantity()).toHaveValue('1');
        await expect(
          page.getByText('Sorry we encountered an error, please try again.'),
        ).toBeVisible();
      });

      await test.step('a valid quantity is still accepted after those rejections and updates the basket total', async () => {
        await cartPage.setQuantity('5');
        await expect(cartPage.getQuantity()).toHaveValue('5');
        // Confirms the change actually reached the basket, not just the input's own value —
        // otherwise a validation bug that rejected everything (including valid input) would
        // still pass every assertion above. Also proves the input isn't left stuck/broken by
        // the invalid attempts that came before it.
        await expect(cartPage.findText('5 items')).toBeVisible();
      });
    });
  },
);
