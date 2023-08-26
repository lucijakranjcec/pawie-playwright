import { test } from '@playwright/test';
import { LoginPage } from './pom/Login';

test('VerifyLoginPageElements', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(process.env.BASE_URL!);
  await loginPage.verifyHomePageElements();   
});

test('VerifyValidation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.verifyValidation();   
});

test('LoginInvalidCredentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginInvalidCredentials();   
});

test('VerifyLoginAdministrator', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(process.env.BASE_URL!);
  await loginPage.loginAdministrator();
});
