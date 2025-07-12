import { MockDataDto } from '../../types/api-response.type.js';

export interface OfferGeneratorInterface {
  generate(data: MockDataDto, count: number): string;
}
