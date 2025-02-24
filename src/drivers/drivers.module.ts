import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserDriver } from './impl/user.driver.impl';
import { IuserDriver } from './user.driver';
import { User, UserSchema } from './model/user.model';
import { IjwtDriver } from './jwt.driver';
import { JwtDriver } from './impl/jwt.driver.impl';

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
    ]),
  ],
  providers: [
    { provide: IuserDriver, useClass: UserDriver },
    { provide: IjwtDriver, useClass: JwtDriver },
  ],
  exports: [IuserDriver, IjwtDriver],
})
export class DriversModule {}
