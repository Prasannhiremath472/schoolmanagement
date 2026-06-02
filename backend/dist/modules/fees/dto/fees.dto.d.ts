export declare class CreateFeeCategoryDto {
    name: string;
    description?: string;
}
export declare class FeeItemDto {
    feeCategoryId: string;
    amount: number;
    isMandatory?: boolean;
}
export declare class InstallmentDto {
    name: string;
    dueDate: string;
    amount: number;
    lateFinePerDay?: number;
}
export declare class CreateFeeStructureDto {
    name: string;
    classId: string;
    academicYearId: string;
    feeItems: FeeItemDto[];
    installments: InstallmentDto[];
}
export declare enum PaymentMode {
    CASH = "CASH",
    CHEQUE = "CHEQUE",
    UPI = "UPI",
    CARD = "CARD",
    NETBANKING = "NETBANKING",
    RAZORPAY = "RAZORPAY",
    STRIPE = "STRIPE"
}
export declare class CollectFeeDto {
    studentId: string;
    installmentId: string;
    paidAmount: number;
    discount?: number;
    paymentMode: PaymentMode;
    transactionId?: string;
    remarks?: string;
}
