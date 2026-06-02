import { AttendanceService } from './attendance.service';
import { BulkAttendanceDto } from './dto/attendance.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    markBulk(dto: BulkAttendanceDto, userId: string): Promise<{
        data: {
            marked: number;
            updated: number;
            errors: any[];
        };
        message: string;
    }>;
    getSectionAttendance(sectionId: string, date: string): Promise<{
        data: {
            studentId: string;
            admissionNo: string;
            rollNo: string;
            name: string;
            photo: string;
            status: string;
            remarks: string;
        }[];
        message: string;
    }>;
    getStudentAttendance(studentId: string, pagination: PaginationDto, fromDate: string, toDate: string): Promise<{
        data: {
            id: string;
            status: import("../../generated/school-client").$Enums.AttendanceStatus;
            createdAt: Date;
            updatedAt: Date;
            date: Date;
            sectionId: string;
            academicYearId: string;
            studentId: string;
            markedById: string | null;
            remarks: string | null;
        }[];
        meta: {
            present: number;
            absent: number;
            percentage: string | number;
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    getMonthlyReport(sectionId: string, month: number, year: number): Promise<{
        data: {
            studentId: string;
            name: string;
            admissionNo: string;
            present: number;
            absent: number;
            total: number;
            percentage: string | number;
        }[];
        message: string;
    }>;
    generateQr(sectionId: string, date: string): Promise<{
        data: {
            qr: string;
            payload: string;
        };
        message: string;
    }>;
}
