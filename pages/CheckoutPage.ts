import { expect, Locator, Page } from "@playwright/test";
import { Product } from "../models/Product";

export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postCodeInput: Locator;
  readonly continuteBtn: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly summarySubTotalTxt: Locator;
  readonly taxTxt: Locator;
  readonly totalTxt: Locator;
  readonly finishBtn: Locator;

  constructor(public readonly page: Page) {
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postCodeInput = page.locator('[data-test="postalCode"]');
    this.continuteBtn = page.locator(".cart_button");
    this.productName = page.locator(".inventory_item_name");
    this.productPrice = page.locator(".inventory_item_price");
    this.summarySubTotalTxt = page.locator(".summary_subtotal_label");
    this.taxTxt = page.locator(".summary_tax_label");
    this.totalTxt = page.locator(".summary_total_label");
    this.finishBtn = page.locator("text=FINISH");
  }

  async fillCheckoutInfor(
    firstName: string,
    lastName: string,
    postCode: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
    await this.continuteBtn.click();
  }

  async verifyChekoutOverview(products: Product[]) {
    let summaryTotal = 0;
    const tax = parseFloat((await this.taxTxt.innerText()).split("$")[1]);
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      await expect(this.productName.nth(i)).toHaveText(product.productName);
      await expect(this.productPrice.nth(i)).toHaveText(
        `$${product.productPrice}`
      );
      summaryTotal += parseFloat(product.productPrice);
    }

    await expect(this.summarySubTotalTxt).toHaveText(
      `Item total: $${String(summaryTotal)}`
    );
    await expect(this.taxTxt).toBeVisible();
    const total = summaryTotal + tax;
    await expect(this.totalTxt).toHaveText(`Total: $${total}`);
  }

  async clickFinishBtn() {
    await this.finishBtn.click();
  }
}
