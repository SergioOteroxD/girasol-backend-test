import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomException } from '../../../commons/response/common/entity/custom-exception.model';
import { RESPONSE_CODE } from '../../../commons/response-codes/general-codes';
import {
  IresponseBase,
  ResponseBase,
} from '../../../commons/response/common/entity/response-base.model';
import { IuserDriver } from '../../../drivers/user.driver';
import { IloginUserData } from '../../entity/operation/login-user.entity';
import { GeneralUtils } from 'src/commons/util/general.util';
import { ConfigService } from '@nestjs/config';
import { IloginUserUC } from '../login-user.uc';
import { IjwtDriver } from 'src/drivers/jwt.driver';

@Injectable()
export class LoginUserUC implements IloginUserUC {
  constructor(
    private userDriver: IuserDriver,
    private config: ConfigService,
    private jwtDriver: IjwtDriver,
  ) {}
  async login(data: IloginUserData): Promise<IresponseBase<any>> {
    try {
      const doc = await this.userDriver.getOne({ email: data.email });
      if (!doc)
        return new ResponseBase({
          code: 'LOGIN_CONFLICT',
          message: `No se pudo hacer login, verifica que tengas una cuenta, correo y contraseña`,
          status: HttpStatus.CONFLICT,
        });

      const match = await GeneralUtils.comparePassword(
        data.password,
        doc.password,
        this.config.get<string>('general.PEPPER_PASSWORD'),
      );

      if (!match) {
        return new ResponseBase({
          code: 'LOGIN_CONFLICT',
          message:
            'No se pudo hacer login, verifica que tengas una cuenta, correo y contraseña',
          status: HttpStatus.CONFLICT,
        });
      }

      const token = await this.jwtDriver.sign({
        userId: doc.userId,
        userType: doc.userType,
      });

      return new ResponseBase(
        {
          code: 'LOGIN_OK',
          message: 'El asociado ha sido creada correctamente.',
          status: HttpStatus.OK,
        },
        { token },
      );
    } catch (error) {
      if (error instanceof CustomException) throw error;
      throw new CustomException(
        RESPONSE_CODE.ERROR,
        'LoginUserUC.create',
        'Technical',
        error,
      );
    }
  }
}
