const safeJsonStringify = require('safe-json-stringify');
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: any, res: any, next: () => void) {
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const reqJson = safeJsonStringify(req, null, 2);
      const resJson = safeJsonStringify(res, null, 2);
      this.logger.log(`Path: ${originalUrl} Method: ${method}\n${reqJson}\n${resJson}`);
    });

    next();
  }
}
