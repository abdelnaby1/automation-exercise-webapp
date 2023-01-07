import {Locator, Page} from "@playwright/test"
class Login{
    readonly page: Page


    readonly loginForm: Locator;
    readonly loginFormTitile: Locator;

    readonly emailField: Locator;
    readonly passwrodField: Locator;
    readonly loginBtn: Locator;
    readonly accountMsg: Locator;

    readonly loginErrorMsg: Locator;


    constructor(page: Page){
        this.page = page;
        this.loginForm = this.page.locator('.login-form');
        this.loginFormTitile = this.page.locator('.login-form h2');
        this.emailField = this.page.locator('input[data-qa="login-email"]');
        this.passwrodField = this.page.locator('input[data-qa="login-password"]');
        this.loginBtn = this.page.locator('button[data-qa="login-button"]');
    
        this.accountMsg = this.page.locator("h2.title");

        this.loginErrorMsg = this.page.locator('p[style="color: red;"]:below(input[data-qa="login-password"])');
    }

    async login(email: string, password: string){
       await this.emailField.fill(email);
       await this.passwrodField.fill(password);
       await this.loginBtn.click();
    }
}

export default Login