import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const QUANTITY_INPUT_LABEL = 'Quantity input';
const BASKET_EMPTY_TEXT = 'Your basket is empty';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.page.goto('/en/store/cart');
  }

  getQuantity(): Locator {
    return this.page.getByRole('spinbutton', { name: QUANTITY_INPUT_LABEL });
  }

  findText(text: string): Locator {
    return this.page.getByText(text);
  }

  getBasketEmptyText(): Locator {
    return this.page.getByText(BASKET_EMPTY_TEXT);
  }
}