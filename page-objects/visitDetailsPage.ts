import { Page } from '@playwright/test';

export class VisitDetailsPage  {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
}