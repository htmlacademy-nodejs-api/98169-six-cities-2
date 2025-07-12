import { OfferType } from './offer-type.enum.js';
import { UserType } from './user-type.enum.js';
import { Amenity } from './amenity.type.js';

export type CityDto = {
  name: string;
  latitude: number;
  longitude: number;
};

export type UserDto = {
  name: string;
  email: string;
  avatar: string;
  type: UserType;
};

export type CoordinatesDto = {
  latitude: number;
  longitude: number;
};

export type OfferDto = {
  id: string;
  title: string;
  description: string;
  postDate: string;
  city: CityDto;
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
  user: UserDto;
  coordinates: CoordinatesDto;
};

export type OffersResponseDto = {
  offers: OfferDto[];
};
