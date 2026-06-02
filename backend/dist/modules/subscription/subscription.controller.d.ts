import { SubscriptionService } from './subscription.service';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
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
    getSubscription(schoolId: string): Promise<{
        data: {
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
        };
    }>;
    createSubscription(dto: any): Promise<{
        data: {
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
        message: string;
    }>;
    recordPayment(id: string, dto: any): Promise<{
        data: {
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
        };
        message: string;
    }>;
}
