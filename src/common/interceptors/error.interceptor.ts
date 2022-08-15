const safeJsonStringify = require('safe-json-stringify');
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const methodName = context.getHandler().name;
    const className = context.getClass().name;
    const req = safeJsonStringify(context.switchToHttp().getRequest(), null, 2);
    const res = safeJsonStringify(context.switchToHttp().getResponse(), null, 2);

    return next.handle().pipe(
      catchError(async (err) => {
          this.logger.log(`Error in method ${methodName} of ${className}\n${req}\n${res}`,);
          throw new HttpException(err.response, err.status);
      }));
  }
}
