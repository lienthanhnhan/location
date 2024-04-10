import { Injectable } from '@nestjs/common';
import { LocationRepository } from '../../application/persistence/repositories/location.repository';
import { Location } from '../persistence/model/location.model';

@Injectable()
export class LocationService {
  constructor(private locationRepository: LocationRepository) {}

  async createLocation(locationData: Partial<Location>): Promise<Location> {
    return this.locationRepository.create(locationData);
  }

  async updateLocation(
    id: string,
    locationData: Partial<Location>,
  ): Promise<void> {
    return this.locationRepository.update(id, locationData);
  }

  async deleteLocation(id: string): Promise<void> {
    return this.locationRepository.delete(id);
  }
}
