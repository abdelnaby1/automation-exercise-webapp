import {Locator, Page} from "@playwright/test"
class Login{

    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginBtn: Locator;

    readonly page: Page

    constructor(page: Page){
        this.page = page;
        this.usernameField = this.page.locator('data-test=username');
        this.passwordField = this.page.locator('data-test=password');
        this.loginBtn = this.page.locator('data-test=login-button');
    }

    async login(username: string, password: string){
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginBtn.click();
    }
}

export default Login