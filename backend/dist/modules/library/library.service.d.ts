import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class LibraryService {
    private readonly tenantPrisma;
    constructor(tenantPrisma: TenantPrismaService);
    private get db();
    getBooks(query: Partial<PaginationDto> & {
        categoryId?: string;
    }): Promise<{
        data: ({
            category: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            isActive: boolean;
            title: string;
            price: import("../../generated/school-client/runtime/library").Decimal | null;
            isbn: string | null;
            author: string;
            publisher: string | null;
            edition: string | null;
            categoryId: string;
            totalCopies: number;
            availableCopies: number;
            shelfNo: string | null;
            coverImage: string | null;
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
    createBook(dto: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            isActive: boolean;
            title: string;
            price: import("../../generated/school-client/runtime/library").Decimal | null;
            isbn: string | null;
            author: string;
            publisher: string | null;
            edition: string | null;
            categoryId: string;
            totalCopies: number;
            availableCopies: number;
            shelfNo: string | null;
            coverImage: string | null;
        };
        message: string;
    }>;
    issueBook(dto: {
        bookId: string;
        libraryCardId: string;
        dueDate: string;
    }): Promise<{
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
    returnBook(issueId: string): Promise<{
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
    getCategories(): Promise<{
        data: {
            id: string;
            name: string;
        }[];
    }>;
    issueCard(studentId: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            isActive: boolean;
            studentId: string;
            cardNo: string;
            validTill: Date;
        };
        message: string;
    }>;
    getActiveIssues(query: Partial<PaginationDto>): Promise<{
        data: ({
            book: {
                title: string;
                isbn: string;
            };
            libraryCard: {
                student: {
                    admissionNo: string;
                    firstName: string;
                    lastName: string;
                };
            } & {
                id: string;
                createdAt: Date;
                isActive: boolean;
                studentId: string;
                cardNo: string;
                validTill: Date;
            };
        } & {
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
}
