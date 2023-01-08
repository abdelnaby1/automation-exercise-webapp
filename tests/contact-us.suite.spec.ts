import {test,expect} from "../fixtures/pageFixtures"


test.describe('Contact Us Suite',() =>{

    test('TC006 - it should contact with us successfully',async({page,homePage,contactUsPage}) =>{
       
        await page.goto(homePage.url);
        await homePage.clickContactUsLink();

        expect(page.url()).toContain("/contact_us");
        await expect(contactUsPage.title).toBeVisible();
        await expect(contactUsPage.title).toContainText('Get In Touch');
     
        await contactUsPage.fillTheForm("Ahmed","ahmed@gmail.com","Test Automation","Thanks for this project it helped me a lot","rest.jpg");
        await expect(contactUsPage.status).toContainText('Success! Your details have been submitted successfully.');
        
        await contactUsPage.clickHomeBtn();
        expect(page.url()).toBe('https://automationexercise.com/');
    });

});
