import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsListingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async openProduct(name: string): Promise<void> {
    await this.page.getByRole('link', { name }).first().click();
    await this.page.waitForLoadState();
    await this.dismissConsentBannerIfPresent();
  }
}
