import { ResellerService } from './reseller.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class ResellerController {
    private readonly resellerService;
    constructor(resellerService: ResellerService);
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
    create(dto: any): Promise<{
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
    update(id: string, dto: any): Promise<{
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
    getCommissions(id: string, query: PaginationDto): Promise<{
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
    getStats(id: string): Promise<{
        data: {
            totalCommission: number;
            pendingCommission: number;
            paidCommission: number;
            schoolCount: number;
        };
    }>;
    assignSchool(id: string, schoolId: string): Promise<{
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
    markPaid(id: string): Promise<{
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
}
