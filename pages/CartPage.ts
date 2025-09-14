import { expect, Locator, Page } from "@playwright/test";
import { Product } from "../models/Product";

export class CartPage {
  readonly checkoutBtn: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;

  constructor(public readonly page: Page) {
    this.checkoutBtn = page.locator(".checkout_button");
    this.productName = page.locator(".inventory_item_name");
    this.productPrice = page.locator(".inventory_item_price");
  }

  async verifyCart(products: Product[]) {
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      await expect(this.productName.nth(i)).toHaveText(product.productName);
      await expect(this.productPrice.nth(i)).toHaveText(product.productPrice);
    }
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }
}
