import { expect, Locator, Page } from '@playwright/test';
import { catsList } from '../Constants';

export class CatsListPage {

    readonly page: Page;	
    readonly successModalCloseButton: Locator;
    readonly buttonCloseModal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successModalCloseButton = page.getByTestId('sucess-modal-close-button');
        this.buttonCloseModal = page.getByRole('button', { name: 'Close' });
    }

    async verifyElements() {
        for (let i = 0; i < 10 ; i++) {
            await expect(this.page.getByTestId(`cat-${i}-image`)).toBeVisible();
            await expect(this.page.getByTestId(`cat-${i}-name`)).toBeVisible();
            await expect(this.page.getByTestId(`cat-${i}-short-description`)).toBeVisible();
            await expect(this.page.locator(`//button[@data-target="#catModal-${i}"]`)).toBeVisible();

            await expect(this.page.getByTestId(`cat-${i}-name`)).toHaveText(catsList[i].name);
            await expect(this.page.getByTestId(`cat-${i}-short-description`)).toHaveText(catsList[i].shortDescription);
        }  
    }

    async viewElementDetails() {
        for (let i = 0; i < 10; i++) {
            await this.page.locator(`//button[@data-target="#catModal-${i}"]`).click();

            await expect(this.page.getByTestId(`cat-${i}-modal-title`)).toBeVisible();
            await expect(this.page.getByTestId(`cat-${i}-breed`)).toBeVisible();
            await expect(this.page.getByTestId(`cat-${i}-age`)).toBeVisible();
            await expect(this.page.getByTestId(`cat-${i}-long-description`)).toBeVisible();

            await expect(this.page.getByTestId(`cat-${i}-modal-title`)).toHaveText(`${catsList[i].name} details`);
            await expect(this.page.getByTestId(`cat-${i}-breed`)).toHaveText(`Breed: ${catsList[i].breed}`);
            await expect(this.page.getByTestId(`cat-${i}-age`)).toHaveText(`Age: ${catsList[i].age}`);
            await expect(this.page.getByTestId(`cat-${i}-long-description`)).toHaveText(catsList[i].longDescription);

            await this.buttonCloseModal.click();
        }
    }
}
