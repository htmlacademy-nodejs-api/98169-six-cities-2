#!/usr/bin/env node
import { RestApplication } from './rest/index.js';
import { PinoLogger } from './shared/libs/logger/index.js';

async function bootstrap() {
  const logger = new PinoLogger();
  const restApplication = new RestApplication(logger);

  restApplication.init();
}

bootstrap();
