import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { TenantPrismaService } from '../../database/tenant-prisma.service';

@Injectable()
export class LibraryQrService {
  constructor(private readonly tenantPrisma: TenantPrismaService) {}

  private get db() { return this.tenantPrisma.db; }

  /** Generate QR code for a book (for quick scanning during issue/return) */
  async generateBookQR(bookId: string): Promise<{ qr: string; bookId: string; isbn?: string }> {
    const book = await this.db.book.findUnique({
      where: { id: bookId },
      select: { id: true, isbn: true, title: true },
    });

    if (!book) throw new Error('Book not found');

    const payload = JSON.stringify({ type: 'BOOK', id: bookId, isbn: book.isbn, ts: Date.now() });
    const qr = await QRCode.toDataURL(payload);

    return { qr, bookId, isbn: book.isbn || undefined };
  }

  /** Generate QR code for a library card */
  async generateLibraryCardQR(cardId: string): Promise<{ qr: string; cardNo: string }> {
    const card = await this.db.libraryCard.findUnique({
      where: { id: cardId },
      include: { student: { select: { firstName: true, lastName: true, admissionNo: true } } },
    });

    if (!card) throw new Error('Library card not found');

    const payload = JSON.stringify({
      type: 'LIBRARY_CARD',
      id: cardId,
      cardNo: card.cardNo,
      studentId: card.studentId,
    });
    const qr = await QRCode.toDataURL(payload);

    return { qr, cardNo: card.cardNo };
  }

  /** Process QR scan — decode and return action + data */
  parseQrPayload(payload: string): { type: string; id: string; [key: string]: any } {
    try {
      return JSON.parse(payload);
    } catch {
      throw new Error('Invalid QR code payload');
    }
  }

  /** Quick issue: scan book QR + library card QR → issue book */
  async quickIssueByQR(bookQrPayload: string, cardQrPayload: string, dueDays = 14) {
    const bookData = this.parseQrPayload(bookQrPayload);
    const cardData = this.parseQrPayload(cardQrPayload);

    if (bookData.type !== 'BOOK') throw new Error('First QR must be a book QR');
    if (cardData.type !== 'LIBRARY_CARD') throw new Error('Second QR must be a library card QR');

    const book = await this.db.book.findUnique({ where: { id: bookData.id } });
    if (!book || book.availableCopies < 1) throw new Error('Book not available');

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

  /** Quick return: scan book QR → find active issue → return */
  async quickReturnByQR(bookQrPayload: string, libraryCardId: string) {
    const bookData = this.parseQrPayload(bookQrPayload);
    if (bookData.type !== 'BOOK') throw new Error('Invalid book QR');

    const issue = await this.db.bookIssue.findFirst({
      where: { bookId: bookData.id, libraryCardId, isReturned: false },
      include: { book: true },
    });

    if (!issue) throw new Error('No active issue found for this book and card');

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

  /** Generate barcode string for a book (EAN-13 format using ISBN) */
  generateBarcode(isbn: string): string {
    return isbn.replace(/[-\s]/g, '').substring(0, 13);
  }
}
