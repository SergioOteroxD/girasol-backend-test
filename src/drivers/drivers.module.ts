import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import Redis from 'ioredis';
import { UserDriver } from './impl/user.driver.impl';
import { IuserDriver } from './user.driver';
import { User, UserSchema } from './model/user.model';
import { IjwtDriver } from './jwt.driver';
import { JwtDriver } from './impl/jwt.driver.impl';
import { IconversionDriver } from './conversion.driver';
import { ConversionDriver } from './impl/conversion.driver.impl';
import {
  HistoryConsultCurrency,
  HistoryConsultCurrencySchema,
} from './model/history-consult-currency.model';
import { IhistoryConsultCurrencyDriver } from './history-consult-currency';
import { HistoryConsultCurrencyDriver } from './impl/history-consult-currency.impl';
import { IredisDriver } from './redis.driver';
import { RedisDriver } from './impl/redis.driver.impl';
import { IeventDriver } from './event.driver';
import { EventDriver } from './impl/event.driver.impl';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('general.SECRET_JWT'),
        signOptions: { expiresIn: config.get<string>('general.EXPIRES_JWT') },
        global: true,
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('database.mongo.uri'),
      }),
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: HistoryConsultCurrency.name,
        schema: HistoryConsultCurrencySchema,
      },
    ]),
  ],
  providers: [
    // redis
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const redis = new Redis({
          host: 'localhost',
          port: 6379,
        });

        redis.on('connect', () => {
          console.log('Connected to Redis');
        });

        redis.on('error', (err) => {
          console.error('Redis connection error:', err);
        });

        return redis;
      },
    },
    { provide: IredisDriver, useClass: RedisDriver },
    // Event
    { provide: IeventDriver, useClass: EventDriver },
    // User
    { provide: IuserDriver, useClass: UserDriver },
    // Jwt
    { provide: IjwtDriver, useClass: JwtDriver },
    // conversion currency
    { provide: IconversionDriver, useClass: ConversionDriver },
    {
      provide: IhistoryConsultCurrencyDriver,
      useClass: HistoryConsultCurrencyDriver,
    },
  ],
  exports: [
    // redis
    IredisDriver,
    // Event
    IeventDriver,
    // User
    IuserDriver,
    // Jwt
    IjwtDriver,
    // conversion currency
    IconversionDriver,
    IhistoryConsultCurrencyDriver,
  ],
})
export class DriversModule {}
