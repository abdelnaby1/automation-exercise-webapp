import { Locator, Page } from "@playwright/test";

class Home{

    readonly url = '/';
    readonly page: Page;
    readonly loginLink: Locator;

    readonly deleteAccBtn: Locator;
    readonly user: Locator;


    
    constructor(page: Page){
        this.page = page;
        this.loginLink = this.page.locator("a[href='/login']");
        this.deleteAccBtn = this.page.locator('a[href="/delete_account"]');    
        this.user = this.page.locator("a",{has: this.page.locator("//i[@class='fa fa-user']")});

    }

    async clickLoginLink(){
        await this.loginLink.click();
    }
    async deleteAccount(){
        await this.deleteAccBtn.click();
    }
}
export default Home