import { Locator, Page } from "@playwright/test/types/test"

class Cart{

    readonly page: Page;
    readonly cart: Locator
    readonly cartItems: Locator;

    readonly checkoutModal: Locator;
    readonly authBtn: Locator;


    constructor(page: Page){
        this.page = page;
        this.cart = this.page.locator('#cart_info_table');
        this.cartItems = this.cart.locator('tbody tr');
        this.checkoutModal = this.page.locator('#checkoutModal');
        this.authBtn = this.checkoutModal.locator(" a[href='/login']");
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
    async deleteItem(idx: number){
        await this.cartItems.nth(idx).locator(".cart_delete a").click();

    }
    async clickCheckout(){
        await this.page.getByText('Proceed To Checkout').click();
    }
    async clickAuth(){
        await this.authBtn.click();
    }
   
    
}
export default Cart