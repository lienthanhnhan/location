import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidatePayloadExistsPipe implements PipeTransform {
  transform(payload: any): any {
    if (
      !payload ||
      typeof payload !== 'object' ||
      Object.keys(payload).length === 0
    ) {
      throw new BadRequestException('Payload should not be empty');
    }

    return payload;
  }
}
