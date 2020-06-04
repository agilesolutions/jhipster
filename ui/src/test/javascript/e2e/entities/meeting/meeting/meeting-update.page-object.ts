import { element, by, ElementFinder } from 'protractor';

export default class MeetingUpdatePage {
  pageTitle: ElementFinder = element(by.id('uiApp.meetingMeeting.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#meeting-title'));
  descriptionInput: ElementFinder = element(by.css('input#meeting-description'));
  startDateInput: ElementFinder = element(by.css('input#meeting-startDate'));
  endDateInput: ElementFinder = element(by.css('input#meeting-endDate'));
  meetingRoomSelect: ElementFinder = element(by.css('select#meeting-meetingRoom'));
  participantSelect: ElementFinder = element(by.css('select#meeting-participant'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate) {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput() {
    return this.endDateInput.getAttribute('value');
  }

  async meetingRoomSelectLastOption() {
    await this.meetingRoomSelect.all(by.tagName('option')).last().click();
  }

  async meetingRoomSelectOption(option) {
    await this.meetingRoomSelect.sendKeys(option);
  }

  getMeetingRoomSelect() {
    return this.meetingRoomSelect;
  }

  async getMeetingRoomSelectedOption() {
    return this.meetingRoomSelect.element(by.css('option:checked')).getText();
  }

  async participantSelectLastOption() {
    await this.participantSelect.all(by.tagName('option')).last().click();
  }

  async participantSelectOption(option) {
    await this.participantSelect.sendKeys(option);
  }

  getParticipantSelect() {
    return this.participantSelect;
  }

  async getParticipantSelectedOption() {
    return this.participantSelect.element(by.css('option:checked')).getText();
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
