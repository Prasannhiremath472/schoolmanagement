import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { FeesService } from '../../src/modules/fees/fees.service';
import { TenantPrismaService } from '../../src/database/tenant-prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('FeesService', () => {
  let feesService: FeesService;
  let tenantPrisma: any;

  const mockInstallment = {
    id: 'inst-123',
    amount: 5000,
    dueDate: new Date('2024-07-31'),
    lateFinePerDay: 10,
    name: 'Term 1',
    installmentNo: 1,
  };

  beforeEach(async () => {
    const dbMock = {
      feeCategory: { findMany: jest.fn().mockResolvedValue([]), create: jest.fn() },
      feeStructure: { findMany: jest.fn().mockResolvedValue([]), create: jest.fn() },
      feeInstallment: { findUnique: jest.fn() },
      feePayment: { create: jest.fn(), findMany: jest.fn().mockResolvedValue([]), count: jest.fn().mockResolvedValue(0), aggregate: jest.fn().mockResolvedValue({ _sum: { paidAmount: null } }) },
      student: { findUnique: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeesService,
        { provide: TenantPrismaService, useValue: { db: dbMock } },
        { provide: 'BullQueue_fee-reminders', useValue: { add: jest.fn() } },
        { provide: EventEmitter2, useValue: { emit: jest.fn() } },
      ],
    }).compile();

    feesService = module.get<FeesService>(FeesService);
    tenantPrisma = module.get(TenantPrismaService);
  });

  describe('collectFee', () => {
    it('should create fee payment successfully', async () => {
      tenantPrisma.db.feeInstallment.findUnique.mockResolvedValue(mockInstallment);
      tenantPrisma.db.feePayment.count.mockResolvedValue(5);
      tenantPrisma.db.feePayment.create.mockResolvedValue({
        id: 'pay-123',
        receiptNo: 'RCP-2024-000006',
        paidAmount: 5000,
        dueAmount: 0,
      });

      const result = await feesService.collectFee({
        studentId: 'student-123',
        installmentId: 'inst-123',
        paidAmount: 5000,
        paymentMode: 'CASH' as any,
      }, 'admin-id');

      expect(result.data.receiptNo).toMatch(/^RCP-/);
      expect(result.message).toBe('Fee collected successfully');
    });

    it('should throw NotFoundException for invalid installment', async () => {
      tenantPrisma.db.feeInstallment.findUnique.mockResolvedValue(null);

      await expect(
        feesService.collectFee({ studentId: 's1', installmentId: 'invalid', paidAmount: 1000, paymentMode: 'CASH' as any }, 'admin'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should calculate late fine correctly', async () => {
      const overdueInstallment = { ...mockInstallment, dueDate: new Date('2024-01-01') };
      tenantPrisma.db.feeInstallment.findUnique.mockResolvedValue(overdueInstallment);
      tenantPrisma.db.feePayment.count.mockResolvedValue(10);
      tenantPrisma.db.feePayment.create.mockImplementation((args) => Promise.resolve({ ...args.data, id: 'pay-new' }));

      await feesService.collectFee({ studentId: 's1', installmentId: 'inst-123', paidAmount: 6000, paymentMode: 'CASH' as any }, 'admin');

      expect(tenantPrisma.db.feePayment.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ fine: expect.any(Number) }),
        }),
      );
      const callArgs = tenantPrisma.db.feePayment.create.mock.calls[0][0];
      expect(callArgs.data.fine).toBeGreaterThan(0);
    });
  });
});
