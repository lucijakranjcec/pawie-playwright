import { test } from '@playwright/test';
import { SidebarPage } from './pom/Sidebar';
import { LoginPage } from './pom/Login';

test('VerifySidebarElements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginAdministrator();
    await sidebarPage.verifySidebarElements();   
});

test('CancelLoggingOut', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginAdministrator();
    await sidebarPage.logoutCancel();   
});

test('Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginAdministrator();
    await sidebarPage.logout();     
});
