import {test,expect} from "../fixtures/pageFixtures"


// test.describe.configure({ mode: 'serial' });
test.describe('Products Suite',() =>{
    test.beforeEach(async({page,homePage})=>{
        await page.goto(homePage.url,{ waitUntil: 'domcontentloaded' });
        await homePage.clickProductsLink();
    })

    test('TC008 - all products should be visible successfully',async({page,prodcutsPage,request}) =>{
        expect(page.url()).toContain('/products');
        await expect(prodcutsPage.title).toBeVisible();
        await expect(prodcutsPage.title).toContainText('All Products');
        
        const res = await request.get('https://automationexercise.com/api/productsList')
        expect(res.status()).toBe(200);
        const data = await res.json();
        expect(await prodcutsPage.products.count()).toBe(data.products.length);
        
    });
    test('TC009 - it should show product details on clicking on view product',async({page,prodcutsPage,productDetailsPage}) =>{
       
        await prodcutsPage.goToProductDetails(0);
        expect(page.url()).toContain('/product_details');
        await expect(productDetailsPage.name).toBeVisible();
        await expect(productDetailsPage.category).toBeVisible();
        await expect(productDetailsPage.availability).toBeVisible();
        await expect(productDetailsPage.price).toBeVisible();
        await expect(productDetailsPage.condition).toBeVisible();
        await expect(productDetailsPage.brand).toBeVisible();

        
    });
    test('TC018 - it should review a product successfully',async({page,prodcutsPage,productDetailsPage}) =>{
       
        expect(page.url()).toContain('/products');
        await prodcutsPage.goToProductDetails(0);
        expect(page.url()).toContain('/product_details');
        await expect(productDetailsPage.reviewTitle).toBeVisible();
        
        await productDetailsPage.reviewProduct("Ahmed","abdelnaby0@gmail.com","amazing product");
        expect(await productDetailsPage.getReviewMsg()).toContain('Thank you for your review')
    });

});
