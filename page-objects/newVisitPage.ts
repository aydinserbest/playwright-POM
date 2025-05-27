import { expect, Page } from "@playwright/test";

export class NewVisitPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    async headerOfThePageIsVisible(pageHeader: string) {
        await expect(this.page.getByRole('heading', { name: pageHeader })).toBeVisible()
    }
    async openCalendar() {
        await this.page.getByRole('button', { name: 'Open calendar' }).click()
    }
    async selectCurrentDate() {
        await this.openCalendar()
        await this.page.locator('.mat-calendar-body-active').click()
    }
    async selectDateDaysAgo(daysAgo: number) {
        await this.openCalendar()
        const todayDate = new Date()
        const fortyFiveDaysAgoDate = new Date(todayDate)
        fortyFiveDaysAgoDate.setDate(todayDate.getDate() - daysAgo)
        const expectedPastYear = fortyFiveDaysAgoDate.getFullYear()
        const expectedPastMonth = (fortyFiveDaysAgoDate.getMonth() + 1).toString().padStart(2, '0')
        const expectedPastDay = fortyFiveDaysAgoDate.getDate().toString()
        const expectedPastVisitDateDashFormat = `${expectedPastYear}-${expectedPastMonth}-${expectedPastDay}`
        const expectedMonthYearText = `${expectedPastMonth} ${expectedPastYear}`
        let calendarMonthYear = await this.page.getByRole('button', { name: 'Choose month and year' }).textContent()
        while (!calendarMonthYear?.includes(expectedMonthYearText)) {
            await this.page.getByRole('button', { name: 'Previous month' }).click()
            calendarMonthYear = await this.page.locator('.mat-calendar-period-button').textContent()
        }
        await this.page.getByRole('button', { name: expectedPastDay }).click()
    }
    async expectVisitDateToBeToday() {
        const todayDate = new Date()
        const expectedYear = todayDate.getFullYear()
        const expectedMonth = todayDate.toLocaleString('en-US', { month: '2-digit' })
        const expectedDay = todayDate.toLocaleString('en-US', { day: '2-digit' })
        const expectedVisitDateSlashFormat = `${expectedYear}/${expectedMonth}/${expectedDay}`
        await expect(this.page.locator('input[name="date"]')).toHaveValue(expectedVisitDateSlashFormat)
    }
    async addNewVisit(description: string) {
        await this.page.locator('#description').fill(description)
        await this.page.getByRole('button', { name: 'Add Visit' }).click()
    }
}