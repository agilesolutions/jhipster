import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Employee from './organization/employee';
import Department from './organization/department';
import EmployeeLeave from './leave/employee-leave';
import LeaveRequest from './leave/leave-request';
import Notification from './notification/notification';
import MeetingRoom from './meeting/meeting-room';
import Participant from './meeting/participant';
import Meeting from './meeting/meeting';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}employee`} component={Employee} />
      <ErrorBoundaryRoute path={`${match.url}department`} component={Department} />
      <ErrorBoundaryRoute path={`${match.url}employee-leave`} component={EmployeeLeave} />
      <ErrorBoundaryRoute path={`${match.url}leave-request`} component={LeaveRequest} />
      <ErrorBoundaryRoute path={`${match.url}notification`} component={Notification} />
      <ErrorBoundaryRoute path={`${match.url}meeting-room`} component={MeetingRoom} />
      <ErrorBoundaryRoute path={`${match.url}participant`} component={Participant} />
      <ErrorBoundaryRoute path={`${match.url}meeting`} component={Meeting} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
