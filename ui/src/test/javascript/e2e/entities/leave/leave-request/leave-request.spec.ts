import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import LeaveRequestComponentsPage, { LeaveRequestDeleteDialog } from './leave-request.page-object';
import LeaveRequestUpdatePage from './leave-request-update.page-object';
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

describe('LeaveRequest e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let leaveRequestComponentsPage: LeaveRequestComponentsPage;
  let leaveRequestUpdatePage: LeaveRequestUpdatePage;
  let leaveRequestDeleteDialog: LeaveRequestDeleteDialog;
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

  it('should load LeaveRequests', async () => {
    await navBarPage.getEntityPage('leave-request');
    leaveRequestComponentsPage = new LeaveRequestComponentsPage();
    expect(await leaveRequestComponentsPage.title.getText()).to.match(/Leave Requests/);

    expect(await leaveRequestComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([leaveRequestComponentsPage.noRecords, leaveRequestComponentsPage.table]);

    beforeRecordsCount = (await isVisible(leaveRequestComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(leaveRequestComponentsPage.table);
  });

  it('should load create LeaveRequest page', async () => {
    await leaveRequestComponentsPage.createButton.click();
    leaveRequestUpdatePage = new LeaveRequestUpdatePage();
    expect(await leaveRequestUpdatePage.getPageTitle().getAttribute('id')).to.match(/uiApp.leaveLeaveRequest.home.createOrEditLabel/);
    await leaveRequestUpdatePage.cancel();
  });

  it('should create and save LeaveRequests', async () => {
    await leaveRequestComponentsPage.createButton.click();
    await leaveRequestUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await leaveRequestUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30');
    await leaveRequestUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await leaveRequestUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30');
    await leaveRequestUpdatePage.setCreationDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await leaveRequestUpdatePage.getCreationDateInput()).to.contain('2001-01-01T02:30');
    await leaveRequestUpdatePage.setDepartmentCodeInput('departmentCode');
    expect(await leaveRequestUpdatePage.getDepartmentCodeInput()).to.match(/departmentCode/);
    await leaveRequestUpdatePage.setEmployeeCodeInput('employeeCode');
    expect(await leaveRequestUpdatePage.getEmployeeCodeInput()).to.match(/employeeCode/);
    await leaveRequestUpdatePage.setWorkingDaysInput('5');
    expect(await leaveRequestUpdatePage.getWorkingDaysInput()).to.eq('5');
    await leaveRequestUpdatePage.setDescriptionInput('description');
    expect(await leaveRequestUpdatePage.getDescriptionInput()).to.match(/description/);
    await leaveRequestUpdatePage.leaveTypeSelectLastOption();
    await leaveRequestUpdatePage.statusSelectLastOption();
    await waitUntilDisplayed(leaveRequestUpdatePage.saveButton);
    await leaveRequestUpdatePage.save();
    await waitUntilHidden(leaveRequestUpdatePage.saveButton);
    expect(await isVisible(leaveRequestUpdatePage.saveButton)).to.be.false;

    expect(await leaveRequestComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(leaveRequestComponentsPage.table);

    await waitUntilCount(leaveRequestComponentsPage.records, beforeRecordsCount + 1);
    expect(await leaveRequestComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last LeaveRequest', async () => {
    const deleteButton = leaveRequestComponentsPage.getDeleteButton(leaveRequestComponentsPage.records.last());
    await click(deleteButton);

    leaveRequestDeleteDialog = new LeaveRequestDeleteDialog();
    await waitUntilDisplayed(leaveRequestDeleteDialog.deleteModal);
    expect(await leaveRequestDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/uiApp.leaveLeaveRequest.delete.question/);
    await leaveRequestDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(leaveRequestDeleteDialog.deleteModal);

    expect(await isVisible(leaveRequestDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([leaveRequestComponentsPage.noRecords, leaveRequestComponentsPage.table]);

    const afterCount = (await isVisible(leaveRequestComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(leaveRequestComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
