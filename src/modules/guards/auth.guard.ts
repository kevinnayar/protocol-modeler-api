import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

type User = {
  name: string;
  realm_access: { roles: any[] };
  resource_access: { account: object };
  groups: string[];
  preferred_username: string;
  given_name: string;
  family_name: string;
};

export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const publicKeyString = this.configService.get<string>(
      'KEYCLOAK_PUBLIC_KEY',
    );
    const publicKey = this.formatPublicKey(publicKeyString ?? '');

    try {
      const userMaybe = await this.jwtService.verifyAsync(token, {
        publicKey,
      });

      if (!userMaybe) {
        throw new UnauthorizedException();
      }

      const user: User = userMaybe;
      request.user = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private formatPublicKey(key: string): string {
    return `-----BEGIN PUBLIC KEY-----\n${key}\n-----END PUBLIC KEY-----`;
  }
}
