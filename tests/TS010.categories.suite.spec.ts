import {test,expect} from "../fixtures/pageFixtures"

test.describe('Categories Suite',() =>{
    test('TC016 - it should view products of a category',async({page,homePage,prodcutsPage}) =>{
       
        await page.goto(homePage.url,{waitUntil:"domcontentloaded"});

        let count = await homePage.categories.count();
        for (let i = 0; i < count; i++) {
            await expect(homePage.categories.nth(i)).toBeVisible();
        
        }

        let category = 'Women';
        let subcaregory = 'Dress ';
        for (let i = 0; i < 2; i++) {
            await homePage.clickCategory(category,subcaregory);
            await expect(prodcutsPage.title).toContainText(`${category} - ${subcaregory}`);
            category = 'Men';
            subcaregory = 'Tshirts ';
        }

    });


});
