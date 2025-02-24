import { FilterQuery, ProjectionType, SortOrder, UpdateQuery } from 'mongoose';
import { HistoryConsultCurrency } from './model/history-consult-currency.model';

export abstract class IhistoryConsultCurrencyDriver {
  abstract getTotal(
    filter: FilterQuery<HistoryConsultCurrency>,
  ): Promise<number>;

  abstract getAll(
    page: number,
    limit: number,
    filter: FilterQuery<HistoryConsultCurrency>,
    projection?: ProjectionType<HistoryConsultCurrency>,
    sort?: {
      [key: string]: SortOrder;
    },
  ): Promise<HistoryConsultCurrency[]>;

  abstract update(id: string, data: UpdateQuery<HistoryConsultCurrency>);

  abstract register(data: Partial<HistoryConsultCurrency>);

  abstract getById(id: string): Promise<HistoryConsultCurrency>;

  abstract getOne(
    filter: FilterQuery<HistoryConsultCurrency>,
  ): Promise<HistoryConsultCurrency>;
}
