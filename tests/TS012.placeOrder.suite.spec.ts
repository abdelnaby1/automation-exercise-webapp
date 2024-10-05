import { test, expect } from "../fixtures/pageFixtures";
import { personData, paymentDetails, loggedInUser } from "../data/data.json";

test.describe("Place Order Suite", () => {
  test.beforeEach(async ({ page, homePage }) => {
    await page.goto(homePage.url, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveTitle("Automation Exercise");
  });
  test("TC018 - it should register through checkout", async ({
    page,
    prodcutsPage,
    homePage,
    registerPage,
    cartPage,
    checkoutPage,
  }) => {
    await homePage.clickProductsLink();
    await prodcutsPage.addToCart(0);
    await prodcutsPage.addToCart(1);
    await homePage.clickCartLink();
    expect(page.url()).toContain("/view_cart");
    await cartPage.clickCheckout();
    await Promise.all([
      expect(page.url()).toContain("/view_cart"),
      expect(cartPage.checkoutModal).toBeVisible(),
    ]);

    await cartPage.clickAuth();
    let email: string = `${personData.username}${Date.now()}@gmail.com`;
    await registerPage.signup(personData.firstname, email);
    await registerPage.completeSignup(personData);

    await expect(registerPage.accountMsg).toBeVisible();
    await expect(registerPage.accountMsg).toContainText("Account Created!");
    await registerPage.continue();
    await expect(homePage.user).toContainText(
      `Logged in as ${personData.firstname}`
    );
    await homePage.clickCartLink();
    await cartPage.clickCheckout();
    await Promise.all([
      expect(checkoutPage.addressDetailsH).toBeVisible(),
      expect(checkoutPage.reviewOrderH).toBeVisible(),
    ]);
    await checkoutPage.placeOrder("thank you");

    //don't await this function
    await checkoutPage.payment.enterPaymentDetails(paymentDetails);
    await expect(
      page.getByText("Congratulations! Your order has been confirmed!")
    ).toBeVisible();
  });
  test("TC019 - it should register before checkout", async ({
    page,
    prodcutsPage,
    homePage,
    registerPage,
    cartPage,
    checkoutPage,
  }) => {
    await homePage.clickLoginLink();
    let email: string = `${personData.username}${Date.now()}@gmail.com`;
    await registerPage.signup(personData.firstname, email);
    await registerPage.completeSignup(personData);
    await expect(registerPage.accountMsg).toBeVisible();
    await expect(registerPage.accountMsg).toContainText("Account Created!");
    await registerPage.continue();
    await expect(homePage.user).toContainText(
      `Logged in as ${personData.firstname}`
    );
    await homePage.clickProductsLink();
    await prodcutsPage.addToCart(0);
    await prodcutsPage.addToCart(1);
    await homePage.clickCartLink();
    expect(page.url()).toContain("/view_cart");
    await cartPage.clickCheckout();
    await Promise.all([
      expect(checkoutPage.addressDetailsH).toBeVisible(),
      expect(checkoutPage.reviewOrderH).toBeVisible(),
    ]);
    await checkoutPage.placeOrder("thank you");

    //don't await this function
    await checkoutPage.payment.enterPaymentDetails(paymentDetails);
    await expect(
      page.getByText("Congratulations! Your order has been confirmed!")
    ).toBeVisible();
  });

  test("TC020- it should login before checkout", async ({
    page,
    prodcutsPage,
    homePage,
    loginPage,
    cartPage,
    checkoutPage,
  }) => {
    await homePage.clickLoginLink();
    await loginPage.login(loggedInUser.email, loggedInUser.password);
    await expect(homePage.user).toContainText(
      `Logged in as ${loggedInUser.firstName}`
    );
    await homePage.clickProductsLink();
    await prodcutsPage.addToCart(0);
    await prodcutsPage.addToCart(1);
    await homePage.clickCartLink();
    expect(page.url()).toContain("/view_cart");
    await cartPage.clickCheckout();
    await Promise.all([
      expect(checkoutPage.addressDetailsH).toBeVisible(),
      expect(checkoutPage.reviewOrderH).toBeVisible(),
    ]);
    await checkoutPage.placeOrder("thank you");

    //don't await this function
    await checkoutPage.payment.enterPaymentDetails(paymentDetails);
    await expect(
      page.getByText("Congratulations! Your order has been confirmed!")
    ).toBeVisible();
  });
});
