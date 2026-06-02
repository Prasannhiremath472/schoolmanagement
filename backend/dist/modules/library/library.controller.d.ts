import { LibraryService } from './library.service';
import { LibraryQrService } from './library-qr.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class LibraryController {
    private readonly libraryService;
    private readonly libraryQrService;
    constructor(libraryService: LibraryService, libraryQrService: LibraryQrService);
    getCategories(): Promise<{
        data: {
            id: string;
            name: string;
        }[];
    }>;
    getBooks(query: PaginationDto, categoryId?: string): Promise<{
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
    issueBook(dto: any): Promise<{
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
    returnBook(id: string): Promise<{
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
    issueCard(id: string): Promise<{
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
    getActiveIssues(query: PaginationDto): Promise<{
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
    getBookQR(id: string): Promise<{
        qr: string;
        bookId: string;
        isbn?: string;
    }>;
    getCardQR(id: string): Promise<{
        qr: string;
        cardNo: string;
    }>;
    quickIssue(dto: {
        bookQrPayload: string;
        cardQrPayload: string;
        dueDays?: number;
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
    quickReturn(dto: {
        bookQrPayload: string;
        libraryCardId: string;
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
}
