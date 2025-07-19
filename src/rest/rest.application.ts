import { injectable, inject } from 'inversify';
import { Logger } from '../shared/libs/logger/index.js';
import { Config } from '../shared/libs/config/index.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { Component } from '../shared/types/component.enum.js';

@injectable()
export class RestApplication {
  private readonly logger: Logger;
  private readonly config: Config<RestSchema>;

  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.Config) config: Config<RestSchema>
  ) {
    this.logger = logger;
    this.config = config;
  }

  public init(): void {
    this.logger.info('REST application is initialized');
    this.logger.info(`Server will run on port: ${this.config.get('PORT')}`);
  }
}
