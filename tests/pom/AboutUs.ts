import { expect, Locator, Page } from '@playwright/test';

export class AboutUsPage {

    readonly page: Page;	
    readonly pageTitle: Locator;
    readonly pawieDescription: Locator;
    readonly pawieDescription2: Locator;
    readonly pawieDescription3: Locator;
    readonly adoptedCatImage: Locator;
    readonly kittensImage: Locator;
    readonly facebookFavicon: Locator;
    readonly twitterFavicon: Locator;
    readonly instagramFavicon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('about-page-title');
        this.pawieDescription = page.getByTestId('pawie-info');
        this.pawieDescription2 = page.getByTestId('pawie-info2');
        this.pawieDescription3 = page.getByTestId('pawie-info3');
        this.adoptedCatImage = page.getByTestId('adopted-cat-image');
        this.kittensImage = page.getByTestId('kittens-image');
        this.facebookFavicon = page.locator('//i[contains(@class, "fa-facebook")]');
        this.twitterFavicon = page.locator('//i[contains(@class, "fa-twitter")]');
        this.instagramFavicon = page.locator('//i[contains(@class, "fa-instagram")]');
    }

    async verifyElements() {

        await expect(this.pageTitle).toBeVisible();
        await expect(this.pawieDescription).toBeVisible();
        await expect(this.adoptedCatImage).toBeVisible();
        await expect(this.pawieDescription2).toBeVisible();
        await expect(this.kittensImage).toBeVisible();
        await expect(this.pawieDescription3).toBeVisible();
        await expect(this.facebookFavicon).toBeVisible();
        await expect(this.twitterFavicon).toBeVisible();
        await expect(this.instagramFavicon).toBeVisible();

        await expect(this.pageTitle).toHaveText(pageTitle);
        await expect(this.pawieDescription).toHaveText(pawieDescription);
        await expect(this.pawieDescription2).toHaveText(pawieDescription2);
        await expect(this.pawieDescription3).toHaveText(pawieDescription3);

    }

    async handlePopupAndClose(clickElement: Locator, expectedUrl: string) {
        const [popup] = await Promise.all([
            this.page.waitForEvent('popup'),
            clickElement.click()
        ]);
        
        expect(popup.url()).toContain(expectedUrl);
        await popup.close();
    }
    
    async verifyLinks() {
        await this.handlePopupAndClose(this.facebookFavicon, facebookLink);
        await this.handlePopupAndClose(this.twitterFavicon, twitterLink);
        await this.handlePopupAndClose(this.instagramFavicon, instagramLink);
    }

}

const pageTitle = "About Us";
const pawieDescription = "At Paw.ie, our mission is to help people adopt cats. We believe that every feline deserves a loving home where they can thrive and be pampered. With our dedicated team, we strive to connect potential cat parents with their perfect match.";
const pawieDescription2 = "We understand that adopting a pet is a significant commitment, and we are here to support you throughout every step of your journey. Through our platform, you can also send questions about the cats and potentially adopt them.";
const pawieDescription3 = "Established in 2020, Paw.ie has since been at the forefront of feline adoption, giving countless cats a new lease on life. We partner with various cat shelters, ensuring that every cat gets a second chance at happiness.";
const facebookLink = "https://web.facebook.com/?_rdc=1&_rdr";
const twitterLink = "https://twitter.com/";
const instagramLink = "https://www.instagram.com";
