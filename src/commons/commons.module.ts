import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import databaseConfig from './config/database.config';
import generalConfig from './config/general.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      cache: true,
      load: [databaseConfig, generalConfig],
      expandVariables: true,
    }),
  ],
})
export class CommonsModule {}
