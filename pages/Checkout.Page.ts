import { Locator, Page } from "@playwright/test";

class Checkout{
   

    readonly page: Page;
    readonly addressDetailsH: Locator;
    readonly reviewOrderH: Locator;
    readonly placeOrderBtn: Locator;
    readonly descriptionTextarea: Locator;

    payment: Payment

    constructor(page:Page){
        this.page = page;
        this.addressDetailsH = this.page.getByText('Address Details');
        this.reviewOrderH = this.page.getByText('Review Your Order');
        this.placeOrderBtn = this.page.locator('a.check_out');
        this.descriptionTextarea = this.page.locator('textarea[name="message"]');
        

        this.payment = new Payment(this.page);

    }
    async placeOrder(comment: string){
        await this.descriptionTextarea.fill(comment);
        await this.placeOrderBtn.click();
    }

    
   
}
class Payment{
    readonly page: Page;
    readonly nameFiled: Locator;
    readonly numberField: Locator;
    readonly cvcField: Locator;
    readonly monthField: Locator;
    readonly yearField: Locator;
    readonly payBtn: Locator
    constructor(page: Page){
        this.page = page;
        this.nameFiled = this.page.locator('input[name="name_on_card"]');
        this.numberField = this.page.locator('input[name="card_number"]');
        this.cvcField = this.page.locator('input[name="cvc"]'); 
        this.monthField = this.page.locator('input[name="expiry_month"]'); 
        this.yearField = this.page.locator('input[name="expiry_year"]'); 
        this.payBtn = this.page.locator('#submit');
    }
    async enterPaymentDetails(card: cardInfo){
       
        await this.nameFiled.fill(card.name),
        await this.numberField.fill(card.num),
        await this.cvcField.fill(card.cvc),
        await this.monthField.fill(card.month),
        await this.yearField.fill(card.year),
        await this.payBtn.click();
        // this.page.getByText('Your order has been placed successfully!').isVisible();
    }
}
interface cardInfo {
    name:string
    num:string,
    cvc:string,
    month:string,
    year:string
}
export default Checkout;