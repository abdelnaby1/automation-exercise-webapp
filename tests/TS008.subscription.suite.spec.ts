import {test,expect} from "../fixtures/pageFixtures"


test.describe('Search Products Suite',() =>{

    test.beforeEach(async({page,homePage})=>{
        await page.goto(homePage.url,{ waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle("Automation Exercise");

    })
    test('TC011 - it should subscribed in home page by email successfully',async({page,homePage}) =>{
       
        await homePage.scrollToFooter();
        await expect(homePage.subscribeTitle).toContainText('Subscription');
        await Promise.all([
            homePage.subscribe("ahmed@test.com"),
            homePage.subscribeMsg.waitFor({state: 'attached'}),
            expect(homePage.subscribeMsg).toContainText('You have been successfully subscribed!'),
        ])
       
    });

    test('TC012 - it should subscribed in cart page by email successfully',async({page,homePage}) =>{
        await homePage.clickCartLink();
        await homePage.scrollToFooter();
        await expect(homePage.subscribeTitle).toContainText('Subscription');
        await Promise.all([
            homePage.subscribe("ahmed@test.com"),
            homePage.subscribeMsg.waitFor({state: 'attached'}),
            expect(homePage.subscribeMsg).toContainText('You have been successfully subscribed!'),
        ]) 
       
    });

});
