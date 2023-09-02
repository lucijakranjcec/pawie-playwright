import { test } from '@playwright/test';
import { AboutPage } from './pom/About';
import { SidebarPage } from './pom/Sidebar';
import { LoginPage } from './pom/Login';

test('VerifyElements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const aboutPage = new AboutPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginAdministrator();
    await sidebarPage.goToAboutUsPage();

    await aboutPage.verifyElements();   
});

test('VerifyLinks', async ({ page, browser }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const aboutPage = new AboutPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginAdministrator();
    await sidebarPage.goToAboutUsPage();

    await aboutPage.verifyLinks();      

});
