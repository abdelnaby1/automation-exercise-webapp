import {test as base,expect} from "@playwright/test";
import Register from "../pages/Register.Page";
import Home from "../pages/Home.Page";
import Login from "../pages/Login.Page";

type pages = {
    registerPage: Register,
    homePage: Home,
    loginPage:Login
}
export const test = base.extend<pages>({
        registerPage: async({page},use) => {
            await use(new Register(page));
        },
        homePage: async({page},use) => {
            await use(new Home(page));
        },
        loginPage: async({page},use) => {
            await use(new Login(page));
        },
        
})

export {expect}