import { Moment } from 'moment';
import { LeaveRequestType } from 'app/shared/model/enumerations/leave-request-type.model';
import { LeaveRequestStatus } from 'app/shared/model/enumerations/leave-request-status.model';

export interface ILeaveRequest {
  id?: string;
  startDate?: string;
  endDate?: string;
  creationDate?: string;
  departmentCode?: string;
  employeeCode?: string;
  workingDays?: number;
  description?: string;
  leaveType?: LeaveRequestType;
  status?: LeaveRequestStatus;
}

export const defaultValue: Readonly<ILeaveRequest> = {};
