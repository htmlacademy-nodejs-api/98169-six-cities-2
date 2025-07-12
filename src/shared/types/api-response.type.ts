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

export type MockDataDto = {
  titles: string[];
  descriptions: string[];
  cities: CityDto[];
  amenities: Amenity[];
  users: UserDto[];
};
