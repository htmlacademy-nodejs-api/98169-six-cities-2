import { MockDataDto } from '../../types/api-response.type.js';
import { Offer } from '../../types/offer.type.js';

export interface OfferGeneratorInterface {
  generate(data: MockDataDto, count: number): Offer[];
}
