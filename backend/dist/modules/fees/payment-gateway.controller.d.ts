import { PaymentGatewayService } from './payment-gateway.service';
export declare class PaymentGatewayController {
    private readonly paymentGatewayService;
    constructor(paymentGatewayService: PaymentGatewayService);
    createRazorpayOrder(dto: {
        studentId: string;
        installmentId: string;
        amount: number;
        currency?: string;
    }): Promise<{
        data: {
            orderId: string;
            amount: number;
            currency: string;
            keyId: string;
        };
        message: string;
    }>;
    verifyRazorpay(dto: {
        razorpayOrderId: string;
        razorpayPaymentId: string;
        razorpaySignature: string;
        studentId: string;
        installmentId: string;
        amount: number;
    }, userId: string): Promise<{
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
    createStripeIntent(dto: {
        studentId: string;
        installmentId: string;
        amount: number;
        currency?: string;
    }): Promise<{
        data: {
            clientSecret: string;
            paymentIntentId: string;
            publishableKey: string;
        };
        message: string;
    }>;
    confirmStripe(dto: {
        paymentIntentId: string;
        studentId: string;
        installmentId: string;
        amount: number;
    }, userId: string): Promise<{
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
    }): Promise<{
        data: {
            paymentUrl: any;
            linkId: any;
            expiresAt: Date;
        };
        message: string;
    }>;
}
