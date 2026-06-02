import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateFeeStructureDto, CollectFeeDto, CreateFeeCategoryDto } from './dto/fees.dto';
export declare class FeesService {
    private readonly tenantPrisma;
    private readonly eventEmitter;
    private readonly logger;
    constructor(tenantPrisma: TenantPrismaService, eventEmitter: EventEmitter2);
    private get db();
    getCategories(): Promise<{
        data: {
            description: string | null;
            id: string;
            name: string;
            createdAt: Date;
            isActive: boolean;
        }[];
    }>;
    createCategory(dto: CreateFeeCategoryDto): Promise<{
        data: {
            description: string | null;
            id: string;
            name: string;
            createdAt: Date;
            isActive: boolean;
        };
        message: string;
    }>;
    getFeeStructures(classId?: string, academicYearId?: string): Promise<{
        data: ({
            class: {
                name: string;
            };
            feeItems: ({
                feeCategory: {
                    description: string | null;
                    id: string;
                    name: string;
                    createdAt: Date;
                    isActive: boolean;
                };
            } & {
                id: string;
                amount: import("../../generated/school-client/runtime/library").Decimal;
                feeCategoryId: string;
                isMandatory: boolean;
                feeStructureId: string;
            })[];
            feeInstallments: {
                id: string;
                name: string;
                amount: import("../../generated/school-client/runtime/library").Decimal;
                dueDate: Date;
                lateFinePerDay: import("../../generated/school-client/runtime/library").Decimal;
                installmentNo: number;
                feeStructureId: string;
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            academicYearId: string;
            classId: string;
            totalAmount: import("../../generated/school-client/runtime/library").Decimal;
        })[];
    }>;
    createFeeStructure(dto: CreateFeeStructureDto): Promise<{
        data: {
            feeItems: {
                id: string;
                amount: import("../../generated/school-client/runtime/library").Decimal;
                feeCategoryId: string;
                isMandatory: boolean;
                feeStructureId: string;
            }[];
            feeInstallments: {
                id: string;
                name: string;
                amount: import("../../generated/school-client/runtime/library").Decimal;
                dueDate: Date;
                lateFinePerDay: import("../../generated/school-client/runtime/library").Decimal;
                installmentNo: number;
                feeStructureId: string;
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            academicYearId: string;
            classId: string;
            totalAmount: import("../../generated/school-client/runtime/library").Decimal;
        };
        message: string;
    }>;
    collectFee(dto: CollectFeeDto, collectedBy: string): Promise<{
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
    getStudentFeeDetails(studentId: string, academicYearId: string): Promise<{
        data: {
            student: {
                sections: ({
                    section: {
                        class: {
                            id: string;
                            name: string;
                            createdAt: Date;
                            updatedAt: Date;
                            sortOrder: number;
                            displayName: string | null;
                            academicYearId: string;
                        };
                    } & {
                        id: string;
                        name: string;
                        createdAt: Date;
                        updatedAt: Date;
                        classId: string;
                        classTeacherId: string | null;
                        capacity: number;
                    };
                } & {
                    id: string;
                    isActive: boolean;
                    rollNo: string | null;
                    sectionId: string;
                    studentId: string;
                    joinedAt: Date;
                    leftAt: Date | null;
                })[];
            } & {
                id: string;
                address: string | null;
                city: string | null;
                state: string | null;
                pincode: string | null;
                status: import("../../generated/school-client").$Enums.StudentStatus;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                admissionNo: string;
                rollNo: string | null;
                firstName: string;
                lastName: string;
                middleName: string | null;
                dateOfBirth: Date;
                gender: import("../../generated/school-client").$Enums.Gender;
                bloodGroup: string | null;
                religion: string | null;
                caste: string | null;
                category: import("../../generated/school-client").$Enums.StudentCategory;
                nationality: string;
                motherTongue: string | null;
                aadhaarNo: string | null;
                admissionDate: Date;
                previousSchool: string | null;
                transferCertNo: string | null;
                isRTE: boolean;
                medicalConditions: string | null;
                allergies: string | null;
                emergencyContact: string | null;
                photo: string | null;
            };
            feeStructure: any;
            summary?: undefined;
        };
    } | {
        data: {
            student: {
                id: string;
                firstName: string;
                lastName: string;
                admissionNo: string;
            };
            feeStructure: {
                feeInstallments: {
                    paidAmount: number;
                    dueAmount: number;
                    isOverdue: boolean;
                    lastPayment: {
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
                        receiptNo: string;
                        gatewayResponse: import("../../generated/school-client/runtime/library").JsonValue | null;
                        paymentDate: Date;
                        collectedBy: string | null;
                    };
                    payments: {
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
                        receiptNo: string;
                        gatewayResponse: import("../../generated/school-client/runtime/library").JsonValue | null;
                        paymentDate: Date;
                        collectedBy: string | null;
                    }[];
                    id: string;
                    name: string;
                    amount: import("../../generated/school-client/runtime/library").Decimal;
                    dueDate: Date;
                    lateFinePerDay: import("../../generated/school-client/runtime/library").Decimal;
                    installmentNo: number;
                    feeStructureId: string;
                }[];
                feeItems: ({
                    feeCategory: {
                        description: string | null;
                        id: string;
                        name: string;
                        createdAt: Date;
                        isActive: boolean;
                    };
                } & {
                    id: string;
                    amount: import("../../generated/school-client/runtime/library").Decimal;
                    feeCategoryId: string;
                    isMandatory: boolean;
                    feeStructureId: string;
                })[];
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                academicYearId: string;
                classId: string;
                totalAmount: import("../../generated/school-client/runtime/library").Decimal;
            };
            summary: {
                totalFees: number;
                totalPaid: number;
                totalDue: number;
            };
        };
    }>;
    getPayments(query: Partial<PaginationDto> & {
        studentId?: string;
        fromDate?: string;
        toDate?: string;
    }): Promise<{
        data: ({
            student: {
                admissionNo: string;
                firstName: string;
                lastName: string;
            };
            installment: {
                name: string;
                installmentNo: number;
            };
        } & {
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
            receiptNo: string;
            gatewayResponse: import("../../generated/school-client/runtime/library").JsonValue | null;
            paymentDate: Date;
            collectedBy: string | null;
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
    getDueReminders(): Promise<{
        data: ({
            feeStructure: {
                class: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    sortOrder: number;
                    displayName: string | null;
                    academicYearId: string;
                };
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                academicYearId: string;
                classId: string;
                totalAmount: import("../../generated/school-client/runtime/library").Decimal;
            };
        } & {
            id: string;
            name: string;
            amount: import("../../generated/school-client/runtime/library").Decimal;
            dueDate: Date;
            lateFinePerDay: import("../../generated/school-client/runtime/library").Decimal;
            installmentNo: number;
            feeStructureId: string;
        })[];
        message: string;
    }>;
    getDashboardStats(academicYearId: string): Promise<{
        data: {
            totalCollected: number;
            totalDue: number;
            todayCollection: number;
        };
    }>;
    getScholarships(): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            isActive: boolean;
            percentage: import("../../generated/school-client/runtime/library").Decimal;
            criteria: string | null;
        }[];
    }>;
    createScholarship(dto: {
        name: string;
        percentage: number;
        criteria?: string;
    }): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            isActive: boolean;
            percentage: import("../../generated/school-client/runtime/library").Decimal;
            criteria: string | null;
        };
        message: string;
    }>;
    updateScholarship(id: string, dto: any): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            isActive: boolean;
            percentage: import("../../generated/school-client/runtime/library").Decimal;
            criteria: string | null;
        };
        message: string;
    }>;
    applyScholarship(dto: {
        studentId: string;
        scholarshipId: string;
        academicYearId: string;
    }): Promise<{
        data: {
            studentId: string;
            scholarshipId: string;
            scholarshipName: string;
            percentage: import("../../generated/school-client/runtime/library").Decimal;
            originalFee: number;
            discountAmount: number;
            finalFee: number;
        };
        message: string;
    }>;
    grantConcession(dto: {
        studentId: string;
        installmentId: string;
        discountAmount: number;
        reason: string;
        approvedBy: string;
    }): Promise<{
        data: {
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
            receiptNo: string;
            gatewayResponse: import("../../generated/school-client/runtime/library").JsonValue | null;
            paymentDate: Date;
            collectedBy: string | null;
        };
        message: string;
    }>;
    private generateReceiptNo;
}
