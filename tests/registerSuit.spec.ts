import  { BrowserContext, Page,  } from "@playwright/test";
import {test,expect} from "../fixtures/regiserPage"
import Login from "../pages/Login.Page";


test.describe('Register Suit',() =>{

    // let context: BrowserContext;
    // let page: Page;
    // test.afterAll(async({browser})=>{
    //     const context = await browser.newContext();
    //     const page = await context.newPage();
    //     page.goto("https://www.saucedemo.com/");
    // })

    test('it can register successfully',async({homePage,registerPage,page}) =>{
        await page.goto(homePage.url);

        await expect(page).toHaveTitle("Automation Exercise");

        await homePage.clickLoginLink();
    
        await expect(registerPage.signUpForm).toBeVisible();
        await expect(registerPage.signUpFormTitile).toBeVisible();
        
        await registerPage.signup("Ahmed","testtest12131111@gmail.com");
        
        await expect(registerPage.accInfoHeading).toBeVisible();
        await expect(registerPage.accInfoHeading).toContainText('Enter Account Information');
        
        await registerPage.completeSignup(
            "123456","26","8","1998","Ahmed","Abdelnaby",
            "Sah","Cairo,Helwan","helwan elbald","Canada",
            "Giza","el-Giza","49944","01099980000"
            );

        await expect(registerPage.accountMsg).toBeVisible();
        await expect(registerPage.accountMsg).toContainText("Account Created!");
    

        await registerPage.continue();
        // await page.pause();
        await expect(registerPage.user).toContainText('Logged in as');

        await registerPage.deleteAccount();

        await expect(registerPage.accountMsg).toBeVisible();
        expect(registerPage.accountMsg).toContainText("Account Deleted!");

        await registerPage.continue();
    
    });
   
});