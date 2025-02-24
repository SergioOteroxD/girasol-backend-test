import { Iuser } from '../entity/user.entity';
import { IresponseBase } from '../../commons/response/common/entity/response-base.model';

export abstract class IregisterUserUC {
  /**
   *
   * @param data
   */
  abstract create(data: Iuser): Promise<IresponseBase<any>>;
}
