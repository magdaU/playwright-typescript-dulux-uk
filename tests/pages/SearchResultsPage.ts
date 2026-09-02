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

  // Matches the "N Colours featuring <query>" heading rather than a specific shade name, so
  // this doesn't need updating if the catalogue's match count for the query changes.
  getColourResultsHeading(query: string): Locator {
    return this.page.getByText(new RegExp(`\\d+ Colours featuring ${query}`, 'i'));
  }
}
