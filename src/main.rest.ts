#!/usr/bin/env node
import 'reflect-metadata';
import { RestApplication } from './rest/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { Component } from './shared/types/component.enum.js';

async function bootstrap() {
  // Create REST application container with core dependencies
  const restContainer = createRestApplicationContainer();

  // Create user container and copy its bindings to REST container
  const userContainer = createUserContainer();

  // Copy user bindings to REST container
  const userService = userContainer.get(Component.UserService);
  const userModel = userContainer.get(Component.UserModel);
  restContainer.bind(Component.UserService).toConstantValue(userService);
  restContainer.bind(Component.UserModel).toConstantValue(userModel);

  const restApplication = restContainer.get<RestApplication>(
    Component.RestApplication
  );
  await restApplication.init();
}

bootstrap();
