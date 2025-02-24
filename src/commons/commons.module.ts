import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import databaseConfig from './config/database.config';
import generalConfig from './config/general.config';
import apisConfig from './config/apis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: true,
      load: [databaseConfig, generalConfig, apisConfig],
      expandVariables: true,
    }),
  ],
})
export class CommonsModule {}
