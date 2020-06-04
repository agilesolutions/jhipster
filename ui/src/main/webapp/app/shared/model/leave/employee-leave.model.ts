export interface IEmployeeLeave {
  id?: string;
  employeeCode?: string;
  total?: number;
  available?: number;
}

export const defaultValue: Readonly<IEmployeeLeave> = {};
