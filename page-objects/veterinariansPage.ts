import { expect, Page } from '@playwright/test';

export class VeterinariansPage {

  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }
  async expectTableHeadingToBe(headingText: string) {
    await expect(this.page.getByRole('heading', { name: headingText })).toBeVisible()
  }
  async expectVetToHaveSpecialty(vetName: string, expectedSpecialty: string) {
    const specialtyOfOwner = this.page.getByRole('row', { name: vetName }).locator('td').nth(1)
    await expect(specialtyOfOwner).toContainText(expectedSpecialty)
  }
  async expectVetNotToHaveSpecialty(vetName: string) {
    const specialtyOfOwner = this.page.getByRole('row', { name: vetName }).locator('td').nth(2)
    await expect(specialtyOfOwner).toHaveCount(0)
  }
  async editVetNamed(vetName: string) {
    await this.page.getByRole('row', { name: vetName }).getByRole('button', { name: 'Edit Vet' }).click()
  }
}