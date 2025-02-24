import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { UserController } from './api/user.controller';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionManager } from './lib/exceptions-manager.filter';
import { RequestHttpInterceptor } from './lib/request-http.interceptor';

@Module({
  imports: [CoreModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionManager,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestHttpInterceptor,
    },
  ],
  controllers: [UserController],
})
export class AdaptersModule {}
