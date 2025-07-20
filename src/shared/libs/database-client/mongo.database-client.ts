import { injectable, inject } from 'inversify';
import mongoose from 'mongoose';
import { DatabaseClient } from './database-client.interface.js';
import { Logger } from '../logger/index.js';
import { Config } from '../config/index.js';
import { RestSchema } from '../config/rest.schema.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof mongoose;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {
    this.mongoose = mongoose;
    this.isConnected = false;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB…');

    await this.mongoose.connect(uri);
    this.isConnected = true;

    this.logger.info('Database connection established.');
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect();
    this.isConnected = false;

    this.logger.info('Database connection closed.');
  }

  public isConnectedToDatabase(): boolean {
    return this.isConnected;
  }

}
