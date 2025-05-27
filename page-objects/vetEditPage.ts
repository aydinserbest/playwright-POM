import { expect, Page } from '@playwright/test';
export class VetEditPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    async openSpecialtyDropdown() {
        await this.page.locator('.dropdown-display').click()
    }
    async getAllSpecialtyOptions() {
        const specialties = this.page.locator('.dropdown-content label')
        const dropdownSpecialtiesArray: string[] = []
        for (const row of await specialties.all()) {
            const value = await row.textContent()
            dropdownSpecialtiesArray.push(value!)
        }
        return dropdownSpecialtiesArray;
    }
    async selectAndSaveSpecialty(specialtyName: string) {
        await this.page.getByRole('checkbox', { name: specialtyName }).check()
        await this.page.locator('.dropdown-display').click()
        await this.page.getByRole('button', { name: 'Save Vet' }).click()
    }
    async expectSelectedSpecialtiesDisplayed(expectedSpecialties: string | string[]) {
        const expectedText = Array.isArray(expectedSpecialties)
            ? expectedSpecialties.join(', ')
            : expectedSpecialties;
        await expect(this.page.locator('.selected-specialties')).toHaveText(expectedText)
    }
    async expectSpecialtiesUnchecked(specialties: string[]) {
        for (const specialty of specialties) {
            await expect(
                this.page.getByRole('checkbox', { name: specialty })
            ).not.toBeChecked()
        }
    }
    async expectSpecialityChecked(specialtyName: string) {
        await expect(this.page.getByRole('checkbox', { name: specialtyName })).toBeChecked()
    }
    async checkSpecialty(specialtyName: string) {
        await this.page.getByRole('checkbox', { name: specialtyName }).check()
    }
    async uncheckSpecialty(specialtyName: string) {
        await this.page.getByRole('checkbox', { name: specialtyName }).uncheck()
    }
    async checkAndAssertAllSpecialties() {
        const allSpecialtyCheckboxes = this.page.getByRole('checkbox')
        for (const box of await allSpecialtyCheckboxes.all()) {
            await box.check()
            await expect(box).toBeChecked()
        }
    }
    async uncheckAndAssertAllSpecialties() {
        const allSpecialtyCheckboxes = this.page.getByRole('checkbox')
        for (const box of await allSpecialtyCheckboxes.all()) {
            await box.uncheck()
            await expect(box).not.toBeChecked()
        }
    }
}