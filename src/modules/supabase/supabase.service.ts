import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit {
  public client: SupabaseClient;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.client = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_ADMIN_KEY'),
    );
  }
}
