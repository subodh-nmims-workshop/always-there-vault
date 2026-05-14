import * as Sentry from '@sentry/node';
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  trace?: string;
  metadata?: any;
}

@Injectable()
export class LoggerService implements NestLoggerService {
  private sentryDsn: string;
  private environment: string;

  constructor(private configService?: ConfigService) {
    this.sentryDsn = this.configService?.get<string>('SENTRY_DSN') || process.env.SENTRY_DSN || '';
    this.environment = this.configService?.get<string>('NODE_ENV') || process.env.NODE_ENV || 'development';

    if (!this.sentryDsn && this.environment === 'production') {
      console.warn('⚠️  SENTRY_DSN not configured. Error tracking will be disabled.');
    }
  }

  log(message: string, context?: string) {
    this.writeLog(LogLevel.INFO, message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.writeLog(LogLevel.ERROR, message, context, trace);
    this.sendToSentry(message, trace, context);
  }

  warn(message: string, context?: string) {
    this.writeLog(LogLevel.WARN, message, context);
  }

  debug(message: string, context?: string) {
    if (this.environment === 'development') {
      this.writeLog(LogLevel.DEBUG, message, context);
    }
  }

  verbose(message: string, context?: string) {
    if (this.environment === 'development') {
      this.writeLog(LogLevel.DEBUG, message, context);
    }
  }

  private writeLog(level: LogLevel, message: string, context?: string, trace?: string) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      trace,
    };

    const color = this.getColor(level);
    const emoji = this.getEmoji(level);
    const contextStr = context ? `[${context}]` : '';

    console.log(
      `${color}${emoji} ${entry.timestamp} ${level.toUpperCase()} ${contextStr} ${message}\x1b[0m`,
    );

    if (trace) {
      console.log(`${color}${trace}\x1b[0m`);
    }
  }

  private getColor(level: LogLevel): string {
    switch (level) {
      case LogLevel.ERROR:
        return '\x1b[31m'; // Red
      case LogLevel.WARN:
        return '\x1b[33m'; // Yellow
      case LogLevel.INFO:
        return '\x1b[36m'; // Cyan
      case LogLevel.DEBUG:
        return '\x1b[35m'; // Magenta
      default:
        return '\x1b[0m'; // Reset
    }
  }

  private getEmoji(level: LogLevel): string {
    switch (level) {
      case LogLevel.ERROR:
        return '❌';
      case LogLevel.WARN:
        return '⚠️ ';
      case LogLevel.INFO:
        return 'ℹ️ ';
      case LogLevel.DEBUG:
        return '🔍';
      default:
        return '📝';
    }
  }

  private async sendToSentry(message: string, trace?: string, context?: string) {
    if (!this.sentryDsn) {
      return;
    }

    try {
      Sentry.withScope((scope) => {
        if (context) scope.setTag('context', context);
        if (trace) scope.setExtra('trace', trace);
        
        if (trace || message.toLowerCase().includes('error')) {
          Sentry.captureException(new Error(message));
        } else {
          Sentry.captureMessage(message);
        }
      });
    } catch (error) {
      console.error('Failed to send to Sentry:', error);
    }
  }

  logRequest(method: string, url: string, statusCode: number, duration: number) {
    const message = `${method} ${url} ${statusCode} - ${duration}ms`;
    this.log(message, 'HTTP');
  }

  logDatabaseQuery(query: string, duration: number) {
    if (this.environment === 'development') {
      this.debug(`Query: ${query} - ${duration}ms`, 'Database');
    }
  }

  logBlockchainTransaction(txHash: string, status: string) {
    this.log(`Transaction ${txHash}: ${status}`, 'Blockchain');
  }
}
