import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity, UserRoles } from '../types/user.types';

export const RolesForRealm = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as { user: UserEntity };
    const { roles }: { roles: UserRoles } = request.user;
    return roles.realm || [];
  },
);

export const IsAdminRole = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as { user: UserEntity };
    const { roles }: { roles: UserRoles } = request.user;
    return roles.realm.includes('admin');
  },
);

export const RolesForResource = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as { user: UserEntity };
    const { roles }: { roles: UserRoles } = request.user;
    return roles.resource || [];
  },
);
