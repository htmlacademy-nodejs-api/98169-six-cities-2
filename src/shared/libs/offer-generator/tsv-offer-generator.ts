import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { OffersResponseDto } from '../../types/api-response.type.js';
import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../utils/random.js';

export class OfferGenerator implements OfferGeneratorInterface {
  public generate(data: OffersResponseDto, count: number): string {
    const results: string[] = [];

    for (let i = 0; i < count; i++) {
      const baseOffer = getRandomItem(data.offers);

      const title = this.generateTitle(data.offers.map((o) => o.title));
      const description = this.generateDescription(
        data.offers.map((o) => o.description)
      );
      const postDate = this.generateRandomDate();
      const city = getRandomItem(data.offers).city;
      const previewImage = this.generateImageUrl(city.name, 'preview');
      const image = this.generateImageUrl(city.name, '1');
      const isPremium = Math.random() > 0.5;
      const isFavourite = Math.random() > 0.7;
      const rating = generateRandomValue(1, 5, 1);
      const type = getRandomItem(data.offers).type;
      const rooms = generateRandomValue(1, 8);
      const guests = generateRandomValue(1, 10);
      const price = generateRandomValue(100, 100000);
      const amenities = getRandomItems(
        data.offers.flatMap((o) => o.amenities)
      ).join(';');
      const user = getRandomItem(data.offers).user;
      const coordinates = baseOffer.coordinates;

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
        coordinates.latitude.toString(),
        coordinates.longitude.toString(),
      ].join('\t');

      results.push(tsvLine);
    }

    return results.join('\n');
  }

  private generateTitle(titles: string[]): string {
    const baseTitle = getRandomItem(titles);
    const adjectives = [
      'Beautiful',
      'Charming',
      'Luxury',
      'Cozy',
      'Modern',
      'Spacious',
      'Private',
      'Executive',
    ];
    const adjective = getRandomItem(adjectives);
    return baseTitle.replace(/^[A-Z][a-z]+/, adjective);
  }

  private generateDescription(descriptions: string[]): string {
    return getRandomItem(descriptions);
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
