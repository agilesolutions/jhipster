import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IMeetingRoom, defaultValue } from 'app/shared/model/meeting/meeting-room.model';

export const ACTION_TYPES = {
  FETCH_MEETINGROOM_LIST: 'meetingRoom/FETCH_MEETINGROOM_LIST',
  FETCH_MEETINGROOM: 'meetingRoom/FETCH_MEETINGROOM',
  CREATE_MEETINGROOM: 'meetingRoom/CREATE_MEETINGROOM',
  UPDATE_MEETINGROOM: 'meetingRoom/UPDATE_MEETINGROOM',
  DELETE_MEETINGROOM: 'meetingRoom/DELETE_MEETINGROOM',
  RESET: 'meetingRoom/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMeetingRoom>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type MeetingRoomState = Readonly<typeof initialState>;

// Reducer

export default (state: MeetingRoomState = initialState, action): MeetingRoomState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEETINGROOM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEETINGROOM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_MEETINGROOM):
    case REQUEST(ACTION_TYPES.UPDATE_MEETINGROOM):
    case REQUEST(ACTION_TYPES.DELETE_MEETINGROOM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_MEETINGROOM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEETINGROOM):
    case FAILURE(ACTION_TYPES.CREATE_MEETINGROOM):
    case FAILURE(ACTION_TYPES.UPDATE_MEETINGROOM):
    case FAILURE(ACTION_TYPES.DELETE_MEETINGROOM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEETINGROOM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEETINGROOM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEETINGROOM):
    case SUCCESS(ACTION_TYPES.UPDATE_MEETINGROOM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEETINGROOM):
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

const apiUrl = 'services/meeting/api/meeting-rooms';

// Actions

export const getEntities: ICrudGetAllAction<IMeetingRoom> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MEETINGROOM_LIST,
    payload: axios.get<IMeetingRoom>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IMeetingRoom> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEETINGROOM,
    payload: axios.get<IMeetingRoom>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IMeetingRoom> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEETINGROOM,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMeetingRoom> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEETINGROOM,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMeetingRoom> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEETINGROOM,
    payload: axios.delete(requestUrl),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
