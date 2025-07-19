#!/usr/bin/env node
import { RestApplication } from './rest/index.js';
import { PinoLogger } from './shared/libs/logger/index.js';
import { RestConfig } from './shared/libs/config/index.js';

async function bootstrap() {
  const logger = new PinoLogger();
  const config = new RestConfig();
  const restApplication = new RestApplication(logger, config);

  restApplication.init();
}

bootstrap();
