import { expect, Locator, Page } from "@playwright/test";

export class ConfirmationPage {
  readonly orderSucessMsg: Locator;

  constructor(public readonly page: Page) {
    this.orderSucessMsg = page.locator(".complete-header");
  }

  async verifySucessMsg() {
    await expect(this.orderSucessMsg).toHaveText("THANK YOU FOR YOUR ORDER");
  }
}
