import { expect, Page } from '@playwright/test';

export class OwnerInformationPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    async expectOwnerNameToBe(expectedName: string) {
        await expect(this.page.locator('b.ownerFullName')).toHaveText(expectedName)
    }
    async editPetNamed(petName: string) {
        await this.page.locator('app-pet-list', { hasText: petName }).getByRole('button', { name: 'Edit Pet' }).click()
        await this.page.waitForResponse('**/pets/**')
    }
    async expectPetTypeToBe(petName: string, expectedType: string) {
        await expect(this.page.locator('app-pet-list', { hasText: petName }).locator('dd').nth(2)).toHaveText(expectedType)
    }
    async expectPhoneNumberToBe(expected: string) {
        await expect(this.page.getByText(expected)).toBeVisible()
    }
    async expectPetNameToBe(expectedName: string) {
        await expect(this.page.locator('dt:text("Name") + dd')).toHaveText(expectedName)
    }
    async clickOnAddNewPetButton() {
        await this.page.getByRole('button', { name: 'Add New Pet' }).click()
    }
    async clickOnAddNewVisitButton(petName: string) {
        await this.page.locator('app-pet-list', { hasText: 'Samantha' }).getByRole('button', { name: 'Add Visit' }).click()
    }
    async expectPetDetails(name: string, birthDate: string, type: string) {
        const petSection = this.page.locator('app-pet-list', { hasText: name })
        await expect(petSection).toContainText(name)
        await expect(petSection).toContainText(birthDate)
        await expect(petSection).toContainText(type)
    }
    async deletePetByName(name: string) {
        await this.page
            .locator('app-pet-list', { hasText: name })
            .getByRole('button', { name: 'Delete Pet' })
            .click();
    }
    async expectPetToBeDeleted(name: string) {
        await expect(this.page.getByText(name)).toHaveCount(0)
    }
    async verifyVisitIsListedWithTodayDate() {
        const todayDate = new Date();
        const expectedYear = todayDate.getFullYear();
        const expectedMonth = todayDate.toLocaleString('en-US', { month: '2-digit' })
        const expectedDay = todayDate.toLocaleString('en-US', { day: '2-digit' })
        const expectedVisitDateDashFormat = `${expectedYear}-${expectedMonth}-${expectedDay}`
        const visitRowsForSamantha = this.page
            .locator('app-pet-list', { hasText: 'Samantha' })
            .locator('.table-condensed tr')

        await expect(
            visitRowsForSamantha.filter({ hasText: 'dermatologists visit' })
        ).toContainText(expectedVisitDateDashFormat)
    }
    async expectVisitsAreSortedByDateDescending(petName: string, descriptionsInExpectedOrder: string[]) {
        const dateStrings: string[] = []

        for (const description of descriptionsInExpectedOrder) {
            const row = this.page
                .locator('app-pet-list', { hasText: petName })
                .locator('.table-condensed tr')
                .filter({ hasText: description })

            const dateText = await row.locator('td').first().textContent()
            if (dateText) {
                dateStrings.push(dateText.trim())
            }
        }
        const visitDates = dateStrings.map(text => new Date(text))
        for (let i = 0; i < visitDates.length - 1; i++) {
            expect(visitDates[i].getTime()).toBeGreaterThanOrEqual(visitDates[i + 1].getTime())
        }
    }
    async deleteVisitByDescription(description: string) {
        const visitRow = this.page
            .locator('app-pet-list', { hasText: 'Samantha' })
            .locator('.table-condensed tr')
            .filter({ hasText: description })

        await visitRow.getByRole('button', { name: 'Delete Visit' }).click()
    }
    async expectVisitNotVisibleByDescription(description: string) {
        const visitTable = this.page
            .locator('app-pet-list', { hasText: 'Samantha' })
            .locator('.table-condensed')

        await expect(visitTable).not.toContainText(description)
    }
}