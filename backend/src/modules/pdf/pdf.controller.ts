import {
  Controller, Get, Param, Query, Res, UseGuards, ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { PdfService } from './pdf.service';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('PDF')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'pdf', version: '1' })
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly tenantPrisma: TenantPrismaService,
  ) {}

  @Get('receipt/:paymentId')
  @Roles('SCHOOL_ADMIN', 'ACCOUNTANT', 'PARENT')
  @ApiOperation({ summary: 'Download fee receipt as PDF' })
  async downloadReceipt(@Param('paymentId', ParseUUIDPipe) paymentId: string, @Res() res: Response) {
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

  @Get('report-card/:studentId')
  @Roles('SCHOOL_ADMIN', 'TEACHER', 'STUDENT', 'PARENT')
  @ApiOperation({ summary: 'Download report card as PDF' })
  @ApiQuery({ name: 'examScheduleId', required: true })
  async downloadReportCard(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Query('examScheduleId') examScheduleId: string,
    @Res() res: Response,
  ) {
    const db = this.tenantPrisma.db;

    const [student, results, schedule] = await Promise.all([
      db.student.findUnique({ where: { id: studentId } }),
      db.examResult.findMany({ where: { studentId, examScheduleId }, include: { subject: true } }),
      db.examSchedule.findUnique({ where: { id: examScheduleId }, include: { examType: true, class: true, academicYear: true } }),
    ]);

    if (!student) { res.status(404).json({ message: 'Student not found' }); return; }

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

  @Get('attendance-report')
  @Roles('SCHOOL_ADMIN', 'TEACHER')
  @ApiOperation({ summary: 'Download attendance report as PDF' })
  @ApiQuery({ name: 'sectionId', required: true })
  @ApiQuery({ name: 'month', required: true })
  @ApiQuery({ name: 'year', required: true })
  async downloadAttendanceReport(
    @Query('sectionId') sectionId: string,
    @Query('month') month: number,
    @Query('year') year: number,
    @Res() res: Response,
  ) {
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

  @Get('payslip/:salaryId')
  @Roles('SCHOOL_ADMIN', 'TEACHER', 'STAFF')
  @ApiOperation({ summary: 'Download payslip PDF' })
  async downloadPayslip(@Param('salaryId', ParseUUIDPipe) salaryId: string, @Res() res: Response) {
    const db = this.tenantPrisma.db;

    const salary = await db.salary.findUnique({
      where: { id: salaryId },
      include: {
        salaryStructure: true,
        teacher: { select: { firstName: true, lastName: true, employeeId: true, designation: true, department: true, bankAccount: true, bankName: true } },
        staff: { select: { firstName: true, lastName: true, employeeId: true, designation: true, department: true, bankAccount: true, bankName: true } },
      },
    });

    if (!salary) { res.status(404).json({ message: 'Salary record not found' }); return; }

    const employee = salary.teacher || salary.staff;
    if (!employee) { res.status(400).json({ message: 'Employee not found' }); return; }

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
        salaryStructure: salary.salaryStructure as any,
      },
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="payslip-${employee.employeeId}-${salary.month}-${salary.year}.pdf"`);
    res.end(pdfBuffer);
  }

  private getGrade(pct: number): string {
    if (pct >= 90) return 'A+';
    if (pct >= 80) return 'A';
    if (pct >= 70) return 'B+';
    if (pct >= 60) return 'B';
    if (pct >= 50) return 'C';
    if (pct >= 33) return 'D';
    return 'F';
  }
}
