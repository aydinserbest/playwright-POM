import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

let pm: PageManager;

test.beforeEach(async ({ page }) => {
  pm = new PageManager(page)

  await page.goto('/')
  await pm.navigateTo().goToOwnersSearchPage()
  await pm.onOwnersSearchPage().expectOwnersHeading()
})

test('Validate selected pet types from the list', async ({ page }) => {
  await pm.onOwnersSearchPage().selectOwnerByName('George Franklin')
  await pm.onOwnerInformationPage().expectOwnerNameToBe('George Franklin')
  await pm.onOwnerInformationPage().editPetNamed('Leo')
  await pm.onPetDetailsPage().expectPetDetailsHeading()
  await pm.onPetDetailsPage().expectOwnerNameToBe('George Franklin')
  await pm.onPetDetailsPage().expectPetTypeToBe('cat')
  await pm.onPetDetailsPage().verifyAllPetTypesSelectableAndDisplayedCorrectly();
})

test('Validate the pet type update', async ({ page }) => {
  await pm.onOwnersSearchPage().selectOwnerByName('Eduardo Rodriquez')
  await pm.onOwnerInformationPage().editPetNamed('Rosy')
  await pm.onPetDetailsPage().updatePetTypeTo('bird')
  await pm.onOwnerInformationPage().expectPetTypeToBe('Rosy', 'bird')

  await pm.onOwnerInformationPage().editPetNamed('Rosy')
  await pm.onPetDetailsPage().updatePetTypeTo('dog')
  await pm.onOwnerInformationPage().expectPetTypeToBe('Rosy', 'dog')
})
test('Validate the pet name city of the owner', async ({ page }) => {
  const ownerRow = await pm.onOwnersSearchPage().getOwnerRowByName('Jeff Black')
  await pm.onOwnersSearchPage().expectOwnersInCityToBe(ownerRow, 'Monona')
  await pm.onOwnersSearchPage().expectOwnerToHavePet(ownerRow, 'Lucky')
})
test('Validate owners count of the Madison city', async ({ page }) => {
  await pm.onOwnersSearchPage().expectOwnerCountInCity('Madison', 4)
})
test('Validate search by Last Name', async ({ page }) => {
  await pm.onOwnersSearchPage().validateLastNameSearchResults('Black');
  await pm.onOwnersSearchPage().validateLastNameSearchResults('Davis');
  await pm.onOwnersSearchPage().validateLastNameSearchResults('Es');
  await pm.onOwnersSearchPage().validateLastNameSearchResults('Playwright');
})
