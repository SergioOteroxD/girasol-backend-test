import { Injectable } from '@nestjs/common';
import { IuserDriver } from 'src/drivers/user.driver';
import {
  ResponseBase,
  IresponseBase,
  ResponseQuery,
} from '../../../commons/response/common/entity/response-base.model';
import { RESPONSE_CODE } from '../../../commons/response-codes/general-codes';
import { User } from '../../../drivers/model/user.model';
import { FilterQuery, ProjectionType } from 'mongoose';
import { IfilterUser } from '../../entity/filter/filter-user.entity';
import { IqueryUserUC } from '../query-user.uc';

@Injectable()
export class QueryUserUC implements IqueryUserUC {
  constructor(private clientDriver: IuserDriver) {}

  async getById(userId: string): Promise<IresponseBase<any>> {
    const doc = await this.clientDriver.getOne({ userId });
    if (!doc) return new ResponseBase(RESPONSE_CODE.NOT_FOUND);

    return new ResponseBase(RESPONSE_CODE.QUERY_OK, doc);
  }

  async getAll(
    page: number,
    limit: number,
    _filter: IfilterUser,
    // _sort: { by: EqueryOrderBy; type: EqueryOrder },
    projection: ProjectionType<User> = {
      password: false,
    },
  ): Promise<IresponseBase> {
    const filter: FilterQuery<User> = {};
    if (_filter.email) filter['email'] = _filter.email;
    if (_filter.name) filter['name'] = _filter.name;
    if (_filter.userType) filter['.userType'] = _filter.userType;

    const total: number = await this.clientDriver.getTotal({
      where: filter,
    });

    if (total == 0) return new ResponseBase(RESPONSE_CODE.NOT_FOUND);

    const data = await this.clientDriver.getAll(
      page,
      limit,
      filter,
      projection,
    );

    return new ResponseQuery(RESPONSE_CODE.QUERY_OK, data, page, limit, total);
  }
}
