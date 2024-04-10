import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

import { LoggerService } from '../../../../../shared/logger.service';
import { LocationService } from '../../../infrastructure/service/location.service';
import { LocationRepository } from '../../persistence/repositories/location.repository';

export class DeleteLocationCommand implements ICommand {
  constructor(public readonly id: string) {}
}

@CommandHandler(DeleteLocationCommand)
export class DeleteLocationCommandHandler
  implements ICommandHandler<DeleteLocationCommand, void>
{
  constructor(
    private readonly locationRepository: LocationRepository,
    private readonly locationService: LocationService,
    private readonly loggerService: LoggerService,
  ) {}

  async execute({ id }: DeleteLocationCommand): Promise<void> {
    this.loggerService.log(`Command: ${DeleteLocationCommand.name}`);

    const foundLocation = await this.locationRepository.hasLocationId(id);
    if (!foundLocation) {
      throw new BadRequestException('Location not found');
    }

    await this.locationService.deleteLocation(id);
  }
}
