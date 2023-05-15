import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { StudiesService } from './studies.service';
import { SupabaseService } from '../supabase/supabase.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProtocolSchema, ProtocolEntity } from 'src/common/types/study.types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@ApiTags('Studies')
@ApiBearerAuth('access-token')
@Controller('tenants/:tenantId/studies')
export class StudiesController {
  constructor(
    private readonly studiesService: StudiesService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Post()
  create(
    @Param('tenantId') tenantId: string,
    @Body(new ZodValidationPipe<ProtocolEntity>(ProtocolSchema))
    protocol: ProtocolEntity,
  ) {
    return this.studiesService.create(tenantId, protocol);
  }

  @Get()
  findAll(@Param('tenantId') tenantId: string) {
    return this.studiesService.findAll(tenantId);
  }

  @Get(':studyId')
  findOne(
    @Param('tenantId') tenantId: string,
    @Param('studyId') studyId: string,
  ) {
    return this.studiesService.findOne(tenantId, studyId);
  }

  @Delete(':studyId')
  remove(
    @Param('tenantId') tenantId: string,
    @Param('studyId') studyId: string,
  ) {
    return this.studiesService.remove(tenantId, studyId);
  }

  // just for testing
  @Public()
  @Get('filehashes/testing')
  async getFileHashes() {
    const { data } = await this.supabaseService.client.storage
      .from(process.env.SUPABASE_STORAGE_BUCKET)
      .list(`global/protocols`, {
        sortBy: {
          column: 'name',
          order: 'asc',
        },
      });

    return data.map((file) => file.name);
  }
}
