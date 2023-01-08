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

    constructor(page: Page){
        this.page = page;
        this.info = this.page.locator('.product-information')
        this.name = this.info.locator('h2');
        this.category = this.info.locator('p',{hasText: /Category.*/});
        this.price = this.info.locator('span span',{hasText: /Rs. .*/});
        this.availability = this.info.locator('p',{hasText:"Availability:"});
        this.condition = this.info.locator('p',{hasText:"Condition:"});
        this.brand = this.info.locator('p',{hasText:"Brand:"});

    }
}
export default ProductDetails;