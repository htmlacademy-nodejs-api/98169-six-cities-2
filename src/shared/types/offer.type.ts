import { OfferType } from './offer-type.enum.js';
import { City } from './city.type.js';
import { User } from './user.type.js';
import { Amenity } from './amenity.type.js';
import { Coordinates } from './coordinates.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavourite: boolean;
  rating: number;
  type: OfferType;
  rooms: number;
  guests: number;
  price: number;
  amenities: Amenity[];
  user: User;
  coordinates: Coordinates;
};
