import { Strategy } from 'passport-local';
import { TenantPrismaService } from '../../../database/tenant-prisma.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly tenantPrisma;
    constructor(tenantPrisma: TenantPrismaService);
    validate(identifier: string, password: string): Promise<any>;
}
export {};
