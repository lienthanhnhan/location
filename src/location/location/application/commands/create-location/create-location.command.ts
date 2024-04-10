import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';

import { LoggerService } from '../../../../../shared/logger.service';
import { LocationService } from '../../../infrastructure/service/location.service';
import { LocationRepository } from '../../persistence/repositories/location.repository';

export class CreateLocationCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly location_number: string,
    public readonly area: number,
    public readonly parent_id: string,
  ) {}
}

@CommandHandler(CreateLocationCommand)
export class CreateLocationCommandHandler
  implements ICommandHandler<CreateLocationCommand, void>
{
  constructor(
    private readonly locationRepository: LocationRepository,
    private readonly locationService: LocationService,
    private readonly loggerService: LoggerService,
  ) {}

  async execute({
    name,
    location_number,
    area,
    parent_id,
  }: CreateLocationCommand): Promise<void> {
    this.loggerService.log(`Command: ${CreateLocationCommand.name}`);

    const isExists =
      await this.locationRepository.existsByLocationNumber(location_number);

    if (isExists) {
      throw new BadRequestException('Location number has already registered');
    }

    if (parent_id) {
      const isValidParentId =
        await this.locationRepository.hasLocationId(parent_id);
      if (!isValidParentId) {
        throw new BadRequestException('Invalid parent id');
      }
    }

    await this.locationService.createLocation({
      name,
      locationNumber: location_number,
      area,
      parentId: parent_id,
    });
  }
}
