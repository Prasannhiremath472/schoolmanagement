import { OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/school-client';
export declare class PrismaClientManager implements OnModuleDestroy {
    private readonly logger;
    private readonly clients;
    private readonly MAX_IDLE_MS;
    constructor();
    getClient(dbUrl: string, tenantSlug: string): PrismaClient;
    private cleanupIdleClients;
    onModuleDestroy(): Promise<void>;
}
