import { FilterQuery, ProjectionType, SortOrder, UpdateQuery } from 'mongoose';
import { User } from './model/user.model';

export abstract class IuserDriver {
  abstract getTotal(filter: FilterQuery<User>): Promise<number>;

  abstract getAll(
    page: number,
    limit: number,
    filter: FilterQuery<User>,
    projection?: ProjectionType<User>,
    sort?: {
      [key: string]: SortOrder;
    },
  ): Promise<User[]>;

  abstract update(userId: string, data: UpdateQuery<User>);

  abstract register(data: Partial<User>);

  abstract getById(userId: string): Promise<User>;

  abstract getOne(filter: FilterQuery<User>): Promise<User>;
}
