import { Locator, Page } from "@playwright/test/types/test"

class Cart{

    readonly page: Page;
    readonly cartItems: Locator;

    constructor(page: Page){
        this.page = page;
        this.cartItems = this.page.locator('.cart_info tbody tr');
    }
    async getItemInfo(idx: number){
       let price = await this.cartItems.nth(idx).locator('.cart_price p').textContent()  as string;
       let qty = await this.cartItems.nth(idx).locator('.cart_quantity button').textContent()  as string;
       let total = await this.cartItems.nth(idx).locator('.cart_total .cart_total_price').textContent()  as string; 

       let item = {
        price,
        qty,
        total
       }
       return item
    }
}
export default Cart