import { Logger } from '../shared/libs/logger/index.js';
import { Config } from '../shared/libs/config/index.js';

export class RestApplication {
  private readonly logger: Logger;
  private readonly config: Config;

  constructor(logger: Logger, config: Config) {
    this.logger = logger;
    this.config = config;
  }

  public init(): void {
    this.logger.info('REST application is initialized');
    this.logger.info(
      `Server will run on port: ${this.config.get('PORT') || '3000'}`
    );
  }
}
