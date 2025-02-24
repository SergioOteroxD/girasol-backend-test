import { HttpStatus, Injectable } from '@nestjs/common';
import { Iuser } from '../../entity/user.entity';
import { CustomException } from '../../../commons/response/common/entity/custom-exception.model';
import { RESPONSE_CODE } from '../../../commons/response-codes/general-codes';
import {
  IresponseBase,
  ResponseBase,
} from '../../../commons/response/common/entity/response-base.model';
import { IregisterUserUC } from '../register-user.uc';
import { IuserDriver } from '../../../drivers/user.driver';

@Injectable()
export class RegisterUserUC implements IregisterUserUC {
  constructor(private userDriver: IuserDriver) {}
  async create(data: Partial<Iuser>): Promise<IresponseBase<any>> {
    try {
      const doc = await this.userDriver.getOne({ email: data.email });
      if (doc)
        return new ResponseBase({
          code: 'USR_CONFLICT',
          message: `Ya existe el usuario con este correo electrónico`,
          status: HttpStatus.CONFLICT,
        });

      const user = await this.userDriver.register(data);

      return new ResponseBase(
        {
          code: 'USR_REG_OK',
          message: 'El asociado ha sido creada correctamente.',
          status: 201,
        },
        { user: user.userId },
      );
    } catch (error) {
      if (error instanceof CustomException) throw error;
      throw new CustomException(
        RESPONSE_CODE.ERROR,
        'RegisterUserUC.create',
        'Technical',
        error,
      );
    }
  }
}
