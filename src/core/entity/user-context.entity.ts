import { EuserType } from '../../commons/enum/user-type.enum';
export interface IuserContext {
  readonly userId: string;
  readonly userType: EuserType;
  readonly exp: number;
  readonly iat: number;
}
