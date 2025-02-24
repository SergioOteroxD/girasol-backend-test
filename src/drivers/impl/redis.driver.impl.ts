import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { IredisDriver } from '../redis.driver';

@Injectable()
export class RedisDriver implements IredisDriver {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async setValue(key: string, value: any): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value));
  }

  async getValue(key: string): Promise<any> {
    const data = await this.redisClient.get(key);
    return data ? JSON.parse(data) : null;
  }
}
