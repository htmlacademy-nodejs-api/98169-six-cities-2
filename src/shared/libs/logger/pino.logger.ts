import { injectable } from 'inversify';
import { pino, Logger as PinoLoggerInterface } from 'pino';
import { Logger } from './logger.interface.js';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: PinoLoggerInterface;

  constructor() {
    this.logger = pino({
      transport: {
        targets: [
          {
            target: 'pino/file',
            options: {
              destination: './logs/rest.log',
            },
          },
          {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          },
        ],
      },
    });
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }
}
