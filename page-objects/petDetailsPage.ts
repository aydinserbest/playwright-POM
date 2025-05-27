import { expect, Page } from '@playwright/test';
export class PetDetailsPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    async selectPetType(petType: string) {
        await this.page.getByLabel('Type').selectOption(petType)
    }
    async expectPetTypeToBe(expectedType: string) {
        await expect(this.page.locator('#type1')).toHaveValue(expectedType)
    }
    async clickUpdate() {
        await this.page.getByRole('button', { name: 'Update' }).click()
    }
    async updatePetTypeTo(newType: string) {
        await this.selectPetType(newType)
        await this.expectPetTypeToBe(newType)
        await this.clickUpdate()
    }
    async getAllPetTypes(): Promise<string[]> {
        return await this.page.getByLabel('Type').locator('option').allTextContents()
    }
    async expectOwnerNameToBe(expectedName: string) {
        await expect(this.page.locator('#owner_name')).toHaveValue(expectedName)
    }
    async expectPetNameToBe(expectedName: string) {
        await expect(this.page.getByLabel('Name')).toHaveValue(expectedName)
    }
    async expectTypeValueToBe(expected: string) {
        await expect(this.page.locator('#type1')).toHaveValue(expected)
    }
    async expectPetDetailsHeading() {
        await expect(this.page.getByRole('heading')).toHaveText('Pet')
    }
    async verifyAllPetTypesSelectableAndDisplayedCorrectly() {
        const types = await this.getAllPetTypes()
        for (const type of types) {
            await this.selectPetType(type)
            await this.expectPetTypeToBe(type)
        }
    }
}