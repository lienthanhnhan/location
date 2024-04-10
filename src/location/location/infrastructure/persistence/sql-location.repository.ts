import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LocationRepository } from '../../application/persistence/repositories/location.repository';
import { LocationEntity } from '../../domain/entities/location.entity';
import { LoggerService } from '../../../../shared/logger.service';
import { Location } from './model/location.model';

@Injectable()
export class SqlLocationRepository implements LocationRepository {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
    private readonly loggerService: LoggerService,
  ) {}

  async hasLocationId(locationId: string): Promise<boolean> {
    try {
      const count = await this.locationRepository.countBy({ id: locationId });
      return count > 0;
    } catch (error) {
      this.loggerService.error(
        `${SqlLocationRepository.name} Method: ${this.hasLocationId.name}`,
        error,
      );
      throw error;
    }
  }

  async existsByLocationNumber(locationNumber: string): Promise<boolean> {
    try {
      const count = await this.locationRepository.countBy({ locationNumber });
      return count > 0;
    } catch (error) {
      this.loggerService.error(
        `${SqlLocationRepository.name} Method: ${this.existsByLocationNumber.name}`,
        error,
      );
      throw error;
    }
  }

  async create(locationData: Partial<Location>): Promise<Location> {
    try {
      const location = await this.locationRepository.create(locationData);
      return await this.locationRepository.save(location);
    } catch (error) {
      this.loggerService.error(
        `${SqlLocationRepository.name} Method: ${this.create.name}`,
        error,
      );
      throw error;
    }
  }

  async update(id: string, locationData: Partial<Location>): Promise<void> {
    try {
      await this.locationRepository.update(id, locationData);
    } catch (error) {
      this.loggerService.error(
        `${SqlLocationRepository.name} Method: ${this.update.name}`,
        error,
      );
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.locationRepository.delete(id);
    } catch (error) {
      this.loggerService.error(
        `${SqlLocationRepository.name} Method: ${this.delete.name}`,
        error,
      );
      throw error;
    }
  }
}
