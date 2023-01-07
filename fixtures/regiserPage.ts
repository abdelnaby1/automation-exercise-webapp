import {test as base,expect} from "@playwright/test";
import Register from "../pages/Register.Page";
import Home from "../pages/Home.Page";


export const test = base.extend<{registerPage: Register,homePage: Home}>({
        registerPage: async({page},use) => {
            await use(new Register(page));
        },
        homePage: async({page},use) => {
            await use(new Home(page));
        },
        
})

export {expect}