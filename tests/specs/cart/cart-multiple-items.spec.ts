import { test, expect } from '../../fixtures';

test.describe('Basket with multiple items', { tag: ['@cart', '@regression', '@desktop'] }, () => {
  // The GIVEN fixture is a full multi-page journey against production (colour finder -> tester ->
  // product listing -> product -> cart), so it needs more than the 30s default.
  test.setTimeout(90_000);

  test('basket totals add up across two different products', async ({
    cartPage,
    basketWithTwoProducts: { testerName, paintName },
  }) => {
    // arrange — the fixture left one tester and one paint in the basket.
    await expect(cartPage.getLineItem(testerName)).toBeVisible();
    await expect(cartPage.getLineItem(paintName)).toBeVisible();

    // act
    const testerPrice = await cartPage.getLinePrice(testerName);
    const paintPrice = await cartPage.getLinePrice(paintName);
    const deliveryCost = await cartPage.getDeliveryCost();

    // assert
    await expect(cartPage.getItemsCountText(2)).toBeVisible();
    expect(await cartPage.getSubtotal()).toBe(testerPrice + paintPrice);
    expect(await cartPage.getOrderTotal()).toBe(testerPrice + paintPrice + deliveryCost);
  });

  test('increasing one product quantity updates its line price and the totals', async ({
    cartPage,
    basketWithTwoProducts: { testerName, paintName },
  }) => {
    // arrange
    await expect(cartPage.getLineItem(paintName)).toBeVisible();
    const testerPrice = await cartPage.getLinePrice(testerName);
    const paintUnitPrice = await cartPage.getLinePrice(paintName);

    // act
    await cartPage.increaseQuantity(paintName);

    // assert — the basket re-renders asynchronously, so poll instead of reading once.
    await expect(cartPage.getLineQuantity(paintName)).toHaveValue('2');
    await expect.poll(() => cartPage.getLinePrice(paintName)).toBe(paintUnitPrice * 2);
    await expect.poll(() => cartPage.getSubtotal()).toBe(testerPrice + paintUnitPrice * 2);
    await expect(cartPage.getLineQuantity(testerName)).toHaveValue('1');
    await expect(cartPage.getItemsCountText(3)).toBeVisible();
  });

  test('removing one product leaves the other and recalculates the subtotal', async ({
    cartPage,
    basketWithTwoProducts: { testerName, paintName },
  }) => {
    // arrange
    await expect(cartPage.getLineItem(paintName)).toBeVisible();
    const paintPrice = await cartPage.getLinePrice(paintName);

    // act
    await cartPage.removeItem(testerName);

    // assert
    await expect(cartPage.getLineItem(testerName)).toBeHidden();
    await expect(cartPage.getLineItem(paintName)).toBeVisible();
    await expect.poll(() => cartPage.getSubtotal()).toBe(paintPrice);
  });
});
