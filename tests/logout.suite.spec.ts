import {test,expect} from "../fixtures/pageFixtures"


test.describe('Logout Suite',() =>{
    test.use({
        storageState: "storagestate.json"
    });
  
    test('TC004 - it should logout successfully',async({page,homePage}) =>{
       
        await page.goto(homePage.url);

        await expect(homePage.user).toContainText('Logged in as');

        await homePage.clickLogoutLink();

        expect(page).toHaveURL(/(.*)\/login/);
    });

});
