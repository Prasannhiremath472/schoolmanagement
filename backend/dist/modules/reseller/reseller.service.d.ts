import { CentralPrismaService } from '../../database/central-prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class ResellerService {
    private readonly centralPrisma;
    constructor(centralPrisma: CentralPrismaService);
    findAll(query: PaginationDto): Promise<{
        data: ({
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
    findOne(id: string): Promise<{
        data: {
            commissions: {
                id: string;
                status: import("../../generated/central-client").$Enums.CommStatus;
                resellerId: string;
                createdAt: Date;
                amount: import("../../generated/central-client/runtime/library").Decimal;
                schoolId: string;
                paidAt: Date | null;
            }[];
            schools: {
                id: string;
                slug: string;
                name: string;
                status: import("../../generated/central-client").$Enums.SchoolStatus;
            }[];
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
    create(dto: {
        name: string;
        email: string;
        phone?: string;
        company?: string;
        commissionPct?: number;
    }): Promise<{
        data: {
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
        message: string;
    }>;
    update(id: string, dto: Partial<{
        name: string;
        phone: string;
        company: string;
        commissionPct: number;
        isActive: boolean;
    }>): Promise<{
        data: {
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
        message: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
    getCommissions(resellerId: string, query: PaginationDto): Promise<{
        data: ({
            school: {
                slug: string;
                name: string;
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
    getRevenueStats(resellerId: string): Promise<{
        data: {
            totalCommission: number;
            pendingCommission: number;
            paidCommission: number;
            schoolCount: number;
        };
    }>;
    markCommissionPaid(commissionId: string): Promise<{
        data: {
            id: string;
            status: import("../../generated/central-client").$Enums.CommStatus;
            resellerId: string;
            createdAt: Date;
            amount: import("../../generated/central-client/runtime/library").Decimal;
            schoolId: string;
            paidAt: Date | null;
        };
        message: string;
    }>;
    assignSchool(resellerId: string, schoolId: string): Promise<{
        data: {
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
        };
        message: string;
    }>;
    calculateCommission(subscriptionAmount: number, resellerId: string): Promise<number>;
}
