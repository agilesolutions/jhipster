import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './leave-request.reducer';
import { ILeaveRequest } from 'app/shared/model/leave/leave-request.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILeaveRequestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LeaveRequestUpdate = (props: ILeaveRequestUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { leaveRequestEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/leave-request' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);
    values.creationDate = convertDateTimeToServer(values.creationDate);

    if (errors.length === 0) {
      const entity = {
        ...leaveRequestEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="uiApp.leaveLeaveRequest.home.createOrEditLabel">
            <Translate contentKey="uiApp.leaveLeaveRequest.home.createOrEditLabel">Create or edit a LeaveRequest</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : leaveRequestEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="leave-request-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="leave-request-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="startDateLabel" for="leave-request-startDate">
                  <Translate contentKey="uiApp.leaveLeaveRequest.startDate">Start Date</Translate>
                </Label>
                <AvInput
                  id="leave-request-startDate"
                  type="datetime-local"
                  className="form-control"
                  name="startDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.leaveRequestEntity.startDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endDateLabel" for="leave-request-endDate">
                  <Translate contentKey="uiApp.leaveLeaveRequest.endDate">End Date</Translate>
                </Label>
                <AvInput
                  id="leave-request-endDate"
                  type="datetime-local"
                  className="form-control"
                  name="endDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.leaveRequestEntity.endDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="creationDateLabel" for="leave-request-creationDate">
                  <Translate contentKey="uiApp.leaveLeaveRequest.creationDate">Creation Date</Translate>
                </Label>
                <AvInput
                  id="leave-request-creationDate"
                  type="datetime-local"
                  className="form-control"
                  name="creationDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.leaveRequestEntity.creationDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="departmentCodeLabel" for="leave-request-departmentCode">
                  <Translate contentKey="uiApp.leaveLeaveRequest.departmentCode">Department Code</Translate>
                </Label>
                <AvField
                  id="leave-request-departmentCode"
                  type="text"
                  name="departmentCode"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="employeeCodeLabel" for="leave-request-employeeCode">
                  <Translate contentKey="uiApp.leaveLeaveRequest.employeeCode">Employee Code</Translate>
                </Label>
                <AvField
                  id="leave-request-employeeCode"
                  type="text"
                  name="employeeCode"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="workingDaysLabel" for="leave-request-workingDays">
                  <Translate contentKey="uiApp.leaveLeaveRequest.workingDays">Working Days</Translate>
                </Label>
                <AvField
                  id="leave-request-workingDays"
                  type="string"
                  className="form-control"
                  name="workingDays"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="leave-request-description">
                  <Translate contentKey="uiApp.leaveLeaveRequest.description">Description</Translate>
                </Label>
                <AvField id="leave-request-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="leaveTypeLabel" for="leave-request-leaveType">
                  <Translate contentKey="uiApp.leaveLeaveRequest.leaveType">Leave Type</Translate>
                </Label>
                <AvInput
                  id="leave-request-leaveType"
                  type="select"
                  className="form-control"
                  name="leaveType"
                  value={(!isNew && leaveRequestEntity.leaveType) || 'VACATION'}
                >
                  <option value="VACATION">{translate('uiApp.LeaveRequestType.VACATION')}</option>
                  <option value="MEDICAL">{translate('uiApp.LeaveRequestType.MEDICAL')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="leave-request-status">
                  <Translate contentKey="uiApp.leaveLeaveRequest.status">Status</Translate>
                </Label>
                <AvInput
                  id="leave-request-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && leaveRequestEntity.status) || 'COMPLETED'}
                >
                  <option value="COMPLETED">{translate('uiApp.LeaveRequestStatus.COMPLETED')}</option>
                  <option value="PENDING">{translate('uiApp.LeaveRequestStatus.PENDING')}</option>
                  <option value="APPROVED">{translate('uiApp.LeaveRequestStatus.APPROVED')}</option>
                  <option value="REJECTED">{translate('uiApp.LeaveRequestStatus.REJECTED')}</option>
                  <option value="CANCELLED">{translate('uiApp.LeaveRequestStatus.CANCELLED')}</option>
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/leave-request" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  leaveRequestEntity: storeState.leaveRequest.entity,
  loading: storeState.leaveRequest.loading,
  updating: storeState.leaveRequest.updating,
  updateSuccess: storeState.leaveRequest.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LeaveRequestUpdate);
