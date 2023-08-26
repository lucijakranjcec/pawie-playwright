import { expect, Locator, Page } from '@playwright/test';
import { SidebarPage } from './Sidebar';

export class LoginPage {

    readonly page: Page;	
    readonly loginTitle: Locator;
    readonly mandatoryFieldsMessage: Locator;
    readonly invalidCredentialsMessage: Locator;
    readonly inputUsername: Locator;
    readonly inputPassword: Locator;
    readonly buttonLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginTitle = page.getByText('Login to Paw.ie');
        this.mandatoryFieldsMessage = page.locator('//div[@class="validation-error"]');
        this.invalidCredentialsMessage = page.getByText('Invalid credentials');
        this.inputUsername = page.locator('//input[@id="username"]');
        this.inputPassword = page.locator('//input[@id="password"]');
        this.buttonLogin = page.locator('//button[@type="submit"]');
    }

    async verifyHomePageElements() {
        await expect(this.inputUsername).toBeVisible();
        await expect(this.inputPassword).toBeVisible();
        await expect(this.buttonLogin).toBeVisible();
    }

    async verifyValidation() {
        await this.buttonLogin.click();
        await expect(this.mandatoryFieldsMessage).toHaveCount(2);
        await expect(this.page.locator('(//div[@class="validation-error"])[1]')).toHaveText("This field is mandatory.");
    }

    async loginInvalidCredentials() {
        const sidebarPage = new SidebarPage(this.page);

        await this.inputUsername.fill(process.env.ADMINISTRATOR_USERNAME!);
        await this.inputPassword.fill("wrongPassword");
        await this.buttonLogin.click();

        await expect(this.invalidCredentialsMessage).toBeVisible();
        await expect(this.loginTitle).toBeVisible();
        await expect(sidebarPage.linkPawie).not.toBeVisible();
    }

    async loginAdministrator() {
        const sidebarPage = new SidebarPage(this.page);
      
        await this.inputUsername.fill(process.env.ADMINISTRATOR_USERNAME!);
        await this.inputPassword.fill(process.env.ADMINISTRATOR_PASSWORD!);
        await this.buttonLogin.click();

        await expect(this.loginTitle).not.toBeVisible();
        await expect(sidebarPage.linkPawie).toBeVisible();
    }
}
