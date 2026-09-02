import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Also serves as global-setup.ts's own consent step on a guaranteed-fresh context
  // (see BasePage.dismissConsentBannerIfPresent for why it's not a separate call there).
  async open(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState();
    await this.dismissConsentBannerIfPresent();
  }
}
