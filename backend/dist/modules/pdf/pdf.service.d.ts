export declare class PdfService {
    private readonly logger;
    generateFeeReceipt(data: {
        receiptNo: string;
        school: {
            name: string;
            address?: string;
            phone?: string;
            logo?: string;
        };
        student: {
            firstName: string;
            lastName: string;
            admissionNo: string;
            class?: string;
        };
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
    }): Promise<Buffer>;
    generateReportCard(data: {
        student: any;
        school: {
            name: string;
            logo?: string;
        };
        schedule: any;
        results: any[];
        summary: {
            totalMarks: number;
            maxMarks: number;
            percentage: number;
            cgpa: number;
            overallGrade: string;
        };
    }): Promise<Buffer>;
    generateAttendanceReport(data: {
        school: {
            name: string;
        };
        section: {
            name: string;
            class: string;
        };
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
    }): Promise<Buffer>;
    generatePayslip(data: {
        school: {
            name: string;
            address?: string;
        };
        employee: {
            firstName: string;
            lastName: string;
            employeeId: string;
            designation?: string;
            department?: string;
            bankAccount?: string;
            bankName?: string;
        };
        salary: {
            month: number;
            year: number;
            workingDays: number;
            presentDays: number;
            leaveDays: number;
            basicPaid: number;
            allowances: number;
            deductions: number;
            grossSalary: number;
            netSalary: number;
            salaryStructure?: {
                basic: number;
                hra: number;
                da: number;
                ta: number;
                otherAllowance: number;
                pf: number;
                esi: number;
                tds: number;
            };
        };
    }): Promise<Buffer>;
}
