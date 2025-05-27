import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

let pm: PageManager;

test.beforeEach(async ({ page }) => {
  pm = new PageManager(page)
  await page.goto('/')
  await pm.navigateTo().goToVeterinariansPage()
})
test('Validate selected specialties', async ({ page }) => {
  await pm.onVeterinariansPage().expectTableHeadingToBe('Veterinarians')
  await pm.onVeterinariansPage().editVetNamed('Helen Leary')
  await pm.onVetEditPage().expectSelectedSpecialtiesDisplayed('radiology')
  await pm.onVetEditPage().openSpecialtyDropdown()
  await pm.onVetEditPage().expectSpecialityChecked('radiology')
  await pm.onVetEditPage().expectSpecialtiesUnchecked(['surgery', 'dentistry'])
  await pm.onVetEditPage().checkSpecialty('surgery')
  await pm.onVetEditPage().uncheckSpecialty('radiology')
  await pm.onVetEditPage().expectSelectedSpecialtiesDisplayed('surgery')
  await pm.onVetEditPage().checkSpecialty('dentistry')
  await pm.onVetEditPage().expectSelectedSpecialtiesDisplayed(['surgery', 'dentistry'])
})
test('Select all specialties', async ({ page }) => {
  await pm.onVeterinariansPage().editVetNamed('Rafael Ortega')
  await pm.onVetEditPage().expectSelectedSpecialtiesDisplayed('surgery')
  await pm.onVetEditPage().openSpecialtyDropdown()
  await pm.onVetEditPage().checkAndAssertAllSpecialties()
  await pm.onVetEditPage().expectSelectedSpecialtiesDisplayed(['surgery', 'radiology', 'dentistry'])
})
test('Unselect all specialties', async ({ page }) => {
  await pm.onVeterinariansPage().editVetNamed('Linda Douglas')
  await pm.onVetEditPage().expectSelectedSpecialtiesDisplayed(['dentistry', 'surgery'])
  await pm.onVetEditPage().openSpecialtyDropdown()
  await pm.onVetEditPage().uncheckAndAssertAllSpecialties()
  await pm.onVetEditPage().expectSelectedSpecialtiesDisplayed('')
})


