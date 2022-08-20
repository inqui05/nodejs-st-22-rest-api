import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';

interface HttpExceptionResponse {
  statusCode: number;
  error: string;
}

@Catch()
export class LogAllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      errorMessage = (errorResponse as HttpExceptionResponse).error || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Internal Server Error';
    }

    const errorResponse: HttpExceptionResponse = {
      statusCode: status,
      error: errorMessage,
    }

    this.logger.log(`Path: ${request.url} Method: ${request.method}\n${request}\n${response}`);
    response.status(500).json(errorResponse);
  }
}
