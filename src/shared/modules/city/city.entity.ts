import { prop, getModelForClass, defaultClasses, modelOptions } from '@typegoose/typegoose';
import { Coordinates } from '../../types/coordinates.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'cities',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CityEntity extends defaultClasses.TimeStamps {
  constructor(cityData: Partial<CityEntity>) {
    super();
    Object.assign(this, cityData);
  }

  @prop({ required: true, unique: true })
  public name!: string;

  @prop({ required: true })
  public coordinates!: Coordinates;
}

export const CityModel = getModelForClass(CityEntity);
