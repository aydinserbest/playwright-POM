import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

let pm: PageManager;

test.beforeEach(async ({ page }) => {
  pm = new PageManager(page)
  await page.goto('/')
  await pm.navigateTo().goToOwnersSearchPage()
  await pm.onOwnersSearchPage().expectTableHeadingToBe('Owners')
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
  await pm.onOwnersSearchPage().expectOwnerToBeFromCity('Jeff Black', 'Monona')
  await pm.onOwnersSearchPage().expectOwnerToHavePet('Jeff Black', 'Lucky')
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
test('Validate phone number and pet name on the Owner Information page', async ({ page }) => {
  const petName = await pm.onOwnersSearchPage().getPetNameByPhoneNumber('6085552765')
  await pm.onOwnersSearchPage().selectOwnerByPhone('6085552765')
  await pm.onOwnerInformationPage().expectPhoneNumberToBe('6085552765')
  await pm.onOwnerInformationPage().expectPetNameToBe(petName)
})
test('Validate pets of the Madison city', async ({ page }) => {
  await pm.onOwnersSearchPage().expectPetNamesForCityToBe('Madison', ['Leo', 'George', 'Mulligan', 'Freddy'])
})
test('Select the desired date in the calendar', async ({ page }) => {
  await pm.onOwnersSearchPage().selectOwnerByName('Harold Davis')
  await pm.onOwnerInformationPage().clickOnAddNewPetButton()
  await pm.onAddPetPage().addNewPet('Tom')
  await pm.onAddPetPage().expectNewPetNameIconToBeValid()
  await pm.onAddPetPage().selectBirthDate('2014/05/02')
  await pm.onAddPetPage().expectBirthDateValue('2014/05/02')
  await pm.onAddPetPage().selectPetType('dog')
  await pm.onOwnerInformationPage().expectPetDetails('Tom', '2014-05-02', 'dog')
  await pm.onOwnerInformationPage().deletePetByName('Tom')
  await pm.onOwnerInformationPage().expectPetToBeDeleted('Tom')
})
test('Select the dates of visits and validate dates order', async ({ page }) => {
  await pm.onOwnersSearchPage().selectOwnerByName('Jean Coleman')
  await pm.onOwnerInformationPage().clickOnAddNewVisitButton('Samantha')
  await pm.onNewVisitPage().headerOfThePageIsVisible('New Visit')
  await pm.onNewVisitPage().selectCurrentDate()
  await pm.onNewVisitPage().expectVisitDateToBeToday()
  await pm.onNewVisitPage().addNewVisit('dermatologists visit')
  await pm.onOwnerInformationPage().verifyVisitIsListedWithTodayDate()
  await pm.onOwnerInformationPage().clickOnAddNewVisitButton('Samantha')
  await pm.onNewVisitPage().selectDateDaysAgo(45)
  await pm.onNewVisitPage().addNewVisit('massage therapy')
  await pm.onOwnerInformationPage().expectVisitsAreSortedByDateDescending('Samantha',
    ['dermatologists visit', 'massage therapy']
  )
  await pm.onOwnerInformationPage().deleteVisitByDescription('dermatologists visit');
  await pm.onOwnerInformationPage().expectVisitNotVisibleByDescription('dermatologists visit');
  await pm.onOwnerInformationPage().deleteVisitByDescription('massage therapy');
  await pm.onOwnerInformationPage().expectVisitNotVisibleByDescription('massage therapy');
})
