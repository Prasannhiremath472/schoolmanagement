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
var FeesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeesService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let FeesService = FeesService_1 = class FeesService {
    constructor(tenantPrisma, eventEmitter) {
        this.tenantPrisma = tenantPrisma;
        this.eventEmitter = eventEmitter;
        this.logger = new common_1.Logger(FeesService_1.name);
    }
    get db() { return this.tenantPrisma.db; }
    async getCategories() {
        const data = await this.db.feeCategory.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' },
        });
        return { data };
    }
    async createCategory(dto) {
        const data = await this.db.feeCategory.create({ data: dto });
        return { data, message: 'Fee category created' };
    }
    async getFeeStructures(classId, academicYearId) {
        const data = await this.db.feeStructure.findMany({
            where: {
                ...(classId && { classId }),
                ...(academicYearId && { academicYearId }),
                isActive: true,
            },
            include: {
                class: { select: { name: true } },
                feeItems: { include: { feeCategory: true } },
                feeInstallments: { orderBy: { installmentNo: 'asc' } },
            },
        });
        return { data };
    }
    async createFeeStructure(dto) {
        const { feeItems, installments, ...structureData } = dto;
        const totalAmount = feeItems.reduce((sum, item) => sum + item.amount, 0);
        const feeStructure = await this.db.feeStructure.create({
            data: {
                ...structureData,
                totalAmount,
                feeItems: {
                    create: feeItems.map((item) => ({
                        feeCategoryId: item.feeCategoryId,
                        amount: item.amount,
                        isMandatory: item.isMandatory ?? true,
                    })),
                },
                feeInstallments: {
                    create: installments.map((inst, idx) => ({
                        installmentNo: idx + 1,
                        name: inst.name,
                        dueDate: new Date(inst.dueDate),
                        amount: inst.amount,
                        lateFinePerDay: inst.lateFinePerDay ?? 0,
                    })),
                },
            },
            include: {
                feeItems: true,
                feeInstallments: true,
            },
        });
        return { data: feeStructure, message: 'Fee structure created successfully' };
    }
    async collectFee(dto, collectedBy) {
        const db = this.db;
        const installment = await db.feeInstallment.findUnique({
            where: { id: dto.installmentId },
        });
        if (!installment)
            throw new common_1.NotFoundException('Installment not found');
        const today = new Date();
        const dueDate = installment.dueDate;
        let fine = 0;
        if (today > dueDate && Number(installment.lateFinePerDay) > 0) {
            const diffDays = Math.floor((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
            fine = diffDays * Number(installment.lateFinePerDay);
        }
        const payableAmount = Number(installment.amount) + fine - (dto.discount || 0);
        const dueAmount = Math.max(0, payableAmount - dto.paidAmount);
        const receiptNo = await this.generateReceiptNo();
        const payment = await db.feePayment.create({
            data: {
                studentId: dto.studentId,
                installmentId: dto.installmentId,
                amount: installment.amount,
                discount: dto.discount || 0,
                fine,
                payableAmount,
                paidAmount: dto.paidAmount,
                dueAmount,
                paymentMode: dto.paymentMode,
                receiptNo,
                transactionId: dto.transactionId,
                paymentDate: new Date(),
                remarks: dto.remarks,
                collectedBy,
            },
        });
        this.eventEmitter.emit('fee.collected', { payment, receiptNo });
        return { data: { ...payment, receiptNo }, message: 'Fee collected successfully' };
    }
    async getStudentFeeDetails(studentId, academicYearId) {
        const db = this.db;
        const student = await db.student.findUnique({
            where: { id: studentId },
            include: {
                sections: {
                    where: { isActive: true },
                    include: { section: { include: { class: true } } },
                },
            },
        });
        if (!student)
            throw new common_1.NotFoundException('Student not found');
        const classId = student.sections[0]?.section?.classId;
        if (!classId)
            throw new common_1.BadRequestException('Student not assigned to any class');
        const feeStructure = await db.feeStructure.findFirst({
            where: { classId, academicYearId, isActive: true },
            include: {
                feeItems: { include: { feeCategory: true } },
                feeInstallments: {
                    orderBy: { installmentNo: 'asc' },
                    include: {
                        payments: {
                            where: { studentId },
                            orderBy: { createdAt: 'desc' },
                        },
                    },
                },
            },
        });
        if (!feeStructure)
            return { data: { student, feeStructure: null } };
        const installmentDetails = feeStructure.feeInstallments.map((inst) => {
            const paid = inst.payments.reduce((sum, p) => sum + Number(p.paidAmount), 0);
            const due = Math.max(0, Number(inst.amount) - paid);
            const isOverdue = new Date() > inst.dueDate && due > 0;
            return {
                ...inst,
                paidAmount: paid,
                dueAmount: due,
                isOverdue,
                lastPayment: inst.payments[0] || null,
            };
        });
        const totalPaid = installmentDetails.reduce((s, i) => s + i.paidAmount, 0);
        const totalDue = installmentDetails.reduce((s, i) => s + i.dueAmount, 0);
        return {
            data: {
                student: { id: student.id, firstName: student.firstName, lastName: student.lastName, admissionNo: student.admissionNo },
                feeStructure: { ...feeStructure, feeInstallments: installmentDetails },
                summary: { totalFees: Number(feeStructure.totalAmount), totalPaid, totalDue },
            },
        };
    }
    async getPayments(query) {
        const where = {};
        if (query.studentId)
            where.studentId = query.studentId;
        if (query.fromDate)
            where.paymentDate = { gte: new Date(query.fromDate) };
        if (query.toDate)
            where.paymentDate = { ...where.paymentDate, lte: new Date(query.toDate) };
        const [data, total] = await Promise.all([
            this.db.feePayment.findMany({
                where,
                include: {
                    student: { select: { firstName: true, lastName: true, admissionNo: true } },
                    installment: { select: { name: true, installmentNo: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.db.feePayment.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async getDueReminders() {
        const db = this.db;
        const today = new Date();
        const overdue = await db.feeInstallment.findMany({
            where: { dueDate: { lt: today } },
            include: {
                feeStructure: { include: { class: true } },
            },
        });
        return { data: overdue, message: 'Overdue fee installments' };
    }
    async getDashboardStats(academicYearId) {
        const db = this.db;
        const [totalCollected, totalDue, todayCollection] = await Promise.all([
            db.feePayment.aggregate({ _sum: { paidAmount: true } }),
            db.feePayment.aggregate({ _sum: { dueAmount: true }, where: { dueAmount: { gt: 0 } } }),
            db.feePayment.aggregate({
                _sum: { paidAmount: true },
                where: { paymentDate: new Date(new Date().toDateString()) },
            }),
        ]);
        return {
            data: {
                totalCollected: Number(totalCollected._sum.paidAmount) || 0,
                totalDue: Number(totalDue._sum.dueAmount) || 0,
                todayCollection: Number(todayCollection._sum.paidAmount) || 0,
            },
        };
    }
    async getScholarships() {
        return { data: await this.db.scholarship.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } }) };
    }
    async createScholarship(dto) {
        const data = await this.db.scholarship.create({ data: dto });
        return { data, message: 'Scholarship created' };
    }
    async updateScholarship(id, dto) {
        const data = await this.db.scholarship.update({ where: { id }, data: dto });
        return { data, message: 'Scholarship updated' };
    }
    async applyScholarship(dto) {
        const scholarship = await this.db.scholarship.findUnique({ where: { id: dto.scholarshipId } });
        if (!scholarship)
            throw new Error('Scholarship not found');
        const student = await this.db.student.findUnique({
            where: { id: dto.studentId },
            include: { sections: { where: { isActive: true }, include: { section: { include: { class: true } } } } },
        });
        if (!student?.sections[0])
            throw new Error('Student not assigned to any class');
        const feeStructure = await this.db.feeStructure.findFirst({
            where: { classId: student.sections[0].section.classId, academicYearId: dto.academicYearId },
        });
        if (!feeStructure)
            throw new Error('Fee structure not found for student class');
        const discountAmount = (Number(feeStructure.totalAmount) * Number(scholarship.percentage)) / 100;
        return {
            data: {
                studentId: dto.studentId,
                scholarshipId: dto.scholarshipId,
                scholarshipName: scholarship.name,
                percentage: scholarship.percentage,
                originalFee: Number(feeStructure.totalAmount),
                discountAmount,
                finalFee: Number(feeStructure.totalAmount) - discountAmount,
            },
            message: `Scholarship "${scholarship.name}" (${scholarship.percentage}%) applied. Discount: ₹${discountAmount}`,
        };
    }
    async grantConcession(dto) {
        const installment = await this.db.feeInstallment.findUnique({ where: { id: dto.installmentId } });
        if (!installment)
            throw new Error('Installment not found');
        const receiptNo = await this.generateReceiptNo();
        const payment = await this.db.feePayment.create({
            data: {
                studentId: dto.studentId,
                installmentId: dto.installmentId,
                amount: installment.amount,
                discount: dto.discountAmount,
                fine: 0,
                payableAmount: Math.max(0, Number(installment.amount) - dto.discountAmount),
                paidAmount: dto.discountAmount,
                dueAmount: Math.max(0, Number(installment.amount) - dto.discountAmount),
                paymentMode: 'CASH',
                receiptNo: `WVR-${receiptNo.split('-')[1]}-${receiptNo.split('-')[2]}`,
                remarks: `Concession granted: ${dto.reason}`,
                collectedBy: dto.approvedBy,
                paymentDate: new Date(),
            },
        });
        return { data: payment, message: `Concession of ₹${dto.discountAmount} granted` };
    }
    async generateReceiptNo() {
        const count = await this.db.feePayment.count();
        const year = new Date().getFullYear();
        return `RCP-${year}-${String(count + 1).padStart(6, '0')}`;
    }
};
exports.FeesService = FeesService;
exports.FeesService = FeesService = FeesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService,
        event_emitter_1.EventEmitter2])
], FeesService);
//# sourceMappingURL=fees.service.js.map