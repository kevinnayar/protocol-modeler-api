import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../types/user.types';

function getRoles(
  ctx: ExecutionContext,
  scope: 'realm' | 'resource',
): string[] {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as UserEntity;

  switch (scope) {
    case 'realm':
      return user?.roles?.realm || [];
    case 'resource':
      return user?.roles?.resource || [];
    default:
      return [];
  }
}

export const RolesForRealm = createParamDecorator(
  (_d: unknown, ctx: ExecutionContext) => getRoles(ctx, 'realm'),
);

export const RolesForResource = createParamDecorator(
  (_d: unknown, ctx: ExecutionContext) => getRoles(ctx, 'resource'),
);
