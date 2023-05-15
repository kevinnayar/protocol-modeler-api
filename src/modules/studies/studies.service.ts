import { Injectable } from '@nestjs/common';
import { ProtocolEntity } from 'src/common/types/study.types';
import { v4 as getUuid } from 'uuid';

@Injectable()
export class StudiesService {
  store: Record<string, Record<string, ProtocolEntity>> = {};

  create(tenantId: string, protocol: ProtocolEntity) {
    if (!protocol.uuid) {
      protocol.uuid = getUuid();
    }

    if (this.store[tenantId]) {
      this.store[tenantId][protocol.uuid] = protocol;
    } else {
      this.store[tenantId] = {
        [protocol.uuid]: protocol,
      };
    }

    return protocol;
  }

  findAll(tenantId: string) {
    return this.store[tenantId] ? Object.values(this.store[tenantId]) : [];
  }

  removeAll(tenantId: string) {
    delete this.store[tenantId];
  }

  findOne(tenantId: string, studyId: string) {
    return this.store[tenantId] ? this.store[tenantId][studyId] : undefined;
  }

  remove(tenantId: string, studyId: string) {
    delete this.store[tenantId][studyId];
  }
}
