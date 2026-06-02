import { Controller, Get, Post, Body, Query, UseGuards, ParseUUIDPipe, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AccountingService } from './accounting.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Accounting')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'accounting', version: '1' })
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Get('accounts') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Get account heads (chart of accounts)' })
  getAccounts() { return this.accountingService.getAccountHeads(); }

  @Post('accounts') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Create account head' })
  createAccount(@Body() dto: any) { return this.accountingService.createAccountHead(dto); }

  @Get('transactions') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Get all transactions' })
  getTransactions(@Query() q: PaginationDto, @Query('fromDate') fromDate?: string, @Query('toDate') toDate?: string, @Query('type') type?: string) {
    return this.accountingService.getTransactions({ ...q, fromDate, toDate, type });
  }

  @Post('transactions') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Record a transaction' })
  createTransaction(@Body() dto: any) { return this.accountingService.createTransaction(dto); }

  @Post('journal') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Create double-entry journal entry' })
  createJournal(@Body() dto: any, @CurrentUser('id') userId: string) {
    return this.accountingService.createJournalEntry({ ...dto, createdBy: userId });
  }

  @Get('cash-book') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Get cash book' })
  @ApiQuery({ name: 'fromDate', required: true }) @ApiQuery({ name: 'toDate', required: true })
  getCashBook(@Query('fromDate') fromDate: string, @Query('toDate') toDate: string) {
    return this.accountingService.getCashBook(fromDate, toDate);
  }

  @Get('bank-book') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Get bank book' })
  @ApiQuery({ name: 'fromDate', required: true }) @ApiQuery({ name: 'toDate', required: true })
  getBankBook(@Query('fromDate') fromDate: string, @Query('toDate') toDate: string, @Query('bankAccountId') bankAccountId?: string) {
    return this.accountingService.getBankBook(fromDate, toDate, bankAccountId);
  }

  @Get('balance-sheet') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Get balance sheet' })
  @ApiQuery({ name: 'fromDate', required: true }) @ApiQuery({ name: 'toDate', required: true })
  getBalanceSheet(@Query('fromDate') fromDate: string, @Query('toDate') toDate: string) {
    return this.accountingService.getBalanceSheet(fromDate, toDate);
  }

  @Get('profit-loss') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Get Profit & Loss statement' })
  @ApiQuery({ name: 'fromDate', required: true }) @ApiQuery({ name: 'toDate', required: true })
  getProfitLoss(@Query('fromDate') fromDate: string, @Query('toDate') toDate: string) {
    return this.accountingService.getProfitAndLoss(fromDate, toDate);
  }

  @Get('gst-report') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Get GST report' })
  @ApiQuery({ name: 'fromDate', required: true }) @ApiQuery({ name: 'toDate', required: true })
  getGstReport(@Query('fromDate') fromDate: string, @Query('toDate') toDate: string) {
    return this.accountingService.getGstReport(fromDate, toDate);
  }

  @Get('ledger/:accountHeadId') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Get account ledger' })
  @ApiQuery({ name: 'fromDate', required: true }) @ApiQuery({ name: 'toDate', required: true })
  getLedger(@Param('accountHeadId') id: string, @Query('fromDate') fromDate: string, @Query('toDate') toDate: string) {
    return this.accountingService.getLedger(id, fromDate, toDate);
  }

  @Get('expenses') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Get expenses' })
  getExpenses(@Query() q: PaginationDto, @Query('fromDate') fromDate?: string, @Query('toDate') toDate?: string) {
    return this.accountingService.getExpenses({ ...q, fromDate, toDate });
  }

  @Post('expenses') @Roles('SCHOOL_ADMIN', 'ACCOUNTANT') @ApiOperation({ summary: 'Record expense' })
  createExpense(@Body() dto: any, @CurrentUser('id') userId: string) {
    return this.accountingService.createExpense(dto, userId);
  }
}
