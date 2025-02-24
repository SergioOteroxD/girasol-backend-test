import { EuserType } from '../../../commons/enum/user-type.enum';
export interface IfilterUser {
  name: string;
  email: string;
  userType: EuserType;
}
