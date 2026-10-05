import { test as base } from '@playwright/test';
import { COLOUR_FAMILY, PAINT_NAME, SHADE, TESTER_NAME } from './test-data';
import { HomePage } from './pages/HomePage';
import { ColorSelectionPage } from './pages/ColorSelectionPage';
import { CartPage } from './pages/CartPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { ProductsListingPage } from './pages/ProductsListingPage';
import { ProductPage } from './pages/ProductPage';
import { NavigationComponent } from './components/NavigationComponent';
import { AlertComponent } from './components/AlertComponent';

type Pages = {
  homePage: HomePage;
  colorSelectionPage: ColorSelectionPage;
  cartPage: CartPage;
  searchResultsPage: SearchResultsPage;
  productsListingPage: ProductsListingPage;
  productPage: ProductPage;
  navigation: NavigationComponent;
  alert: AlertComponent;
  basketWithTwoProducts: { testerName: string; paintName: string };
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  colorSelectionPage: async ({ page }, use) => {
    await use(new ColorSelectionPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  productsListingPage: async ({ page }, use) => {
    await use(new ProductsListingPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  navigation: async ({ page }, use) => {
    await use(new NavigationComponent(page));
  },
  alert: async ({ page }, use) => {
    await use(new AlertComponent(page));
  },

  // GIVEN for basket-arithmetic specs: a colour tester (one-click shortcut) plus a regular paint,
  // both in the same shade, then the basket page open. Each test's context starts with an empty
  // basket, so no cleanup is needed first.
  basketWithTwoProducts: async (
    { homePage, navigation, colorSelectionPage, productsListingPage, productPage, alert, cartPage },
    use,
  ) => {
    await homePage.open();
    await navigation.clickDropdownFindColour();
    await navigation.clickFindColour();
    await colorSelectionPage.chooseColour(COLOUR_FAMILY);
    await colorSelectionPage.chooseSpecificShade(SHADE);
    await colorSelectionPage.buyATester();
    await alert.closeAlert();
    await colorSelectionPage.findProductsInThisColour();
    await productsListingPage.openProduct(PAINT_NAME);
    await productPage.addToCart();
    await cartPage.open();
    await use({ testerName: TESTER_NAME, paintName: PAINT_NAME });
  },
});

export { expect } from '@playwright/test';
