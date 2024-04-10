import { Location } from 'src/location/location/infrastructure/persistence/model/location.model';

export abstract class LocationRepository {
  abstract existsByLocationNumber(locationNumber: string): Promise<boolean>;
  abstract hasLocationId(locationId: string): Promise<boolean>;
  abstract create(locationData: Partial<Location>): Promise<Location>;
  abstract update(id: string, locationData: Partial<Location>): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
