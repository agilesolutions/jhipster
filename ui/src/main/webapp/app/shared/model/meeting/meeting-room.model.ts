export interface IMeetingRoom {
  id?: string;
  code?: string;
  location?: string;
  name?: string;
}

export const defaultValue: Readonly<IMeetingRoom> = {};
