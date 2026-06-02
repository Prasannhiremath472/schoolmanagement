import { Injectable, Logger } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  // ─── FEE RECEIPT ─────────────────────────────────────────────────────────

  async generateFeeReceipt(data: {
    receiptNo: string;
    school: { name: string; address?: string; phone?: string; logo?: string };
    student: { firstName: string; lastName: string; admissionNo: string; class?: string };
    payment: {
      amount: number;
      discount: number;
      fine: number;
      payableAmount: number;
      paidAmount: number;
      dueAmount: number;
      paymentMode: string;
      paymentDate: Date;
      installmentName: string;
      transactionId?: string;
    };
    collectedBy?: string;
  }): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A5', margin: 30 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk: Buffer) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const { school, student, payment, receiptNo } = data;
      const primaryColor = '#1976d2';
      const pageWidth = doc.page.width - 60;

      // Header
      doc.rect(0, 0, doc.page.width, 90).fill(primaryColor);
      doc.fill('#ffffff').fontSize(18).font('Helvetica-Bold').text(school.name, 30, 20, { align: 'center' });
      doc.fontSize(10).font('Helvetica').text(school.address || '', 30, 44, { align: 'center' });
      doc.fontSize(10).text(school.phone || '', 30, 58, { align: 'center' });

      // Receipt title
      doc.fill('#333333').fontSize(14).font('Helvetica-Bold').text('FEE RECEIPT', 30, 100, { align: 'center' });
      doc.moveTo(30, 118).lineTo(pageWidth + 30, 118).stroke('#cccccc');

      // Receipt meta
      let y = 128;
      doc.fontSize(9).font('Helvetica-Bold').fill('#555');
      doc.text('Receipt No:', 30, y);
      doc.font('Helvetica').fill('#000').text(receiptNo, 120, y);
      doc.font('Helvetica-Bold').fill('#555').text('Date:', 300, y);
      doc.font('Helvetica').fill('#000').text(payment.paymentDate.toLocaleDateString('en-IN'), 350, y);

      // Student details
      y += 20;
      doc.moveTo(30, y).lineTo(pageWidth + 30, y).stroke('#eeeeee');
      y += 8;
      doc.fontSize(9).font('Helvetica-Bold').fill('#555').text('Student Name:', 30, y);
      doc.font('Helvetica').fill('#000').text(`${student.firstName} ${student.lastName}`, 120, y);
      y += 16;
      doc.font('Helvetica-Bold').fill('#555').text('Admission No:', 30, y);
      doc.font('Helvetica').fill('#000').text(student.admissionNo, 120, y);
      if (student.class) {
        doc.font('Helvetica-Bold').fill('#555').text('Class:', 300, y);
        doc.font('Helvetica').fill('#000').text(student.class, 350, y);
      }

      // Payment details table
      y += 28;
      doc.rect(30, y, pageWidth, 20).fill('#f5f5f5');
      doc.fill('#333').font('Helvetica-Bold').fontSize(9).text('PAYMENT DETAILS', 35, y + 5);
      y += 26;

      const rows = [
        ['Fee Type', payment.installmentName],
        ['Fee Amount', `₹${Number(payment.amount).toLocaleString('en-IN')}`],
        ['Discount', `₹${Number(payment.discount).toLocaleString('en-IN')}`],
        ['Late Fine', `₹${Number(payment.fine).toLocaleString('en-IN')}`],
        ['Payable Amount', `₹${Number(payment.payableAmount).toLocaleString('en-IN')}`],
        ['Amount Paid', `₹${Number(payment.paidAmount).toLocaleString('en-IN')}`],
        ['Balance Due', `₹${Number(payment.dueAmount).toLocaleString('en-IN')}`],
        ['Payment Mode', payment.paymentMode],
        ...(payment.transactionId ? [['Transaction ID', payment.transactionId]] : []),
      ];

      for (let i = 0; i < rows.length; i++) {
        const [label, value] = rows[i];
        const rowColor = i % 2 === 0 ? '#ffffff' : '#fafafa';
        doc.rect(30, y - 2, pageWidth, 18).fill(rowColor);
        doc.fill('#555').font('Helvetica-Bold').fontSize(8.5).text(label + ':', 35, y + 2);
        const isBold = label === 'Amount Paid' || label === 'Payable Amount';
        doc.fill('#000').font(isBold ? 'Helvetica-Bold' : 'Helvetica').fontSize(8.5).text(value, 180, y + 2);
        y += 18;
      }

      // Total paid highlight
      y += 4;
      doc.rect(30, y, pageWidth, 26).fill(primaryColor);
      doc.fill('#ffffff').font('Helvetica-Bold').fontSize(11)
        .text(`TOTAL PAID: ₹${Number(payment.paidAmount).toLocaleString('en-IN')}`, 35, y + 7, { align: 'center', width: pageWidth - 10 });

      // Footer
      y += 50;
      if (data.collectedBy) {
        doc.fill('#555').font('Helvetica').fontSize(8).text(`Collected by: ${data.collectedBy}`, 30, y);
      }
      doc.text('This is a computer-generated receipt and does not require a signature.', 30, y + 14, { align: 'center', width: pageWidth });
      doc.moveTo(30, y + 30).lineTo(pageWidth + 30, y + 30).stroke('#cccccc');
      doc.fontSize(7.5).text('Thank you for your payment!', 30, y + 36, { align: 'center', width: pageWidth });

      doc.end();
    });
  }

  // ─── REPORT CARD ──────────────────────────────────────────────────────────

  async generateReportCard(data: {
    student: any;
    school: { name: string; logo?: string };
    schedule: any;
    results: any[];
    summary: {
      totalMarks: number;
      maxMarks: number;
      percentage: number;
      cgpa: number;
      overallGrade: string;
    };
  }): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 40 });
      const chunks: Buffer[] = [];

      doc.on('data', (c: Buffer) => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const { student, school, schedule, results, summary } = data;
      const primaryColor = '#1976d2';
      const pageWidth = doc.page.width - 80;

      // Header
      doc.rect(0, 0, doc.page.width, 100).fill(primaryColor);
      doc.fill('#fff').fontSize(20).font('Helvetica-Bold').text(school.name, 40, 20, { align: 'center' });
      doc.fontSize(12).font('Helvetica').text('ACADEMIC REPORT CARD', 40, 50, { align: 'center' });
      doc.fontSize(10).text(`${schedule?.examType?.name || 'Examination'} — ${schedule?.academicYear?.name || ''}`, 40, 70, { align: 'center' });

      // Student info
      let y = 115;
      doc.fill('#333').fontSize(10).font('Helvetica-Bold').text('STUDENT INFORMATION', 40, y);
      doc.moveTo(40, y + 14).lineTo(pageWidth + 40, y + 14).stroke('#cccccc');
      y += 22;

      const studentInfo = [
        ['Student Name', `${student.firstName} ${student.lastName}`],
        ['Admission No', student.admissionNo],
        ['Class', `${schedule?.class?.name || ''}`],
        ['Exam', schedule?.name || ''],
        ['Date of Issue', new Date().toLocaleDateString('en-IN')],
      ];

      for (let i = 0; i < studentInfo.length; i += 2) {
        const [l1, v1] = studentInfo[i];
        const [l2, v2] = studentInfo[i + 1] || ['', ''];
        doc.fill('#555').font('Helvetica-Bold').fontSize(9).text(`${l1}:`, 40, y);
        doc.fill('#000').font('Helvetica').text(v1, 170, y);
        if (l2) {
          doc.fill('#555').font('Helvetica-Bold').text(`${l2}:`, 340, y);
          doc.fill('#000').font('Helvetica').text(v2, 440, y);
        }
        y += 18;
      }

      // Results table
      y += 10;
      doc.fill('#333').fontSize(10).font('Helvetica-Bold').text('SUBJECT-WISE RESULTS', 40, y);
      doc.moveTo(40, y + 14).lineTo(pageWidth + 40, y + 14).stroke('#cccccc');
      y += 22;

      // Table header
      doc.rect(40, y - 2, pageWidth, 20).fill(primaryColor);
      doc.fill('#fff').font('Helvetica-Bold').fontSize(8.5);
      doc.text('Subject', 45, y + 3);
      doc.text('Max Marks', 250, y + 3);
      doc.text('Marks Obtained', 320, y + 3);
      doc.text('Grade', 430, y + 3);
      doc.text('Status', 480, y + 3);
      y += 24;

      for (let i = 0; i < results.length; i++) {
        const r = results[i];
        const rowColor = i % 2 === 0 ? '#ffffff' : '#f7f7f7';
        doc.rect(40, y - 2, pageWidth, 18).fill(rowColor);

        const isPass = r.isPass;
        doc.fill('#000').font('Helvetica').fontSize(8.5).text(r.subject?.name || '', 45, y + 2);
        doc.text(String(r.maxMarks), 270, y + 2);
        doc.fill(r.isAbsent ? '#d32f2f' : '#000').text(r.isAbsent ? 'AB' : String(r.marksObtained), 360, y + 2);
        doc.fill(isPass ? '#2e7d32' : '#d32f2f').font('Helvetica-Bold').text(r.grade || '-', 440, y + 2);
        doc.text(r.isAbsent ? 'ABSENT' : isPass ? 'PASS' : 'FAIL', 475, y + 2);
        y += 18;
      }

      // Summary
      y += 10;
      doc.rect(40, y, pageWidth, 70).fill('#f5f7fa').stroke('#cccccc');
      doc.fill('#333').font('Helvetica-Bold').fontSize(10).text('PERFORMANCE SUMMARY', 50, y + 8);
      y += 26;

      const summaryItems = [
        ['Total Marks', `${summary.totalMarks} / ${summary.maxMarks}`],
        ['Percentage', `${Number(summary.percentage).toFixed(2)}%`],
        ['CGPA', Number(summary.cgpa).toFixed(2)],
        ['Overall Grade', summary.overallGrade],
        ['Result', Number(summary.percentage) >= 33 ? 'PASS' : 'FAIL'],
      ];

      doc.fontSize(9);
      summaryItems.forEach(([label, value], i) => {
        const col = i < 3 ? 50 + i * 160 : 50 + (i - 3) * 160;
        const row = i < 3 ? y : y + 20;
        doc.fill('#555').font('Helvetica-Bold').text(`${label}:`, col, row);
        const isPass = label === 'Result' && value === 'PASS';
        const isFail = label === 'Result' && value === 'FAIL';
        doc.fill(isPass ? '#2e7d32' : isFail ? '#d32f2f' : '#000').font('Helvetica').text(String(value), col + 90, row);
      });

      // Signatures
      y += 80;
      doc.fill('#333').font('Helvetica').fontSize(8);
      const sigPositions = [50, 230, 410];
      const sigLabels = ["Class Teacher's Sign", "Principal's Sign", "Parent's Sign"];
      sigLabels.forEach((label, i) => {
        doc.moveTo(sigPositions[i], y).lineTo(sigPositions[i] + 120, y).stroke('#333');
        doc.text(label, sigPositions[i], y + 5, { width: 120, align: 'center' });
      });

      doc.end();
    });
  }

  // ─── ATTENDANCE REPORT ────────────────────────────────────────────────────

  async generateAttendanceReport(data: {
    school: { name: string };
    section: { name: string; class: string };
    month: number;
    year: number;
    students: Array<{
      name: string;
      admissionNo: string;
      present: number;
      absent: number;
      late: number;
      total: number;
      percentage: string;
    }>;
  }): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 40, layout: 'landscape' });
      const chunks: Buffer[] = [];

      doc.on('data', (c: Buffer) => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const { school, section, month, year, students } = data;
      const monthName = new Date(year, month - 1, 1).toLocaleString('en-IN', { month: 'long', year: 'numeric' });
      const primaryColor = '#1976d2';
      const pageWidth = doc.page.width - 80;

      // Header
      doc.rect(0, 0, doc.page.width, 70).fill(primaryColor);
      doc.fill('#fff').font('Helvetica-Bold').fontSize(16).text(school.name, 40, 15, { align: 'center' });
      doc.fontSize(11).text(`ATTENDANCE REPORT — ${section.class} - ${section.name} — ${monthName}`, 40, 40, { align: 'center' });

      let y = 85;
      doc.rect(40, y - 2, pageWidth, 20).fill(primaryColor);
      doc.fill('#fff').font('Helvetica-Bold').fontSize(8.5);
      doc.text('#', 45, y + 3, { width: 25 });
      doc.text('Admission No', 72, y + 3, { width: 90 });
      doc.text('Student Name', 165, y + 3, { width: 140 });
      doc.text('Present', 310, y + 3, { width: 55 });
      doc.text('Absent', 368, y + 3, { width: 55 });
      doc.text('Late', 426, y + 3, { width: 45 });
      doc.text('Total', 474, y + 3, { width: 45 });
      doc.text('Attendance %', 522, y + 3, { width: 80 });
      y += 24;

      for (let i = 0; i < students.length; i++) {
        const s = students[i];
        const rowColor = i % 2 === 0 ? '#fff' : '#f7f7f7';
        doc.rect(40, y - 2, pageWidth, 16).fill(rowColor);
        doc.fill('#000').font('Helvetica').fontSize(8);
        doc.text(String(i + 1), 45, y + 2, { width: 25 });
        doc.text(s.admissionNo, 72, y + 2, { width: 90 });
        doc.text(s.name, 165, y + 2, { width: 140 });
        doc.fill('#2e7d32').text(String(s.present), 325, y + 2, { width: 50 });
        doc.fill('#d32f2f').text(String(s.absent), 382, y + 2, { width: 50 });
        doc.fill('#ed6c02').text(String(s.late), 435, y + 2, { width: 40 });
        doc.fill('#000').text(String(s.total), 480, y + 2, { width: 40 });
        const pct = parseFloat(s.percentage);
        doc.fill(pct >= 75 ? '#2e7d32' : pct >= 50 ? '#ed6c02' : '#d32f2f').font('Helvetica-Bold').text(`${s.percentage}%`, 530, y + 2, { width: 75 });
        y += 16;

        if (y > doc.page.height - 60) {
          doc.addPage({ layout: 'landscape' });
          y = 40;
        }
      }

      doc.fill('#333').font('Helvetica').fontSize(7.5).text(`Generated on: ${new Date().toLocaleString('en-IN')}`, 40, doc.page.height - 35);
      doc.end();
    });
  }

  // ─── PAYSLIP ──────────────────────────────────────────────────────────────

  async generatePayslip(data: {
    school: { name: string; address?: string };
    employee: { firstName: string; lastName: string; employeeId: string; designation?: string; department?: string; bankAccount?: string; bankName?: string };
    salary: {
      month: number; year: number; workingDays: number; presentDays: number; leaveDays: number;
      basicPaid: number; allowances: number; deductions: number; grossSalary: number; netSalary: number;
      salaryStructure?: { basic: number; hra: number; da: number; ta: number; otherAllowance: number; pf: number; esi: number; tds: number };
    };
  }): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({ size: 'A4', margin: 40 });
      const chunks: Buffer[] = [];
      doc.on('data', (c: Buffer) => chunks.push(c));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      const { school, employee, salary } = data;
      const primary = '#1976d2';
      const pageWidth = doc.page.width - 80;
      const monthName = new Date(salary.year, salary.month - 1, 1).toLocaleString('en-IN', { month: 'long', year: 'numeric' });

      // Header
      doc.rect(0, 0, doc.page.width, 80).fill(primary);
      doc.fill('#fff').fontSize(18).font('Helvetica-Bold').text(school.name, 40, 18, { align: 'center' });
      doc.fontSize(11).font('Helvetica').text('SALARY PAYSLIP', 40, 44, { align: 'center' });
      doc.fontSize(10).text(monthName, 40, 60, { align: 'center' });

      let y = 95;

      // Employee Details
      doc.rect(40, y, pageWidth, 20).fill('#f5f5f5');
      doc.fill('#333').font('Helvetica-Bold').fontSize(9).text('EMPLOYEE INFORMATION', 45, y + 5);
      y += 26;

      const empInfo = [
        ['Employee Name', `${employee.firstName} ${employee.lastName}`],
        ['Employee ID', employee.employeeId],
        ['Designation', employee.designation || '—'],
        ['Department', employee.department || '—'],
        ['Bank', employee.bankName || '—'],
        ['Account No', employee.bankAccount || '—'],
        ['Month', monthName],
        ['Working Days', String(salary.workingDays)],
        ['Present Days', String(salary.presentDays)],
        ['Leave Days', String(salary.leaveDays)],
      ];

      for (let i = 0; i < empInfo.length; i += 2) {
        const bg = Math.floor(i / 2) % 2 === 0 ? '#ffffff' : '#fafafa';
        doc.rect(40, y - 2, pageWidth, 18).fill(bg);
        const [l1, v1] = empInfo[i];
        const [l2, v2] = empInfo[i + 1] || ['', ''];
        doc.fill('#555').font('Helvetica-Bold').fontSize(8.5).text(`${l1}:`, 45, y + 2);
        doc.fill('#000').font('Helvetica').text(v1, 180, y + 2);
        if (l2) {
          doc.fill('#555').font('Helvetica-Bold').text(`${l2}:`, 340, y + 2);
          doc.fill('#000').font('Helvetica').text(v2, 460, y + 2);
        }
        y += 18;
      }

      // Earnings & Deductions
      y += 10;
      const colWidth = (pageWidth - 10) / 2;

      // Earnings
      doc.rect(40, y, colWidth, 20).fill(primary);
      doc.fill('#fff').font('Helvetica-Bold').fontSize(9).text('EARNINGS', 45, y + 5);
      y += 22;

      const earnings = [
        ['Basic Pay', salary.salaryStructure?.basic || salary.basicPaid],
        ['HRA', salary.salaryStructure?.hra || 0],
        ['DA', salary.salaryStructure?.da || 0],
        ['Travel Allowance', salary.salaryStructure?.ta || 0],
        ['Other Allowances', salary.salaryStructure?.otherAllowance || 0],
      ];

      let earningTotal = 0;
      for (let i = 0; i < earnings.length; i++) {
        const [label, amount] = earnings[i];
        const bg = i % 2 === 0 ? '#ffffff' : '#f9f9f9';
        doc.rect(40, y - 2, colWidth, 18).fill(bg);
        doc.fill('#555').font('Helvetica').fontSize(8.5).text(String(label), 45, y + 2);
        doc.fill('#000').font('Helvetica').text(`₹${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 200, y + 2);
        earningTotal += Number(amount);
        y += 18;
      }
      doc.rect(40, y - 2, colWidth, 20).fill('#e8f5e9');
      doc.fill('#2e7d32').font('Helvetica-Bold').fontSize(9).text('Gross Earnings:', 45, y + 3);
      doc.text(`₹${Number(salary.grossSalary).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 200, y + 3);

      // Deductions (right column)
      const deductionY = y - (earnings.length + 1) * 18 - 22;
      doc.rect(40 + colWidth + 10, deductionY, colWidth, 20).fill('#d32f2f');
      doc.fill('#fff').font('Helvetica-Bold').fontSize(9).text('DEDUCTIONS', 55 + colWidth, deductionY + 5);

      const deductions = [
        ['PF (Employee)', salary.salaryStructure?.pf || 0],
        ['ESI', salary.salaryStructure?.esi || 0],
        ['TDS / Income Tax', salary.salaryStructure?.tds || 0],
        ['Other Deductions', Math.max(0, salary.deductions - (salary.salaryStructure?.pf || 0) - (salary.salaryStructure?.esi || 0) - (salary.salaryStructure?.tds || 0))],
      ];

      let deductionY2 = deductionY + 22;
      let deductionTotal = 0;
      for (let i = 0; i < deductions.length; i++) {
        const [label, amount] = deductions[i];
        const bg = i % 2 === 0 ? '#ffffff' : '#fff3f3';
        doc.rect(40 + colWidth + 10, deductionY2 - 2, colWidth, 18).fill(bg);
        doc.fill('#555').font('Helvetica').fontSize(8.5).text(String(label), 55 + colWidth, deductionY2 + 2);
        doc.fill('#000').text(`₹${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 200 + colWidth, deductionY2 + 2);
        deductionTotal += Number(amount);
        deductionY2 += 18;
      }
      // Pad remaining rows
      while (deductionY2 < y - 2) { deductionY2 += 18; }
      doc.rect(40 + colWidth + 10, y - 2, colWidth, 20).fill('#ffebee');
      doc.fill('#d32f2f').font('Helvetica-Bold').fontSize(9).text('Total Deductions:', 55 + colWidth, y + 3);
      doc.text(`₹${Number(salary.deductions).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 200 + colWidth, y + 3);

      // Net Pay
      y += 30;
      doc.rect(40, y, pageWidth, 30).fill(primary);
      doc.fill('#fff').font('Helvetica-Bold').fontSize(13).text(
        `NET PAY: ₹${Number(salary.netSalary).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
        40, y + 8, { align: 'center', width: pageWidth },
      );

      // Footer
      y += 50;
      doc.fill('#555').font('Helvetica').fontSize(8);
      doc.moveTo(40, y).lineTo(200, y).stroke('#333');
      doc.text('Employee Signature', 40, y + 5, { width: 160, align: 'center' });
      doc.moveTo(380, y).lineTo(560, y).stroke('#333');
      doc.text('Authorized Signature', 380, y + 5, { width: 180, align: 'center' });

      y += 30;
      doc.fontSize(7.5).fill('#888').text('This is a computer-generated payslip. No signature required.', 40, y, { align: 'center', width: pageWidth });
      doc.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, 40, y + 12, { align: 'center', width: pageWidth });

      doc.end();
    });
  }
}
