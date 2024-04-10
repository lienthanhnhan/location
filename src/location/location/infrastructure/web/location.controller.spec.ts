import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { LocationController } from './location.controller';
import { CreateLocationPostInDto } from './dtos/create-location-post-in.dto';
import { UpdateLocationPutInDto } from './dtos/update-location-put-in.dto';

describe('LocationController', () => {
  let controller: LocationController;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [CommandBus],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  describe('createLocation', () => {
    it('should create a new location', async () => {
      const createLocationDto: CreateLocationPostInDto = {
        name: 'Test Location',
        location_number: '123',
        area: 100.5,
        parent_id: null,
      };

      jest.spyOn(commandBus, 'execute').mockResolvedValue(undefined);

      await expect(
        controller.createLocation(createLocationDto),
      ).resolves.toBeUndefined();
    });

    it('should throw BadRequestException if payload is invalid', async () => {
      const createLocationDto: CreateLocationPostInDto = {
        name: 'Test Location',
        location_number: '123',
        area: -100, // Invalid area
      };

      jest
        .spyOn(commandBus, 'execute')
        .mockRejectedValue(new BadRequestException());

      await expect(
        controller.createLocation(createLocationDto),
      ).rejects.toThrowError(
        new HttpException('Bad Request', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw InternalServerError if an error occurs', async () => {
      const createLocationDto: CreateLocationPostInDto = {
        name: 'Test Location',
        location_number: '123',
        area: 100.5,
        parent_id: null,
      };

      jest.spyOn(commandBus, 'execute').mockRejectedValue(new Error());

      await expect(
        controller.createLocation(createLocationDto),
      ).rejects.toThrowError(
        new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('updateLocation', () => {
    it('should update an existing location', async () => {
      const locationId = '1';
      const updateLocationDto: UpdateLocationPutInDto = {
        name: 'Updated Test Location',
        location_number: '456',
        area: 200.5,
        parent_id: null,
      };

      jest.spyOn(commandBus, 'execute').mockResolvedValue(undefined);

      await expect(
        controller.updateLocation(locationId, updateLocationDto),
      ).resolves.toBeUndefined();
    });

    it('should throw BadRequestException if payload is invalid', async () => {
      const locationId = '1';
      const updateLocationDto: UpdateLocationPutInDto = {
        name: 'Updated Test Location',
        location_number: '456',
        area: -200, // Invalid area
        parent_id: null,
      };

      jest
        .spyOn(commandBus, 'execute')
        .mockRejectedValue(new BadRequestException());

      await expect(
        controller.updateLocation(locationId, updateLocationDto),
      ).rejects.toThrowError(
        new HttpException('Bad Request', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw InternalServerError if an error occurs', async () => {
      const locationId = '1';
      const updateLocationDto: UpdateLocationPutInDto = {
        name: 'Updated Test Location',
        location_number: '456',
        area: 200.5,
        parent_id: null,
      };

      jest.spyOn(commandBus, 'execute').mockRejectedValue(new Error());

      await expect(
        controller.updateLocation(locationId, updateLocationDto),
      ).rejects.toThrowError(
        new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe('deleteLocation', () => {
    it('should delete an existing location', async () => {
      const locationId = '1';

      jest.spyOn(commandBus, 'execute').mockResolvedValue(undefined);

      await expect(
        controller.deleteLocation(locationId),
      ).resolves.toBeUndefined();
    });

    it('should throw InternalServerError if an error occurs', async () => {
      const locationId = '1';

      jest.spyOn(commandBus, 'execute').mockRejectedValue(new Error());

      await expect(controller.deleteLocation(locationId)).rejects.toThrowError(
        new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
