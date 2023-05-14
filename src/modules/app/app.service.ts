import { Injectable } from '@nestjs/common';
import { AppVersionType } from '../../common/types/base.types';

@Injectable()
export class AppService {
  getVersion(): AppVersionType {
    return {
      version: '1.0.0',
    };
  }
}
