import { expect, Page } from '@playwright/test';

export class OwnerInformationPage  {
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
}