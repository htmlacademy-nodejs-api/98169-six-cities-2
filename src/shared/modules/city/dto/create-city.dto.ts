import { Coordinates } from '../../../types/coordinates.type.js';

export class CreateCityDto {
  public name!: string;
  public coordinates!: Coordinates;
}
