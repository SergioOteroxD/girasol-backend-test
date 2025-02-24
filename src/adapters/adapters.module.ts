import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { UserController } from './api/user.controller';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionManager } from './lib/exceptions-manager.filter';
import { RequestHttpInterceptor } from './lib/request-http.interceptor';
import { CurrencyController } from './api/currency.controller';

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
  controllers: [UserController, CurrencyController],
})
export class AdaptersModule {}
