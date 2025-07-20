#!/usr/bin/env node
import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { Logger, PinoLogger } from './shared/libs/logger/index.js';
import { Config, RestConfig } from './shared/libs/config/index.js';
import { DatabaseClient, MongoDatabaseClient } from './shared/libs/database-client/index.js';
import { RestSchema } from './shared/libs/config/rest.schema.js';
import { Component } from './shared/types/component.enum.js';

async function bootstrap() {
  const container = new Container();

  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();

  const restApplication = container.get<RestApplication>(Component.RestApplication);
  await restApplication.init();
}

bootstrap();
