import { injectable, inject } from 'inversify';
import { config } from 'dotenv';
import { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';
import { configRestSchema, RestSchema } from './rest.schema.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly logger: Logger;
  private readonly config: RestSchema;

  constructor(@inject(Component.Logger) logger: Logger) {
    this.logger = logger;

    const parsedOutput = config();

    if (parsedOutput.error) {
      this.logger.error('Config parsing failed', parsedOutput.error);
      throw new Error(`Config parsing failed: ${parsedOutput.error.message}`);
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict' });

    this.config = configRestSchema.getProperties() as RestSchema;
    this.logger.info('Configuration loaded and validated successfully');
  }

  public get<K extends keyof RestSchema>(key: K): RestSchema[K] {
    return this.config[key];
  }
}
