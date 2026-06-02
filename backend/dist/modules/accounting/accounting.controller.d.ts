import { AccountingService } from './accounting.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class AccountingController {
    private readonly accountingService;
    constructor(accountingService: AccountingService);
    getAccounts(): Promise<{
        data: ({
            children: {
                id: string;
                name: string;
                createdAt: Date;
                isActive: boolean;
                type: import("../../generated/school-client").$Enums.AccountType;
                parentId: string | null;
                code: string;
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            isActive: boolean;
            type: import("../../generated/school-client").$Enums.AccountType;
            parentId: string | null;
            code: string;
        })[];
    }>;
    createAccount(dto: any): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            isActive: boolean;
            type: import("../../generated/school-client").$Enums.AccountType;
            parentId: string | null;
            code: string;
        };
        message: string;
    }>;
    getTransactions(q: PaginationDto, fromDate?: string, toDate?: string, type?: string): Promise<{
        data: ({
            accountHead: {
                name: string;
                type: import("../../generated/school-client").$Enums.AccountType;
                code: string;
            };
        } & {
            description: string;
            id: string;
            createdAt: Date;
            type: import("../../generated/school-client").$Enums.TransType;
            date: Date;
            amount: import("../../generated/school-client/runtime/library").Decimal;
            createdBy: string | null;
            reference: string | null;
            voucherNo: string | null;
            accountHeadId: string;
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
    createTransaction(dto: any): Promise<{
        data: {
            description: string;
            id: string;
            createdAt: Date;
            type: import("../../generated/school-client").$Enums.TransType;
            date: Date;
            amount: import("../../generated/school-client/runtime/library").Decimal;
            createdBy: string | null;
            reference: string | null;
            voucherNo: string | null;
            accountHeadId: string;
        };
        message: string;
    }>;
    createJournal(dto: any, userId: string): Promise<{
        data: {
            voucherNo: string;
            debitTx: {
                description: string;
                id: string;
                createdAt: Date;
                type: import("../../generated/school-client").$Enums.TransType;
                date: Date;
                amount: import("../../generated/school-client/runtime/library").Decimal;
                createdBy: string | null;
                reference: string | null;
                voucherNo: string | null;
                accountHeadId: string;
            };
            creditTx: {
                description: string;
                id: string;
                createdAt: Date;
                type: import("../../generated/school-client").$Enums.TransType;
                date: Date;
                amount: import("../../generated/school-client/runtime/library").Decimal;
                createdBy: string | null;
                reference: string | null;
                voucherNo: string | null;
                accountHeadId: string;
            };
        };
        message: string;
    }>;
    getCashBook(fromDate: string, toDate: string): Promise<{
        data: {
            entries: any[];
            openingBalance: number;
            closingBalance: number;
            totalDebit?: undefined;
            totalCredit?: undefined;
        };
    } | {
        data: {
            entries: {
                runningBalance: number;
                description: string;
                id: string;
                createdAt: Date;
                type: import("../../generated/school-client").$Enums.TransType;
                date: Date;
                amount: import("../../generated/school-client/runtime/library").Decimal;
                createdBy: string | null;
                reference: string | null;
                voucherNo: string | null;
                accountHeadId: string;
            }[];
            openingBalance: number;
            closingBalance: number;
            totalDebit: number;
            totalCredit: number;
        };
    }>;
    getBankBook(fromDate: string, toDate: string, bankAccountId?: string): Promise<{
        data: {
            entries: {
                runningBalance: number;
                description: string;
                id: string;
                createdAt: Date;
                type: import("../../generated/school-client").$Enums.TransType;
                date: Date;
                amount: import("../../generated/school-client/runtime/library").Decimal;
                createdBy: string | null;
                reference: string | null;
                voucherNo: string | null;
                accountHeadId: string;
            }[];
            closingBalance: number;
        };
    }>;
    getBalanceSheet(fromDate: string, toDate: string): Promise<{
        data: {
            accounts: Record<string, any[]>;
            summary: {
                totalAssets: any;
                totalLiabilities: any;
                totalIncome: any;
                totalExpenses: any;
                netProfit: number;
                equity: number;
            };
        };
    }>;
    getProfitLoss(fromDate: string, toDate: string): Promise<{
        data: {
            income: {
                items: {
                    name: string;
                    code: string;
                    amount: number;
                }[];
                total: number;
            };
            expenses: {
                items: {
                    name: string;
                    code: string;
                    amount: number;
                }[];
                total: number;
            };
            netProfit: number;
            netProfitMargin: string | number;
        };
    }>;
    getGstReport(fromDate: string, toDate: string): Promise<{
        data: {
            period: {
                fromDate: string;
                toDate: string;
            };
            outputTax: {
                taxableValue: number;
                cgst: number;
                sgst: number;
                igst: number;
                totalGst: number;
            };
            inputTax: {
                totalPurchases: number;
                inputCgst: number;
                inputSgst: number;
                totalInputGst: number;
            };
            netGstPayable: number;
        };
    }>;
    getLedger(id: string, fromDate: string, toDate: string): Promise<{
        data: {
            account: {
                id: string;
                name: string;
                code: string;
                type: import("../../generated/school-client").$Enums.AccountType;
            };
            entries: {
                runningBalance: number;
                description: string;
                id: string;
                createdAt: Date;
                type: import("../../generated/school-client").$Enums.TransType;
                date: Date;
                amount: import("../../generated/school-client/runtime/library").Decimal;
                createdBy: string | null;
                reference: string | null;
                voucherNo: string | null;
                accountHeadId: string;
            }[];
            closingBalance: number;
        };
    }>;
    getExpenses(q: PaginationDto, fromDate?: string, toDate?: string): Promise<{
        data: {
            description: string;
            id: string;
            createdAt: Date;
            category: string;
            date: Date;
            amount: import("../../generated/school-client/runtime/library").Decimal;
            paymentMode: string;
            receipt: string | null;
            createdBy: string | null;
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
    createExpense(dto: any, userId: string): Promise<{
        data: {
            description: string;
            id: string;
            createdAt: Date;
            category: string;
            date: Date;
            amount: import("../../generated/school-client/runtime/library").Decimal;
            paymentMode: string;
            receipt: string | null;
            createdBy: string | null;
        };
        message: string;
    }>;
}
