import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import ParticipantComponentsPage, { ParticipantDeleteDialog } from './participant.page-object';
import ParticipantUpdatePage from './participant-update.page-object';
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

describe('Participant e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let participantComponentsPage: ParticipantComponentsPage;
  let participantUpdatePage: ParticipantUpdatePage;
  let participantDeleteDialog: ParticipantDeleteDialog;
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

  it('should load Participants', async () => {
    await navBarPage.getEntityPage('participant');
    participantComponentsPage = new ParticipantComponentsPage();
    expect(await participantComponentsPage.title.getText()).to.match(/Participants/);

    expect(await participantComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([participantComponentsPage.noRecords, participantComponentsPage.table]);

    beforeRecordsCount = (await isVisible(participantComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(participantComponentsPage.table);
  });

  it('should load create Participant page', async () => {
    await participantComponentsPage.createButton.click();
    participantUpdatePage = new ParticipantUpdatePage();
    expect(await participantUpdatePage.getPageTitle().getAttribute('id')).to.match(/uiApp.meetingParticipant.home.createOrEditLabel/);
    await participantUpdatePage.cancel();
  });

  it('should create and save Participants', async () => {
    await participantComponentsPage.createButton.click();
    await participantUpdatePage.setEmailInput('email');
    expect(await participantUpdatePage.getEmailInput()).to.match(/email/);
    await waitUntilDisplayed(participantUpdatePage.saveButton);
    await participantUpdatePage.save();
    await waitUntilHidden(participantUpdatePage.saveButton);
    expect(await isVisible(participantUpdatePage.saveButton)).to.be.false;

    expect(await participantComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(participantComponentsPage.table);

    await waitUntilCount(participantComponentsPage.records, beforeRecordsCount + 1);
    expect(await participantComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Participant', async () => {
    const deleteButton = participantComponentsPage.getDeleteButton(participantComponentsPage.records.last());
    await click(deleteButton);

    participantDeleteDialog = new ParticipantDeleteDialog();
    await waitUntilDisplayed(participantDeleteDialog.deleteModal);
    expect(await participantDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/uiApp.meetingParticipant.delete.question/);
    await participantDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(participantDeleteDialog.deleteModal);

    expect(await isVisible(participantDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([participantComponentsPage.noRecords, participantComponentsPage.table]);

    const afterCount = (await isVisible(participantComponentsPage.noRecords)) ? 0 : await getRecordsCount(participantComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
