import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto, buildPaginationMeta, getPaginationArgs } from '../../common/dto/pagination.dto';

@Injectable()
export class LibraryService {
  constructor(private readonly tenantPrisma: TenantPrismaService) {}
  private get db() { return this.tenantPrisma.db; }

  async getBooks(query: Partial<PaginationDto> & { categoryId?: string }) {
    const where: any = { isActive: true };
    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.search) where.OR = [
      { title: { contains: query.search, mode: 'insensitive' } },
      { author: { contains: query.search, mode: 'insensitive' } },
      { isbn: { contains: query.search, mode: 'insensitive' } },
    ];
    const [data, total] = await Promise.all([
      this.db.book.findMany({ where, ...getPaginationArgs(query), orderBy: { title: 'asc' }, include: { category: true } }),
      this.db.book.count({ where }),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  async createBook(dto: any) {
    const data = await this.db.book.create({ data: { ...dto, totalCopies: dto.totalCopies || 1, availableCopies: dto.totalCopies || 1 } });
    return { data, message: 'Book added to library' };
  }

  async issueBook(dto: { bookId: string; libraryCardId: string; dueDate: string }) {
    const book = await this.db.book.findUnique({ where: { id: dto.bookId } });
    if (!book || book.availableCopies < 1) throw new BadRequestException('Book not available');

    const [issue] = await Promise.all([
      this.db.bookIssue.create({ data: { bookId: dto.bookId, libraryCardId: dto.libraryCardId, issueDate: new Date(), dueDate: new Date(dto.dueDate) } }),
      this.db.book.update({ where: { id: dto.bookId }, data: { availableCopies: { decrement: 1 } } }),
    ]);
    return { data: issue, message: 'Book issued' };
  }

  async returnBook(issueId: string) {
    const issue = await this.db.bookIssue.findUnique({ where: { id: issueId } });
    if (!issue || issue.isReturned) throw new BadRequestException('Invalid return request');

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

  async issueCard(studentId: string) {
    const count = await this.db.libraryCard.count();
    const cardNo = `LIB-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;
    const validTill = new Date(); validTill.setFullYear(validTill.getFullYear() + 1);
    const data = await this.db.libraryCard.create({ data: { studentId, cardNo, validTill } });
    return { data, message: 'Library card issued' };
  }

  async getActiveIssues(query: Partial<PaginationDto>) {
    const [data, total] = await Promise.all([
      this.db.bookIssue.findMany({ where: { isReturned: false }, ...getPaginationArgs(query), orderBy: { dueDate: 'asc' },
        include: { book: { select: { title: true, isbn: true } }, libraryCard: { include: { student: { select: { firstName: true, lastName: true, admissionNo: true } } } } } }),
      this.db.bookIssue.count({ where: { isReturned: false } }),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }
}
