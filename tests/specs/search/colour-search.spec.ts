import { test, expect } from '../../fixtures';

test.describe('Search for a colour', { tag: ['@search', '@regression', '@desktop'] }, () => {
  test('searching for a non-existent colour shows a no-results message', async ({
    homePage,
    navigation,
    searchResultsPage,
  }) => {
    const nonExistentQuery = 'zzznonexistentcolourxyz123';

    // GIVEN — cookie consent is already handled via storageState (see tests/setup/global-setup.ts).
    await homePage.open();

    // WHEN
    await navigation.clickSearch();
    await navigation.searchForColour(nonExistentQuery);

    // THEN — the site degrades gracefully to a "no results" message instead of an
    // error page or a blank/misleading results list.
    await expect(searchResultsPage.getNoResultsMessage(nonExistentQuery)).toBeVisible();
  });
});
