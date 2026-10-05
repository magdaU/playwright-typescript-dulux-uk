import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const QUANTITY_INPUT_LABEL = 'Quantity input';
const BASKET_EMPTY_TEXT = 'Your basket is empty';
const GENERIC_ERROR_TEXT = 'Sorry we encountered an error, please try again.';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.page.goto('/en/store/cart');
    await this.dismissConsentBannerIfPresent();
  }

  getQuantity(): Locator {
    return this.page.getByRole('spinbutton', { name: QUANTITY_INPUT_LABEL });
  }

  // Fills the quantity input and blurs it (Tab) so the page's own validation/rounding
  // runs, the same way a real user tabbing away from the field would trigger it.
  async setQuantity(value: string): Promise<void> {
    await this.getQuantity().fill(value);
    await this.getQuantity().press('Tab');
  }

  findText(text: string): Locator {
    return this.page.getByText(text);
  }

  getGenericErrorMessage(): Locator {
    return this.page.getByText(GENERIC_ERROR_TEXT);
  }

  getItemsCountText(count: number): Locator {
    return this.page.getByText(`${count} items`);
  }

  getBasketEmptyText(): Locator {
    return this.page.getByText(BASKET_EMPTY_TEXT);
  }
}
