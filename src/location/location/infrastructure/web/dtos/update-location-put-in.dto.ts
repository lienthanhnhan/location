import { PartialType } from '@nestjs/swagger';
import { CreateLocationPostInDto } from './create-location-post-in.dto';

export class UpdateLocationPutInDto extends PartialType(
  CreateLocationPostInDto,
) {}
