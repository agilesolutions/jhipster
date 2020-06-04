import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './leave-request.reducer';
import { ILeaveRequest } from 'app/shared/model/leave/leave-request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface ILeaveRequestProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const LeaveRequest = (props: ILeaveRequestProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { leaveRequestList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="leave-request-heading">
        <Translate contentKey="uiApp.leaveLeaveRequest.home.title">Leave Requests</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="uiApp.leaveLeaveRequest.home.createLabel">Create new Leave Request</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {leaveRequestList && leaveRequestList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('startDate')}>
                  <Translate contentKey="uiApp.leaveLeaveRequest.startDate">Start Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('endDate')}>
                  <Translate contentKey="uiApp.leaveLeaveRequest.endDate">End Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('creationDate')}>
                  <Translate contentKey="uiApp.leaveLeaveRequest.creationDate">Creation Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('departmentCode')}>
                  <Translate contentKey="uiApp.leaveLeaveRequest.departmentCode">Department Code</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('employeeCode')}>
                  <Translate contentKey="uiApp.leaveLeaveRequest.employeeCode">Employee Code</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('workingDays')}>
                  <Translate contentKey="uiApp.leaveLeaveRequest.workingDays">Working Days</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="uiApp.leaveLeaveRequest.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('leaveType')}>
                  <Translate contentKey="uiApp.leaveLeaveRequest.leaveType">Leave Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('status')}>
                  <Translate contentKey="uiApp.leaveLeaveRequest.status">Status</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {leaveRequestList.map((leaveRequest, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${leaveRequest.id}`} color="link" size="sm">
                      {leaveRequest.id}
                    </Button>
                  </td>
                  <td>
                    {leaveRequest.startDate ? <TextFormat type="date" value={leaveRequest.startDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{leaveRequest.endDate ? <TextFormat type="date" value={leaveRequest.endDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    {leaveRequest.creationDate ? (
                      <TextFormat type="date" value={leaveRequest.creationDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{leaveRequest.departmentCode}</td>
                  <td>{leaveRequest.employeeCode}</td>
                  <td>{leaveRequest.workingDays}</td>
                  <td>{leaveRequest.description}</td>
                  <td>
                    <Translate contentKey={`uiApp.LeaveRequestType.${leaveRequest.leaveType}`} />
                  </td>
                  <td>
                    <Translate contentKey={`uiApp.LeaveRequestStatus.${leaveRequest.status}`} />
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${leaveRequest.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${leaveRequest.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${leaveRequest.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="uiApp.leaveLeaveRequest.home.notFound">No Leave Requests found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={leaveRequestList && leaveRequestList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ leaveRequest }: IRootState) => ({
  leaveRequestList: leaveRequest.entities,
  loading: leaveRequest.loading,
  totalItems: leaveRequest.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LeaveRequest);
