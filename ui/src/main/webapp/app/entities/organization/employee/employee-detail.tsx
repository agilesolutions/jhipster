import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee.reducer';
import { IEmployee } from 'app/shared/model/organization/employee.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeDetail = (props: IEmployeeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="uiApp.organizationEmployee.detail.title">Employee</Translate> [<b>{employeeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="uiApp.organizationEmployee.code">Code</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.code}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="uiApp.organizationEmployee.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="uiApp.organizationEmployee.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.lastName}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="uiApp.organizationEmployee.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.gender}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="uiApp.organizationEmployee.email">Email</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.email}</dd>
          <dt>
            <span id="phone">
              <Translate contentKey="uiApp.organizationEmployee.phone">Phone</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.phone}</dd>
          <dt>
            <span id="addressLine1">
              <Translate contentKey="uiApp.organizationEmployee.addressLine1">Address Line 1</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.addressLine1}</dd>
          <dt>
            <span id="addressLine2">
              <Translate contentKey="uiApp.organizationEmployee.addressLine2">Address Line 2</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.addressLine2}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="uiApp.organizationEmployee.city">City</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.city}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="uiApp.organizationEmployee.country">Country</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.country}</dd>
          <dt>
            <Translate contentKey="uiApp.organizationEmployee.department">Department</Translate>
          </dt>
          <dd>{employeeEntity.department ? employeeEntity.department.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee/${employeeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employee }: IRootState) => ({
  employeeEntity: employee.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);
