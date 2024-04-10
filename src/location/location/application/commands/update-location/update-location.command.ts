import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

import { Location } from '../../../../location/infrastructure/persistence/model/location.model';
import { LoggerService } from '../../../../../shared/logger.service';
import { LocationService } from '../../../infrastructure/service/location.service';
import { LocationRepository } from '../../persistence/repositories/location.repository';

export class UpdateLocationCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly locationData: Partial<Location>,
  ) {}
}

@CommandHandler(UpdateLocationCommand)
export class UpdateLocationCommandHandler
  implements ICommandHandler<UpdateLocationCommand, void>
{
  constructor(
    private readonly locationRepository: LocationRepository,
    private readonly locationService: LocationService,
    private readonly loggerService: LoggerService,
  ) {}

  async execute({ id, locationData }: UpdateLocationCommand): Promise<void> {
    this.loggerService.log(`Command: ${UpdateLocationCommand.name}`);

    const foundLocation = await this.locationRepository.hasLocationId(id);
    if (!foundLocation) {
      throw new BadRequestException('Location not found');
    }

    await this.locationService.updateLocation(id, locationData);
  }
}
