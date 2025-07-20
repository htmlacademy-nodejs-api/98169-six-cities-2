import { ContainerModule } from 'inversify';
import { CityService } from './city-service.interface.js';
import { DefaultCityService } from './default-city.service.js';
import { CityEntity, CityModel } from './city.entity.js';
import { Component } from '../../types/component.enum.js';
import { types } from '@typegoose/typegoose';

export const cityModule = new ContainerModule(({ bind }) => {
  bind<CityService>(Component.CityService)
    .to(DefaultCityService)
    .inSingletonScope();
  bind<types.ModelType<CityEntity>>(Component.CityModel).toConstantValue(
    CityModel
  );
});
