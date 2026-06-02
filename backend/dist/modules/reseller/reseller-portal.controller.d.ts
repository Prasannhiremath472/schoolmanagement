import { CentralPrismaService } from '../../database/central-prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class ResellerPortalController {
    private readonly centralPrisma;
    constructor(centralPrisma: CentralPrismaService);
    getMyProfile(user: any): Promise<{
        data: {
            _count: {
                commissions: number;
                schools: number;
            };
        } & {
            id: string;
            email: string;
            name: string;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            company: string | null;
            commissionPct: import("../../generated/central-client/runtime/library").Decimal;
        };
    }>;
    getMySchools(user: any, query: PaginationDto): Promise<{
        data: ({
            subscriptions: ({
                plan: {
                    name: string;
                    price: import("../../generated/central-client/runtime/library").Decimal;
                    billingCycle: import("../../generated/central-client").$Enums.BillingCycle;
                };
            } & {
                id: string;
                status: import("../../generated/central-client").$Enums.SubStatus;
                createdAt: Date;
                updatedAt: Date;
                amount: import("../../generated/central-client/runtime/library").Decimal;
                schoolId: string;
                planId: string;
                startDate: Date;
                endDate: Date;
                discount: import("../../generated/central-client/runtime/library").Decimal;
                notes: string | null;
            })[];
        } & {
            id: string;
            slug: string;
            email: string;
            customDomain: string | null;
            dbName: string;
            name: string;
            phone: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            country: string;
            pincode: string | null;
            website: string | null;
            logo: string | null;
            favicon: string | null;
            primaryColor: string;
            secondaryColor: string;
            status: import("../../generated/central-client").$Enums.SchoolStatus;
            timezone: string;
            currency: string;
            language: string;
            resellerId: string | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    getMyCommissions(user: any, query: PaginationDto): Promise<{
        data: ({
            school: {
                slug: string;
                name: string;
                status: import("../../generated/central-client").$Enums.SchoolStatus;
            };
        } & {
            id: string;
            status: import("../../generated/central-client").$Enums.CommStatus;
            resellerId: string;
            createdAt: Date;
            amount: import("../../generated/central-client/runtime/library").Decimal;
            schoolId: string;
            paidAt: Date | null;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    getMyStats(user: any): Promise<{
        data: {
            reseller: {
                name: string;
                email: string;
                commissionPct: number;
            };
            totalSchools: number;
            activeSchools: number;
            trialSchools: number;
            totalCommission: number;
            pendingCommission: number;
            paidCommission: number;
            projectedMonthly: number;
        };
    }>;
}
