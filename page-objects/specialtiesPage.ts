import { expect, Page } from '@playwright/test';
export class SpecialitiesPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    async expectTableHeadingToBe(headingText: string) {
        await expect(this.page.getByRole('heading', { name: headingText })).toBeVisible()
    }
    async deleteSpecialty(specialty: string) {
        await this.page.getByRole('row', { name: 'oncology' }).getByRole('button', { name: 'Delete' }).click()
    }
    async editSpecialty(specialtyName: string) {
        await this.page.getByRole('row', { name: specialtyName })
            .getByRole('button', { name: 'Edit' }).click()
    }
    async expectEditSpecialtyForm() {
        await expect(this.page.getByRole('heading', { name: 'Edit Specialty' })).toBeVisible()
    }
    async updateSpecialty(newValue: string) {
        const input = this.page.locator('#name')
        await this.page.waitForResponse('**/specialties/**')
        await input.fill(newValue)
        await this.page.getByRole('button', { name: 'Update' }).click()
    }
    async expectSpecialtyToBeChanged(oldName: string, newName: string) {
        const oldRow = this.page.getByRole('row', { name: oldName })
        const newRow = this.page.getByRole('row', { name: newName })
        await expect(oldRow).toHaveCount(0)
        await expect(newRow).toBeVisible()
    }
    async addNewSpecialty(newSpecialtyName: string) {
        await this.page.getByRole('button', { name: 'Add' }).click()
        await this.page.locator('#name').fill('oncology');
        await this.page.getByRole('button', { name: 'Save' }).click()
        await this.page.waitForResponse('**/api/specialties')
    }
    async getAllSpecialtyOptions() {
        const specialties: string[] = []
        const specialtyRows = this.page.locator('input[name="spec_name"]')
        for (const row of await specialtyRows.all()) {
            const value = await row.inputValue()
            specialties.push(value)
        }
        return specialties
    }
}