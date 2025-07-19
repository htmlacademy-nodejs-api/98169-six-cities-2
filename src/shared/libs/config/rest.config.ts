import { config } from 'dotenv';
import { Config } from './config.interface.js';
import { Logger, PinoLogger } from '../logger/index.js';

export class RestConfig implements Config {
  private readonly config: NodeJS.ProcessEnv;
  private readonly logger: Logger;

  constructor() {
    this.logger = new PinoLogger();

    const parsedOutput = config();

    if (parsedOutput.error) {
      this.logger.error('Config parsing failed', parsedOutput.error);
      throw new Error(`Config parsing failed: ${parsedOutput.error.message}`);
    }

    this.config = { ...process.env, ...parsedOutput.parsed };
    this.logger.info('Configuration loaded successfully');
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
