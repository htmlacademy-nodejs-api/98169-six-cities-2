import { createReadStream } from 'node:fs';
import { EventEmitter } from 'node:events';
import { createInterface } from 'node:readline';
import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { City } from '../../types/city.type.js';
import { Amenity } from '../../types/amenity.type.js';
import { UserType } from '../../types/user-type.enum.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(private readonly filename: string) {
    super();
  }

  private parseLineToOffer(line: string): Offer {
    const [
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
    ] = line.split('\t');

    return {
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
      amenities: amenities
        .split(';')
        .map((amenity) => amenity.trim() as Amenity),
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
    };
  }

  public read(): void {
    const stream = createReadStream(this.filename, { encoding: 'utf-8' });
    const lineReader = createInterface({ input: stream });

    lineReader.on('line', (line: string) => {
      if (line.trim().length > 0) {
        try {
          const offer = this.parseLineToOffer(line);
          this.emit('offer', offer);
        } catch (error) {
          this.emit('error', error);
        }
      }
    });

    lineReader.on('close', () => {
      this.emit('end');
    });

    stream.on('error', (error) => {
      this.emit('error', error);
    });
  }
}
