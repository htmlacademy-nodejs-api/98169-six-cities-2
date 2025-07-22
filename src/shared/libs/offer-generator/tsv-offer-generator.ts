import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockDataDto } from '../../types/api-response.type.js';
import { Offer } from '../../types/offer.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserType } from '../../types/user-type.enum.js';
import { City } from '../../types/city.type.js';
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

  public generate(data: MockDataDto, count: number): Offer[] {
    if (
      !data.titles?.length ||
      !data.descriptions?.length ||
      !data.cities?.length ||
      !data.users?.length
    ) {
      throw new Error('Invalid mock data: missing required arrays');
    }

    const results: Offer[] = [];

    for (let i = 0; i < count; i++) {
      const title = getRandomItem(data.titles);
      const description = getRandomItem(data.descriptions);
      const postDate = new Date(this.generateRandomDate());
      const cityData = getRandomItem(data.cities);
      const previewImage = this.generateImageUrl(cityData.name, 'preview');
      const images = this.generateImageUrls(cityData.name, 6);
      const isPremium = generateRandomValue(0, 1) > 0.5;
      const isFavourite = generateRandomValue(0, 1) > 0.7;
      const rating = generateRandomValue(this.minRating, this.maxRating, 1);
      const type = getRandomItem(this.offerTypes);
      const rooms = generateRandomValue(this.minRooms, this.maxRooms);
      const guests = generateRandomValue(this.minGuests, this.maxGuests);
      const price = generateRandomValue(this.minPrice, this.maxPrice);
      const amenities = data.amenities?.length > 0 ? getRandomItems(data.amenities) : [];
      const userData = getRandomItem(data.users);

      const offer: Offer = {
        title,
        description,
        postDate,
        city: cityData.name as City,
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
        user: {
          name: userData.name,
          email: userData.email,
          avatarPath: userData.avatar || undefined,
          type: userData.type as UserType,
        },
        coordinates: {
          latitude: cityData.latitude,
          longitude: cityData.longitude,
        },
      };

      results.push(offer);
    }

    return results;
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

  private generateImageUrls(cityName: string, count: number): string[] {
    const urls: string[] = [];
    for (let i = 1; i <= count; i++) {
      urls.push(this.generateImageUrl(cityName, i.toString()));
    }
    return urls;
  }
}
