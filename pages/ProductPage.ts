import { Page, Locator, expect } from "@playwright/test";

export class ProductPage {
    private readonly productItems : Locator;
    private readonly productPrice : Locator;
    private readonly addToCartBtn : Locator;
    private readonly productName : Locator;
    private readonly cartBadge : Locator;

    constructor(public readonly page: Page){
        this.productItems = this.page.locator('.inventory_item');
        this.productPrice = this.page.locator('.inventory_item_price');
        this.addToCartBtn = this.page.locator('.btn_inventory');
        this.productName = this.page.locator('.inventory_item_name');
        this.cartBadge = this.page.locator('.shopping_cart_badge');
    }

    async verifyProductListing(count: number) {
        await expect(this.productItems).toHaveCount(count);
    }

    async verifyEachProuctHavePrice() {
        const count = await this.productItems.count();

        for (let i = 0; i < count; i++) {
        const product = this.productItems.nth(i);
        const price = product.locator(this.productPrice);
        await expect(price).toBeVisible();
        }
    }

    async addProductToCart(name : string) {
        const count = await this.productItems.count();

        for (let i = 0; i < count; i++) {
        const product =  this.productItems.nth(i);
        const productName = await product.locator(this.productName).innerText();
        if(productName === name) {
            await this.addToCartBtn.nth(i).click();
        }
            
        }
    }
    async verifyCartCount(count:string) {
        const badgeText = await this.cartBadge.innerText();
        expect(badgeText).toBe(count);
    } 

}