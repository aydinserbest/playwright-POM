import { expect, Locator, Page } from '@playwright/test';

export class OwnersSearchPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    async expectTableHeadingToBe(headingText: string) {
        await expect(this.page.getByRole('heading', { name: headingText })).toBeVisible()
    }
    async selectOwnerByName(ownerName: string) {
        await this.page.getByRole('link', { name: ownerName }).click()
        await this.page.waitForResponse('**/owners/*')
    }
    private async findOwnerByLastName(lastName: string) {
        await this.page.locator('#lastName').fill(lastName)
        await this.page.getByRole('button', { name: 'Find Owner' }).click()
    }
    async getPetNameByPhoneNumber(phoneNumber: string) {
        const row = this.page.getByRole('row', { name: phoneNumber })
        const petName = await row.locator('td').nth(4).textContent()
        return petName?.trim() || ''
    }
    async selectOwnerByPhone(phone: string) {
        const ownerRow = this.page.locator('table tbody tr').filter({
            has: this.page.locator(`td:nth-child(4):has-text("${phone}")`)
        })
        await ownerRow.locator('a').click()
    }
    async validateLastNameSearchResults(lastName: string) {
        await this.findOwnerByLastName(lastName)
        await this.page.waitForResponse(`**/owners?lastName=${lastName}`)
        const rows = this.page.locator('table tbody > tr')
        const rowCount = await rows.count();
        if (rowCount > 0) {
            await this.assertAllRowsContainLastName(rows, lastName)
        } else {
            await expect(
                this.page.getByText(`No owners with LastName starting with "${lastName}"`)
            ).toBeVisible();
        }
    }
    private async assertAllRowsContainLastName(rows: Locator, lastName: string) {
        const rowCount = await rows.count()
        for (let i = 0; i < rowCount; i++) {
            const nameCell = rows.nth(i).locator('td').nth(0)
            await expect(nameCell).toContainText(lastName)
        }
    }
    async expectOwnerCountInCity(city: string, expectedCount: number) {
        const rows = this.page.getByRole('row', { name: city }).filter({
            has: this.page.locator('td').nth(2).getByText(city)
        });
        await expect(rows).toHaveCount(expectedCount)
    }
    async expectOwnerToBeFromCity(ownerName: string, expectedCity: string) {
        const ownerRow = this.page.getByRole('row', { name: ownerName })
        await expect(ownerRow.locator('td:nth-child(3)')).toContainText(expectedCity)
    }
    async expectOwnerToHavePet(ownerName: string, petName: string) {
        const ownerRow = this.page.getByRole('row', { name: ownerName })
        await expect(ownerRow.locator('td:nth-child(5)')).toHaveText(petName)
    }
    async getPetNamesOfOwnersFromCity(cityName: string) {
        await this.page.waitForResponse('**/api/owners')
        const expectedPets = ["Leo", "George", "Mulligan", "Freddy"]
        const actualPets: string[] = []
        const madisonRows = this.page.getByRole('row', { name: 'Madison' })
        for (const row of await madisonRows.all()) {
            const petNameOfOwner = await row.locator('td').last().textContent()
            actualPets.push(petNameOfOwner?.trim()!)
        }
        return actualPets
    }
    async expectPetNamesForCityToBe(cityName: string, expectedPets: string[]) {
        const actualPets = await this.getPetNamesOfOwnersFromCity(cityName)
        expect(actualPets).toEqual(expectedPets)
    }
}