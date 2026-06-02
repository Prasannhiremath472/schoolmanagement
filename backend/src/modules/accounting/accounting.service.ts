import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto, buildPaginationMeta, getPaginationArgs } from '../../common/dto/pagination.dto';

@Injectable()
export class AccountingService {
  constructor(private readonly tenantPrisma: TenantPrismaService) {}
  private get db() { return this.tenantPrisma.db; }

  // ─── ACCOUNT HEADS ────────────────────────────────────────────────────────

  async getAccountHeads() {
    return {
      data: await this.db.accountHead.findMany({
        where: { isActive: true, parentId: null },
        include: { children: { where: { isActive: true } } },
        orderBy: { code: 'asc' },
      }),
    };
  }

  async createAccountHead(dto: any) {
    return { data: await this.db.accountHead.create({ data: dto }), message: 'Account head created' };
  }

  // ─── TRANSACTIONS ─────────────────────────────────────────────────────────

  async getTransactions(query: Partial<PaginationDto> & { fromDate?: string; toDate?: string; type?: string; accountHeadId?: string }) {
    const where: any = {};
    if (query.fromDate) where.date = { gte: new Date(query.fromDate) };
    if (query.toDate) where.date = { ...where.date, lte: new Date(query.toDate) };
    if (query.type) where.type = query.type;
    if (query.accountHeadId) where.accountHeadId = query.accountHeadId;

    const [data, total] = await Promise.all([
      this.db.transaction.findMany({
        where,
        
        
        orderBy: { date: 'desc' },
        include: { accountHead: { select: { name: true, code: true, type: true } } },
      }),
      this.db.transaction.count({ where }),
    ]);

    return { data, meta: buildPaginationMeta(total, query) };
  }

  async createTransaction(dto: any) {
    const voucherNo = await this.generateVoucherNo();
    const data = await this.db.transaction.create({
      data: { ...dto, date: new Date(dto.date), voucherNo },
    });
    return { data, message: 'Transaction recorded' };
  }

  // ─── JOURNAL ENTRIES ──────────────────────────────────────────────────────

  /**
   * Double-entry journal: debit one account, credit another.
   * Each journal entry creates 2 transactions.
   */
  async createJournalEntry(dto: {
    date: string;
    description: string;
    debitAccountId: string;
    creditAccountId: string;
    amount: number;
    reference?: string;
    createdBy?: string;
  }) {
    const voucherNo = await this.generateVoucherNo('JV');

    const [debitTx, creditTx] = await Promise.all([
      this.db.transaction.create({
        data: {
          accountHeadId: dto.debitAccountId,
          date: new Date(dto.date),
          type: 'DEBIT',
          amount: dto.amount,
          description: dto.description,
          reference: dto.reference,
          voucherNo,
          createdBy: dto.createdBy,
        },
      }),
      this.db.transaction.create({
        data: {
          accountHeadId: dto.creditAccountId,
          date: new Date(dto.date),
          type: 'CREDIT',
          amount: dto.amount,
          description: dto.description,
          reference: dto.reference,
          voucherNo,
          createdBy: dto.createdBy,
        },
      }),
    ]);

    return { data: { voucherNo, debitTx, creditTx }, message: 'Journal entry created' };
  }

  // ─── CASH BOOK ────────────────────────────────────────────────────────────

  async getCashBook(fromDate: string, toDate: string) {
    // Cash account = ASSET type accounts with 'cash' in name
    const cashAccount = await this.db.accountHead.findFirst({
      where: { name: { contains: 'cash', mode: 'insensitive' }, type: 'ASSET' },
    });

    if (!cashAccount) {
      return { data: { entries: [], openingBalance: 0, closingBalance: 0 } };
    }

    const entries = await this.db.transaction.findMany({
      where: {
        accountHeadId: cashAccount.id,
        date: { gte: new Date(fromDate), lte: new Date(toDate) },
      },
      orderBy: { date: 'asc' },
    });

    let runningBalance = 0;
    const enriched = entries.map((e) => {
      if (e.type === 'DEBIT') runningBalance += Number(e.amount);
      else runningBalance -= Number(e.amount);
      return { ...e, runningBalance };
    });

    return {
      data: {
        entries: enriched,
        openingBalance: 0,
        closingBalance: runningBalance,
        totalDebit: entries.filter((e) => e.type === 'DEBIT').reduce((s, e) => s + Number(e.amount), 0),
        totalCredit: entries.filter((e) => e.type === 'CREDIT').reduce((s, e) => s + Number(e.amount), 0),
      },
    };
  }

  // ─── BANK BOOK ────────────────────────────────────────────────────────────

  async getBankBook(fromDate: string, toDate: string, bankAccountId?: string) {
    let accountId = bankAccountId;

    if (!accountId) {
      const bankAccount = await this.db.accountHead.findFirst({
        where: { name: { contains: 'bank', mode: 'insensitive' }, type: 'ASSET' },
      });
      accountId = bankAccount?.id;
    }

    if (!accountId) return { data: { entries: [], closingBalance: 0 } };

    const entries = await this.db.transaction.findMany({
      where: { accountHeadId: accountId, date: { gte: new Date(fromDate), lte: new Date(toDate) } },
      orderBy: { date: 'asc' },
    });

    let balance = 0;
    const enriched = entries.map((e) => {
      balance += e.type === 'DEBIT' ? Number(e.amount) : -Number(e.amount);
      return { ...e, runningBalance: balance };
    });

    return { data: { entries: enriched, closingBalance: balance } };
  }

  // ─── BALANCE SHEET ────────────────────────────────────────────────────────

  async getBalanceSheet(fromDate: string, toDate: string) {
    const accountHeads = await this.db.accountHead.findMany({
      where: { isActive: true },
      include: {
        transactions: {
          where: { date: { gte: new Date(fromDate), lte: new Date(toDate) } },
        },
      },
    });

    const groupedByType: Record<string, any[]> = {
      ASSET: [],
      LIABILITY: [],
      INCOME: [],
      EXPENSE: [],
      EQUITY: [],
    };

    for (const account of accountHeads) {
      const debit = account.transactions.filter((t) => t.type === 'DEBIT').reduce((s, t) => s + Number(t.amount), 0);
      const credit = account.transactions.filter((t) => t.type === 'CREDIT').reduce((s, t) => s + Number(t.amount), 0);
      const balance = debit - credit;
      groupedByType[account.type].push({ ...account, debit, credit, balance });
    }

    const totalAssets = groupedByType.ASSET.reduce((s, a) => s + a.balance, 0);
    const totalLiabilities = groupedByType.LIABILITY.reduce((s, a) => s + a.balance, 0);
    const totalIncome = groupedByType.INCOME.reduce((s, a) => s + a.balance, 0);
    const totalExpenses = groupedByType.EXPENSE.reduce((s, a) => s + a.balance, 0);
    const netProfit = totalIncome - totalExpenses;

    return {
      data: {
        accounts: groupedByType,
        summary: {
          totalAssets,
          totalLiabilities,
          totalIncome,
          totalExpenses,
          netProfit,
          equity: totalAssets - totalLiabilities,
        },
      },
    };
  }

  // ─── PROFIT & LOSS ────────────────────────────────────────────────────────

  async getProfitAndLoss(fromDate: string, toDate: string) {
    const from = new Date(fromDate);
    const to = new Date(toDate);

    const [incomeAccounts, expenseAccounts] = await Promise.all([
      this.db.accountHead.findMany({
        where: { type: 'INCOME', isActive: true },
        include: { transactions: { where: { date: { gte: from, lte: to }, type: 'CREDIT' } } },
      }),
      this.db.accountHead.findMany({
        where: { type: 'EXPENSE', isActive: true },
        include: { transactions: { where: { date: { gte: from, lte: to }, type: 'DEBIT' } } },
      }),
    ]);

    const incomeItems = incomeAccounts.map((a) => ({
      name: a.name,
      code: a.code,
      amount: a.transactions.reduce((s, t) => s + Number(t.amount), 0),
    }));

    const expenseItems = expenseAccounts.map((a) => ({
      name: a.name,
      code: a.code,
      amount: a.transactions.reduce((s, t) => s + Number(t.amount), 0),
    }));

    // Also add fee income
    const feeIncome = await this.db.feePayment.aggregate({
      _sum: { paidAmount: true },
      where: { paymentDate: { gte: from, lte: to } },
    });

    const totalIncome = incomeItems.reduce((s, i) => s + i.amount, 0) + Number(feeIncome._sum.paidAmount || 0);
    const totalExpenses = expenseItems.reduce((s, e) => s + e.amount, 0);

    return {
      data: {
        income: {
          items: [...incomeItems, { name: 'Fee Income', code: 'FEE', amount: Number(feeIncome._sum.paidAmount || 0) }],
          total: totalIncome,
        },
        expenses: { items: expenseItems, total: totalExpenses },
        netProfit: totalIncome - totalExpenses,
        netProfitMargin: totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(2) : 0,
      },
    };
  }

  // ─── GST REPORT ──────────────────────────────────────────────────────────

  async getGstReport(fromDate: string, toDate: string) {
    const from = new Date(fromDate);
    const to = new Date(toDate);

    // Fee collections are taxable supplies
    const collections = await this.db.feePayment.findMany({
      where: { paymentDate: { gte: from, lte: to } },
      include: {
        installment: { include: { feeStructure: { include: { feeItems: { include: { feeCategory: true } } } } } },
      },
    });

    const totalTaxableValue = collections.reduce((s, p) => s + Number(p.paidAmount), 0);
    const gstRate = 18; // 18% GST on tuition fees (example)
    const cgst = totalTaxableValue * (gstRate / 2) / 100;
    const sgst = totalTaxableValue * (gstRate / 2) / 100;

    // Expenses (purchase)
    const expenses = await this.db.expense.findMany({ where: { date: { gte: from, lte: to } } });
    const inputTax = expenses.reduce((s, e) => s + (Number(e.amount) * 0.18), 0);

    return {
      data: {
        period: { fromDate, toDate },
        outputTax: {
          taxableValue: totalTaxableValue,
          cgst,
          sgst,
          igst: 0,
          totalGst: cgst + sgst,
        },
        inputTax: {
          totalPurchases: expenses.reduce((s, e) => s + Number(e.amount), 0),
          inputCgst: inputTax / 2,
          inputSgst: inputTax / 2,
          totalInputGst: inputTax,
        },
        netGstPayable: (cgst + sgst) - inputTax,
      },
    };
  }

  // ─── LEDGER ───────────────────────────────────────────────────────────────

  async getLedger(accountHeadId: string, fromDate: string, toDate: string) {
    const account = await this.db.accountHead.findUnique({
      where: { id: accountHeadId },
      include: {
        transactions: {
          where: { date: { gte: new Date(fromDate), lte: new Date(toDate) } },
          orderBy: { date: 'asc' },
        },
      },
    });

    if (!account) throw new NotFoundException('Account head not found');

    let balance = 0;
    const entries = account.transactions.map((t) => {
      balance += t.type === 'DEBIT' ? Number(t.amount) : -Number(t.amount);
      return { ...t, runningBalance: balance };
    });

    return {
      data: {
        account: { id: account.id, name: account.name, code: account.code, type: account.type },
        entries,
        closingBalance: balance,
      },
    };
  }

  // ─── EXPENSES ────────────────────────────────────────────────────────────

  async getExpenses(query: Partial<PaginationDto> & { fromDate?: string; toDate?: string; category?: string }) {
    const where: any = {};
    if (query.fromDate) where.date = { gte: new Date(query.fromDate) };
    if (query.toDate) where.date = { ...where.date, lte: new Date(query.toDate) };
    if (query.category) where.category = query.category;

    const [data, total] = await Promise.all([
      this.db.expense.findMany({ where, ...getPaginationArgs(query), orderBy: { date: 'desc' } }),
      this.db.expense.count({ where }),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  async createExpense(dto: any, createdBy: string) {
    return { data: await this.db.expense.create({ data: { ...dto, date: new Date(dto.date), createdBy } }), message: 'Expense recorded' };
  }

  private async generateVoucherNo(prefix = 'V'): Promise<string> {
    const count = await this.db.transaction.count();
    const year = new Date().getFullYear();
    return `${prefix}-${year}-${String(count + 1).padStart(5, '0')}`;
  }
}
