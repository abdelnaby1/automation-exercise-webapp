import { Locator, Page } from "@playwright/test";

class ProductDetails{

    readonly page: Page;
    readonly info: Locator;
    readonly name: Locator;
    readonly category: Locator;
    readonly price : Locator;
    readonly availability: Locator;
    readonly condition: Locator;
    readonly brand: Locator;

    readonly quantityInput: Locator;
    readonly addToCartBtn: Locator;
    readonly model: Locator;

    readonly reviewTitle: Locator;
    //review inputs
    readonly reviewNameInput: Locator;
    readonly reviewEmailInput: Locator;
    readonly reviewBody: Locator;
    readonly submitReviewBtn: Locator;
    readonly reviewMsg: Locator;
    
    constructor(page: Page){
        this.page = page;
        this.info = this.page.locator('.product-information')
        this.name = this.info.locator('h2');
        this.category = this.info.locator('p',{hasText: /Category.*/});
        this.price = this.info.locator('span span',{hasText: /Rs. .*/});
        this.availability = this.info.locator('p',{hasText:"Availability:"});
        this.condition = this.info.locator('p',{hasText:"Condition:"});
        this.brand = this.info.locator('p',{hasText:"Brand:"});

        this.quantityInput = this.info.locator('#quantity');
        this.addToCartBtn = this.info.locator("//button[text()[normalize-space()='Add to cart']]");
        
        this.model = this.page.locator('#cartModal');
        
        this.reviewTitle = this.page.locator('a',{hasText:'Write Your Review'});
        
        this.reviewNameInput = this.page.locator('input#name');
        this.reviewEmailInput = this.page.locator('input#email');
        this.reviewBody = this.page.locator('textarea#review');
        this.submitReviewBtn = this.page.locator('#button-review');
        this.reviewMsg = this.page.locator('#review-section');
    }
    async addToCartWithQty(qty: string){
        await this.quantityInput.fill(qty);
        await this.addToCartBtn.click();
    }

    async clcikContinueShopping(){
        await this.model.locator('button',{hasText:'Continue Shopping'}).click();
    }
    async clickVieWCart(){
        await this.model.locator('a[href="/view_cart"]').click();

    }
    async reviewProduct(name: string, email: string, text: string){
        await this.reviewNameInput.fill(name);
        await this.reviewEmailInput.fill(email);
        await this.reviewBody.fill(text);
        await this.submitReviewBtn.click();
        await this.page.screenshot({path: 'screenshots/afterSubmitReview.png'})
        
        

    }
    async getReviewMsg(){
        return await this.reviewMsg.innerText();
    }
}
export default ProductDetails;