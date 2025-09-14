import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(public readonly page: Page) {
    this.userNameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator("#login-button");
  }

  async gotoLoginPage() {
    await this.page.goto("https://www.saucedemo.com/v1/index.html");
  }

  async loginWithValidCredentials(userName: string, password: string) {
    await this.gotoLoginPage();
    await this.userNameInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
  }
}
