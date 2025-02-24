import { Module } from '@nestjs/common';
import { DriversModule } from 'src/drivers/drivers.module';
import { IregisterUserUC } from './use_case/register-user.uc';
import { RegisterUserUC } from './use_case/impl/register-user.uc.impl';
import { IqueryUserUC } from './use_case/query-user.uc';
import { QueryUserUC } from './use_case/impl/query-user.uc.impl';
import { IloginUserUC } from './use_case/login-user.uc';
import { LoginUserUC } from './use_case/impl/login-user.uc.impl';
import { IjwtUC } from './use_case/jwt.uc';
import { JwtUC } from './use_case/impl/jwt.uc.impl';

@Module({
  imports: [DriversModule],
  providers: [
    // User
    { provide: IregisterUserUC, useClass: RegisterUserUC },
    { provide: IqueryUserUC, useClass: QueryUserUC },
    { provide: IloginUserUC, useClass: LoginUserUC },

    //Jwt
    { provide: IjwtUC, useClass: JwtUC },
  ],
  exports: [IregisterUserUC, IqueryUserUC, IloginUserUC, IjwtUC],
})
export class CoreModule {}
