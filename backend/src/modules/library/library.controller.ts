import { Controller, Get, Post, Body, Param, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LibraryService } from './library.service';
import { LibraryQrService } from './library-qr.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Library')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'library', version: '1' })
export class LibraryController {
  constructor(
    private readonly libraryService: LibraryService,
    private readonly libraryQrService: LibraryQrService,
  ) {}
  @Get('categories') @ApiOperation({ summary: 'Get book categories' }) getCategories() { return this.libraryService.getCategories(); }
  @Get('books') @ApiOperation({ summary: 'Search books' }) getBooks(@Query() query: PaginationDto, @Query('categoryId') categoryId?: string) { return this.libraryService.getBooks({ ...query, categoryId }); }
  @Post('books') @Roles('SCHOOL_ADMIN', 'LIBRARIAN') @ApiOperation({ summary: 'Add book' }) createBook(@Body() dto: any) { return this.libraryService.createBook(dto); }
  @Post('issue') @Roles('SCHOOL_ADMIN', 'LIBRARIAN') @ApiOperation({ summary: 'Issue book to student' }) issueBook(@Body() dto: any) { return this.libraryService.issueBook(dto); }
  @Post('return/:issueId') @Roles('SCHOOL_ADMIN', 'LIBRARIAN') @ApiOperation({ summary: 'Return book' }) returnBook(@Param('issueId', ParseUUIDPipe) id: string) { return this.libraryService.returnBook(id); }
  @Post('cards/:studentId') @Roles('SCHOOL_ADMIN', 'LIBRARIAN') @ApiOperation({ summary: 'Issue library card' }) issueCard(@Param('studentId', ParseUUIDPipe) id: string) { return this.libraryService.issueCard(id); }
  @Get('active-issues') @Roles('SCHOOL_ADMIN', 'LIBRARIAN') @ApiOperation({ summary: 'Get all active issues' }) getActiveIssues(@Query() query: PaginationDto) { return this.libraryService.getActiveIssues(query); }

  // ─── QR Code endpoints ─────────────────────────────────────────────────────
  @Get('qr/book/:bookId') @Roles('SCHOOL_ADMIN', 'LIBRARIAN') @ApiOperation({ summary: 'Generate QR code for a book' })
  getBookQR(@Param('bookId', ParseUUIDPipe) id: string) { return this.libraryQrService.generateBookQR(id); }

  @Get('qr/card/:cardId') @Roles('SCHOOL_ADMIN', 'LIBRARIAN') @ApiOperation({ summary: 'Generate QR code for library card' })
  getCardQR(@Param('cardId', ParseUUIDPipe) id: string) { return this.libraryQrService.generateLibraryCardQR(id); }

  @Post('qr/issue') @Roles('SCHOOL_ADMIN', 'LIBRARIAN') @ApiOperation({ summary: 'Quick issue book via QR scan' })
  quickIssue(@Body() dto: { bookQrPayload: string; cardQrPayload: string; dueDays?: number }) {
    return this.libraryQrService.quickIssueByQR(dto.bookQrPayload, dto.cardQrPayload, dto.dueDays);
  }

  @Post('qr/return') @Roles('SCHOOL_ADMIN', 'LIBRARIAN') @ApiOperation({ summary: 'Quick return book via QR scan' })
  quickReturn(@Body() dto: { bookQrPayload: string; libraryCardId: string }) {
    return this.libraryQrService.quickReturnByQR(dto.bookQrPayload, dto.libraryCardId);
  }
}
