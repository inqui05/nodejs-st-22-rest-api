import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: any, res: any, next: () => void) {
    const { method, originalUrl } = req;

    this.logger.log(`Path: ${originalUrl} Method: ${method}`);
    console.log(req);
    console.log(res);

    process.on('unhandledRejection', (reason, promise) => {
      this.logger.warn(`${reason}. Unhandled Rejection at:`);
      console.error(promise);
    });

    process.on('UncaughtException', (err) => {
      this.logger.error(err);
      process.exit(1);
    });

    next();
  }
}
