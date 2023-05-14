import { Controller, Get } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { AppService } from './app.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';
import { UserEntity } from '../../common/types/user.types';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('version')
  getVersion() {
    return this.appService.getVersion();
  }

  @Get('me')
  @ApiBearerAuth('access-token')
  getHello(@User() user: UserEntity) {
    return user;
  }
}
