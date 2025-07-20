#!/usr/bin/env node
import 'reflect-metadata';
import { Container } from 'inversify';
import { RestApplication } from './rest/index.js';
import { restApplicationModule } from './rest/rest.container.js';
import { userModule } from './shared/modules/user/user.container.js';
import { Component } from './shared/types/component.enum.js';

async function bootstrap() {
  const appContainer = new Container();

  appContainer.load(restApplicationModule);

  appContainer.load(userModule);

  const restApplication = appContainer.get<RestApplication>(
    Component.RestApplication
  );
  await restApplication.init();
}

bootstrap();
