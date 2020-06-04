import { element, by, ElementFinder } from 'protractor';

export default class LeaveRequestUpdatePage {
  pageTitle: ElementFinder = element(by.id('uiApp.leaveLeaveRequest.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  startDateInput: ElementFinder = element(by.css('input#leave-request-startDate'));
  endDateInput: ElementFinder = element(by.css('input#leave-request-endDate'));
  creationDateInput: ElementFinder = element(by.css('input#leave-request-creationDate'));
  departmentCodeInput: ElementFinder = element(by.css('input#leave-request-departmentCode'));
  employeeCodeInput: ElementFinder = element(by.css('input#leave-request-employeeCode'));
  workingDaysInput: ElementFinder = element(by.css('input#leave-request-workingDays'));
  descriptionInput: ElementFinder = element(by.css('input#leave-request-description'));
  leaveTypeSelect: ElementFinder = element(by.css('select#leave-request-leaveType'));
  statusSelect: ElementFinder = element(by.css('select#leave-request-status'));

  getPageTitle() {
    return this.pageTitle;
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

  async setCreationDateInput(creationDate) {
    await this.creationDateInput.sendKeys(creationDate);
  }

  async getCreationDateInput() {
    return this.creationDateInput.getAttribute('value');
  }

  async setDepartmentCodeInput(departmentCode) {
    await this.departmentCodeInput.sendKeys(departmentCode);
  }

  async getDepartmentCodeInput() {
    return this.departmentCodeInput.getAttribute('value');
  }

  async setEmployeeCodeInput(employeeCode) {
    await this.employeeCodeInput.sendKeys(employeeCode);
  }

  async getEmployeeCodeInput() {
    return this.employeeCodeInput.getAttribute('value');
  }

  async setWorkingDaysInput(workingDays) {
    await this.workingDaysInput.sendKeys(workingDays);
  }

  async getWorkingDaysInput() {
    return this.workingDaysInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setLeaveTypeSelect(leaveType) {
    await this.leaveTypeSelect.sendKeys(leaveType);
  }

  async getLeaveTypeSelect() {
    return this.leaveTypeSelect.element(by.css('option:checked')).getText();
  }

  async leaveTypeSelectLastOption() {
    await this.leaveTypeSelect.all(by.tagName('option')).last().click();
  }
  async setStatusSelect(status) {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect() {
    return this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption() {
    await this.statusSelect.all(by.tagName('option')).last().click();
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
