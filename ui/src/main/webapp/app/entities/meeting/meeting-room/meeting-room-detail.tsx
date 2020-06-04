import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './meeting-room.reducer';
import { IMeetingRoom } from 'app/shared/model/meeting/meeting-room.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeetingRoomDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeetingRoomDetail = (props: IMeetingRoomDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { meetingRoomEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="uiApp.meetingMeetingRoom.detail.title">MeetingRoom</Translate> [<b>{meetingRoomEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="uiApp.meetingMeetingRoom.code">Code</Translate>
            </span>
          </dt>
          <dd>{meetingRoomEntity.code}</dd>
          <dt>
            <span id="location">
              <Translate contentKey="uiApp.meetingMeetingRoom.location">Location</Translate>
            </span>
          </dt>
          <dd>{meetingRoomEntity.location}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="uiApp.meetingMeetingRoom.name">Name</Translate>
            </span>
          </dt>
          <dd>{meetingRoomEntity.name}</dd>
        </dl>
        <Button tag={Link} to="/meeting-room" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/meeting-room/${meetingRoomEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ meetingRoom }: IRootState) => ({
  meetingRoomEntity: meetingRoom.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeetingRoomDetail);
