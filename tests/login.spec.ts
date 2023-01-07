import test from "@playwright/test";
import Login from "../pages/Login.Page";


test.describe('Login Suit',() =>{

    test.beforeEach(async({page})=>{
        page.goto("https://www.saucedemo.com/");
    })

    test('it sohuld login with valid credidential',({page}) =>{

        const loginPage = new Login(page);
        loginPage.login("standard_user","secret_sauce")
    })
});