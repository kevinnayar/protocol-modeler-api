import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';
import { getZodErrors } from '../utils/formatting.utils';

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodSchema<T>) {}

  public transform(value: unknown): T {
    const result = this.schema.safeParse(value);

    if (result.success === false) {
      const error = getZodErrors(result.error);
      throw new BadRequestException(error);
    }

    return result.data;
  }
}
