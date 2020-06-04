import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IEmployeeLeave, defaultValue } from 'app/shared/model/leave/employee-leave.model';

export const ACTION_TYPES = {
  FETCH_EMPLOYEELEAVE_LIST: 'employeeLeave/FETCH_EMPLOYEELEAVE_LIST',
  FETCH_EMPLOYEELEAVE: 'employeeLeave/FETCH_EMPLOYEELEAVE',
  CREATE_EMPLOYEELEAVE: 'employeeLeave/CREATE_EMPLOYEELEAVE',
  UPDATE_EMPLOYEELEAVE: 'employeeLeave/UPDATE_EMPLOYEELEAVE',
  DELETE_EMPLOYEELEAVE: 'employeeLeave/DELETE_EMPLOYEELEAVE',
  RESET: 'employeeLeave/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployeeLeave>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type EmployeeLeaveState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeLeaveState = initialState, action): EmployeeLeaveState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEELEAVE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEELEAVE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEELEAVE):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEELEAVE):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEELEAVE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEELEAVE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEELEAVE):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEELEAVE):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEELEAVE):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEELEAVE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEELEAVE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEELEAVE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEELEAVE):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEELEAVE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEELEAVE):
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

const apiUrl = 'services/leave/api/employee-leaves';

// Actions

export const getEntities: ICrudGetAllAction<IEmployeeLeave> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEELEAVE_LIST,
    payload: axios.get<IEmployeeLeave>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IEmployeeLeave> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEELEAVE,
    payload: axios.get<IEmployeeLeave>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEmployeeLeave> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEELEAVE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEmployeeLeave> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEELEAVE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployeeLeave> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEELEAVE,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
