import { TenantPrismaService } from '../../database/tenant-prisma.service';
export declare class AcademicService {
    private readonly tenantPrisma;
    constructor(tenantPrisma: TenantPrismaService);
    private get db();
    getAcademicYears(): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date;
            isCurrent: boolean;
        }[];
    }>;
    createAcademicYear(dto: {
        name: string;
        startDate: string;
        endDate: string;
    }): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date;
            isCurrent: boolean;
        };
        message: string;
    }>;
    setCurrentYear(id: string): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date;
            isCurrent: boolean;
        };
        message: string;
    }>;
    getClasses(academicYearId: string): Promise<{
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
    createClass(dto: {
        name: string;
        displayName?: string;
        academicYearId: string;
        sortOrder?: number;
    }): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            sortOrder: number;
            displayName: string | null;
            academicYearId: string;
        };
        message: string;
    }>;
    getSections(classId?: string, teacherId?: string): Promise<{
        data: ({
            _count: {
                students: number;
            };
            class: {
                name: string;
                sortOrder: number;
            };
            classTeacher: {
                id: string;
                firstName: string;
                lastName: string;
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
    }>;
    createSection(dto: {
        name: string;
        classId: string;
        classTeacherId?: string;
        capacity?: number;
    }): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            classId: string;
            classTeacherId: string | null;
            capacity: number;
        };
        message: string;
    }>;
    getSubjects(classId?: string): Promise<{
        data: ({
            class: {
                name: string;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            classId: string;
            code: string;
            subjectType: import("../../generated/school-client").$Enums.SubjectType;
            maxMarks: number;
            passMarks: number;
            isElective: boolean;
        })[];
    }>;
    createSubject(dto: {
        name: string;
        code: string;
        classId: string;
        subjectType?: string;
        maxMarks?: number;
        passMarks?: number;
    }): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            classId: string;
            code: string;
            subjectType: import("../../generated/school-client").$Enums.SubjectType;
            maxMarks: number;
            passMarks: number;
            isElective: boolean;
        };
        message: string;
    }>;
    getTimetable(sectionId: string): Promise<{
        data: ({
            subject: {
                name: string;
                code: string;
            };
            teacher: {
                firstName: string;
                lastName: string;
            };
        } & {
            id: string;
            sectionId: string;
            roomNo: string | null;
            teacherId: string;
            subjectId: string;
            timetableId: string;
            dayOfWeek: import("../../generated/school-client").$Enums.DayOfWeek;
            startTime: string;
            endTime: string;
        })[];
    }>;
    createTimetable(dto: any): Promise<{
        data: {
            slots: {
                id: string;
                sectionId: string;
                roomNo: string | null;
                teacherId: string;
                subjectId: string;
                timetableId: string;
                dayOfWeek: import("../../generated/school-client").$Enums.DayOfWeek;
                startTime: string;
                endTime: string;
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            isActive: boolean;
            sectionId: string | null;
            effectiveFrom: Date;
            effectiveTo: Date | null;
        };
        message: string;
    }>;
}
