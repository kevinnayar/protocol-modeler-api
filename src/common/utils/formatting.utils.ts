import { UserEntity, UserRoles } from '../types/user.types';

export function getUserFromDecodedJwt(decoded: any): UserEntity {
  let tenantId = '';
  if ('iss' in decoded && typeof decoded.iss === 'string') {
    const split = decoded.iss.split('/');
    tenantId = split[split.length - 1];
  }

  const roles: UserRoles = {
    realm: [],
    resource: [],
  };
  if (
    'realm_access' in decoded &&
    'roles' in decoded.realm_access &&
    Array.isArray(decoded.realm_access.roles) &&
    decoded.realm_access.roles.every((role: any) => typeof role === 'string')
  ) {
    roles.realm = decoded.realm_access.roles;
  }
  if (
    'resource_access' in decoded &&
    'account' in decoded.resource_access &&
    'roles' in decoded.resource_access.account &&
    Array.isArray(decoded.resource_access.account.roles) &&
    decoded.resource_access.account.roles.every(
      (role: any) => typeof role === 'string',
    )
  ) {
    roles.resource = decoded.resource_access.account.roles;
  }

  const user: UserEntity = {
    firstName: decoded['given_name'] || '',
    lastName: decoded['family_name'] || '',
    fullName: decoded['name'] || '',
    username: decoded['preferred_username'] || '',
    tenantId,
    roles,
  };

  return user;
}
