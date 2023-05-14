import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../types/user.types';

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as { user: UserEntity };
    return request.user;
  },
);
