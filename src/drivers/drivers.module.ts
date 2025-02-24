import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDriver } from './impl/user.driver.impl';
import { IuserDriver } from './user.driver';
import { User, UserSchema } from './model/user.model';

@Module({
  imports: [
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
    ]),
  ],
  providers: [{ provide: IuserDriver, useClass: UserDriver }],
  exports: [IuserDriver],
})
export class DriversModule {}
