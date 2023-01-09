import {test,expect} from "../fixtures/pageFixtures"


test.describe('Logout Suite',() =>{
    // test.use({
    //     storageState: "storagestate.json"
    // });
  
    test('TC004 - it should logout successfully',async({page,homePage,loginPage}) =>{
        await page.goto(homePage.url);

        await expect(page).toHaveTitle("Automation Exercise");
        
        await homePage.clickLoginLink();

        await loginPage.login("abdelnaby@gmail.com","123456");

        await expect(homePage.user).toContainText('Logged in as');

        await homePage.clickLogoutLink();

        expect(page).toHaveURL(/(.*)\/login/);
    });

});
