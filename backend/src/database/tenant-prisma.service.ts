import { Injectable, Scope, Inject, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PrismaClient } from '../generated/school-client';
import { PrismaClientManager } from './prisma-client-manager.service';

@Injectable({ scope: Scope.REQUEST })
export class TenantPrismaService {
  private readonly logger = new Logger(TenantPrismaService.name);

  constructor(
    @Inject(REQUEST) private readonly request: Request & { tenantDb?: string; tenantSlug?: string },
    private readonly manager: PrismaClientManager,
  ) {}

  get db(): PrismaClient {
    const dbUrl = this.request.tenantDb;
    const slug = this.request.tenantSlug;

    if (!dbUrl || !slug) {
      throw new Error('Tenant context not set. Ensure TenantMiddleware runs first.');
    }

    return this.manager.getClient(dbUrl, slug);
  }
}
