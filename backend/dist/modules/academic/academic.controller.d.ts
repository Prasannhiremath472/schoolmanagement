import { AcademicService } from './academic.service';
export declare class AcademicController {
    private readonly academicService;
    constructor(academicService: AcademicService);
    getYears(): Promise<{
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
    createYear(dto: any): Promise<{
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
    createClass(dto: any): Promise<{
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
    createSection(dto: any): Promise<{
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
    createSubject(dto: any): Promise<{
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
