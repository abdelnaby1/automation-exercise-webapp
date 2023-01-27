import { Locator, Page } from "@playwright/test";

class Home{

    readonly url = '/';
    readonly page: Page;
    readonly loginLink: Locator;

    readonly deleteAccBtn: Locator;
    readonly user: Locator;
    readonly logoutLink: Locator

    readonly contactUsLink: Locator;
    readonly testCasesLink: Locator;

    readonly productsLink: Locator;

    readonly footer: Locator;
    readonly subscribeTitle: Locator
    readonly subscribeEmailField: Locator;
    readonly subscribeBtn: Locator;
    readonly subscribeMsg: Locator;
    
    readonly cartLink: Locator;
    readonly addToCartBtn: Locator;

    readonly categories: Locator;

    private readonly categoriesMap = {
        'Women': 0,
        'Men':1,
        'Kids':2
    }

    readonly recommendedItems: Locator;
    readonly recommendedItemsTitle: Locator;
    readonly recommendedProducts: Locator;

    
    constructor(page: Page){
        this.page = page;
        this.loginLink = this.page.locator("a[href='/login']");
        this.deleteAccBtn = this.page.locator('a[href="/delete_account"]');    
        this.user = this.page.locator("a",{has: this.page.locator("//i[@class='fa fa-user']")});
        this.logoutLink = this.page.locator("a[href='/logout']");
        this.contactUsLink = this.page.locator('a[href="/contact_us"]');
        this.testCasesLink = this.page.locator('.nav a[href="/test_cases"]');
        this.productsLink = this.page.locator('.nav a[href="/products"]');
        this.footer = this.page.locator("#footer");
        this.subscribeTitle = this.page.locator('#footer .single-widget h2');
        this.subscribeEmailField = this.page.locator("#susbscribe_email");
        this.subscribeBtn = this.page.locator('#subscribe');
        this.subscribeMsg = this.page.locator('#success-subscribe .alert');
        this.cartLink = this.page.locator('.nav a[href="/view_cart"]');

        this.addToCartBtn = this.page.locator("//a[text()[normalize-space()='Add to cart']]");

        this.categories = this.page.locator("#accordian .panel");
        this.recommendedItems = this.page.locator('.recommended_items');
        this.recommendedItemsTitle = this.recommendedItems.getByText("recommended items");
        this.recommendedProducts = this.recommendedItems.locator(".active .single-products")
    }

    async clickLoginLink(){
        await this.loginLink.click();
    }
    async deleteAccount(){
        await this.deleteAccBtn.click();
    }
    async clickLogoutLink(){
        await this.logoutLink.click();
    }
    async clickContactUsLink(){
        await this.contactUsLink.click();
    }
    async clickTestCasesLink(){
        await this.testCasesLink.click();
    }
    async clickProductsLink(){
        await this.productsLink.click();
    }

    async scrollToFooter(){
        await this.footer.scrollIntoViewIfNeeded();
    }
    async subscribe(email: string){
        await this.subscribeEmailField.fill(email);
        await this.subscribeBtn.click();
    }

    async clickCartLink(){
        await this.cartLink.click();
    }
    async clickCategory(category: string,subcategory:string){
        await this.categories.nth(this.categoriesMap[category]).locator(`a[href="#${category}"]`).click();
        await this.page.locator(`#${category} a`,{hasText:`${subcategory}`}).click();
    }

    async scrollToRecommendedItems(){
        await this.recommendedItems.scrollIntoViewIfNeeded();
    }
    async addRecommendedProductToCart(idx: number){
        await this.recommendedProducts.nth(idx).locator("a",{hasText:"Add to cart"}).click();
    }
    async clickViewCart(){
        await this.page.locator('#cartModal a').click();
    }
}
export default Home