import { IfilterUser } from '../entity/filter/filter-user.entity';
import { IresponseBase } from '../../commons/response/common/entity/response-base.model';

export abstract class IqueryUserUC {
  abstract getById(value: string): Promise<IresponseBase<any>>;

  abstract getAll(
    page: number,
    limit: number,
    _filter: IfilterUser,
    // _sort: { by: EqueryOrderBy; type: EqueryOrder },
    projection: any,
  ): Promise<IresponseBase>;
}
