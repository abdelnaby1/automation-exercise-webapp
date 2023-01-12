import {test,expect} from "../fixtures/pageFixtures"


test.describe('Search Products Suite',() =>{

    test('TC010 - it should search for a product successfully',async({page,homePage,prodcutsPage}) =>{
       
        await page.goto(homePage.url,{ waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle("Automation Exercise");
        await homePage.clickProductsLink();
        expect(page.url()).toContain('/products');
        await expect(prodcutsPage.title).toBeVisible();
        let productName = 'shoes';
        await prodcutsPage.searchForProduct(productName);
        expect(page.url()).toContain(`search=${productName}`);
        let titles = await prodcutsPage.getTitles();
        for (let i = 0; i < titles.length; i++) {
            // let exp = ".*" + productName + ".*";
            // let regex = new RegExp(exp);
            // let title = titles[i];
            // title = title.replace("-"," ");
            expect.soft(titles[i].toLowerCase()).toContain(productName);
        }
    });

});
