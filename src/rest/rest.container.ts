import { ContainerModule } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Config, RestConfig } from '../shared/libs/config/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../shared/libs/database-client/index.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { Component } from '../shared/types/component.enum.js';

export const restApplicationModule = new ContainerModule(({ bind }) => {
  bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  bind<DatabaseClient>(Component.DatabaseClient)
    .to(MongoDatabaseClient)
    .inSingletonScope();
  bind<RestApplication>(Component.RestApplication)
    .to(RestApplication)
    .inSingletonScope();
});
