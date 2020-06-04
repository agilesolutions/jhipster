import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILeaveRequest, defaultValue } from 'app/shared/model/leave/leave-request.model';

export const ACTION_TYPES = {
  FETCH_LEAVEREQUEST_LIST: 'leaveRequest/FETCH_LEAVEREQUEST_LIST',
  FETCH_LEAVEREQUEST: 'leaveRequest/FETCH_LEAVEREQUEST',
  CREATE_LEAVEREQUEST: 'leaveRequest/CREATE_LEAVEREQUEST',
  UPDATE_LEAVEREQUEST: 'leaveRequest/UPDATE_LEAVEREQUEST',
  DELETE_LEAVEREQUEST: 'leaveRequest/DELETE_LEAVEREQUEST',
  RESET: 'leaveRequest/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILeaveRequest>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type LeaveRequestState = Readonly<typeof initialState>;

// Reducer

export default (state: LeaveRequestState = initialState, action): LeaveRequestState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LEAVEREQUEST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LEAVEREQUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_LEAVEREQUEST):
    case REQUEST(ACTION_TYPES.UPDATE_LEAVEREQUEST):
    case REQUEST(ACTION_TYPES.DELETE_LEAVEREQUEST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_LEAVEREQUEST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LEAVEREQUEST):
    case FAILURE(ACTION_TYPES.CREATE_LEAVEREQUEST):
    case FAILURE(ACTION_TYPES.UPDATE_LEAVEREQUEST):
    case FAILURE(ACTION_TYPES.DELETE_LEAVEREQUEST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_LEAVEREQUEST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_LEAVEREQUEST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_LEAVEREQUEST):
    case SUCCESS(ACTION_TYPES.UPDATE_LEAVEREQUEST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_LEAVEREQUEST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'services/leave/api/leave-requests';

// Actions

export const getEntities: ICrudGetAllAction<ILeaveRequest> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_LEAVEREQUEST_LIST,
    payload: axios.get<ILeaveRequest>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<ILeaveRequest> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LEAVEREQUEST,
    payload: axios.get<ILeaveRequest>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ILeaveRequest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LEAVEREQUEST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILeaveRequest> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LEAVEREQUEST,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILeaveRequest> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LEAVEREQUEST,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
