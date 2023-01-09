import { Locator, Page } from "@playwright/test";

class Products{

    readonly page: Page;
    readonly title: Locator;

    readonly products: Locator;
    readonly viewProudctBtn: Locator;

    readonly searchInput: Locator;
    readonly searchBtn: Locator;

    readonly productsTitles: Locator;

    constructor(page: Page){
        this.page = page;
        this.title = this.page.locator('.features_items h2.title');
        this.products = this.page.locator('.single-products');
        this.viewProudctBtn = this.page.locator('a',{hasText: 'View Product'});

        this.searchInput = this.page.locator('#search_product');
        this.searchBtn = this.page.locator('#submit_search');

        this.productsTitles = this.products.locator('.productinfo p')
    }

    async goToProductDetails(idx: number){
        await this.viewProudctBtn.nth(idx).click();
    }

    async searchForProduct(name: string){
        await this.searchInput.fill(name);
        await this.searchBtn.click();
    }
    async getTitles(){
        const count = await this.productsTitles.count();
        
        let titles = new Array();
        for (let i = 0; i < count; i++) {
            titles.push(await this.productsTitles.nth(i).textContent());
        }
        return titles
    }
}

export default Products;