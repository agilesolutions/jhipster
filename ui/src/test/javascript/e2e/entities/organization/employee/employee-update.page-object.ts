import { element, by, ElementFinder } from 'protractor';

export default class EmployeeUpdatePage {
  pageTitle: ElementFinder = element(by.id('uiApp.organizationEmployee.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#employee-code'));
  firstNameInput: ElementFinder = element(by.css('input#employee-firstName'));
  lastNameInput: ElementFinder = element(by.css('input#employee-lastName'));
  genderSelect: ElementFinder = element(by.css('select#employee-gender'));
  emailInput: ElementFinder = element(by.css('input#employee-email'));
  phoneInput: ElementFinder = element(by.css('input#employee-phone'));
  addressLine1Input: ElementFinder = element(by.css('input#employee-addressLine1'));
  addressLine2Input: ElementFinder = element(by.css('input#employee-addressLine2'));
  cityInput: ElementFinder = element(by.css('input#employee-city'));
  countryInput: ElementFinder = element(by.css('input#employee-country'));
  departmentSelect: ElementFinder = element(by.css('select#employee-department'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return this.firstNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return this.lastNameInput.getAttribute('value');
  }

  async setGenderSelect(gender) {
    await this.genderSelect.sendKeys(gender);
  }

  async getGenderSelect() {
    return this.genderSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption() {
    await this.genderSelect.all(by.tagName('option')).last().click();
  }
  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return this.phoneInput.getAttribute('value');
  }

  async setAddressLine1Input(addressLine1) {
    await this.addressLine1Input.sendKeys(addressLine1);
  }

  async getAddressLine1Input() {
    return this.addressLine1Input.getAttribute('value');
  }

  async setAddressLine2Input(addressLine2) {
    await this.addressLine2Input.sendKeys(addressLine2);
  }

  async getAddressLine2Input() {
    return this.addressLine2Input.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return this.cityInput.getAttribute('value');
  }

  async setCountryInput(country) {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput() {
    return this.countryInput.getAttribute('value');
  }

  async departmentSelectLastOption() {
    await this.departmentSelect.all(by.tagName('option')).last().click();
  }

  async departmentSelectOption(option) {
    await this.departmentSelect.sendKeys(option);
  }

  getDepartmentSelect() {
    return this.departmentSelect;
  }

  async getDepartmentSelectedOption() {
    return this.departmentSelect.element(by.css('option:checked')).getText();
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
