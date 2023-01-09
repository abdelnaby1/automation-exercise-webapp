import {test,expect} from "../fixtures/pageFixtures"


test.describe('Search Products Suite',() =>{

    test('TC011 - it should search for a product successfully',async({page,homePage,prodcutsPage}) =>{
       
        await page.goto(homePage.url);

        await expect(page).toHaveTitle("Automation Exercise");

        await homePage.clickProductsLink();
        // await page.pause();

        expect(page.url()).toContain('/products');
        await expect(prodcutsPage.title).toBeVisible();

        let productName = 't-shirt';
        await prodcutsPage.searchForProduct(productName);
        expect(page.url()).toContain(`search=${productName}`);
        const titles:string[] = await prodcutsPage.getTitles();
        for (let i = 0; i < titles.length; i++) {
            // let exp = ".*" + productName + ".*";
            // let regex = new RegExp(exp);
            // let title = titles[i].replace("-","");
            expect(titles[i].toLowerCase()).toContain(productName);
        }


    });

});
