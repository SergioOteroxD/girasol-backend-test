import { IuserContext } from '../../core/entity/user-context.entity';
import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const DuserContext = createParamDecorator(
  (required: boolean, ctx: ExecutionContext): IuserContext => {
    try {
      const request = ctx.switchToHttp().getRequest();
      const token = request['user'];

      if (!token.userId)
        throw new Error('Asegúrese de indicar datos válidos de solicitante.');

      return token;
    } catch {
      throw new ForbiddenException(
        'Asegúrese de indicar datos válidos de solicitante.',
      );
    }
  },
);
