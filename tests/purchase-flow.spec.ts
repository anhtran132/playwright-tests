import { test } from "../utils/fixture";
import { Products, validUser, CheckoutInfor } from "../utils/test-data";

test("Purchase Flow", async ({
  loginPage,
  inventoryPage,
  cartPage,
  checkoutPage,
  confirmationPage,
}) => {
  await loginPage.loginWithValidCredentials(
    validUser.userName,
    validUser.password
  );
  await inventoryPage.addProductToCart(Products);
  await inventoryPage.navigateToCartpage();
  await cartPage.verifyCart(Products);
  await cartPage.proceedToCheckout();
  await checkoutPage.fillCheckoutInfor(
    CheckoutInfor.firstName,
    CheckoutInfor.lastName,
    CheckoutInfor.postCode
  );
  await checkoutPage.verifyChekoutOverview(Products);
  await checkoutPage.clickFinishBtn();
  await confirmationPage.verifySucessMsg();
});
