export type UserRoles = {
  realm: string[];
  resource: string[];
};

export type UserEntity = {
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  tenantId: string;
  roles: UserRoles;
};
