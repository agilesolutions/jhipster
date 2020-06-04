import { IDepartment } from 'app/shared/model/organization/department.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IEmployee {
  id?: string;
  code?: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  department?: IDepartment;
}

export const defaultValue: Readonly<IEmployee> = {};
