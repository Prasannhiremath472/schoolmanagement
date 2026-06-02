import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CentralPrismaService } from '../../database/central-prisma.service';
import { ConfigService } from '@nestjs/config';
export declare class TenantMiddleware implements NestMiddleware {
    private readonly centralPrisma;
    private readonly configService;
    private readonly logger;
    constructor(centralPrisma: CentralPrismaService, configService: ConfigService);
    use(req: Request & {
        tenantDb?: string;
        tenantSlug?: string;
        tenantId?: string;
    }, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
    private extractTenantSlug;
    private resolveTenant;
}
