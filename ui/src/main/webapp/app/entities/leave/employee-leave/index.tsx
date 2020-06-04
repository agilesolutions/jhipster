import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmployeeLeave from './employee-leave';
import EmployeeLeaveDetail from './employee-leave-detail';
import EmployeeLeaveUpdate from './employee-leave-update';
import EmployeeLeaveDeleteDialog from './employee-leave-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmployeeLeaveDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmployeeLeaveUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmployeeLeaveUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmployeeLeaveDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmployeeLeave} />
    </Switch>
  </>
);

export default Routes;
