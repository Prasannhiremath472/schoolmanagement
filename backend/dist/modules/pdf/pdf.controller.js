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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pdf_service_1 = require("./pdf.service");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let PdfController = class PdfController {
    constructor(pdfService, tenantPrisma) {
        this.pdfService = pdfService;
        this.tenantPrisma = tenantPrisma;
    }
    async downloadReceipt(paymentId, res) {
        const db = this.tenantPrisma.db;
        const payment = await db.feePayment.findUnique({
            where: { id: paymentId },
            include: {
                student: { include: { sections: { where: { isActive: true }, include: { section: { include: { class: true } } } } } },
                installment: { include: { feeStructure: { include: { class: true } } } },
            },
        });
        if (!payment) {
            res.status(404).json({ message: 'Payment not found' });
            return;
        }
        const pdfBuffer = await this.pdfService.generateFeeReceipt({
            receiptNo: payment.receiptNo,
            school: { name: 'School Name', address: '', phone: '' },
            student: {
                firstName: payment.student.firstName,
                lastName: payment.student.lastName,
                admissionNo: payment.student.admissionNo,
                class: `${payment.student.sections[0]?.section?.class?.name || ''} ${payment.student.sections[0]?.section?.name || ''}`,
            },
            payment: {
                amount: Number(payment.amount),
                discount: Number(payment.discount),
                fine: Number(payment.fine),
                payableAmount: Number(payment.payableAmount),
                paidAmount: Number(payment.paidAmount),
                dueAmount: Number(payment.dueAmount),
                paymentMode: payment.paymentMode,
                paymentDate: payment.paymentDate,
                installmentName: payment.installment.name,
                transactionId: payment.transactionId || undefined,
            },
            collectedBy: payment.collectedBy || undefined,
        });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="receipt-${payment.receiptNo}.pdf"`);
        res.setHeader('Content-Length', pdfBuffer.length);
        res.end(pdfBuffer);
    }
    async downloadReportCard(studentId, examScheduleId, res) {
        const db = this.tenantPrisma.db;
        const [student, results, schedule] = await Promise.all([
            db.student.findUnique({ where: { id: studentId } }),
            db.examResult.findMany({ where: { studentId, examScheduleId }, include: { subject: true } }),
            db.examSchedule.findUnique({ where: { id: examScheduleId }, include: { examType: true, class: true, academicYear: true } }),
        ]);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        const totalMarks = results.reduce((s, r) => s + Number(r.marksObtained), 0);
        const maxMarks = results.reduce((s, r) => s + Number(r.maxMarks), 0);
        const percentage = maxMarks > 0 ? (totalMarks / maxMarks) * 100 : 0;
        const cgpa = results.length > 0 ? results.reduce((s, r) => s + Number(r.gradePoint || 0), 0) / results.length : 0;
        const pdfBuffer = await this.pdfService.generateReportCard({
            student, schedule,
            school: { name: 'School Name' },
            results,
            summary: { totalMarks, maxMarks, percentage, cgpa, overallGrade: this.getGrade(percentage) },
        });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="report-card-${student.admissionNo}.pdf"`);
        res.end(pdfBuffer);
    }
    async downloadAttendanceReport(sectionId, month, year, res) {
        const db = this.tenantPrisma.db;
        const startDate = new Date(+year, +month - 1, 1);
        const endDate = new Date(+year, +month, 0);
        const students = await db.studentSection.findMany({
            where: { sectionId, isActive: true },
            include: {
                student: {
                    include: {
                        attendances: { where: { sectionId, date: { gte: startDate, lte: endDate } } },
                    },
                },
            },
        });
        const section = await db.section.findUnique({
            where: { id: sectionId },
            include: { class: { select: { name: true } } },
        });
        const studentData = students.map((ss) => {
            const atts = ss.student.attendances;
            const present = atts.filter((a) => a.status === 'PRESENT').length;
            const absent = atts.filter((a) => a.status === 'ABSENT').length;
            const late = atts.filter((a) => a.status === 'LATE').length;
            const total = atts.length;
            return {
                name: `${ss.student.firstName} ${ss.student.lastName}`,
                admissionNo: ss.student.admissionNo,
                present, absent, late, total,
                percentage: total > 0 ? ((present / total) * 100).toFixed(1) : '0',
            };
        });
        const pdfBuffer = await this.pdfService.generateAttendanceReport({
            school: { name: 'School Name' },
            section: { name: section?.name || '', class: section?.class?.name || '' },
            month: +month,
            year: +year,
            students: studentData,
        });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="attendance-${month}-${year}.pdf"`);
        res.end(pdfBuffer);
    }
    async downloadPayslip(salaryId, res) {
        const db = this.tenantPrisma.db;
        const salary = await db.salary.findUnique({
            where: { id: salaryId },
            include: {
                salaryStructure: true,
                teacher: { select: { firstName: true, lastName: true, employeeId: true, designation: true, department: true, bankAccount: true, bankName: true } },
                staff: { select: { firstName: true, lastName: true, employeeId: true, designation: true, department: true, bankAccount: true, bankName: true } },
            },
        });
        if (!salary) {
            res.status(404).json({ message: 'Salary record not found' });
            return;
        }
        const employee = salary.teacher || salary.staff;
        if (!employee) {
            res.status(400).json({ message: 'Employee not found' });
            return;
        }
        const pdfBuffer = await this.pdfService.generatePayslip({
            school: { name: 'School Name' },
            employee,
            salary: {
                month: salary.month,
                year: salary.year,
                workingDays: salary.workingDays,
                presentDays: salary.presentDays,
                leaveDays: salary.leaveDays,
                basicPaid: Number(salary.basicPaid),
                allowances: Number(salary.allowances),
                deductions: Number(salary.deductions),
                grossSalary: Number(salary.grossSalary),
                netSalary: Number(salary.netSalary),
                salaryStructure: salary.salaryStructure,
            },
        });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="payslip-${employee.employeeId}-${salary.month}-${salary.year}.pdf"`);
        res.end(pdfBuffer);
    }
    getGrade(pct) {
        if (pct >= 90)
            return 'A+';
        if (pct >= 80)
            return 'A';
        if (pct >= 70)
            return 'B+';
        if (pct >= 60)
            return 'B';
        if (pct >= 50)
            return 'C';
        if (pct >= 33)
            return 'D';
        return 'F';
    }
};
exports.PdfController = PdfController;
__decorate([
    (0, common_1.Get)('receipt/:paymentId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT', 'PARENT'),
    (0, swagger_1.ApiOperation)({ summary: 'Download fee receipt as PDF' }),
    __param(0, (0, common_1.Param)('paymentId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "downloadReceipt", null);
__decorate([
    (0, common_1.Get)('report-card/:studentId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER', 'STUDENT', 'PARENT'),
    (0, swagger_1.ApiOperation)({ summary: 'Download report card as PDF' }),
    (0, swagger_1.ApiQuery)({ name: 'examScheduleId', required: true }),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('examScheduleId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "downloadReportCard", null);
__decorate([
    (0, common_1.Get)('attendance-report'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Download attendance report as PDF' }),
    (0, swagger_1.ApiQuery)({ name: 'sectionId', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: true }),
    __param(0, (0, common_1.Query)('sectionId')),
    __param(1, (0, common_1.Query)('month')),
    __param(2, (0, common_1.Query)('year')),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "downloadAttendanceReport", null);
__decorate([
    (0, common_1.Get)('payslip/:salaryId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER', 'STAFF'),
    (0, swagger_1.ApiOperation)({ summary: 'Download payslip PDF' }),
    __param(0, (0, common_1.Param)('salaryId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "downloadPayslip", null);
exports.PdfController = PdfController = __decorate([
    (0, swagger_1.ApiTags)('PDF'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)({ path: 'pdf', version: '1' }),
    __metadata("design:paramtypes", [pdf_service_1.PdfService,
        tenant_prisma_service_1.TenantPrismaService])
], PdfController);
//# sourceMappingURL=pdf.controller.js.map