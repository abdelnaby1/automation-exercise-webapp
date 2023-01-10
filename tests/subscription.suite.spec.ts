import {test,expect} from "../fixtures/pageFixtures"


test.describe('Search Products Suite',() =>{

    test('TC012 - it should subscribed in home page by email successfully',async({page,homePage}) =>{
       
        await page.goto(homePage.url);

        await expect(page).toHaveTitle("Automation Exercise");

        // await page.pause();
        await homePage.scrollToFooter();
        
        await expect(homePage.subscribeTitle).toContainText('Subscription');

        await homePage.subscribe("ahmed@test.com");

        await expect(homePage.subscribeMsg).toBeVisible();
        await expect(homePage.subscribeMsg).toContainText('You have been successfully subscribed!');
       
    });

    test('TC013 - it should subscribed in cart page by email successfully',async({page,homePage}) =>{
       
        await page.goto(homePage.url);

        await expect(page).toHaveTitle("Automation Exercise");
        
        await homePage.clickCartLink();
        await homePage.scrollToFooter();
        
        await expect(homePage.subscribeTitle).toContainText('Subscription');

        await homePage.subscribe("ahmed@test.com");

        await expect(homePage.subscribeMsg).toBeVisible();
        await expect(homePage.subscribeMsg).toContainText('You have been successfully subscribed!');
       
    });

});
