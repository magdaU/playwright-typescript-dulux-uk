import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const QUANTITY_INPUT_LABEL = 'Quantity input';
const BASKET_EMPTY_TEXT = 'Your basket is empty';
const REMOVE_ITEM_BUTTON = 'Remove';

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

  getBasketEmptyText(): Locator {
    return this.page.getByText(BASKET_EMPTY_TEXT);
  }

  // The basket is a real, server-side cart tied to a persistent anonymous
  // visitor ID that storageState carries into every test context (see
  // tests/setup/global-setup.ts) — so it's shared across tests/runs, not
  // guaranteed empty just because *this* test hasn't added anything yet.
  // Clear out any leftover item from a previous run before relying on it
  // being empty.
  //
  // Each click kicks off an async request and re-renders the list, so wait for the
  // number of "Remove" buttons to drop before the next click — otherwise the next
  // click can hit a stale/detached button (same race class as ProductPage.addToCart()).
  async emptyBasket(): Promise<void> {
    const removeButton = this.page.getByRole('button', { name: REMOVE_ITEM_BUTTON });
    let remaining = await removeButton.count();
    while (remaining > 0) {
      await removeButton.first().click();
      remaining -= 1;
      await expect(removeButton).toHaveCount(remaining);
    }
  }
}
