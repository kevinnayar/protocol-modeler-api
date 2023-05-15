import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class Supabase {
  private clientInstance: SupabaseClient;

  constructor(private readonly configService: ConfigService) {}

  getClient() {
    if (this.clientInstance) {
      return this.clientInstance;
    }

    this.clientInstance = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_ANON_KEY'),
    );

    return this.clientInstance;
  }
}
