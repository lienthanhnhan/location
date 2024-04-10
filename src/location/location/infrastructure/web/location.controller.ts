import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateLocationCommand } from '../../application/commands/create-location/create-location.command';
import { HttpExceptionFilter } from '../../../../filters/http-exception.filter';
import { UpdateLocationCommand } from '../../application/commands/update-location/update-location.command';
import { DeleteLocationCommand } from '../../application/commands/delete-location/delete-location.command';
import { ValidatePayloadExistsPipe } from '../../../../pipes/validate-payload-exists.pipe';
import { UpdateLocationPutInDto } from './dtos/update-location-put-in.dto';
import { CreateLocationPostInDto } from './dtos/create-location-post-in.dto';

@ApiTags('location')
@Controller('location')
@UseFilters(HttpExceptionFilter)
export class LocationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/')
  @ApiOperation({ summary: 'Create new location' })
  @UsePipes(new ValidatePayloadExistsPipe())
  @HttpCode(HttpStatus.CREATED)
  public async createLocation(
    @Body() payload: CreateLocationPostInDto,
  ): Promise<void> {
    try {
      await this.commandBus.execute(
        new CreateLocationCommand(
          payload.name,
          payload.location_number,
          payload.area,
          payload.parent_id,
        ),
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @UsePipes(new ValidatePayloadExistsPipe())
  @ApiOperation({ summary: 'Update an available location' })
  async updateLocation(
    @Param('id') id: string,
    @Body() payload: UpdateLocationPutInDto,
  ): Promise<void> {
    try {
      await this.commandBus.execute(new UpdateLocationCommand(id, payload));
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove created location data along with any related references.',
  })
  async deleteLocation(@Param('id') id: string): Promise<void> {
    try {
      await this.commandBus.execute(new DeleteLocationCommand(id));
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
