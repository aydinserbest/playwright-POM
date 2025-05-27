import { expect, Locator, Page } from '@playwright/test';
export class PetTypesPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    async expectPetTypesHeading(headingText: string) {
        await expect(this.page.getByRole('heading', { name: headingText })).toBeVisible()
    }
    async editPetNamed(petTypeName: string) {
        await this.page.getByRole('row', { name: petTypeName }).getByRole('button', { name: 'Edit' }).click()
        await this.page.waitForResponse('**/api/pettypes/**')
    }
    async expectEditPetTypeHeaderVisible() {
        await expect(this.page.getByRole('heading', { name: 'Edit Pet Type' })).toBeVisible()
    }
    async changePetTypeTo(newName: string) {
        await this.page.locator('#name').fill(newName)
        await this.page.getByRole('button', { name: 'Update' }).click()
    }
    async expectFirstPetTypeToBe(petType: string) {
        await expect(this.page.getByRole('textbox').first()).toHaveValue(petType)
    }
    async expectPetTypeToExistInList(petType: string) {
        const inputs = await this.page.locator('input[name="pettype_name"]').all()
        const values: string[] = []
        for (const input of inputs) {
            const value = await input.inputValue()
            values.push(value.trim())
        }
        expect(values).toContain(petType)
    }
    async clearPetTypeInput() {
        await this.page.getByRole('textbox').fill('')
    }

    async expectNameRequiredValidationVisible() {
        await expect(this.page.getByText('Name is required')).toBeVisible()
    }
    async clickOnUpdateButton() {
        await this.page.getByRole('button', { name: 'Update' }).click()
    }
    async clickOnCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click()
        await this.page.waitForResponse('**/api/pettypes')
    }
    async clickOnAddButton() {
        await this.page.getByRole('button', { name: 'Add' }).click()
    }
    async expectAddPetTypeFormVisible() {
        await expect(this.page.getByRole('heading', { name: 'New Pet Type' })).toBeVisible()
        await expect(this.page.locator('label', { hasText: 'Name' })).toBeVisible()
        await expect(this.page.locator('#name')).toBeVisible()
    }
    async addNewPetType(petTypeName: string) {
        await this.page.locator('#name').fill(petTypeName)
        await this.page.getByRole('button', { name: 'Save' }).click()
    }
    async expectLastPetTypeToBe(newPetType: string) {
        await expect(this.page.locator('input[name="pettype_name"]').last()).toHaveValue(newPetType)
    }
    async deletePetTypeByName(petTypeName: string) {
        this.page.on('dialog', async (dialog) => {
            expect(dialog.message()).toBe('Delete the pet type?')
            await dialog.accept()
        })
        await this.page.getByRole('row', { name: petTypeName }).getByRole('button', { name: 'Delete' }).click()
    }
    async expectLastPetTypeNotToBe(petTypeName: string) {
        await expect(this.page.locator('input[name="pettype_name"]').last()).not.toHaveValue(petTypeName)
    }
    async fillPetTypeInput(newName: string) {
        await this.page.locator('#name').fill(newName)
    }
    async expectPetTypeInputToHaveValue(expectedName: string) {
        await expect(this.page.locator('#name')).toHaveValue(expectedName)
    }
}