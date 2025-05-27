import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

let pm: PageManager;

test.beforeEach(async ({ page }) => {
    pm = new PageManager(page)
    await page.goto('/')
    await pm.navigateTo().goToPetTypesPage()
    await pm.onOwnersSearchPage().expectTableHeadingToBe('Pet Types')
})
test('Update pet type', async () => {
    await pm.onPetTypesPage().editPetNamed('cat')
    await pm.onPetTypesPage().expectEditPetTypeHeaderVisible()
    await pm.onPetTypesPage().changePetTypeTo('rabbit')
    await pm.onPetTypesPage().expectFirstPetTypeToBe('rabbit')
    await pm.onPetTypesPage().editPetNamed('rabbit')
    await pm.onPetTypesPage().changePetTypeTo('cat')
    await pm.onPetTypesPage().expectFirstPetTypeToBe('cat')
})
test('Cancel pet type update', async () => {
    await pm.onPetTypesPage().editPetNamed('dog')
    await pm.onPetTypesPage().fillPetTypeInput('moose')
    await pm.onPetTypesPage().expectPetTypeInputToHaveValue('moose')
    await pm.onPetTypesPage().clickOnCancelButton()
    await pm.onPetTypesPage().expectPetTypeToExistInList('dog')

})
test('Pet type name is required validation', async () => {
    await pm.onPetTypesPage().editPetNamed('lizard')
    await pm.onPetTypesPage().clearPetTypeInput()
    await pm.onPetTypesPage().expectNameRequiredValidationVisible()
    await pm.onPetTypesPage().clickOnUpdateButton()
    await pm.onPetTypesPage().expectEditPetTypeHeaderVisible()
    await pm.onPetTypesPage().clickOnCancelButton()
    await pm.onPetTypesPage().expectPetTypesHeading('Pet Types')
})
test('Add and delete pet type', async () => {
    await pm.onPetTypesPage().clickOnAddButton()
    await pm.onPetTypesPage().expectAddPetTypeFormVisible()
    await pm.onPetTypesPage().addNewPetType('pig')
    await pm.onPetTypesPage().expectLastPetTypeToBe('pig')
    await pm.onPetTypesPage().deletePetTypeByName('pig')
    await pm.onPetTypesPage().expectLastPetTypeNotToBe('pig')
})
