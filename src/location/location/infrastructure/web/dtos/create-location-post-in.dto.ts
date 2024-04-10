import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateLocationPostInDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  location_number: string;

  @ApiProperty({ default: 100, required: true })
  @IsPositive()
  area: number;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  parent_id?: string;
}
