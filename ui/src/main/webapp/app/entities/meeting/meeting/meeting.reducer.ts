import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMeeting, defaultValue } from 'app/shared/model/meeting/meeting.model';

export const ACTION_TYPES = {
  FETCH_MEETING_LIST: 'meeting/FETCH_MEETING_LIST',
  FETCH_MEETING: 'meeting/FETCH_MEETING',
  CREATE_MEETING: 'meeting/CREATE_MEETING',
  UPDATE_MEETING: 'meeting/UPDATE_MEETING',
  DELETE_MEETING: 'meeting/DELETE_MEETING',
  RESET: 'meeting/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMeeting>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type MeetingState = Readonly<typeof initialState>;

// Reducer

export default (state: MeetingState = initialState, action): MeetingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEETING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEETING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MEETING):
    case REQUEST(ACTION_TYPES.UPDATE_MEETING):
    case REQUEST(ACTION_TYPES.DELETE_MEETING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MEETING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEETING):
    case FAILURE(ACTION_TYPES.CREATE_MEETING):
    case FAILURE(ACTION_TYPES.UPDATE_MEETING):
    case FAILURE(ACTION_TYPES.DELETE_MEETING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEETING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEETING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEETING):
    case SUCCESS(ACTION_TYPES.UPDATE_MEETING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEETING):
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

const apiUrl = 'services/meeting/api/meetings';

// Actions

export const getEntities: ICrudGetAllAction<IMeeting> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MEETING_LIST,
    payload: axios.get<IMeeting>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IMeeting> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEETING,
    payload: axios.get<IMeeting>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMeeting> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEETING,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMeeting> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEETING,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMeeting> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEETING,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
