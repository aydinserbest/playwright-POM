import { expect, Locator, Page } from '@playwright/test';

export class OwnersSearchPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    async selectOwnerByName(name: string) {
        await this.page.getByRole('link', { name }).click()
    }
    async getOwnerRowByName(ownerName: string) {
        return this.page.locator('table tbody tr').filter({
            has: this.page.getByRole('link', { name: ownerName })
        })
    }
    private async searchOwnerByLastName(lastName: string) {
        await this.page.locator('#lastName').fill(lastName);
        await this.page.getByRole('button', { name: 'Find Owner' }).click();
    }
    async validateLastNameSearchResults(lastName: string) {
        await this.searchOwnerByLastName(lastName);
        await this.page.waitForResponse(`**/owners?lastName=${lastName}`);

        const rows = this.page.locator('table tbody > tr');
        const rowCount = await rows.count();

        if (rowCount > 0) {
            await this.assertAllRowsContainLastName(rows, lastName);
        } else {
            await expect(
                this.page.getByText(`No owners with LastName starting with "${lastName}"`)
            ).toBeVisible();
        }
    }
    private async assertAllRowsContainLastName(rows: Locator, lastName: string) {
        const rowCount = await rows.count();
        for (let i = 0; i < rowCount; i++) {
            const nameCell = rows.nth(i).locator('td').nth(0);
            await expect(nameCell).toContainText(lastName);
        }
    }
    async expectOwnerCountInCity(city: string, expectedCount: number) {
        const rows = this.page.getByRole('row', { name: city }).filter({
            has: this.page.locator('td').nth(2).getByText(city)
        });
        await expect(rows).toHaveCount(expectedCount)
    }

    async expectOwnersHeading() {
        await expect(this.page.getByRole('heading')).toHaveText('Owners')
    }
    async expectOwnersInCityToBe(row: Locator, expectedCity: string) {
        await expect(row.locator('td:nth-child(3)')).toContainText(expectedCity);
    }
    async expectOwnerToHavePet(row: Locator, petName: string) {
        await expect(row.locator('td:nth-child(5)')).toHaveText(petName);
    }
}