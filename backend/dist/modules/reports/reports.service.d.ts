import { TenantPrismaService } from '../../database/tenant-prisma.service';
export declare class ReportsService {
    private readonly tenantPrisma;
    constructor(tenantPrisma: TenantPrismaService);
    private get db();
    getSchoolDashboard(): Promise<{
        data: {
            students: number;
            teachers: number;
            staff: number;
        };
    }>;
    getAttendanceReport(sectionId: string, month: number, year: number): Promise<{
        data: (import("../../generated/school-client").Prisma.PickEnumerable<import("../../generated/school-client").Prisma.AttendanceGroupByOutputType, "status"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
    getFeeReport(academicYearId: string): Promise<{
        data: {
            collected: number;
            pending: number;
        };
    }>;
    getStudentStrengthReport(academicYearId: string): Promise<{
        data: ({
            sections: ({
                _count: {
                    students: number;
                };
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                classId: string;
                classTeacherId: string | null;
                capacity: number;
            })[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            sortOrder: number;
            displayName: string | null;
            academicYearId: string;
        })[];
    }>;
}
