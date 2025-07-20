import { injectable, inject } from 'inversify';
import { Logger } from '../shared/libs/logger/index.js';
import { Config } from '../shared/libs/config/index.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoUri } from '../shared/helpers/index.js';
import { Component } from '../shared/types/component.enum.js';

@injectable()
export class RestApplication {
  private readonly logger: Logger;
  private readonly config: Config<RestSchema>;
  private readonly databaseClient: DatabaseClient;

  constructor(
    @inject(Component.Logger) logger: Logger,
    @inject(Component.Config) config: Config<RestSchema>,
    @inject(Component.DatabaseClient) databaseClient: DatabaseClient
  ) {
    this.logger = logger;
    this.config = config;
    this.databaseClient = databaseClient;
  }

  public async init(): Promise<void> {
    this.logger.info('REST application is initialized');
    this.logger.info(`Server will run on port: ${this.config.get('PORT')}`);

    this.logger.info('Connecting to the database...');
    await this._initDb();
    this.logger.info('Database initialization completed');
  }

  private async _initDb(): Promise<void> {
    const mongoUri = getMongoUri(
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_USERNAME'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_NAME')
    );

    await this.databaseClient.connect(mongoUri);
  }
}
