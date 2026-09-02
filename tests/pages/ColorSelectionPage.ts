import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

const BUY_A_TESTER_TEXT = 'Buy a Tester in this colour';
const VISUALIZER_APP_TEXT = 'Try our Visualizer App';
const FIND_PRODUCTS_GO_TEXT = 'Go';

export class ColorSelectionPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async chooseColour(colour: string): Promise<void> {
    await this.page.getByRole('button', { name: colour }).click();
  }

  async chooseSpecificShade(shade: string): Promise<void> {
    await this.page.getByRole('button', { name: shade }).click();
  }

  async buyATester(): Promise<void> {
    await this.page.getByRole('button', { name: BUY_A_TESTER_TEXT }).click();
  }

  // "Buy a Tester" is a one-click add-to-basket shortcut; this is the underlying
  // "Find Products in this colour" link every shade page also has, which lands on a
  // full product listing filtered to that colour (see BUG-005 in BUG_REPORTS.md for
  // why the shortcut itself is currently unusable — the tester is out of stock).
  async findProductsInThisColour(): Promise<void> {
    await this.page.getByRole('link', { name: FIND_PRODUCTS_GO_TEXT, exact: true }).click();
    // Real page navigation (see NavigationComponent.clickDropdownFindColour for the
    // same subtlety) — wait for it before the next locator resolves against a stale page.
    await this.page.waitForLoadState();
    await this.dismissConsentBannerIfPresent();
  }

  async openVisualizerApp(): Promise<void> {
    await this.page
      .getByRole('listitem')
      .filter({ hasText: VISUALIZER_APP_TEXT })
      .getByRole('link')
      .click();
  }
}
