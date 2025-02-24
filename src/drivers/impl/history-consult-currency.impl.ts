import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Model,
  FilterQuery,
  UpdateQuery,
  ProjectionType,
  SortOrder,
  PipelineStage,
  AggregateOptions,
} from 'mongoose';
import { HistoryConsultCurrency } from '../model/history-consult-currency.model';
import { IhistoryConsultCurrencyDriver } from '../history-consult-currency';

@Injectable()
export class HistoryConsultCurrencyDriver
  implements IhistoryConsultCurrencyDriver
{
  constructor(
    @InjectModel(HistoryConsultCurrency.name)
    private productModel: Model<HistoryConsultCurrency>,
  ) {}

  async register(data: Partial<HistoryConsultCurrency>) {
    const userDataRegister = new this.productModel(data);
    return await userDataRegister.save({});
  }

  async getTotal(filter: FilterQuery<HistoryConsultCurrency>): Promise<number> {
    return await this.productModel.find(filter).countDocuments().exec();
  }

  async aggregate(
    pipeline: PipelineStage[],
    options?: AggregateOptions,
  ): Promise<any> {
    return await this.productModel.aggregate(pipeline, options);
  }

  async getAll(
    page: number,
    limit: number,
    filter: FilterQuery<HistoryConsultCurrency>,
    projection?: ProjectionType<HistoryConsultCurrency>,
    sort?: {
      [key: string]: SortOrder;
    },
  ): Promise<HistoryConsultCurrency[]> {
    return await this.productModel
      .find(filter)
      .skip(limit * (page - 1))
      .limit(limit)
      .select(projection)
      .sort(sort)
      .exec();
  }

  async update(reportId: string, changes: UpdateQuery<HistoryConsultCurrency>) {
    return await this.productModel
      .findOneAndUpdate({ reportId }, changes, { new: true, upsert: true })
      .exec();
  }

  async getById(id: string) {
    return await this.productModel.findById(id).exec();
  }

  async getOne(
    filter: FilterQuery<HistoryConsultCurrency>,
  ): Promise<HistoryConsultCurrency> {
    return await this.productModel.findOne(filter).exec();
  }
}
