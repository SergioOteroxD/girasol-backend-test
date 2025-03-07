import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CustomLogger } from '../../commons/util/logger';
import { IresponseHttp } from '../../commons/response/common/entity/response-http.model';
import { GeneralUtils } from '../../commons/util/general.util';

/**
 * Intercepta todas la solicitudes http que llegen al servicio para formatear la respuesta
 */
@Injectable()
export class RequestHttpInterceptor implements NestInterceptor<IresponseHttp> {
  private readonly logger = CustomLogger.getInstance();

  constructor() {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IresponseHttp> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;
    const requestMetada = {
      requestIp: req?.headers?.['X-Forwarded-For'] ?? req?.headers?.['host'],
      requestAgent:
        req?.headers?.['User-Agent'] ?? req?.headers?.['user-agent'],
    };

    //Inicia traza
    const traceId = GeneralUtils.getTraceId;

    // Set tracing data
    this.logger.setTracerLog({
      traceId,
      requestData: { url, method },
      requestMetada,
    });

    return next.handle().pipe(
      tap((_result: IresponseHttp) => {
        if (_result) {
          // Verifica si _result está definido
          const { status, code } = _result;
          context.switchToHttp().getResponse().status(status);
          this.logger.info('Execution finished.', { code, status });
        } else {
          this.logger.info(
            'Interceptor: Resultado indefinido, no se pudo desestructurar.',
          );
        }
      }),
    );
  }
}
