import { TenantService } from './tenant.service';
export declare class TenantController {
    private readonly tenantService;
    constructor(tenantService: TenantService);
    getBranding(slug: string): Promise<{
        name: string;
        logo: string;
        favicon: string;
        primaryColor: string;
        secondaryColor: string;
    }>;
}
