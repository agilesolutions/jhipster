import { Moment } from 'moment';
import { IMeetingRoom } from 'app/shared/model/meeting/meeting-room.model';
import { IParticipant } from 'app/shared/model/meeting/participant.model';

export interface IMeeting {
  id?: string;
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  meetingRoom?: IMeetingRoom;
  participants?: IParticipant[];
}

export const defaultValue: Readonly<IMeeting> = {};
