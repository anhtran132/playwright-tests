import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductName, validUser } from '../utils/test-data';
import { ProductPage } from '../pages/ProductPage';

test('Playwright practice 1', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.loginWithValidCredentials(validUser.userName, validUser.password);
    productPage.verifyProductListing(6)
    await productPage.verifyEachProuctHavePrice();
    await productPage.addProductToCart(ProductName.TShirt);
    await productPage.verifyCartCount('1');
});
