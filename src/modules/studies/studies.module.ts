import { Module } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { StudiesController } from './studies.controller';
// import { SupabaseModule } from '../supabase/supabase.module';
// import { SupabaseService } from '../supabase/supabase.service';

@Module({
  controllers: [StudiesController],
  providers: [StudiesService],
})
export class StudiesModule {}
