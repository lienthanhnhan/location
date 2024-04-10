import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location/infrastructure/web/location.controller';
import { LocationService } from './location/infrastructure/service/location.service';
import { LocationRepository } from './location/application/persistence/repositories/location.repository';
import { SqlLocationRepository } from './location/infrastructure/persistence/sql-location.repository';
import { LoggerService } from '../shared/logger.service';
import { LocationEntity } from './location/domain/entities/location.entity';
import { CreateLocationCommandHandler } from './location/application/commands/create-location/create-location.command';
import { UpdateLocationCommandHandler } from './location/application/commands/update-location/update-location.command';
import { DeleteLocationCommandHandler } from './location/application/commands/delete-location/delete-location.command';

const commands: Array<Provider> = [
  CreateLocationCommandHandler,
  UpdateLocationCommandHandler,
  DeleteLocationCommandHandler,
];

const repositories: Array<Provider> = [
  {
    provide: LocationRepository,
    useClass: SqlLocationRepository,
  },
];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([LocationEntity])],
  providers: [LocationService, LoggerService, ...repositories, ...commands],
  controllers: [LocationController],
})
export class LocationModule {}
