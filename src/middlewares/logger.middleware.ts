import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: any, res: any, next: () => void) {
    const { method, originalUrl } = req;

    this.logger.log(`Path: ${originalUrl} Method: ${method}`);
    console.log(req);
    console.log('\n\n\n');
    console.log(res);
    next();
  }
}
