import { Locator, Page } from "@playwright/test";

class Products{

    readonly page: Page;
    readonly title: Locator;

    readonly products: Locator;
    readonly viewProudctBtn: Locator;

    readonly searchInput: Locator;
    readonly searchBtn: Locator;

    readonly productsTitles: Locator;

    // readonly addToCartBtn: Locator;
    readonly model: Locator;

    constructor(page: Page){
        this.page = page;
        this.title = this.page.locator('.features_items h2.title');
        this.products = this.page.locator('.single-products');
        this.viewProudctBtn = this.page.locator('a',{hasText: 'View Product'});

        this.searchInput = this.page.locator('#search_product');
        this.searchBtn = this.page.locator('#submit_search');

        this.productsTitles = this.products.locator('.productinfo p');
        // this.addToCartBtn = this.products.locator('a',{hasText:'Add to cart'});
        
        this.model = this.page.locator('#cartModal');
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
        
        let titles = new Array<string>();
        for (let i = 0; i < count; i++) {
            titles.push(await this.productsTitles.nth(i).textContent() as string);
        }
        return titles
    }
    async addToCart(idx: number){
        await this.products.nth(idx).hover();
        await this.products.nth(idx).locator('.overlay-content a',{hasText:'Add to cart'}).click()
        await this.clcikContinueShopping();
        
    }
    async clcikContinueShopping(){
        await this.model.locator('button',{hasText:'Continue Shopping'}).click();
    }

    async getProductPrice(idx: number){
        return await this.products.locator('.productinfo h2').textContent();
    }
}

export default Products;