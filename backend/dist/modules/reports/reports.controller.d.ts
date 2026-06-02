import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getDashboard(): Promise<{
        data: {
            students: number;
            teachers: number;
            staff: number;
        };
    }>;
    getAttendance(sectionId: string, month: number, year: number): Promise<{
        data: (import("../../generated/school-client").Prisma.PickEnumerable<import("../../generated/school-client").Prisma.AttendanceGroupByOutputType, "status"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
    getFees(academicYearId: string): Promise<{
        data: {
            collected: number;
            pending: number;
        };
    }>;
    getStrength(academicYearId: string): Promise<{
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
