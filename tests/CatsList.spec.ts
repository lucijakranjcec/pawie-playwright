import { test } from '@playwright/test';
import { CatsListPage } from './pom/CatsList';
import { SidebarPage } from './pom/Sidebar';
import { LoginPage } from './pom/Login';

test('VerifyElements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const catsListPage = new CatsListPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginAdministrator();
    await sidebarPage.goToCatsPage();

    await catsListPage.verifyElements();   
});

test('ViewCatDetails', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const catsListPage = new CatsListPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginAdministrator();
    await sidebarPage.goToCatsPage();

    await catsListPage.viewCatElements();   
});
