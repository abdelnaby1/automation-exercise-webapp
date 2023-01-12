import {test,expect} from "../fixtures/pageFixtures"


test.describe('Register Suite',() =>{
    test.beforeEach(async({page,homePage,registerPage}) => {
        await page.goto(homePage.url,{ waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle("Automation Exercise");
        await homePage.clickLoginLink();
        await expect(registerPage.signUpForm).toBeVisible();
        await expect(registerPage.signUpFormTitile).toBeVisible();
        
    })
    
    test('TC001 - it can register successfully',async({homePage,registerPage,page}) =>{
        let email = `abdelnaby${Date.now()}@gmail.com`
        await registerPage.signup("Ahmed",email);
        
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
        await expect(homePage.user).toContainText('Logged in as');

        // await homePage.deleteAccount();

        // await expect(registerPage.accountMsg).toBeVisible();
        // expect(registerPage.accountMsg).toContainText("Account Deleted!");

        // await registerPage.continue();
    
    });
    
    test('TC002 - it can not register with email already exists',async({homePage,registerPage,page}) =>{
        await homePage.clickLoginLink();
        await registerPage.signup("Ahmed","abdelnaby@gmail.com");
        
        await expect(registerPage.signupErrorMsg).toContainText("Email Address already exist!");
    });
});