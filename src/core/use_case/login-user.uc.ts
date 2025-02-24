import { IresponseBase } from '../../commons/response/common/entity/response-base.model';
import { IloginUserData } from '../entity/operation/login-user.entity';

export abstract class IloginUserUC {
  /**
   *
   * @param data
   */
  abstract login(data: IloginUserData): Promise<IresponseBase<any>>;
}
