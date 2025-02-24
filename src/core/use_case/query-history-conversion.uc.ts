import { ProjectionType } from 'mongoose';
import { IresponseBase } from '../../commons/response/common/entity/response-base.model';
import { IfilterHistoryCurrency } from '../entity/filter/filter-history-currency.entity';
import { HistoryConsultCurrency } from '../../drivers/model/history-consult-currency.model';

export abstract class IqueryHistoryCurrencyUC {
  abstract getAll(
    page: number,
    limit: number,
    _filter: IfilterHistoryCurrency,
    // _sort: { by: EqueryOrderBy; type: EqueryOrder },
    projection?: ProjectionType<HistoryConsultCurrency>,
  ): Promise<IresponseBase>;

  abstract getAllMetrics(
    _filter: IfilterHistoryCurrency,
  ): Promise<IresponseBase>;
}
