import { Request } from 'express';
import { PrismaClient } from '../generated/school-client';
import { PrismaClientManager } from './prisma-client-manager.service';
export declare class TenantPrismaService {
    private readonly request;
    private readonly manager;
    private readonly logger;
    constructor(request: Request & {
        tenantDb?: string;
        tenantSlug?: string;
    }, manager: PrismaClientManager);
    get db(): PrismaClient;
}
