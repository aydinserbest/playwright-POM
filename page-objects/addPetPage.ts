import { expect, Page } from '@playwright/test';

export class AddPetPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    async addNewPet(petName: string) {
        await this.page.getByLabel('Name').fill(petName)
    }
    async expectNewPetNameIconToBeValid() {
        await expect(
            this.page.locator('.form-group', { hasText: 'Name' }).locator('.form-control-feedback')
        ).toHaveClass(/.*glyphicon-ok.*/)
    }
    async selectBirthDate(date: string) {
        await this.page.getByRole('button', { name: 'Open calendar' }).click()
        await this.page.getByRole('button', { name: 'Choose month and year' }).click()
        await this.page.getByRole('button', { name: 'Previous 24 years' }).click()
        await this.page.getByRole('gridcell', { name: '2014' }).click()
        await this.page.getByRole('button', { name: '05 2014' }).click()
        await this.page.getByRole('button', { name: '2014/05/02' }).click()
    }
    async expectBirthDateValue(expected: string) {
        await expect(this.page.locator('input[name="birthDate"]')).toHaveValue(expected)
    }
    async selectPetType(type: string) {
        await this.page.getByLabel('Type').selectOption(type)
        await this.page.getByRole('button', { name: 'Save Pet' }).click()
    }
}