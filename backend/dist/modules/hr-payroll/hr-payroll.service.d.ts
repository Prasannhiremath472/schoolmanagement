import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class HrPayrollService {
    private readonly tenantPrisma;
    constructor(tenantPrisma: TenantPrismaService);
    private get db();
    getSalaryStructures(): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            isActive: boolean;
            basic: import("../../generated/school-client/runtime/library").Decimal;
            hra: import("../../generated/school-client/runtime/library").Decimal;
            da: import("../../generated/school-client/runtime/library").Decimal;
            ta: import("../../generated/school-client/runtime/library").Decimal;
            otherAllowance: import("../../generated/school-client/runtime/library").Decimal;
            pf: import("../../generated/school-client/runtime/library").Decimal;
            esi: import("../../generated/school-client/runtime/library").Decimal;
            tds: import("../../generated/school-client/runtime/library").Decimal;
            grossSalary: import("../../generated/school-client/runtime/library").Decimal;
            netSalary: import("../../generated/school-client/runtime/library").Decimal;
        }[];
    }>;
    createSalaryStructure(dto: any): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            isActive: boolean;
            basic: import("../../generated/school-client/runtime/library").Decimal;
            hra: import("../../generated/school-client/runtime/library").Decimal;
            da: import("../../generated/school-client/runtime/library").Decimal;
            ta: import("../../generated/school-client/runtime/library").Decimal;
            otherAllowance: import("../../generated/school-client/runtime/library").Decimal;
            pf: import("../../generated/school-client/runtime/library").Decimal;
            esi: import("../../generated/school-client/runtime/library").Decimal;
            tds: import("../../generated/school-client/runtime/library").Decimal;
            grossSalary: import("../../generated/school-client/runtime/library").Decimal;
            netSalary: import("../../generated/school-client/runtime/library").Decimal;
        };
        message: string;
    }>;
    getLeaveApplications(query: Partial<PaginationDto> & {
        status?: string;
    }): Promise<{
        data: {
            id: string;
            status: import("../../generated/school-client").$Enums.LeaveStatus;
            updatedAt: Date;
            remarks: string | null;
            teacherId: string | null;
            fromDate: Date;
            toDate: Date;
            staffId: string | null;
            leaveType: import("../../generated/school-client").$Enums.LeaveType;
            days: number;
            reason: string;
            approvedBy: string | null;
            appliedAt: Date;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    applyLeave(dto: any): Promise<{
        data: {
            id: string;
            status: import("../../generated/school-client").$Enums.LeaveStatus;
            updatedAt: Date;
            remarks: string | null;
            teacherId: string | null;
            fromDate: Date;
            toDate: Date;
            staffId: string | null;
            leaveType: import("../../generated/school-client").$Enums.LeaveType;
            days: number;
            reason: string;
            approvedBy: string | null;
            appliedAt: Date;
        };
        message: string;
    }>;
    approveLeave(id: string, status: string, approvedBy: string): Promise<{
        data: {
            id: string;
            status: import("../../generated/school-client").$Enums.LeaveStatus;
            updatedAt: Date;
            remarks: string | null;
            teacherId: string | null;
            fromDate: Date;
            toDate: Date;
            staffId: string | null;
            leaveType: import("../../generated/school-client").$Enums.LeaveType;
            days: number;
            reason: string;
            approvedBy: string | null;
            appliedAt: Date;
        };
        message: string;
    }>;
    processSalary(dto: {
        teacherId?: string;
        staffId?: string;
        month: number;
        year: number;
        salaryStructureId: string;
    }): Promise<{
        data: {
            id: string;
            status: import("../../generated/school-client").$Enums.SalaryStatus;
            createdAt: Date;
            remarks: string | null;
            month: number;
            year: number;
            teacherId: string | null;
            staffId: string | null;
            paymentDate: Date | null;
            grossSalary: import("../../generated/school-client/runtime/library").Decimal;
            netSalary: import("../../generated/school-client/runtime/library").Decimal;
            workingDays: number;
            presentDays: number;
            leaveDays: number;
            basicPaid: import("../../generated/school-client/runtime/library").Decimal;
            allowances: import("../../generated/school-client/runtime/library").Decimal;
            deductions: import("../../generated/school-client/runtime/library").Decimal;
            payslipUrl: string | null;
            salaryStructureId: string;
        };
        message: string;
    }>;
    getSalaries(query: Partial<PaginationDto> & {
        month?: number;
        year?: number;
    }): Promise<{
        data: {
            id: string;
            status: import("../../generated/school-client").$Enums.SalaryStatus;
            createdAt: Date;
            remarks: string | null;
            month: number;
            year: number;
            teacherId: string | null;
            staffId: string | null;
            paymentDate: Date | null;
            grossSalary: import("../../generated/school-client/runtime/library").Decimal;
            netSalary: import("../../generated/school-client/runtime/library").Decimal;
            workingDays: number;
            presentDays: number;
            leaveDays: number;
            basicPaid: import("../../generated/school-client/runtime/library").Decimal;
            allowances: import("../../generated/school-client/runtime/library").Decimal;
            deductions: import("../../generated/school-client/runtime/library").Decimal;
            payslipUrl: string | null;
            salaryStructureId: string;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
}
