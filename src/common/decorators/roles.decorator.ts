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

export const RolesForRealm = createParamDecorator<
  undefined,
  ExecutionContext,
  string[]
>((_data: undefined, ctx: ExecutionContext) => getRoles(ctx, 'realm'));

export const IsRealmRole = createParamDecorator<
  string,
  ExecutionContext,
  boolean
>((data: string, ctx: ExecutionContext) => {
  const roles = getRoles(ctx, 'realm');
  return roles.includes(data);
});

export const RolesForResource = createParamDecorator<
  undefined,
  ExecutionContext,
  string[]
>((_data: undefined, ctx: ExecutionContext) => getRoles(ctx, 'resource'));

export const IsResourceRole = createParamDecorator<
  string,
  ExecutionContext,
  boolean
>((data: string, ctx: ExecutionContext) => {
  const roles = getRoles(ctx, 'resource');
  return roles.includes(data);
});
