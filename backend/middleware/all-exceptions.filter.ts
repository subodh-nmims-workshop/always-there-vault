import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('SECURITY_AUDIT');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // SECURITY: Log the detailed error for admins, but send a generic message to the client
    this.logger.error(
      `❌ EXCEPTION: ${status} | Path: ${request.url} | Message: ${JSON.stringify(message)}`,
      exception instanceof Error ? exception.stack : '',
    );

    // If in production, mask detailed messages
    const isProduction = process.env.NODE_ENV === 'production';
    const friendlyMessage = isProduction && status === 500 
      ? 'An unexpected error occurred. Our security team has been notified.' 
      : message;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: friendlyMessage,
    });
  }
}
