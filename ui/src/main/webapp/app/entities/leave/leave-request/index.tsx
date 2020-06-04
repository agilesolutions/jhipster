import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LeaveRequest from './leave-request';
import LeaveRequestDetail from './leave-request-detail';
import LeaveRequestUpdate from './leave-request-update';
import LeaveRequestDeleteDialog from './leave-request-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LeaveRequestDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LeaveRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LeaveRequestUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LeaveRequestDetail} />
      <ErrorBoundaryRoute path={match.url} component={LeaveRequest} />
    </Switch>
  </>
);

export default Routes;
