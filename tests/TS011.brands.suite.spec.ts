import {test,expect} from "../fixtures/pageFixtures"

test.describe('Categories Suite',() =>{
    test('TC017 - it should view products of a brand',async({page,homePage,prodcutsPage}) =>{
       
        await page.goto(homePage.url,{waitUntil:"domcontentloaded"});
        await homePage.clickProductsLink();
        let count = await prodcutsPage.brands.count();
        for (let i = 0; i < count; i++) {
            await expect(prodcutsPage.brands.nth(i)).toBeVisible();
        }
        let brand = 'Polo';
        for (let i = 0; i < 2; i++) {
            await prodcutsPage.clickBrand(brand);
            expect(page.url()).toContain(`brand_products/${brand}`);
            await expect(prodcutsPage.title).toContainText(`Brand - ${brand}`);
            brand = 'Babyhug';
        }

    });


});
