import {test,expect} from "../fixtures/pageFixtures"

import {getAllProducts} from "../utils/getAllProducts"
test.describe('Add To Cart Suite',() =>{

    test.beforeEach(async({page,homePage}) => {
        await page.goto(homePage.url,{ waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle("Automation Exercise");

    })

    test('TC014 - it should add product to the cart successfully',async({homePage,prodcutsPage,cartPage}) =>{
        await homePage.clickProductsLink();
        let i:number
        for (i = 0; i < 2; i++) {
            await prodcutsPage.addToCart(i);
        }
        for (i = 0; i < 2; i++) {
            await prodcutsPage.addToCart(i);
        }
        await homePage.clickCartLink();

        let cartItems = await cartPage.cartItems.count();
        expect(cartItems).toBe(i);


        // doing api testing to get the products
        const products = await getAllProducts();
        
        for (let j = 0; j < i; j++) {
            const cartItem = await cartPage.getItemInfo(j);
            expect(cartItem.price).toBe(products[j].price);
            let qty = parseInt(cartItem.qty);
            expect(qty).toBe(i);
            let priceInteger = parseInt(cartItem.price.slice(4))
            expect(cartItem.total).toContain((qty  * priceInteger) + "");
        }
    });

    test('TC015 - it should add product with specified quantity to the cart successfully',async({page,homePage,prodcutsPage,productDetailsPage,cartPage}) =>{
        await homePage.clickProductsLink();
        await prodcutsPage.goToProductDetails(0);

        let qty = "4"
        await productDetailsPage.addToCartWithQty(qty);
        await productDetailsPage.clickVieWCart();

        let cartitem = await cartPage.getItemInfo(0);
        expect(cartitem.qty).toBe(qty);
    });

});
