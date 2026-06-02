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
exports.LibraryService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let LibraryService = class LibraryService {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
    }
    get db() { return this.tenantPrisma.db; }
    async getBooks(query) {
        const where = { isActive: true };
        if (query.categoryId)
            where.categoryId = query.categoryId;
        if (query.search)
            where.OR = [
                { title: { contains: query.search, mode: 'insensitive' } },
                { author: { contains: query.search, mode: 'insensitive' } },
                { isbn: { contains: query.search, mode: 'insensitive' } },
            ];
        const [data, total] = await Promise.all([
            this.db.book.findMany({ where, ...(0, pagination_dto_1.getPaginationArgs)(query), orderBy: { title: 'asc' }, include: { category: true } }),
            this.db.book.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async createBook(dto) {
        const data = await this.db.book.create({ data: { ...dto, totalCopies: dto.totalCopies || 1, availableCopies: dto.totalCopies || 1 } });
        return { data, message: 'Book added to library' };
    }
    async issueBook(dto) {
        const book = await this.db.book.findUnique({ where: { id: dto.bookId } });
        if (!book || book.availableCopies < 1)
            throw new common_1.BadRequestException('Book not available');
        const [issue] = await Promise.all([
            this.db.bookIssue.create({ data: { bookId: dto.bookId, libraryCardId: dto.libraryCardId, issueDate: new Date(), dueDate: new Date(dto.dueDate) } }),
            this.db.book.update({ where: { id: dto.bookId }, data: { availableCopies: { decrement: 1 } } }),
        ]);
        return { data: issue, message: 'Book issued' };
    }
    async returnBook(issueId) {
        const issue = await this.db.bookIssue.findUnique({ where: { id: issueId } });
        if (!issue || issue.isReturned)
            throw new common_1.BadRequestException('Invalid return request');
        const today = new Date();
        let fine = 0;
        if (today > issue.dueDate) {
            const days = Math.floor((today.getTime() - issue.dueDate.getTime()) / (1000 * 60 * 60 * 24));
            fine = days * Number(issue.finePerDay);
        }
        const [updated] = await Promise.all([
            this.db.bookIssue.update({ where: { id: issueId }, data: { returnDate: today, isReturned: true, fine } }),
            this.db.book.update({ where: { id: issue.bookId }, data: { availableCopies: { increment: 1 } } }),
        ]);
        return { data: updated, message: `Book returned. Fine: ₹${fine}` };
    }
    async getCategories() {
        return { data: await this.db.bookCategory.findMany({ orderBy: { name: 'asc' } }) };
    }
    async issueCard(studentId) {
        const count = await this.db.libraryCard.count();
        const cardNo = `LIB-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;
        const validTill = new Date();
        validTill.setFullYear(validTill.getFullYear() + 1);
        const data = await this.db.libraryCard.create({ data: { studentId, cardNo, validTill } });
        return { data, message: 'Library card issued' };
    }
    async getActiveIssues(query) {
        const [data, total] = await Promise.all([
            this.db.bookIssue.findMany({ where: { isReturned: false }, ...(0, pagination_dto_1.getPaginationArgs)(query), orderBy: { dueDate: 'asc' },
                include: { book: { select: { title: true, isbn: true } }, libraryCard: { include: { student: { select: { firstName: true, lastName: true, admissionNo: true } } } } } }),
            this.db.bookIssue.count({ where: { isReturned: false } }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
};
exports.LibraryService = LibraryService;
exports.LibraryService = LibraryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], LibraryService);
//# sourceMappingURL=library.service.js.map