import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StudiesModule } from '../studies/studies.module';
import { AuthGuard } from '../../common/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    StudiesModule,
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
