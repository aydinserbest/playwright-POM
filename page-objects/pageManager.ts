import { Page } from '@playwright/test'
import { NavigationPage } from './navigationPage'
import { OwnersSearchPage } from './ownersSearchPage'
import { OwnerInformationPage } from './ownerInformationPage'
import { PetDetailsPage } from './petDetailsPage'
import { VeterinariansPage } from './veterinariansPage'
import { SpecialitiesPage } from './specialtiesPage'
import { VetEditPage } from './vetEditPage'
import { PetTypesPage } from './petTypesPage'
import { AddPetPage } from './addPetPage'
import { NewVisitPage } from './newVisitPage'

export class PageManager {
  private readonly page: Page

  private readonly navigationPage: NavigationPage
  private readonly ownersSearchPage: OwnersSearchPage
  private readonly ownerInformationPage: OwnerInformationPage
  private readonly petDetailsPage: PetDetailsPage
  private readonly petTypesPage: PetTypesPage
  private readonly veterinariansPage: VeterinariansPage
  private readonly specialtyPage: SpecialitiesPage
  private readonly vetEditPage: VetEditPage
  private readonly addPetPage: AddPetPage
  private readonly newVisitPage: NewVisitPage

  constructor(page: Page) {
    this.page = page
    this.navigationPage = new NavigationPage(this.page)
    this.ownersSearchPage = new OwnersSearchPage(this.page)
    this.ownerInformationPage = new OwnerInformationPage(this.page)
    this.petDetailsPage = new PetDetailsPage(this.page)
    this.petTypesPage = new PetTypesPage(this.page)
    this.veterinariansPage = new VeterinariansPage(this.page)
    this.specialtyPage = new SpecialitiesPage(this.page)
    this.vetEditPage = new VetEditPage(this.page)
    this.addPetPage = new AddPetPage(this.page)
    this.newVisitPage = new NewVisitPage(this.page)
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
  onPetTypesPage() {
    return this.petTypesPage
  }
  onPetDetailsPage() {
    return this.petDetailsPage
  }
  onVeterinariansPage() {
    return this.veterinariansPage
  }
  onSpecialtyPage() {
    return this.specialtyPage
  }
  onVetEditPage() {
    return this.vetEditPage
  }
  onAddPetPage() {
    return this.addPetPage
  }
  onNewVisitPage() {
    return this.newVisitPage
  }
}