import { Injectable } from '@nestjs/common';
import { AppVersionType } from '../../common/types/base.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getVersion(): AppVersionType {
    const version = this.configService.get<string>('APP_VERSION');
    return {
      version,
    };
  }
}
