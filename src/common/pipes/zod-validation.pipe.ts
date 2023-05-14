import { Injectable, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodSchema<T>) {}

  public transform(value: unknown): T {
    const parsed: T = this.schema.parse(value);
    return parsed;
  }
}
