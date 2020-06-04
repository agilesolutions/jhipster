import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import EmployeeComponentsPage, { EmployeeDeleteDialog } from './employee.page-object';
import EmployeeUpdatePage from './employee-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../../util/utils';

const expect = chai.expect;

describe('Employee e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeComponentsPage: EmployeeComponentsPage;
  let employeeUpdatePage: EmployeeUpdatePage;
  /* let employeeDeleteDialog: EmployeeDeleteDialog; */
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Employees', async () => {
    await navBarPage.getEntityPage('employee');
    employeeComponentsPage = new EmployeeComponentsPage();
    expect(await employeeComponentsPage.title.getText()).to.match(/Employees/);

    expect(await employeeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([employeeComponentsPage.noRecords, employeeComponentsPage.table]);

    beforeRecordsCount = (await isVisible(employeeComponentsPage.noRecords)) ? 0 : await getRecordsCount(employeeComponentsPage.table);
  });

  it('should load create Employee page', async () => {
    await employeeComponentsPage.createButton.click();
    employeeUpdatePage = new EmployeeUpdatePage();
    expect(await employeeUpdatePage.getPageTitle().getAttribute('id')).to.match(/uiApp.organizationEmployee.home.createOrEditLabel/);
    await employeeUpdatePage.cancel();
  });

  /*  it('should create and save Employees', async () => {
        await employeeComponentsPage.createButton.click();
        await employeeUpdatePage.setCodeInput('code');
        expect(await employeeUpdatePage.getCodeInput()).to.match(/code/);
        await employeeUpdatePage.setFirstNameInput('firstName');
        expect(await employeeUpdatePage.getFirstNameInput()).to.match(/firstName/);
        await employeeUpdatePage.setLastNameInput('lastName');
        expect(await employeeUpdatePage.getLastNameInput()).to.match(/lastName/);
        await employeeUpdatePage.genderSelectLastOption();
        await employeeUpdatePage.setEmailInput('g^[K@,hYGd.\C');
        expect(await employeeUpdatePage.getEmailInput()).to.match(/g^[K@,hYGd.\C/);
        await employeeUpdatePage.setPhoneInput('phone');
        expect(await employeeUpdatePage.getPhoneInput()).to.match(/phone/);
        await employeeUpdatePage.setAddressLine1Input('addressLine1');
        expect(await employeeUpdatePage.getAddressLine1Input()).to.match(/addressLine1/);
        await employeeUpdatePage.setAddressLine2Input('addressLine2');
        expect(await employeeUpdatePage.getAddressLine2Input()).to.match(/addressLine2/);
        await employeeUpdatePage.setCityInput('city');
        expect(await employeeUpdatePage.getCityInput()).to.match(/city/);
        await employeeUpdatePage.setCountryInput('country');
        expect(await employeeUpdatePage.getCountryInput()).to.match(/country/);
        await employeeUpdatePage.departmentSelectLastOption();
        await waitUntilDisplayed(employeeUpdatePage.saveButton);
        await employeeUpdatePage.save();
        await waitUntilHidden(employeeUpdatePage.saveButton);
        expect(await isVisible(employeeUpdatePage.saveButton)).to.be.false;

        expect(await employeeComponentsPage.createButton.isEnabled()).to.be.true;

        await waitUntilDisplayed(employeeComponentsPage.table);

        await waitUntilCount(employeeComponentsPage.records, beforeRecordsCount + 1);
        expect(await employeeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
    }); */

  /*  it('should delete last Employee', async () => {

        const deleteButton = employeeComponentsPage.getDeleteButton(employeeComponentsPage.records.last());
        await click(deleteButton);

        employeeDeleteDialog = new EmployeeDeleteDialog();
        await waitUntilDisplayed(employeeDeleteDialog.deleteModal);
        expect(await employeeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/uiApp.organizationEmployee.delete.question/);
        await employeeDeleteDialog.clickOnConfirmButton();

        await waitUntilHidden(employeeDeleteDialog.deleteModal);

        expect(await isVisible(employeeDeleteDialog.deleteModal)).to.be.false;

        await waitUntilAnyDisplayed([employeeComponentsPage.noRecords,
        employeeComponentsPage.table]);
    
        const afterCount = await isVisible(employeeComponentsPage.noRecords) ? 0 : await getRecordsCount(employeeComponentsPage.table);
        expect(afterCount).to.eq(beforeRecordsCount);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
