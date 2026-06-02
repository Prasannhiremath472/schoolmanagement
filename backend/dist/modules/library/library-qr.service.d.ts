import { TenantPrismaService } from '../../database/tenant-prisma.service';
export declare class LibraryQrService {
    private readonly tenantPrisma;
    constructor(tenantPrisma: TenantPrismaService);
    private get db();
    generateBookQR(bookId: string): Promise<{
        qr: string;
        bookId: string;
        isbn?: string;
    }>;
    generateLibraryCardQR(cardId: string): Promise<{
        qr: string;
        cardNo: string;
    }>;
    parseQrPayload(payload: string): {
        type: string;
        id: string;
        [key: string]: any;
    };
    quickIssueByQR(bookQrPayload: string, cardQrPayload: string, dueDays?: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            remarks: string | null;
            dueDate: Date;
            fine: import("../../generated/school-client/runtime/library").Decimal;
            issueDate: Date;
            returnDate: Date | null;
            finePerDay: import("../../generated/school-client/runtime/library").Decimal;
            isReturned: boolean;
            bookId: string;
            libraryCardId: string;
        };
        message: string;
    }>;
    quickReturnByQR(bookQrPayload: string, libraryCardId: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            remarks: string | null;
            dueDate: Date;
            fine: import("../../generated/school-client/runtime/library").Decimal;
            issueDate: Date;
            returnDate: Date | null;
            finePerDay: import("../../generated/school-client/runtime/library").Decimal;
            isReturned: boolean;
            bookId: string;
            libraryCardId: string;
        };
        message: string;
    }>;
    generateBarcode(isbn: string): string;
}
