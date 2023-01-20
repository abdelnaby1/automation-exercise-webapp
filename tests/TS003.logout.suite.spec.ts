import {test,expect} from "../fixtures/pageFixtures"


test.describe('Logout Suite',() =>{
    test.use({
        storageState: "storagestate.json"
    });
  
    test('TC005 - it should logout successfully',async({page,homePage,loginPage}) =>{
        await page.goto(homePage.url,{ waitUntil: 'domcontentloaded' });

        // await expect(page).toHaveTitle("Automation Exercise");
        
        // await homePage.clickLoginLink();

        // await loginPage.login("abdelnaby@gmail.com","123456");

        await expect(homePage.user).toContainText('Logged in as');

        await homePage.clickLogoutLink();

        await expect(page).toHaveURL(/(.*)\/login/);
    });

});
