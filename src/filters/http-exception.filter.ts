import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { isArray } from 'class-validator';
import { Response } from 'express';
import { get } from 'lodash';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = get(exception, 'response.message');

    response.status(status).json({
      statusCode: status,
      message:
        (isArray(message) ? get(exception, 'response.message[0]') : message) ||
        exception.message ||
        'Internal server error',
    });
  }
}
