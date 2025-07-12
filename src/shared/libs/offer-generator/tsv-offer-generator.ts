import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockDataDto } from '../../types/api-response.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../utils/random.js';

export class OfferGenerator implements OfferGeneratorInterface {
  private readonly offerTypes = [
    OfferType.Apartment,
    OfferType.House,
    OfferType.Room,
    OfferType.Hotel,
  ];

  private readonly minRating = 1;
  private readonly maxRating = 5;
  private readonly minRooms = 1;
  private readonly maxRooms = 8;
  private readonly minGuests = 1;
  private readonly maxGuests = 10;
  private readonly minPrice = 100;
  private readonly maxPrice = 100000;

  public generate(data: MockDataDto, count: number): string {
    if (
      !data.titles?.length ||
      !data.descriptions?.length ||
      !data.cities?.length ||
      !data.users?.length
    ) {
      throw new Error('Invalid mock data: missing required arrays');
    }

    const results: string[] = [];

    for (let i = 0; i < count; i++) {
      const title = getRandomItem(data.titles);
      const description = getRandomItem(data.descriptions);
      const postDate = this.generateRandomDate();
      const city = getRandomItem(data.cities);
      const previewImage = this.generateImageUrl(city.name, 'preview');
      const image = this.generateImageUrl(city.name, '1');
      const isPremium = generateRandomValue(0, 1) > 0.5;
      const isFavourite = generateRandomValue(0, 1) > 0.7;
      const rating = generateRandomValue(this.minRating, this.maxRating, 1);
      const type = getRandomItem(this.offerTypes);
      const rooms = generateRandomValue(this.minRooms, this.maxRooms);
      const guests = generateRandomValue(this.minGuests, this.maxGuests);
      const price = generateRandomValue(this.minPrice, this.maxPrice);
      const amenities =
        data.amenities?.length > 0
          ? getRandomItems(data.amenities).join(';')
          : '';
      const user = getRandomItem(data.users);

      const tsvLine = [
        title,
        description,
        postDate,
        city.name,
        previewImage,
        image,
        isPremium.toString(),
        isFavourite.toString(),
        rating.toString(),
        type,
        rooms.toString(),
        guests.toString(),
        price.toString(),
        amenities,
        user.name,
        user.email,
        user.avatar,
        user.type,
        city.latitude.toString(),
        city.longitude.toString(),
      ].join('\t');

      results.push(tsvLine);
    }

    return results.join('\n');
  }

  private generateRandomDate(): string {
    const start = new Date('2024-01-01');
    const end = new Date('2025-12-31');
    const randomTime =
      start.getTime() + Math.random() * (end.getTime() - start.getTime());
    return new Date(randomTime).toISOString();
  }

  private generateImageUrl(cityName: string, suffix: string): string {
    return `https://example.com/images/${cityName.toLowerCase()}-${suffix}.jpg`;
  }
}
