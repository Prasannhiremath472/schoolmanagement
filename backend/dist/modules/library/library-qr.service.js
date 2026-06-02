"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryQrService = void 0;
const common_1 = require("@nestjs/common");
const QRCode = require("qrcode");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
let LibraryQrService = class LibraryQrService {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
    }
    get db() { return this.tenantPrisma.db; }
    async generateBookQR(bookId) {
        const book = await this.db.book.findUnique({
            where: { id: bookId },
            select: { id: true, isbn: true, title: true },
        });
        if (!book)
            throw new Error('Book not found');
        const payload = JSON.stringify({ type: 'BOOK', id: bookId, isbn: book.isbn, ts: Date.now() });
        const qr = await QRCode.toDataURL(payload);
        return { qr, bookId, isbn: book.isbn || undefined };
    }
    async generateLibraryCardQR(cardId) {
        const card = await this.db.libraryCard.findUnique({
            where: { id: cardId },
            include: { student: { select: { firstName: true, lastName: true, admissionNo: true } } },
        });
        if (!card)
            throw new Error('Library card not found');
        const payload = JSON.stringify({
            type: 'LIBRARY_CARD',
            id: cardId,
            cardNo: card.cardNo,
            studentId: card.studentId,
        });
        const qr = await QRCode.toDataURL(payload);
        return { qr, cardNo: card.cardNo };
    }
    parseQrPayload(payload) {
        try {
            return JSON.parse(payload);
        }
        catch {
            throw new Error('Invalid QR code payload');
        }
    }
    async quickIssueByQR(bookQrPayload, cardQrPayload, dueDays = 14) {
        const bookData = this.parseQrPayload(bookQrPayload);
        const cardData = this.parseQrPayload(cardQrPayload);
        if (bookData.type !== 'BOOK')
            throw new Error('First QR must be a book QR');
        if (cardData.type !== 'LIBRARY_CARD')
            throw new Error('Second QR must be a library card QR');
        const book = await this.db.book.findUnique({ where: { id: bookData.id } });
        if (!book || book.availableCopies < 1)
            throw new Error('Book not available');
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + dueDays);
        const [issue] = await Promise.all([
            this.db.bookIssue.create({
                data: {
                    bookId: book.id,
                    libraryCardId: cardData.id,
                    issueDate: new Date(),
                    dueDate,
                },
            }),
            this.db.book.update({
                where: { id: book.id },
                data: { availableCopies: { decrement: 1 } },
            }),
        ]);
        return {
            data: issue,
            message: `Book "${book.title}" issued successfully. Due by ${dueDate.toLocaleDateString('en-IN')}`,
        };
    }
    async quickReturnByQR(bookQrPayload, libraryCardId) {
        const bookData = this.parseQrPayload(bookQrPayload);
        if (bookData.type !== 'BOOK')
            throw new Error('Invalid book QR');
        const issue = await this.db.bookIssue.findFirst({
            where: { bookId: bookData.id, libraryCardId, isReturned: false },
            include: { book: true },
        });
        if (!issue)
            throw new Error('No active issue found for this book and card');
        const today = new Date();
        let fine = 0;
        if (today > issue.dueDate) {
            const days = Math.floor((today.getTime() - issue.dueDate.getTime()) / (1000 * 60 * 60 * 24));
            fine = days * Number(issue.finePerDay);
        }
        const [updated] = await Promise.all([
            this.db.bookIssue.update({
                where: { id: issue.id },
                data: { returnDate: today, isReturned: true, fine },
            }),
            this.db.book.update({
                where: { id: issue.bookId },
                data: { availableCopies: { increment: 1 } },
            }),
        ]);
        return {
            data: updated,
            message: `Book "${issue.book.title}" returned successfully. Fine: ₹${fine}`,
        };
    }
    generateBarcode(isbn) {
        return isbn.replace(/[-\s]/g, '').substring(0, 13);
    }
};
exports.LibraryQrService = LibraryQrService;
exports.LibraryQrService = LibraryQrService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], LibraryQrService);
//# sourceMappingURL=library-qr.service.js.map