import { injectable, inject } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CityService } from './city-service.interface.js';
import { CityEntity } from './city.entity.js';
import { CreateCityDto } from './dto/create-city.dto.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class DefaultCityService implements CityService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CityModel)
    private readonly cityModel: types.ModelType<CityEntity>
  ) {}

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const city = new CityEntity(dto);
    const result = await this.cityModel.create(city);
    this.logger.info(`New city created: ${city.name}`);
    return result;
  }

  public async findById(
    cityId: string
  ): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findById(cityId);
  }

  public async findByName(
    name: string
  ): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({ name });
  }

  public async findByNameOrCreate(
    dto: CreateCityDto
  ): Promise<DocumentType<CityEntity>> {
    const existingCity = await this.findByName(dto.name);

    if (existingCity) {
      return existingCity;
    }

    return this.create(dto);
  }
}
