import {test,expect} from "../fixtures/pageFixtures"
import Login from "../pages/Login.Page";


test.describe('Login Suite',() =>{

    test('TC002 - it sohuld login with valid credidential',async({page,loginPage,homePage}) =>{
        await page.goto(homePage.url);

        await expect(page).toHaveTitle("Automation Exercise");
        
        await homePage.clickLoginLink();

        await expect(loginPage.loginForm).toBeVisible();
        await expect(loginPage.loginFormTitile).toBeVisible();
        await expect(loginPage.loginFormTitile).toContainText('Login to your account');

        await loginPage.login("abdelnaby@gmail.com","123456");
        await expect(homePage.user).toContainText('Logged in as');

        await page.context().storageState({path: 'storagestate.json'});
         
        
        // await homePage.deleteAccount();

        // await expect(loginPage.accountMsg).toContainText("Account Deleted!");
    });

    test('TC003 - it sohuld not login with invalid credidential',async({page,loginPage,homePage}) =>{
        await page.goto(homePage.url);

        await expect(page).toHaveTitle("Automation Exercise");
        
        await homePage.clickLoginLink();

        await expect(loginPage.loginForm).toBeVisible();
        await expect(loginPage.loginFormTitile).toBeVisible();
        await expect(loginPage.loginFormTitile).toContainText('Login to your account');

        await loginPage.login("abdelnaby12@gmail.com","123456");
        await expect(loginPage.loginErrorMsg).toContainText("Your email or password is incorrect!");
        

    });

    
});

// abdelnaby@gmail.com