import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import EmployeeLeaveComponentsPage, { EmployeeLeaveDeleteDialog } from './employee-leave.page-object';
import EmployeeLeaveUpdatePage from './employee-leave-update.page-object';
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

describe('EmployeeLeave e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeLeaveComponentsPage: EmployeeLeaveComponentsPage;
  let employeeLeaveUpdatePage: EmployeeLeaveUpdatePage;
  let employeeLeaveDeleteDialog: EmployeeLeaveDeleteDialog;
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

  it('should load EmployeeLeaves', async () => {
    await navBarPage.getEntityPage('employee-leave');
    employeeLeaveComponentsPage = new EmployeeLeaveComponentsPage();
    expect(await employeeLeaveComponentsPage.title.getText()).to.match(/Employee Leaves/);

    expect(await employeeLeaveComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([employeeLeaveComponentsPage.noRecords, employeeLeaveComponentsPage.table]);

    beforeRecordsCount = (await isVisible(employeeLeaveComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(employeeLeaveComponentsPage.table);
  });

  it('should load create EmployeeLeave page', async () => {
    await employeeLeaveComponentsPage.createButton.click();
    employeeLeaveUpdatePage = new EmployeeLeaveUpdatePage();
    expect(await employeeLeaveUpdatePage.getPageTitle().getAttribute('id')).to.match(/uiApp.leaveEmployeeLeave.home.createOrEditLabel/);
    await employeeLeaveUpdatePage.cancel();
  });

  it('should create and save EmployeeLeaves', async () => {
    await employeeLeaveComponentsPage.createButton.click();
    await employeeLeaveUpdatePage.setEmployeeCodeInput('employeeCode');
    expect(await employeeLeaveUpdatePage.getEmployeeCodeInput()).to.match(/employeeCode/);
    await employeeLeaveUpdatePage.setTotalInput('5');
    expect(await employeeLeaveUpdatePage.getTotalInput()).to.eq('5');
    await employeeLeaveUpdatePage.setAvailableInput('5');
    expect(await employeeLeaveUpdatePage.getAvailableInput()).to.eq('5');
    await waitUntilDisplayed(employeeLeaveUpdatePage.saveButton);
    await employeeLeaveUpdatePage.save();
    await waitUntilHidden(employeeLeaveUpdatePage.saveButton);
    expect(await isVisible(employeeLeaveUpdatePage.saveButton)).to.be.false;

    expect(await employeeLeaveComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(employeeLeaveComponentsPage.table);

    await waitUntilCount(employeeLeaveComponentsPage.records, beforeRecordsCount + 1);
    expect(await employeeLeaveComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last EmployeeLeave', async () => {
    const deleteButton = employeeLeaveComponentsPage.getDeleteButton(employeeLeaveComponentsPage.records.last());
    await click(deleteButton);

    employeeLeaveDeleteDialog = new EmployeeLeaveDeleteDialog();
    await waitUntilDisplayed(employeeLeaveDeleteDialog.deleteModal);
    expect(await employeeLeaveDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/uiApp.leaveEmployeeLeave.delete.question/);
    await employeeLeaveDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(employeeLeaveDeleteDialog.deleteModal);

    expect(await isVisible(employeeLeaveDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([employeeLeaveComponentsPage.noRecords, employeeLeaveComponentsPage.table]);

    const afterCount = (await isVisible(employeeLeaveComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(employeeLeaveComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
