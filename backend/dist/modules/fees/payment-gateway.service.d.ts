import { ConfigService } from '@nestjs/config';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { CentralPrismaService } from '../../database/central-prisma.service';
export declare class PaymentGatewayService {
    private readonly tenantPrisma;
    private readonly centralPrisma;
    private readonly configService;
    private readonly logger;
    constructor(tenantPrisma: TenantPrismaService, centralPrisma: CentralPrismaService, configService: ConfigService);
    private get db();
    private getRazorpay;
    createRazorpayOrder(dto: {
        studentId: string;
        installmentId: string;
        amount: number;
        currency?: string;
        tenantSlug?: string;
        schoolSettings?: {
            razorpayKeyId?: string;
            razorpayKeySecret?: string;
        };
    }): Promise<{
        data: {
            orderId: string;
            amount: number;
            currency: string;
            keyId: string;
        };
        message: string;
    }>;
    verifyAndRecordRazorpayPayment(dto: {
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
        studentId: string;
        installmentId: string;
        amount: number;
        schoolSettings?: {
            razorpayKeySecret?: string;
        };
        collectedBy?: string;
    }): Promise<{
        data: {
            receiptNo: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            amount: import("../../generated/school-client/runtime/library").Decimal;
            discount: import("../../generated/school-client/runtime/library").Decimal;
            receiptUrl: string | null;
            studentId: string;
            remarks: string | null;
            installmentId: string;
            paidAmount: import("../../generated/school-client/runtime/library").Decimal;
            paymentMode: import("../../generated/school-client").$Enums.PaymentMode;
            transactionId: string | null;
            fine: import("../../generated/school-client/runtime/library").Decimal;
            payableAmount: import("../../generated/school-client/runtime/library").Decimal;
            dueAmount: import("../../generated/school-client/runtime/library").Decimal;
            gatewayResponse: import("../../generated/school-client/runtime/library").JsonValue | null;
            paymentDate: Date;
            collectedBy: string | null;
        };
        message: string;
    }>;
    private getStripe;
    createStripePaymentIntent(dto: {
        studentId: string;
        installmentId: string;
        amount: number;
        currency?: string;
        tenantSlug?: string;
        schoolSettings?: {
            stripeSecretKey?: string;
            stripePubKey?: string;
        };
    }): Promise<{
        data: {
            clientSecret: string;
            paymentIntentId: string;
            publishableKey: string;
        };
        message: string;
    }>;
    confirmStripePayment(dto: {
        paymentIntentId: string;
        studentId: string;
        installmentId: string;
        amount: number;
        schoolSettings?: {
            stripeSecretKey?: string;
        };
        collectedBy?: string;
    }): Promise<{
        data: {
            receiptNo: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            amount: import("../../generated/school-client/runtime/library").Decimal;
            discount: import("../../generated/school-client/runtime/library").Decimal;
            receiptUrl: string | null;
            studentId: string;
            remarks: string | null;
            installmentId: string;
            paidAmount: import("../../generated/school-client/runtime/library").Decimal;
            paymentMode: import("../../generated/school-client").$Enums.PaymentMode;
            transactionId: string | null;
            fine: import("../../generated/school-client/runtime/library").Decimal;
            payableAmount: import("../../generated/school-client/runtime/library").Decimal;
            dueAmount: import("../../generated/school-client/runtime/library").Decimal;
            gatewayResponse: import("../../generated/school-client/runtime/library").JsonValue | null;
            paymentDate: Date;
            collectedBy: string | null;
        };
        message: string;
    }>;
    createPaymentLink(dto: {
        studentId: string;
        installmentId: string;
        amount: number;
        studentName: string;
        description?: string;
        expiryMinutes?: number;
        schoolSettings?: {
            razorpayKeyId?: string;
            razorpayKeySecret?: string;
        };
    }): Promise<{
        data: {
            paymentUrl: any;
            linkId: any;
            expiresAt: Date;
        };
        message: string;
    }>;
    private generateReceiptNo;
}
