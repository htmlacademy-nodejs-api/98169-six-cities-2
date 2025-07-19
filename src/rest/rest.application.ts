import { Logger } from '../shared/libs/logger/index.js';

export class RestApplication {
  private readonly logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public init(): void {
    this.logger.info('REST application is initialized');
  }
}
