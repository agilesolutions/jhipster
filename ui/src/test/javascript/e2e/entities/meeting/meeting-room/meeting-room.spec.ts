import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import MeetingRoomComponentsPage, { MeetingRoomDeleteDialog } from './meeting-room.page-object';
import MeetingRoomUpdatePage from './meeting-room-update.page-object';
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

describe('MeetingRoom e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let meetingRoomComponentsPage: MeetingRoomComponentsPage;
  let meetingRoomUpdatePage: MeetingRoomUpdatePage;
  let meetingRoomDeleteDialog: MeetingRoomDeleteDialog;
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

  it('should load MeetingRooms', async () => {
    await navBarPage.getEntityPage('meeting-room');
    meetingRoomComponentsPage = new MeetingRoomComponentsPage();
    expect(await meetingRoomComponentsPage.title.getText()).to.match(/Meeting Rooms/);

    expect(await meetingRoomComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([meetingRoomComponentsPage.noRecords, meetingRoomComponentsPage.table]);

    beforeRecordsCount = (await isVisible(meetingRoomComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(meetingRoomComponentsPage.table);
  });

  it('should load create MeetingRoom page', async () => {
    await meetingRoomComponentsPage.createButton.click();
    meetingRoomUpdatePage = new MeetingRoomUpdatePage();
    expect(await meetingRoomUpdatePage.getPageTitle().getAttribute('id')).to.match(/uiApp.meetingMeetingRoom.home.createOrEditLabel/);
    await meetingRoomUpdatePage.cancel();
  });

  it('should create and save MeetingRooms', async () => {
    await meetingRoomComponentsPage.createButton.click();
    await meetingRoomUpdatePage.setCodeInput('code');
    expect(await meetingRoomUpdatePage.getCodeInput()).to.match(/code/);
    await meetingRoomUpdatePage.setLocationInput('location');
    expect(await meetingRoomUpdatePage.getLocationInput()).to.match(/location/);
    await meetingRoomUpdatePage.setNameInput('name');
    expect(await meetingRoomUpdatePage.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(meetingRoomUpdatePage.saveButton);
    await meetingRoomUpdatePage.save();
    await waitUntilHidden(meetingRoomUpdatePage.saveButton);
    expect(await isVisible(meetingRoomUpdatePage.saveButton)).to.be.false;

    expect(await meetingRoomComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(meetingRoomComponentsPage.table);

    await waitUntilCount(meetingRoomComponentsPage.records, beforeRecordsCount + 1);
    expect(await meetingRoomComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last MeetingRoom', async () => {
    const deleteButton = meetingRoomComponentsPage.getDeleteButton(meetingRoomComponentsPage.records.last());
    await click(deleteButton);

    meetingRoomDeleteDialog = new MeetingRoomDeleteDialog();
    await waitUntilDisplayed(meetingRoomDeleteDialog.deleteModal);
    expect(await meetingRoomDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/uiApp.meetingMeetingRoom.delete.question/);
    await meetingRoomDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(meetingRoomDeleteDialog.deleteModal);

    expect(await isVisible(meetingRoomDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([meetingRoomComponentsPage.noRecords, meetingRoomComponentsPage.table]);

    const afterCount = (await isVisible(meetingRoomComponentsPage.noRecords)) ? 0 : await getRecordsCount(meetingRoomComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
