import { Locator, Page } from "@playwright/test";

class Home{

    readonly url = '/';
    readonly page: Page;
    readonly loginLink: Locator;

    readonly deleteAccBtn: Locator;
    readonly user: Locator;
    readonly logoutLink: Locator

    readonly contactUsLink: Locator;
    readonly testCasesLink: Locator;

    readonly productsLink: Locator;

    readonly footer: Locator;
    readonly subscribeTitle: Locator
    readonly subscribeEmailField: Locator;
    readonly subscribeBtn: Locator;
    readonly subscribeMsg: Locator;
    
    readonly cartLink: Locator;
    readonly addToCartBtn: Locator;


    
    constructor(page: Page){
        this.page = page;
        this.loginLink = this.page.locator("a[href='/login']");
        this.deleteAccBtn = this.page.locator('a[href="/delete_account"]');    
        this.user = this.page.locator("a",{has: this.page.locator("//i[@class='fa fa-user']")});
        this.logoutLink = this.page.locator("a[href='/logout']");
        this.contactUsLink = this.page.locator('a[href="/contact_us"]');
        this.testCasesLink = this.page.locator('.nav a[href="/test_cases"]');
        this.productsLink = this.page.locator('.nav a[href="/products"]');
        this.footer = this.page.locator("#footer");
        this.subscribeTitle = this.page.locator('#footer .single-widget h2');
        this.subscribeEmailField = this.page.locator("#susbscribe_email");
        this.subscribeBtn = this.page.locator('#subscribe');
        this.subscribeMsg = this.page.locator('#success-subscribe .alert');
        this.cartLink = this.page.locator('.nav a[href="/view_cart"]');

        this.addToCartBtn = this.page.locator("//a[text()[normalize-space()='Add to cart']]");

    }

    async clickLoginLink(){
        await this.loginLink.click();
    }
    async deleteAccount(){
        await this.deleteAccBtn.click();
    }
    async clickLogoutLink(){
        await this.logoutLink.click();
    }
    async clickContactUsLink(){
        await this.contactUsLink.click();
    }
    async clickTestCasesLink(){
        await this.testCasesLink.click();
    }
    async clickProductsLink(){
        await this.productsLink.click();
    }

    async scrollToFooter(){
        await this.footer.scrollIntoViewIfNeeded();
    }
    async subscribe(email: string){
        await this.subscribeEmailField.fill(email);
        await this.subscribeBtn.click();
    }

    async clickCartLink(){
        await this.cartLink.click();
    }
}
export default Home