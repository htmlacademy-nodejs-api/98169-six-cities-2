import { injectable, inject } from 'inversify';
import mongoose from 'mongoose';
import { DatabaseClient } from './database-client.interface.js';
import { Logger } from '../logger/index.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof mongoose;
  private isConnected: boolean;
  private readonly retryCount = 5;
  private readonly retryTimeout = 1000;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.mongoose = mongoose;
    this.isConnected = false;
  }

  public async connect(uri: string): Promise<void> {
    this.logger.info('uri', uri);
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB…');

    let currentRetry = 0;
    while (currentRetry < this.retryCount) {
      try {
        await this.mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        currentRetry++;
        this.logger.error(`Failed to connect to the database. Attempt ${currentRetry} of ${this.retryCount}.`, error as Error);

        if (currentRetry === this.retryCount) {
          this.logger.error('Unable to establish database connection', error as Error);
          throw error;
        }

        this.logger.info(`Retrying in ${this.retryTimeout}ms...`);
        await new Promise((resolve) => setTimeout(resolve, this.retryTimeout));
      }
    }
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
