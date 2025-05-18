import { Page } from '@playwright/test'
import { NavigationPage } from './navigationPage'
import { OwnersSearchPage } from './ownersSearchPage'
import { OwnerInformationPage } from './ownerInformationPage'
import { PetDetailsPage } from './petDetailsPage'
import { VisitDetailsPage } from './visitDetailsPage'

export class PageManager {
  private readonly page: Page

  private readonly navigationPage: NavigationPage
  private readonly ownersSearchPage: OwnersSearchPage
  private readonly ownerInformationPage: OwnerInformationPage
  private readonly petDetailsPage: PetDetailsPage
  private readonly visitDetailsPage: VisitDetailsPage

  constructor(page: Page) {
    this.page = page
    this.navigationPage = new NavigationPage(this.page)
    this.ownersSearchPage = new OwnersSearchPage(this.page)
    this.ownerInformationPage = new OwnerInformationPage(this.page)
    this.petDetailsPage = new PetDetailsPage(this.page)
    this.visitDetailsPage = new VisitDetailsPage(this.page)
  }

  navigateTo() {
    return this.navigationPage
  }

  onOwnersSearchPage() {
    return this.ownersSearchPage
  }

  onOwnerInformationPage() {
    return this.ownerInformationPage
  }

  onPetDetailsPage() {
    return this.petDetailsPage
  }

  onVisitDetailsPage() {
    return this.visitDetailsPage
  }
}