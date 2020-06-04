import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMeetingRoom } from 'app/shared/model/meeting/meeting-room.model';
import { getEntities as getMeetingRooms } from 'app/entities/meeting/meeting-room/meeting-room.reducer';
import { IParticipant } from 'app/shared/model/meeting/participant.model';
import { getEntities as getParticipants } from 'app/entities/meeting/participant/participant.reducer';
import { getEntity, updateEntity, createEntity, reset } from './meeting.reducer';
import { IMeeting } from 'app/shared/model/meeting/meeting.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMeetingUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeetingUpdate = (props: IMeetingUpdateProps) => {
  const [idsparticipant, setIdsparticipant] = useState([]);
  const [meetingRoomId, setMeetingRoomId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { meetingEntity, meetingRooms, participants, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/meeting' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getMeetingRooms();
    props.getParticipants();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const entity = {
        ...meetingEntity,
        ...values,
        participants: mapIdList(values.participants),
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
          <h2 id="uiApp.meetingMeeting.home.createOrEditLabel">
            <Translate contentKey="uiApp.meetingMeeting.home.createOrEditLabel">Create or edit a Meeting</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : meetingEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="meeting-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="meeting-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="meeting-title">
                  <Translate contentKey="uiApp.meetingMeeting.title">Title</Translate>
                </Label>
                <AvField
                  id="meeting-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="meeting-description">
                  <Translate contentKey="uiApp.meetingMeeting.description">Description</Translate>
                </Label>
                <AvField id="meeting-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="startDateLabel" for="meeting-startDate">
                  <Translate contentKey="uiApp.meetingMeeting.startDate">Start Date</Translate>
                </Label>
                <AvInput
                  id="meeting-startDate"
                  type="datetime-local"
                  className="form-control"
                  name="startDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.meetingEntity.startDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endDateLabel" for="meeting-endDate">
                  <Translate contentKey="uiApp.meetingMeeting.endDate">End Date</Translate>
                </Label>
                <AvInput
                  id="meeting-endDate"
                  type="datetime-local"
                  className="form-control"
                  name="endDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.meetingEntity.endDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="meeting-meetingRoom">
                  <Translate contentKey="uiApp.meetingMeeting.meetingRoom">Meeting Room</Translate>
                </Label>
                <AvInput
                  id="meeting-meetingRoom"
                  type="select"
                  className="form-control"
                  name="meetingRoom.id"
                  value={isNew ? meetingRooms[0] && meetingRooms[0].id : meetingEntity.meetingRoom?.id}
                  required
                >
                  {meetingRooms
                    ? meetingRooms.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <AvGroup>
                <Label for="meeting-participant">
                  <Translate contentKey="uiApp.meetingMeeting.participant">Participant</Translate>
                </Label>
                <AvInput
                  id="meeting-participant"
                  type="select"
                  multiple
                  className="form-control"
                  name="participants"
                  value={meetingEntity.participants && meetingEntity.participants.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {participants
                    ? participants.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.email}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/meeting" replace color="info">
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
  meetingRooms: storeState.meetingRoom.entities,
  participants: storeState.participant.entities,
  meetingEntity: storeState.meeting.entity,
  loading: storeState.meeting.loading,
  updating: storeState.meeting.updating,
  updateSuccess: storeState.meeting.updateSuccess,
});

const mapDispatchToProps = {
  getMeetingRooms,
  getParticipants,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeetingUpdate);
