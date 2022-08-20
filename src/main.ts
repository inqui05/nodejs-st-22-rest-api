const safeJsonStringify = require('safe-json-stringify');
import { Logger } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger = new Logger('HTTP');

process.on('unhandledRejection', (reason, promise) => {
  const promiseError = safeJsonStringify(promise, null, 2);
  logger.error(`${reason}. Unhandled Rejection at: ${promiseError}`);
  process.exit(1);
});

process.on('UncaughtException', (err) => {
  logger.error(err);
  process.exit(1);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(Number(process.env.PORT));
}
bootstrap();
