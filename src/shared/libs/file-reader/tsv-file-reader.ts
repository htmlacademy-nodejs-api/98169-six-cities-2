import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { City } from '../../types/city.type.js';
import { Amenity } from '../../types/amenity.type.js';
import { UserType } from '../../types/user-type.enum.js';

export class TSVFileReader implements FileReader {
  private rawData = '';
  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
          title,
          description,
          createdDate,
          city,
          previewImage,
          images,
          isPremium,
          isFavourite,
          rating,
          type,
          rooms,
          guests,
          price,
          amenities,
          authorName,
          authorEmail,
          authorAvatar,
          authorType,
          latitude,
          longitude,
        ]) => ({
          title,
          description,
          postDate: new Date(createdDate),
          city: city as City,
          previewImage,
          images,
          isPremium: isPremium === 'true',
          isFavourite: isFavourite === 'true',
          rating: Number.parseFloat(rating),
          type: type as OfferType,
          rooms: Number.parseInt(rooms, 10),
          guests: Number.parseInt(guests, 10),
          price: Number.parseInt(price, 10),
          amenities: amenities.split(';').map((amenity) => amenity.trim() as Amenity),
          user: {
            name: authorName,
            email: authorEmail,
            avatarPath: authorAvatar || undefined,
            type: authorType as UserType,
          },
          coordinates: {
            latitude: Number.parseFloat(latitude),
            longitude: Number.parseFloat(longitude),
          },
        })
      );
  }
}
