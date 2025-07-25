import { test } from '@playwright/test';
import { AboutUsPage } from './pom/AboutUs';
import { SidebarPage } from './pom/Sidebar';
import { LoginPage } from './pom/Login';

test('VerifyElements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const aboutUsPage = new AboutUsPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginAdministrator();
    await sidebarPage.goToAboutUsPage();

    await aboutUsPage.verifyElements();   
});

test('VerifyLinks', async ({ page, browser }) => {
    const loginPage = new LoginPage(page);
    const sidebarPage = new SidebarPage(page);
    const aboutUsPage = new AboutUsPage(page);
    await page.goto(process.env.BASE_URL!);
    await loginPage.loginAdministrator();
    await sidebarPage.goToAboutUsPage();

    await aboutUsPage.handlePopupAndClose(aboutUsPage.facebookFavicon, facebookLink);
    await aboutUsPage.handlePopupAndClose(aboutUsPage.twitterFavicon, twitterLink);
    await aboutUsPage.handlePopupAndClose(aboutUsPage.instagramFavicon, instagramLink);
});

const facebookLink = "https://www.facebook.com/";
const twitterLink = "https://x.com/";
const instagramLink = "https://www.instagram.com";
