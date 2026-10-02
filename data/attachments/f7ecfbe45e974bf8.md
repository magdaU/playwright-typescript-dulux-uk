# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: purchase/tester-product.spec.ts >> Purchase a colour tester >> mobile customer adds a tester to the basket via the hamburger menu
- Location: tests/specs/purchase/tester-product.spec.ts:37:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('spinbutton', { name: 'Quantity input' })
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('spinbutton', { name: 'Quantity input' })

```

# Test source

```ts
  1  | import { test, expect } from '../../fixtures';
  2  | 
  3  | test.describe('Purchase a colour tester', { tag: ['@purchase', '@regression'] }, () => {
  4  |   const colourFamily = 'Violet';
  5  |   const shade = 'Sugared Lilac';
  6  | 
  7  |   test(
  8  |     'desktop customer adds a tester to the basket via the colour finder',
  9  |     { tag: ['@smoke', '@desktop'] },
  10 |     async ({ page, homePage, navigation, colorSelectionPage, cartPage, alert }) => {
  11 |       // GIVEN — cookie consent is already handled via storageState (see tests/setup/global-setup.ts).
  12 |       // The basket itself is a real, shared server-side cart (see CartPage.emptyBasket), so it isn't
  13 |       // guaranteed empty just from a fresh run — clear it before relying on that precondition.
  14 |       await cartPage.open();
  15 |       await cartPage.emptyBasket();
  16 |       await expect(cartPage.getBasketEmptyText()).toBeVisible();
  17 | 
  18 |       // WHEN
  19 |       await homePage.open();
  20 |       await navigation.clickDropdownFindColour();
  21 |       await navigation.clickFindColour();
  22 |       await colorSelectionPage.chooseColour(colourFamily);
  23 |       await colorSelectionPage.chooseSpecificShade(shade);
  24 |       await colorSelectionPage.buyATester();
  25 |       await alert.closeAlert();
  26 |       await navigation.openShoppingCart();
  27 | 
  28 |       // THEN
  29 |       await expect(cartPage.getQuantity()).toBeVisible();
  30 |       await expect(cartPage.getQuantity()).toHaveValue('1');
  31 |       await expect(cartPage.findText('Dulux Colour Tester')).toBeVisible();
  32 |       await expect(cartPage.findText(shade)).toBeVisible();
  33 |       await page.screenshot({ path: `screenshots/tester-product/desktop-${Date.now()}.png` });
  34 |     },
  35 |   );
  36 | 
  37 |   test(
  38 |     'mobile customer adds a tester to the basket via the hamburger menu',
  39 |     { tag: ['@mobile'] },
  40 |     async ({ page, homePage, navigation, colorSelectionPage, cartPage, alert }) => {
  41 |       // GIVEN — cookie consent is already handled via storageState (see tests/setup/global-setup.ts).
  42 |       // The basket itself is a real, shared server-side cart (see CartPage.emptyBasket), so it isn't
  43 |       // guaranteed empty just from a fresh run — clear it before relying on that precondition.
  44 |       await cartPage.open();
  45 |       await cartPage.emptyBasket();
  46 |       await expect(cartPage.getBasketEmptyText()).toBeVisible();
  47 | 
  48 |       // WHEN
  49 |       await homePage.open();
  50 |       await navigation.clickDropdownHamburgerMenu();
  51 |       await navigation.clickDropdownFindColour();
  52 |       await navigation.clickFindColour();
  53 |       await colorSelectionPage.chooseColour(colourFamily);
  54 |       await colorSelectionPage.chooseSpecificShade(shade);
  55 |       await colorSelectionPage.buyATester();
  56 |       await alert.closeAlert();
  57 |       await navigation.openShoppingCart();
  58 | 
  59 |       // THEN
> 60 |       await expect(cartPage.getQuantity()).toBeVisible();
     |                                            ^ Error: expect(locator).toBeVisible() failed
  61 |       await expect(cartPage.getQuantity()).toHaveValue('1');
  62 |       await expect(cartPage.findText('Dulux Colour Tester')).toBeVisible();
  63 |       await expect(cartPage.findText(shade)).toBeVisible();
  64 |       await page.screenshot({ path: `screenshots/tester-product/mobile-${Date.now()}.png` });
  65 |     },
  66 |   );
  67 | });
  68 | 
```