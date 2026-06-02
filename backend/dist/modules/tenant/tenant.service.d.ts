import { CentralPrismaService } from '../../database/central-prisma.service';
export declare class TenantService {
    private readonly centralPrisma;
    constructor(centralPrisma: CentralPrismaService);
    resolveTenant(slug: string): Promise<{
        id: string;
        slug: string;
        dbName: string;
        status: import("../../generated/central-client").$Enums.SchoolStatus;
    }>;
    getTenantBranding(slug: string): Promise<{
        name: string;
        logo: string;
        favicon: string;
        primaryColor: string;
        secondaryColor: string;
    }>;
}
