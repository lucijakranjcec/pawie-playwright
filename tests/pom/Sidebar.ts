import { expect, Locator, Page } from '@playwright/test';
import { LoginPage } from './Login';

export class SidebarPage {

    readonly page: Page;	

    readonly linkPawie: Locator;
    readonly linkCats: Locator;
    readonly linkForm: Locator;
    readonly linkAbout: Locator;
    readonly linkLogout: Locator;

    readonly logoutModalTitle: Locator;
    readonly logoutModalBody: Locator;
    readonly logoutModalCancel: Locator;
    readonly logoutModalConfirm: Locator;

    constructor(page: Page) {

        this.page = page;

        this.linkPawie = page.getByTestId('navigation-pawie-link');
        this.linkCats = page.getByTestId('navigation-cats-link');
        this.linkForm = page.getByTestId('navigation-form-link');
        this.linkAbout = page.getByTestId('navigation-about-link');
        this.linkLogout = page.getByTestId('navigation-logout-link');
            
        this.logoutModalTitle = page.getByTestId('logout-modal-title');
        this.logoutModalBody = page.getByTestId('logout-modal-body');
        this.logoutModalCancel = page.getByTestId('logout-modal-cancel-button');
        this.logoutModalConfirm = page.getByTestId('logout-modal-confirm-button');

    }

    async goToPawie() {
      
        await this.linkPawie.click();
    
    }

    async goToCatsPage() {
      
        await this.linkCats.click();

    }

    async goToFormPage() {
      
        await this.linkForm.click();
    
    }

    async goToAboutUsPage() {
      
        await this.linkAbout.click();

    }

    async verifySidebarElements() {

        await expect(this.linkPawie).toBeVisible();
        await expect(this.linkCats).toBeVisible();
        await expect(this.linkForm).toBeVisible();
        await expect(this.linkAbout).toBeVisible();
        await expect(this.linkLogout).toBeVisible();

    }

    async logoutCancel() {

        const loginPage = new LoginPage(this.page);
      
        await this.linkLogout.click();
        await expect(this.logoutModalTitle).toHaveText('Confirm Logout');
        await expect(this.logoutModalBody).toHaveText('Do you really want to logout?');
        await this.logoutModalCancel.click();

        await expect(loginPage.loginTitle).not.toBeVisible();
        await expect(this.linkPawie).toBeVisible();

    }

    async logout() {

        const loginPage = new LoginPage(this.page);
      
        await this.linkLogout.click();
        await expect(this.logoutModalTitle).toHaveText('Confirm Logout');
        await expect(this.logoutModalBody).toHaveText('Do you really want to logout?');
        await this.logoutModalConfirm.click();

        await expect(loginPage.loginTitle).toBeVisible();
        await expect(this.linkPawie).not.toBeVisible();

    }

}