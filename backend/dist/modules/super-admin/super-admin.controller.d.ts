import { SuperAdminService } from './super-admin.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateSchoolDto, UpdateSchoolDto } from './dto/school.dto';
export declare class SuperAdminController {
    private readonly superAdminService;
    constructor(superAdminService: SuperAdminService);
    getDashboard(): Promise<{
        data: {
            schools: {
                total: number;
                active: number;
                trial: number;
                suspended: number;
                expired: number;
            };
            revenue: {
                total: number;
                monthly: number;
            };
        };
    }>;
    getSchools(query: PaginationDto, status?: string): Promise<{
        data: ({
            reseller: {
                name: string;
            };
            subscriptions: ({
                plan: {
                    name: string;
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
    getSchool(id: string): Promise<{
        data: {
            reseller: {
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
            subscriptions: ({
                plan: {
                    description: string | null;
                    id: string;
                    slug: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    isActive: boolean;
                    sortOrder: number;
                    price: import("../../generated/central-client/runtime/library").Decimal;
                    billingCycle: import("../../generated/central-client").$Enums.BillingCycle;
                    trialDays: number;
                    maxStudents: number;
                    maxTeachers: number;
                    maxStaff: number;
                    storageGB: number;
                    features: import("../../generated/central-client/runtime/library").JsonValue;
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
            usageMetrics: {
                id: string;
                createdAt: Date;
                staff: number;
                students: number;
                schoolId: string;
                metricDate: Date;
                teachers: number;
                storageUsed: import("../../generated/central-client/runtime/library").Decimal;
                apiCalls: number;
                activeUsers: number;
            }[];
            schoolSettings: {
                s3AccessKey: string | null;
                s3SecretKey: string | null;
                s3Region: string | null;
                s3Bucket: string | null;
                id: string;
                updatedAt: Date;
                schoolId: string;
                smtpHost: string | null;
                smtpPort: number | null;
                smtpUser: string | null;
                smtpPass: string | null;
                smtpFrom: string | null;
                smsProvider: string | null;
                smsApiKey: string | null;
                whatsappApiKey: string | null;
                razorpayKeyId: string | null;
                razorpayKeySecret: string | null;
                stripePubKey: string | null;
                stripeSecretKey: string | null;
                zoomApiKey: string | null;
                zoomApiSecret: string | null;
                firebaseServerKey: string | null;
            };
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
        };
    }>;
    createSchool(dto: CreateSchoolDto): Promise<{
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
    updateSchool(id: string, dto: UpdateSchoolDto): Promise<{
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
    updateStatus(id: string, status: string): Promise<{
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
    deleteSchool(id: string): Promise<{
        message: string;
    }>;
    getPlans(): Promise<{
        data: {
            description: string | null;
            id: string;
            slug: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            sortOrder: number;
            price: import("../../generated/central-client/runtime/library").Decimal;
            billingCycle: import("../../generated/central-client").$Enums.BillingCycle;
            trialDays: number;
            maxStudents: number;
            maxTeachers: number;
            maxStaff: number;
            storageGB: number;
            features: import("../../generated/central-client/runtime/library").JsonValue;
        }[];
    }>;
    createPlan(dto: any): Promise<{
        data: {
            description: string | null;
            id: string;
            slug: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            sortOrder: number;
            price: import("../../generated/central-client/runtime/library").Decimal;
            billingCycle: import("../../generated/central-client").$Enums.BillingCycle;
            trialDays: number;
            maxStudents: number;
            maxTeachers: number;
            maxStaff: number;
            storageGB: number;
            features: import("../../generated/central-client/runtime/library").JsonValue;
        };
        message: string;
    }>;
    getResellers(query: PaginationDto): Promise<{
        data: ({
            _count: {
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
    getAuditLogs(query: PaginationDto): Promise<{
        data: ({
            platformUser: {
                email: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            platformUserId: string | null;
            action: string;
            entity: string;
            entityId: string | null;
            oldValues: import("../../generated/central-client/runtime/library").JsonValue | null;
            newValues: import("../../generated/central-client/runtime/library").JsonValue | null;
            ipAddress: string | null;
            userAgent: string | null;
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
    getRevenue(period: 'daily' | 'monthly' | 'yearly'): Promise<{
        data: ({
            subscription: {
                school: {
                    name: string;
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
            };
        } & {
            id: string;
            status: import("../../generated/central-client").$Enums.PayStatus;
            currency: string;
            createdAt: Date;
            metadata: import("../../generated/central-client/runtime/library").JsonValue;
            amount: import("../../generated/central-client/runtime/library").Decimal;
            subscriptionId: string;
            gateway: string;
            gatewayPayId: string | null;
            receiptUrl: string | null;
            paidAt: Date | null;
        })[];
    }>;
    getSettings(group?: string): Promise<{
        data: {
            value: string;
            id: string;
            updatedAt: Date;
            key: string;
            group: string;
            isSecret: boolean;
        }[];
    }>;
    upsertSetting(dto: any): Promise<{
        data: {
            value: string;
            id: string;
            updatedAt: Date;
            key: string;
            group: string;
            isSecret: boolean;
        };
        message: string;
    }>;
    bulkSettings(dto: {
        settings: any[];
    }): Promise<{
        data: any[];
        message: string;
    }>;
    deleteSetting(key: string): Promise<{
        message: string;
    }>;
    getSchoolBranding(id: string): Promise<{
        data: {
            id: string;
            slug: string;
            customDomain: string;
            name: string;
            website: string;
            logo: string;
            favicon: string;
            primaryColor: string;
            secondaryColor: string;
        };
    }>;
    updateBranding(id: string, dto: any): Promise<{
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
    getCustomDomains(): Promise<{
        data: {
            slug: string;
            customDomain: string;
            name: string;
        }[];
    }>;
    getPlatformUsers(query: PaginationDto): Promise<{
        data: {
            id: string;
            email: string;
            name: string;
            createdAt: Date;
            role: import("../../generated/central-client").$Enums.PlatformRole;
            isActive: boolean;
            lastLoginAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    createUser(dto: any): Promise<{
        data: {
            id: string;
            email: string;
            name: string;
            createdAt: Date;
            role: import("../../generated/central-client").$Enums.PlatformRole;
            isActive: boolean;
        };
        message: string;
    }>;
    updateUserStatus(id: string, isActive: boolean): Promise<{
        data: {
            password: string;
            id: string;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            role: import("../../generated/central-client").$Enums.PlatformRole;
            isActive: boolean;
            lastLoginAt: Date | null;
        };
        message: string;
    }>;
    sendNotification(dto: any): Promise<{
        data: {
            sent: number;
            subject: string;
        };
        message: string;
    }>;
    getMetrics(schoolId?: string): Promise<{
        data: {
            metrics: ({
                school: {
                    slug: string;
                    name: string;
                };
            } & {
                id: string;
                createdAt: Date;
                staff: number;
                students: number;
                schoolId: string;
                metricDate: Date;
                teachers: number;
                storageUsed: import("../../generated/central-client/runtime/library").Decimal;
                apiCalls: number;
                activeUsers: number;
            })[];
            aggregated: {
                totalStudents: number;
                totalTeachers: number;
                totalStorageUsed: number;
                totalApiCalls: number;
            };
        };
    }>;
}
