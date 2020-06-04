import { element, by, ElementFinder } from 'protractor';

export default class EmployeeLeaveUpdatePage {
  pageTitle: ElementFinder = element(by.id('uiApp.leaveEmployeeLeave.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  employeeCodeInput: ElementFinder = element(by.css('input#employee-leave-employeeCode'));
  totalInput: ElementFinder = element(by.css('input#employee-leave-total'));
  availableInput: ElementFinder = element(by.css('input#employee-leave-available'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEmployeeCodeInput(employeeCode) {
    await this.employeeCodeInput.sendKeys(employeeCode);
  }

  async getEmployeeCodeInput() {
    return this.employeeCodeInput.getAttribute('value');
  }

  async setTotalInput(total) {
    await this.totalInput.sendKeys(total);
  }

  async getTotalInput() {
    return this.totalInput.getAttribute('value');
  }

  async setAvailableInput(available) {
    await this.availableInput.sendKeys(available);
  }

  async getAvailableInput() {
    return this.availableInput.getAttribute('value');
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
