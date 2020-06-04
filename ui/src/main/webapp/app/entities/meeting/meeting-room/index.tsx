import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MeetingRoom from './meeting-room';
import MeetingRoomDetail from './meeting-room-detail';
import MeetingRoomUpdate from './meeting-room-update';
import MeetingRoomDeleteDialog from './meeting-room-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MeetingRoomDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MeetingRoomUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MeetingRoomUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MeetingRoomDetail} />
      <ErrorBoundaryRoute path={match.url} component={MeetingRoom} />
    </Switch>
  </>
);

export default Routes;
