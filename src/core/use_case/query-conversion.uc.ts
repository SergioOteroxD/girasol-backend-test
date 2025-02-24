import { IresponseBase } from '../../commons/response/common/entity/response-base.model';
import { IconversionData } from '../entity/operation/conversion.entity';
import { IuserContext } from '../entity/user-context.entity';

export abstract class IqueryConversionUC {
  abstract getOne(
    data: IconversionData,
    user: IuserContext,
  ): Promise<IresponseBase<any>>;
}
