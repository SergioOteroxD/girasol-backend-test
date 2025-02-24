import { Module } from '@nestjs/common';
import { DriversModule } from 'src/drivers/drivers.module';
import { IregisterUserUC } from './use_case/register-user.uc';
import { RegisterUserUC } from './use_case/impl/register-user.uc.impl';
import { IqueryUserUC } from './use_case/query-user.uc';
import { QueryUserUC } from './use_case/impl/query-user.uc.impl';

@Module({
  imports: [DriversModule],
  providers: [
    { provide: IregisterUserUC, useClass: RegisterUserUC },
    { provide: IqueryUserUC, useClass: QueryUserUC },
  ],
  exports: [IregisterUserUC, IqueryUserUC],
})
export class CoreModule {}
