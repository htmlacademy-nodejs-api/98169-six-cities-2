import { OffersResponseDto } from '../../types/api-response.type.js';

export interface OfferGeneratorInterface {
  generate(data: OffersResponseDto, count: number): string;
}
