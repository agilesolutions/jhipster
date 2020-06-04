import { IMeeting } from 'app/shared/model/meeting/meeting.model';

export interface IParticipant {
  id?: string;
  email?: string;
  meetings?: IMeeting[];
}

export const defaultValue: Readonly<IParticipant> = {};
