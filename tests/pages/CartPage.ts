import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const QUANTITY_INPUT_LABEL = 'Quantity input';
const BASKET_EMPTY_TEXT = 'Your basket is empty';
const INCREASE_QUANTITY_LABEL = 'Increase quantity';
const REMOVE_ITEM_LABEL = 'Remove';
const ORDER_TOTAL_LABEL = 'Order Total';
const DELIVERY_COST_LABEL = 'Estimated Delivery Cost';
const SUBTOTAL_TEST_ID = 'subtotal';
const POUNDS_PATTERN = /£\d/;
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

  // A basket line: the list item that holds the product's own level-3 heading. The nested
  // detail items (colour, size) have no heading, so they don't match.
  getLineItem(productName: string): Locator {
    return this.page.getByRole('listitem').filter({
      has: this.page.getByRole('heading', { name: productName, level: 3 }),
    });
  }

  getLineQuantity(productName: string): Locator {
    return this.getLineItem(productName).getByRole('spinbutton', { name: QUANTITY_INPUT_LABEL });
  }

  async increaseQuantity(productName: string): Promise<void> {
    await this.getLineItem(productName)
      .getByRole('button', { name: INCREASE_QUANTITY_LABEL })
      .click();
  }

  async removeItem(productName: string): Promise<void> {
    await this.getLineItem(productName).getByRole('button', { name: REMOVE_ITEM_LABEL }).click();
  }

  // Amounts are read from the page as integer pence, so the specs can do exact arithmetic
  // without floating-point drift. They're read once — callers that follow an action should
  // wrap them in expect.poll(), since the basket re-renders asynchronously.
  async getLinePrice(productName: string): Promise<number> {
    return this.readPence(this.getLineItem(productName).getByText(POUNDS_PATTERN));
  }

  async getSubtotal(): Promise<number> {
    return this.readPence(this.page.getByTestId(SUBTOTAL_TEST_ID).getByText(POUNDS_PATTERN));
  }

  async getDeliveryCost(): Promise<number> {
    return this.readPence(this.getSummaryRow(DELIVERY_COST_LABEL).getByText(POUNDS_PATTERN));
  }

  async getOrderTotal(): Promise<number> {
    return this.readPence(this.getSummaryRow(ORDER_TOTAL_LABEL).getByText(POUNDS_PATTERN));
  }

  private getSummaryRow(label: string): Locator {
    return this.page.getByText(label, { exact: true }).locator('..');
  }

  private async readPence(amount: Locator): Promise<number> {
    const text = (await amount.innerText()).replace(/[^\d.]/g, '');
    return Math.round(Number.parseFloat(text) * 100);
  }
}
