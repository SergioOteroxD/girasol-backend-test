import { Module } from '@nestjs/common';
import { DriversModule } from 'src/drivers/drivers.module';
import { IregisterUserUC } from './use_case/register-user.uc';
import { RegisterUserUC } from './use_case/impl/register-user.uc.impl';
import { IqueryUserUC } from './use_case/query-user.uc';
import { QueryUserUC } from './use_case/impl/query-user.uc.impl';
import { IloginUserUC } from './use_case/login-user.uc';
import { LoginUserUC } from './use_case/impl/login-user.uc.impl';

@Module({
  imports: [DriversModule],
  providers: [
    { provide: IregisterUserUC, useClass: RegisterUserUC },
    { provide: IqueryUserUC, useClass: QueryUserUC },
    { provide: IloginUserUC, useClass: LoginUserUC },
  ],
  exports: [IregisterUserUC, IqueryUserUC, IloginUserUC],
})
export class CoreModule {}
