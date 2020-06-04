import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './meeting.reducer';
import { IMeeting } from 'app/shared/model/meeting/meeting.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeetingDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MeetingDetail = (props: IMeetingDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { meetingEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="uiApp.meetingMeeting.detail.title">Meeting</Translate> [<b>{meetingEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="uiApp.meetingMeeting.title">Title</Translate>
            </span>
          </dt>
          <dd>{meetingEntity.title}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="uiApp.meetingMeeting.description">Description</Translate>
            </span>
          </dt>
          <dd>{meetingEntity.description}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="uiApp.meetingMeeting.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>{meetingEntity.startDate ? <TextFormat value={meetingEntity.startDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="uiApp.meetingMeeting.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>{meetingEntity.endDate ? <TextFormat value={meetingEntity.endDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="uiApp.meetingMeeting.meetingRoom">Meeting Room</Translate>
          </dt>
          <dd>{meetingEntity.meetingRoom ? meetingEntity.meetingRoom.name : ''}</dd>
          <dt>
            <Translate contentKey="uiApp.meetingMeeting.participant">Participant</Translate>
          </dt>
          <dd>
            {meetingEntity.participants
              ? meetingEntity.participants.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.email}</a>
                    {meetingEntity.participants && i === meetingEntity.participants.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/meeting" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/meeting/${meetingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ meeting }: IRootState) => ({
  meetingEntity: meeting.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDetail);
