import { ContainerModule } from 'inversify';
import { UserService } from './user-service.interface.js';
import { DefaultUserService } from './default-user.service.js';
import { UserEntity, UserModel } from './user.entity.js';
import { Component } from '../../types/component.enum.js';
import { types } from '@typegoose/typegoose';

export const userModule = new ContainerModule(({ bind }) => {
  bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
});
