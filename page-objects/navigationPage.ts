import { Page } from '@playwright/test';

export class NavigationPage  {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    async goToOwnersSearchPage() {
        await this.page.getByRole('button', { name: ' Owners' }).click()
        await this.page.getByRole('link', { name: ' Search' }).click()
      }
    async goToAddNewOwnerPage() {
        await this.page.getByRole('button', { name: 'Owners' }).click()
        await this.page.getByRole('link', { name: ' Add New' }).click()
      }
}