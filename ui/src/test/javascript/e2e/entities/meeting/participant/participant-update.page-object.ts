import { element, by, ElementFinder } from 'protractor';

export default class ParticipantUpdatePage {
  pageTitle: ElementFinder = element(by.id('uiApp.meetingParticipant.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  emailInput: ElementFinder = element(by.css('input#participant-email'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
