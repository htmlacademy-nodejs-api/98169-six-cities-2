import { ContainerModule } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { DefaultOfferService } from './default-offer.service.js';
import { OfferEntity, OfferModel } from './offer.entity.js';
import { Component } from '../../types/component.enum.js';
import { types } from '@typegoose/typegoose';

export const offerModule = new ContainerModule(({ bind }) => {
  bind<OfferService>(Component.OfferService)
    .to(DefaultOfferService)
    .inSingletonScope();
  bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(
    OfferModel
  );
});
