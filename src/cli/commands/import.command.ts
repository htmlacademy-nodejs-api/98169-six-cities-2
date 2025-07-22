import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { getMongoUri } from '../../shared/helpers/index.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { CityService } from '../../shared/modules/city/city-service.interface.js';
import { OfferService } from '../../shared/modules/offer/offer-service.interface.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { PinoLogger } from '../../shared/libs/logger/pino.logger.js';
import { DefaultUserService } from '../../shared/modules/user/default-user.service.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import { DefaultCityService } from '../../shared/modules/city/default-city.service.js';
import { CityModel } from '../../shared/modules/city/city.entity.js';
import { DefaultOfferService } from '../../shared/modules/offer/default-offer.service.js';
import { OfferModel } from '../../shared/modules/offer/offer.entity.js';
import {
  DEFAULT_DB_PORT,
  DEFAULT_DB_PASSWORD,
} from '../../shared/constants/command.constant.js';
import { Offer } from '../../shared/types/offer.type.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private cityService: CityService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string = '';

  constructor() {
    this.onImportedOffer = this.onImportedOffer.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new PinoLogger();
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.cityService = new DefaultCityService(this.logger, CityModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedOffer(offer: Offer, resolve: () => void) {
    await this.saveOffer(offer);
    resolve();
  }

  private async onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    await this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate(
      {
        name: offer.user.name,
        email: offer.user.email,
        avatarPath: offer.user.avatarPath,
        type: offer.user.type,
        password: DEFAULT_DB_PASSWORD,
      },
      this.salt
    );

    const city = await this.cityService.findByNameOrCreate({
      name: offer.city,
      coordinates: offer.coordinates,
    });

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      city: city.id,
      previewImage: offer.previewImage,
      photos: offer.images,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavourite,
      rating: offer.rating,
      type: offer.type,
      rooms: offer.rooms,
      guests: offer.guests,
      price: offer.price,
      amenities: offer.amenities,
      author: user.id,
      coordinates: offer.coordinates,
    });
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoUri(host, DEFAULT_DB_PORT, login, password, dbname);
    console.log('🚀 ~ ImportCommand ~ uri:', uri);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('offer', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
    }
  }
}
