import { Injectable } from '@nestjs/common';
import {
  ResponseBase,
  IresponseBase,
  ResponseQuery,
} from '../../../commons/response/common/entity/response-base.model';
import { RESPONSE_CODE } from '../../../commons/response-codes/general-codes';
import { FilterQuery, PipelineStage, ProjectionType } from 'mongoose';
import { IfilterHistoryCurrency } from '../../entity/filter/filter-history-currency.entity';
import { IhistoryConsultCurrencyDriver } from '../../../drivers/history-consult-currency';
import { HistoryConsultCurrency } from '../../../drivers/model/history-consult-currency.model';
import { IqueryHistoryCurrencyUC } from '../query-history-conversion.uc';

@Injectable()
export class QueryHistoryCurrencyUC implements IqueryHistoryCurrencyUC {
  constructor(private clientDriver: IhistoryConsultCurrencyDriver) {}

  async getAll(
    page: number,
    limit: number,
    _filter: IfilterHistoryCurrency,
    // _sort: { by: EqueryOrderBy; type: EqueryOrder },
    projection: ProjectionType<HistoryConsultCurrency> = {},
  ): Promise<IresponseBase> {
    const filter: FilterQuery<HistoryConsultCurrency> = {};
    if (_filter.from) filter['from'] = _filter.from;
    if (_filter.to) filter['to'] = _filter.to;
    if (_filter.userId) filter['userId'] = _filter.userId;

    const total: number = await this.clientDriver.getTotal(filter);

    if (total == 0) return new ResponseBase(RESPONSE_CODE.NOT_FOUND);

    const data = await this.clientDriver.getAll(
      page,
      limit,
      filter,
      projection,
      { createdAt: 'desc' },
    );

    return new ResponseQuery(RESPONSE_CODE.QUERY_OK, data, page, limit, total);
  }

  async getAllMetrics(_filter: IfilterHistoryCurrency): Promise<IresponseBase> {
    const filter: FilterQuery<HistoryConsultCurrency> = {};
    if (_filter.from) filter['from'] = _filter.from;
    if (_filter.to) filter['to'] = _filter.to;
    if (_filter.userId) filter['userId'] = _filter.userId;

    const total: number = await this.clientDriver.getTotal(filter);

    if (total == 0) return new ResponseBase(RESPONSE_CODE.NOT_FOUND);

    const pipe: PipelineStage[] = [
      { $match: filter },
      { $group: { _id: '$userId', totalConsultas: { $count: {} } } },
      {
        $lookup: {
          from: 'user', // Nombre de la colección de usuarios
          localField: '_id',
          foreignField: 'userId',
          as: 'user',
        },
      },
      { $unwind: '$user' }, // Desestructura el array de usuario
      {
        $project: {
          _id: 0,
          userId: '$_id',
          nombre: '$user.name',
          totalConsultas: 1,
        },
      },
    ];

    const data = await this.clientDriver.aggregate(pipe);

    return new ResponseBase(RESPONSE_CODE.QUERY_OK, data);
  }
}
