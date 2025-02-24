import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../model/user.model';
import {
  Model,
  FilterQuery,
  UpdateQuery,
  ProjectionType,
  SortOrder,
} from 'mongoose';
import { IuserDriver } from '../user.driver';
import { GeneralUtils } from 'src/commons/util/general.util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserDriver implements IuserDriver {
  constructor(
    @InjectModel(User.name)
    private productModel: Model<User>,
    private config: ConfigService,
  ) {}

  async register(data: Partial<User>) {
    data.userId = GeneralUtils.generateId(12, 'USR');
    data.password = await GeneralUtils.encryptPassword(
      data.password,
      this.config.get<string>('general.PEPPER_PASSWORD'),
    );
    const userDataRegister = new this.productModel(data);
    return await userDataRegister.save({});
  }

  async getTotal(filter: FilterQuery<User>): Promise<number> {
    return await this.productModel.find(filter).countDocuments().exec();
  }

  async getAll(
    page: number,
    limit: number,
    filter: FilterQuery<User>,
    projection?: ProjectionType<User>,
    sort?: {
      [key: string]: SortOrder;
    },
  ): Promise<User[]> {
    return await this.productModel
      .find(filter)
      .skip(limit * (page - 1))
      .limit(limit)
      .select(projection)
      .sort(sort)
      .exec();
  }

  async update(reportId: string, changes: UpdateQuery<User>) {
    return await this.productModel
      .findOneAndUpdate({ reportId }, changes, { new: true, upsert: true })
      .exec();
  }

  async getById(id: string) {
    return await this.productModel.findById(id).exec();
  }

  async getOne(filter: FilterQuery<User>): Promise<User> {
    return await this.productModel.findOne(filter).exec();
  }
}
