import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

let pm: PageManager;

test.beforeEach(async ({ page }) => {
    pm = new PageManager(page)
    await page.goto('/')
})
test('Validate specialty update', async ({ page }) => {
  await pm.navigateTo().goToVeterinariansPage()
  await pm.onVeterinariansPage().expectVetToHaveSpecialty('Rafael Ortega', 'surgery')
  await pm.navigateTo().goToSpecialtiesPage()
  await pm.onSpecialtyPage().expectTableHeadingToBe('Specialties')
  await pm.onSpecialtyPage().editSpecialty('surgery')
  await pm.onSpecialtyPage().expectEditSpecialtyForm()
  await pm.onSpecialtyPage().updateSpecialty('dermatology')
  await pm.onSpecialtyPage().expectSpecialtyToBeChanged('surgery', 'dermatology')
  await pm.navigateTo().goToVeterinariansPage()
  await pm.onVeterinariansPage().expectVetToHaveSpecialty('Rafael Ortega', 'dermatology')
  await pm.navigateTo().goToSpecialtiesPage()
  await pm.onSpecialtyPage().editSpecialty('dermatology')
  await pm.onSpecialtyPage().updateSpecialty('surgery')
  await pm.onSpecialtyPage().expectSpecialtyToBeChanged('dermatology', 'surgery')
  await pm.navigateTo().goToVeterinariansPage()
  await pm.onVeterinariansPage().expectVetToHaveSpecialty('Rafael Ortega', 'surgery')
})
test('Validate specialty lists', async ({ page }) => {
  await pm.navigateTo().goToSpecialtiesPage()
  await pm.onSpecialtyPage().addNewSpecialty('oncology')
  const specialtiesListedOnSpecialitiesPage = await pm.onSpecialtyPage().getAllSpecialtyOptions()
  await pm.navigateTo().goToVeterinariansPage()
  await pm.onVeterinariansPage().editVetNamed('Sharon Jenkins')
  await pm.onVetEditPage().openSpecialtyDropdown()
  const specialtiesListedOnVetEditPage = await pm.onVetEditPage().getAllSpecialtyOptions()
  expect(specialtiesListedOnSpecialitiesPage).toEqual(specialtiesListedOnVetEditPage)
  await pm.onVetEditPage().selectAndSaveSpecialty('oncology')
  await pm.onVeterinariansPage().expectVetToHaveSpecialty('Sharon Jenkins', 'oncology')
  await pm.navigateTo().goToSpecialtiesPage()
  await pm.onSpecialtyPage().deleteSpecialty('oncology')
  await pm.navigateTo().goToVeterinariansPage()
  await pm.onVeterinariansPage().expectVetNotToHaveSpecialty('Sharon Jenkins')
})
