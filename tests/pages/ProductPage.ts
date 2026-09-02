import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

const ADD_TO_CART_TEXT = 'Add to shopping cart';
const ADD_TO_CART_API_PATH = '/en/store/api/v2/cart';

export class ProductPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // The click only kicks off an async POST to the cart API, with no visible confirmation
  // on this page (no toast/alert) — wait for that request to resolve, not just the click,
  // otherwise navigating to the cart straight after can race ahead of the item landing in it.
  async addToCart(): Promise<void> {
    const cartUpdated = this.page.waitForResponse(
      (res) => res.url().includes(ADD_TO_CART_API_PATH) && res.request().method() === 'POST',
    );
    await this.page.getByRole('button', { name: ADD_TO_CART_TEXT }).click();
    await cartUpdated;
  }
}
