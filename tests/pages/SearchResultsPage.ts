import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

const NO_RESULTS_PREFIX = "Sorry, we couldn't find any results for";

export class SearchResultsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getNoResultsMessage(query: string): Locator {
    return this.page.getByText(`${NO_RESULTS_PREFIX} '${query}'`);
  }
}
