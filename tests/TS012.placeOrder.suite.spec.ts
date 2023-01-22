import {test,expect} from "../fixtures/pageFixtures"

test.describe('Place Order Suite',() =>{
    // test.use({
    //     storageState: "cart.json"
    // });
    test.beforeEach(async({page,homePage}) => {
        await page.goto(homePage.url,{ waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle("Automation Exercise");

    })
    test('TC018 - it should register through checkout',async({page,prodcutsPage,homePage,registerPage,cartPage,checkoutPage}) =>{       
        await homePage.clickProductsLink();
        await prodcutsPage.addToCart(0);
        await prodcutsPage.addToCart(1);
        await homePage.clickCartLink();
        expect(page.url()).toContain('/view_cart');
        await cartPage.clickCheckout();
        await Promise.all([
            expect(page.url()).toContain('/view_cart'),
            expect(cartPage.checkoutModal).toBeVisible()
        ]);

        await cartPage.clickAuth();
        await registerPage.signup("moh",`moh${Date.now()}@gmail.com`);
        await registerPage.completeSignup(
            "123456","26","8","1992","Moh","Abdelnaby",
            "Sah","Cairo,Helwan","helwan elbald","Canada",
            "Giza","el-Giza","49944","01099980000"
            );
        await expect(registerPage.accountMsg).toBeVisible();
        await expect(registerPage.accountMsg).toContainText("Account Created!");
        await registerPage.continue();
        await expect(homePage.user).toContainText('Logged in as');
        await homePage.clickCartLink();
        await cartPage.clickCheckout();
        await Promise.all([
            expect(checkoutPage.addressDetailsH).toBeVisible(),
            expect(checkoutPage.reviewOrderH).toBeVisible(),
        ]);
        await checkoutPage.placeOrder("thank you");
        let card = {
            name:"john",
            num: "1231098745642308",
            cvc:"123",
            month:"12",
            year:"25"
        }

        //don't await this function 
        checkoutPage.payment.enterPaymentDetails(card);
        await expect(page.getByText("Your order has been placed successfully!")).toBeVisible();
    });
    test('TC019 - it should register before checkout',async({page,prodcutsPage,homePage,registerPage,cartPage,checkoutPage}) =>{       
        await homePage.clickLoginLink();
        await registerPage.signup("moh",`moh${Date.now()}@gmail.com`);
        await registerPage.completeSignup(
            "123456","26","8","1992","Moh","Abdelnaby",
            "Sah","Cairo,Helwan","helwan elbald","Canada",
            "Giza","el-Giza","49944","01099980000"
            );
        await expect(registerPage.accountMsg).toBeVisible();
        await expect(registerPage.accountMsg).toContainText("Account Created!");
        await registerPage.continue();
        await expect(homePage.user).toContainText('Logged in as');
        await homePage.clickProductsLink();
        await prodcutsPage.addToCart(0);
        await prodcutsPage.addToCart(1);
        await homePage.clickCartLink();
        expect(page.url()).toContain('/view_cart');
        await cartPage.clickCheckout();
        await Promise.all([
            expect(checkoutPage.addressDetailsH).toBeVisible(),
            expect(checkoutPage.reviewOrderH).toBeVisible(),
        ]);
        await checkoutPage.placeOrder("thank you");
        let card = {
            name:"john2",
            num: "1231098745642309",
            cvc:"124",
            month:"11",
            year:"24"
        }

        //don't await this function 
        checkoutPage.payment.enterPaymentDetails(card);
        await expect(page.getByText("Your order has been placed successfully!")).toBeVisible();
    });

    test('TC012 - it should login before checkout',async({page,prodcutsPage,homePage,loginPage,cartPage,checkoutPage}) =>{       
        await homePage.clickLoginLink();
        await loginPage.login("abdelnaby4@gmail.com","123456");
        await expect(homePage.user).toContainText('Logged in as');
        await homePage.clickProductsLink();
        await prodcutsPage.addToCart(0);
        await prodcutsPage.addToCart(1);
        await homePage.clickCartLink();
        expect(page.url()).toContain('/view_cart');
        await cartPage.clickCheckout();
        await Promise.all([
            expect(checkoutPage.addressDetailsH).toBeVisible(),
            expect(checkoutPage.reviewOrderH).toBeVisible(),
        ]);
        await checkoutPage.placeOrder("thank you");
        let card = {
            name:"john3",
            num: "1231098745642310",
            cvc:"125",
            month:"09",
            year:"25"
        }

        //don't await this function 
        checkoutPage.payment.enterPaymentDetails(card);
        await expect(page.getByText("Your order has been placed successfully!")).toBeVisible();
    });

});
