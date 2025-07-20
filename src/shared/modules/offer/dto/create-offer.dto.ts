import { OfferType } from '../../../types/offer-type.enum.js';
import { Amenity } from '../../../types/amenity.type.js';
import { Coordinates } from '../../../types/coordinates.type.js';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public cityId!: string;
  public previewImage!: string;
  public photos!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public type!: OfferType;
  public rooms!: number;
  public guests!: number;
  public price!: number;
  public amenities!: Amenity[];
  public authorId!: string;
  public coordinates!: Coordinates;
}
