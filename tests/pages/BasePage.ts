import { Page } from '@playwright/test';

const REJECT_ALL = '#onetrust-reject-all-handler';

// Recovery check after in-test navigations: storageState normally suppresses the banner, so
// most calls find nothing — keep the wait short, since every call without a banner pays it in full.
const RECOVERY_WAIT_MS = 1500;

export abstract class BasePage {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  // The cookie-consent decision is made once in tests/setup/global-setup.ts and carried
  // into every test via storageState, but the OneTrust banner intermittently reappears
  // on production regardless (seen repeatedly across unrelated specs — see TEST_TODO.md).
  // Page objects call this right after any real navigation so a spec recovers instead of
  // failing outright on an unrelated click being blocked by the banner's overlay.
  //
  // Also doubles as global-setup.ts's own consent step on a guaranteed-fresh context: the
  // bounded wait (rather than an instant visibility check) gives the banner's async script
  // a moment to render there (callers pass a longer wait), without hanging the full default
  // timeout on specs where it never appears at all.
  protected async dismissConsentBannerIfPresent(waitMs = RECOVERY_WAIT_MS): Promise<void> {
    const rejectAll = this.page.locator(REJECT_ALL);
    try {
      await rejectAll.waitFor({ state: 'visible', timeout: waitMs });
    } catch {
      return;
    }
    await rejectAll.click();
  }
}
