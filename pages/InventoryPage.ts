import { Page, Locator, expect } from "@playwright/test";
import { Product } from "../models/Product";

export class InventoryPage {
  readonly productItems: Locator;
  readonly productPrice: Locator;
  readonly addToCartBtn: Locator;
  readonly productName: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;

  constructor(public readonly page: Page) {
    this.productItems = page.locator(".inventory_item");
    this.productPrice = page.locator(".inventory_item_price");
    this.addToCartBtn = page.locator(".btn_inventory");
    this.productName = page.locator(".inventory_item_name");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.cartIcon = page.locator(".fa-shopping-cart");
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

  async addProductToCart(products: Product[]) {
    const count = await this.productItems.count();

    for (let i = 0; i < count; i++) {
      const product = this.productItems.nth(i);
      const name = await product.locator(this.productName).innerText();
      if (products.some((p) => p.productName === name)) {
        await this.addToCartBtn.nth(i).click();
      }
    }
  }
  async verifyCartCount(count: string) {
    const badgeText = await this.cartBadge.innerText();
    expect(await this.cartBadge.innerText()).toBe(count);
  }

  async navigateToCartpage() {
    await this.cartIcon.click();
  }
}
