import { test, expect } from "../fixtures/pageFixtures";

import { getAllProducts } from "../utils/getAllProducts";
test.describe("Add To Cart Suite", () => {
  test.beforeEach(async ({ page, homePage }) => {
    await page.goto(homePage.url, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle("Automation Exercise");
  });

  test("TC015 - it should add product to the cart successfully", async ({
    page,
    homePage,
    prodcutsPage,
    cartPage,
  }) => {
    await homePage.clickProductsLink();
    let i: number;
    for (i = 0; i < 2; i++) {
      await prodcutsPage.addToCart(i);
    }
    // await page.context().storageState({ path: "cart.json" });

    await homePage.clickCartLink();

    let cartItems = await cartPage.cartItems.count();
    expect(cartItems).toBe(i);

    // doing api testing to get the products
    const products = await getAllProducts();

    for (let j = 0; j < i; j++) {
      const cartItem = await cartPage.getItemInfo(j);
      expect(cartItem.price).toBe(products[j].price);
      let qty = parseInt(cartItem.qty);
      expect(qty).toBe(1);
      let priceInteger = parseInt(cartItem.price.slice(4));
      expect(cartItem.total).toContain(qty * priceInteger + "");
    }
  });

  test("TC016 - it should add product with specified quantity to the cart successfully", async ({
    homePage,
    prodcutsPage,
    productDetailsPage,
    cartPage,
  }) => {
    await homePage.clickProductsLink();
    await prodcutsPage.goToProductDetails(0);

    let qty = "4";
    await productDetailsPage.addToCartWithQty(qty);
    await productDetailsPage.clickVieWCart();

    let cartitem = await cartPage.getItemInfo(0);
    expect(cartitem.qty).toBe(qty);
  });
  test("TC017 - it should delete product from the cart successfully", async ({
    homePage,
    prodcutsPage,
    cartPage,
  }) => {
    await homePage.clickProductsLink();
    await prodcutsPage.addToCart(0);
    await homePage.clickCartLink();
    // await prodcutsPage.clickVieWCart();
    await expect(cartPage.cart).toBeVisible();
    await cartPage.deleteItem(0);

    await expect(cartPage.cart).toBeHidden();
    let cartItems = await cartPage.cartItems.count();
    expect(cartItems).toBe(0);
  });

  test("TC018 - it should add recommended product to the cart successfully", async ({
    homePage,
    cartPage,
  }) => {
    await homePage.scrollToRecommendedItems();
    await expect(homePage.recommendedItemsTitle).toBeVisible();
    await homePage.addRecommendedProductToCart(0);
    await homePage.clickViewCart();
    expect(await cartPage.cartItems.count()).toBe(1);
  });
});
