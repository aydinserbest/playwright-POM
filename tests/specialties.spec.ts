import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

let pm: PageManager;

test.beforeEach(async ({ page }) => {
    pm = new PageManager(page)

    await page.goto('/')
    await pm.navigateTo().goToPetTypesPage()
    await pm.onOwnersSearchPage().expectTableHeadingToBe('Pet Types')
})