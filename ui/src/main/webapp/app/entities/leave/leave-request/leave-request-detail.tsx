import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './leave-request.reducer';
import { ILeaveRequest } from 'app/shared/model/leave/leave-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILeaveRequestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LeaveRequestDetail = (props: ILeaveRequestDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { leaveRequestEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="uiApp.leaveLeaveRequest.detail.title">LeaveRequest</Translate> [<b>{leaveRequestEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="startDate">
              <Translate contentKey="uiApp.leaveLeaveRequest.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {leaveRequestEntity.startDate ? <TextFormat value={leaveRequestEntity.startDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="uiApp.leaveLeaveRequest.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>
            {leaveRequestEntity.endDate ? <TextFormat value={leaveRequestEntity.endDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="creationDate">
              <Translate contentKey="uiApp.leaveLeaveRequest.creationDate">Creation Date</Translate>
            </span>
          </dt>
          <dd>
            {leaveRequestEntity.creationDate ? (
              <TextFormat value={leaveRequestEntity.creationDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="departmentCode">
              <Translate contentKey="uiApp.leaveLeaveRequest.departmentCode">Department Code</Translate>
            </span>
          </dt>
          <dd>{leaveRequestEntity.departmentCode}</dd>
          <dt>
            <span id="employeeCode">
              <Translate contentKey="uiApp.leaveLeaveRequest.employeeCode">Employee Code</Translate>
            </span>
          </dt>
          <dd>{leaveRequestEntity.employeeCode}</dd>
          <dt>
            <span id="workingDays">
              <Translate contentKey="uiApp.leaveLeaveRequest.workingDays">Working Days</Translate>
            </span>
          </dt>
          <dd>{leaveRequestEntity.workingDays}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="uiApp.leaveLeaveRequest.description">Description</Translate>
            </span>
          </dt>
          <dd>{leaveRequestEntity.description}</dd>
          <dt>
            <span id="leaveType">
              <Translate contentKey="uiApp.leaveLeaveRequest.leaveType">Leave Type</Translate>
            </span>
          </dt>
          <dd>{leaveRequestEntity.leaveType}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="uiApp.leaveLeaveRequest.status">Status</Translate>
            </span>
          </dt>
          <dd>{leaveRequestEntity.status}</dd>
        </dl>
        <Button tag={Link} to="/leave-request" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/leave-request/${leaveRequestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ leaveRequest }: IRootState) => ({
  leaveRequestEntity: leaveRequest.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LeaveRequestDetail);
