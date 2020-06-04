import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Meeting from './meeting';
import MeetingDetail from './meeting-detail';
import MeetingUpdate from './meeting-update';
import MeetingDeleteDialog from './meeting-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MeetingDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MeetingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MeetingUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MeetingDetail} />
      <ErrorBoundaryRoute path={match.url} component={Meeting} />
    </Switch>
  </>
);

export default Routes;
