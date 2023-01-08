import { Locator, Page } from "@playwright/test";

class Home{

    readonly url = '/';
    readonly page: Page;
    readonly loginLink: Locator;

    readonly deleteAccBtn: Locator;
    readonly user: Locator;
    readonly logoutLink: Locator


    
    constructor(page: Page){
        this.page = page;
        this.loginLink = this.page.locator("a[href='/login']");
        this.deleteAccBtn = this.page.locator('a[href="/delete_account"]');    
        this.user = this.page.locator("a",{has: this.page.locator("//i[@class='fa fa-user']")});
        this.logoutLink = this.page.locator("a[href='/logout']");
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
}
export default Home