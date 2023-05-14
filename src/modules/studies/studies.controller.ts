import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { StudiesService } from './studies.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProtocolSchema, ProtocolEntity } from 'src/common/types/study.types';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@ApiTags('Studies')
@ApiBearerAuth('access-token')
@Controller('tenants/:tenantId/studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe<ProtocolEntity>(ProtocolSchema))
  create(
    @Param('tenantId') tenantId: string,
    @Body() protocol: ProtocolEntity,
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
}
