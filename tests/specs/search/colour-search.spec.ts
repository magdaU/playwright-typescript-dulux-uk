import { test, expect } from '../../fixtures';

test.describe('Search for a colour', { tag: ['@search', '@regression'] }, () => {
  test(
    'searching for an existing colour shows matching results',
    { tag: ['@desktop'] },
    async ({ homePage, navigation, searchResultsPage }) => {
      const existingQuery = 'violet';

      // GIVEN — cookie consent is already handled via storageState (see tests/setup/global-setup.ts).
      await homePage.open();

      // WHEN
      await navigation.clickSearch();
      await navigation.searchForColour(existingQuery);

      // THEN — a real, numbered colour-results heading, not the no-results message from the
      // negative case below. Asserts on the count pattern rather than a specific shade name so
      // it doesn't need updating if the catalogue's matches for "violet" change.
      await expect(searchResultsPage.getColourResultsHeading(existingQuery)).toBeVisible();
    },
  );

  test(
    'searching for a non-existent colour shows a no-results message',
    { tag: ['@desktop'] },
    async ({ homePage, navigation, searchResultsPage }) => {
      const nonExistentQuery = 'zzznonexistentcolourxyz123';

      // GIVEN — cookie consent is already handled via storageState (see tests/setup/global-setup.ts).
      await homePage.open();

      // WHEN
      await navigation.clickSearch();
      await navigation.searchForColour(nonExistentQuery);

      // THEN — the site degrades gracefully to a "no results" message instead of an
      // error page or a blank/misleading results list.
      await expect(searchResultsPage.getNoResultsMessage(nonExistentQuery)).toBeVisible();
    },
  );

  test(
    'mobile customer searching for an existing colour via the hamburger menu sees matching results',
    { tag: ['@mobile'] },
    async ({ homePage, navigation, searchResultsPage }) => {
      const existingQuery = 'violet';

      // GIVEN — cookie consent is already handled via storageState (see tests/setup/global-setup.ts).
      await homePage.open();

      // WHEN — on mobile the search control lives behind the hamburger menu.
      await navigation.clickDropdownHamburgerMenu();
      await navigation.clickSearch();
      await navigation.searchForColour(existingQuery);

      // THEN
      await expect(searchResultsPage.getColourResultsHeading(existingQuery)).toBeVisible();
    },
  );
});
