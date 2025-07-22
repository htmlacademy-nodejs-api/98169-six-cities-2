import {
  prop,
  getModelForClass,
  defaultClasses,
  Ref,
  modelOptions,
} from '@typegoose/typegoose';
import { OfferType } from '../../types/offer-type.enum.js';
import { Amenity } from '../../types/amenity.type.js';
import { Coordinates } from '../../types/coordinates.type.js';
import { UserEntity } from '../user/user.entity.js';
import { CityEntity } from '../city/city.entity.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  constructor(offerData: Partial<OfferEntity>) {
    super();
    Object.assign(this, offerData);
  }

  @prop({ required: true, minlength: 10, maxlength: 100 })
  public title!: string;

  @prop({ required: true, minlength: 20, maxlength: 1024 })
  public description!: string;

  @prop({ ref: CityEntity, required: true, default: null, _id: false })
  public city!: Ref<CityEntity>;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ required: true, type: () => [String] })
  public photos!: string[];

  @prop({ required: true, default: false })
  public isPremium!: boolean;

  @prop({ required: true, default: false })
  public isFavorite!: boolean;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

  @prop({ required: true, enum: OfferType, type: () => String })
  public type!: OfferType;

  @prop({ required: true, min: 1, max: 8 })
  public rooms!: number;

  @prop({ required: true, min: 1, max: 10 })
  public guests!: number;

  @prop({ required: true, min: 100, max: 100000 })
  public price!: number;

  @prop({ required: true, type: () => [String] })
  public amenities!: Amenity[];

  @prop({ ref: UserEntity, required: true })
  public author!: Ref<UserEntity>;

  @prop({ required: true, default: 0 })
  public commentsCount!: number;

  @prop({ required: true })
  public coordinates!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
