import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import MeetingComponentsPage, { MeetingDeleteDialog } from './meeting.page-object';
import MeetingUpdatePage from './meeting-update.page-object';
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

describe('Meeting e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let meetingComponentsPage: MeetingComponentsPage;
  let meetingUpdatePage: MeetingUpdatePage;
  /* let meetingDeleteDialog: MeetingDeleteDialog; */
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

  it('should load Meetings', async () => {
    await navBarPage.getEntityPage('meeting');
    meetingComponentsPage = new MeetingComponentsPage();
    expect(await meetingComponentsPage.title.getText()).to.match(/Meetings/);

    expect(await meetingComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([meetingComponentsPage.noRecords, meetingComponentsPage.table]);

    beforeRecordsCount = (await isVisible(meetingComponentsPage.noRecords)) ? 0 : await getRecordsCount(meetingComponentsPage.table);
  });

  it('should load create Meeting page', async () => {
    await meetingComponentsPage.createButton.click();
    meetingUpdatePage = new MeetingUpdatePage();
    expect(await meetingUpdatePage.getPageTitle().getAttribute('id')).to.match(/uiApp.meetingMeeting.home.createOrEditLabel/);
    await meetingUpdatePage.cancel();
  });

  /*  it('should create and save Meetings', async () => {
        await meetingComponentsPage.createButton.click();
        await meetingUpdatePage.setTitleInput('title');
        expect(await meetingUpdatePage.getTitleInput()).to.match(/title/);
        await meetingUpdatePage.setDescriptionInput('description');
        expect(await meetingUpdatePage.getDescriptionInput()).to.match(/description/);
        await meetingUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await meetingUpdatePage.getStartDateInput()).to.contain('2001-01-01T02:30');
        await meetingUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
        expect(await meetingUpdatePage.getEndDateInput()).to.contain('2001-01-01T02:30');
        await meetingUpdatePage.meetingRoomSelectLastOption();
        // meetingUpdatePage.participantSelectLastOption();
        await waitUntilDisplayed(meetingUpdatePage.saveButton);
        await meetingUpdatePage.save();
        await waitUntilHidden(meetingUpdatePage.saveButton);
        expect(await isVisible(meetingUpdatePage.saveButton)).to.be.false;

        expect(await meetingComponentsPage.createButton.isEnabled()).to.be.true;

        await waitUntilDisplayed(meetingComponentsPage.table);

        await waitUntilCount(meetingComponentsPage.records, beforeRecordsCount + 1);
        expect(await meetingComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
    }); */

  /*  it('should delete last Meeting', async () => {

        const deleteButton = meetingComponentsPage.getDeleteButton(meetingComponentsPage.records.last());
        await click(deleteButton);

        meetingDeleteDialog = new MeetingDeleteDialog();
        await waitUntilDisplayed(meetingDeleteDialog.deleteModal);
        expect(await meetingDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/uiApp.meetingMeeting.delete.question/);
        await meetingDeleteDialog.clickOnConfirmButton();

        await waitUntilHidden(meetingDeleteDialog.deleteModal);

        expect(await isVisible(meetingDeleteDialog.deleteModal)).to.be.false;

        await waitUntilAnyDisplayed([meetingComponentsPage.noRecords,
        meetingComponentsPage.table]);
    
        const afterCount = await isVisible(meetingComponentsPage.noRecords) ? 0 : await getRecordsCount(meetingComponentsPage.table);
        expect(afterCount).to.eq(beforeRecordsCount);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
