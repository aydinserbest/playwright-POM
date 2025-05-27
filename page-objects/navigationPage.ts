import { Page } from '@playwright/test';

export class NavigationPage {

  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }
  async goToOwnersSearchPage() {
    await this.page.getByRole('button', { name: 'Owners' }).click()
    await this.page.getByRole('link', { name: 'Search' }).click()
  }
  async goToAddNewOwnerPage() {
    await this.page.getByRole('button', { name: 'Owners' }).click()
    await this.page.getByRole('link', { name: 'Add New' }).click()
  }
  async goToVeterinariansPage() {
    await this.page.getByRole('button', { name: 'Veterinarians' }).click()
    await this.page.getByRole('link', { name: 'All' }).click()
  }
  async goToSpecialtiesPage() {
    await this.page.getByRole('link', { name: 'Specialties' }).click()
  }
  async goToPetTypesPage() {
    await this.page.getByRole('link', { name: 'Pet Types' }).click()
  }
}