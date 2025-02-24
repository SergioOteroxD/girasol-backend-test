import { EuserType } from '../../commons/enum/user-type.enum';
export interface Iuser {
  name: string;

  email: string;

  userType: EuserType;

  password: string;
}
