import { expect, Locator, Page } from '@playwright/test';
import { catsList } from '../Constants';

export class FormPage {

    readonly page: Page;	
    readonly inputEmail: Locator;
    readonly inputFirstName: Locator;
    readonly inputLastName: Locator;
    readonly selectCat: Locator;
    readonly inputRequest: Locator;
    readonly buttonSendFormCancel: Locator;
    readonly buttonSendFormConfirm: Locator;
    readonly emailRequiredMessage: Locator;
    readonly emailInvalidMessage: Locator;
    readonly firstNameRequiredMessage: Locator;
    readonly lastNameRequiredMessage: Locator;
    readonly catRequiredMessage: Locator;
    readonly requestRequiredMessage: Locator;
    readonly successModalTitle: Locator;
    readonly successModalBody: Locator;
    readonly successModalCloseButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputEmail = page.locator('//input[@id="email"]');
        this.inputFirstName = page.locator('//input[@id="firstName"]');
        this.inputLastName = page.locator('//input[@id="lastName"]');
        this.selectCat = page.locator('//select[@id="cat"]');
        this.inputRequest = page.locator('//textarea[@id="requestText"]');
        this.buttonSendFormCancel = page.getByTestId('form-cancel-button');
        this.buttonSendFormConfirm = page.getByTestId('form-submit-button');
        this.emailRequiredMessage = page.getByTestId('email-required-message');
        this.emailInvalidMessage = page.getByTestId('email-invalid-message');
        this.firstNameRequiredMessage = page.getByTestId('first-name-required-message');
        this.lastNameRequiredMessage = page.getByTestId('last-name-required-message');
        this.catRequiredMessage = page.getByTestId('cat-required-message');
        this.requestRequiredMessage = page.getByTestId('request-text-required');
        this.successModalTitle = page.getByTestId('sucess-modal-title');
        this.successModalBody = page.getByTestId('success-modal-body');
        this.successModalCloseButton = page.getByTestId('sucess-modal-close-button');
    }

    async verifyValidation() {
        await this.buttonSendFormConfirm.click();

        await expect(this.emailRequiredMessage).toBeVisible();
        await expect(this.firstNameRequiredMessage).toBeVisible();
        await expect(this.lastNameRequiredMessage).toBeVisible();
        await expect(this.catRequiredMessage).toBeVisible();
        await expect(this.requestRequiredMessage).toBeVisible();
        await expect(this.emailRequiredMessage).toHaveText('Email is required');
        await expect(this.firstNameRequiredMessage).toHaveText('First name is required');
        await expect(this.lastNameRequiredMessage).toHaveText('Last name is required');
        await expect(this.catRequiredMessage).toHaveText('Cat selection is required');
        await expect(this.requestRequiredMessage).toHaveText('Request text is required');

        await this.inputEmail.fill('test');
        await expect(this.emailInvalidMessage).toBeVisible();
        await expect(this.emailInvalidMessage).toHaveText('Invalid email format');

        await this.selectCat.click();

        for (let i = 0; i < 10; i++) {
            await expect(this.page.locator(`//option[@value="${catsList[i].name}"]`)).toHaveText(catsList[i].name);
        }
    }

    async cancelSendingForm() {
        await this.inputEmail.fill(formEmail);
        await this.inputFirstName.fill(formFirstName);
        await this.inputLastName.fill(formLastName);
        await this.selectCat.selectOption(catsList[9].name);
        await this.inputRequest.fill(formRequestText);

        await this.buttonSendFormCancel.click();
        
        await expect(this.successModalTitle).not.toBeVisible();
        await expect(this.successModalBody).not.toBeVisible();
        await expect(this.inputEmail).toBeEmpty();
        await expect(this.inputFirstName).toBeEmpty();
        await expect(this.inputLastName).toBeEmpty();
        await expect(this.inputRequest).toBeEmpty();
    }

    async sendForm() {
        await this.inputEmail.fill(formEmail);
        await this.inputFirstName.fill(formFirstName);
        await this.inputLastName.fill(formLastName);
        await this.selectCat.selectOption(catsList[9].name);
        await this.inputRequest.fill(formRequestText);

        await this.buttonSendFormConfirm.click();
        
        await expect(this.successModalTitle).toBeVisible();
        await expect(this.successModalBody).toBeVisible();
        await expect(this.successModalTitle).toHaveText('Form Submitted Successfully');
        await expect(this.successModalBody).toHaveText(`Dear ${formFirstName} ${formLastName}, \nThank you for reaching out! Our team will get in touch with you via e-mail as soon as possible.`);
        await this.successModalCloseButton.click();
        await expect(this.successModalTitle).not.toBeVisible();
        await expect(this.successModalBody).not.toBeVisible();
    }
}

const formEmail = "test@test.hr";
const formFirstName = "Test";
const formLastName = "Test";
const formRequestText = "Hello, I hope this message finds you well. Over the past few months, I've been giving serious thought to the idea of adopting a cat. My home feels like it's missing that special companion, and I believe a cat would fill that void perfectly. After browsing through your website and getting to know about the cats available for adoption, I've been particularly drawn to 'Midnight'. There's something about Midnight that deeply resonates with me. I would love to learn more about Whiskers' personality, habits, and any specific needs or preferences he might have. Could you provide me with more details? Additionally, I'd like to understand the adoption process and if there are any prerequisites or requirements on my end. Thank you for the wonderful work you do in rescuing and rehoming these lovely animals. I'm eagerly looking forward to the possibility of giving a loving home to a cat in need. Warm regards";
