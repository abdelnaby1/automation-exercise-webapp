import { Locator, Page } from "@playwright/test";

class Products{

    readonly page: Page;
    readonly title: Locator;

    readonly products: Locator;
    private viewProudctBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.title = this.page.locator('.features_items h2.title');
        this.products = this.page.locator('.single-products');
        this.viewProudctBtn = this.page.locator('a',{hasText: 'View Product'});
    }

    async goToProductDetails(idx: number){
        await this.viewProudctBtn.nth(idx).click();

    }
}

export default Products;