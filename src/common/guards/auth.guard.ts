import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { UserEntity } from '../../common/types/user.types';
import { getUserFromDecodedJwt } from '../../common/utils/formatting.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const keycloakPublicKey = this.configService.get<string>(
        'KEYCLOAK_PUBLIC_KEY',
      );
      const userMaybe = await this.jwtService.verifyAsync(token, {
        publicKey: this.formatPublicKey(keycloakPublicKey),
      });

      if (!userMaybe) {
        throw new UnauthorizedException();
      }

      const user: UserEntity = getUserFromDecodedJwt(userMaybe);
      request.user = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' && token ? token : undefined;
  }

  private formatPublicKey(key: string): string {
    return `-----BEGIN PUBLIC KEY-----\n${key}\n-----END PUBLIC KEY-----`;
  }
}
