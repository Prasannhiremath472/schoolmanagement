import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Queue } from 'bull';
import { CreateExamScheduleDto, BulkMarksDto } from './dto/examination.dto';
export declare class ExaminationService {
    private readonly tenantPrisma;
    private readonly eventEmitter;
    private readonly queue;
    private readonly logger;
    constructor(tenantPrisma: TenantPrismaService, eventEmitter: EventEmitter2, queue: Queue);
    private get db();
    getExamTypes(): Promise<{
        data: {
            id: string;
            name: string;
            isActive: boolean;
            sortOrder: number;
            shortName: string;
        }[];
    }>;
    createExamType(dto: {
        name: string;
        shortName: string;
        sortOrder?: number;
    }): Promise<{
        data: {
            id: string;
            name: string;
            isActive: boolean;
            sortOrder: number;
            shortName: string;
        };
        message: string;
    }>;
    getSchedules(query: {
        classId?: string;
        academicYearId?: string;
        examTypeId?: string;
    }): Promise<{
        data: ({
            class: {
                name: string;
            };
            examType: {
                id: string;
                name: string;
                isActive: boolean;
                sortOrder: number;
                shortName: string;
            };
            examTimetable: ({
                subject: {
                    name: string;
                    code: string;
                };
            } & {
                id: string;
                maxMarks: number;
                passMarks: number;
                subjectId: string;
                startTime: string;
                endTime: string;
                examDate: Date;
                venue: string | null;
                examScheduleId: string;
            })[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date;
            academicYearId: string;
            classId: string;
            examTypeId: string;
            isPublished: boolean;
        })[];
    }>;
    createSchedule(dto: CreateExamScheduleDto): Promise<{
        data: {
            examTimetable: {
                id: string;
                maxMarks: number;
                passMarks: number;
                subjectId: string;
                startTime: string;
                endTime: string;
                examDate: Date;
                venue: string | null;
                examScheduleId: string;
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date;
            academicYearId: string;
            classId: string;
            examTypeId: string;
            isPublished: boolean;
        };
        message: string;
    }>;
    publishSchedule(id: string): Promise<{
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            startDate: Date;
            endDate: Date;
            academicYearId: string;
            classId: string;
            examTypeId: string;
            isPublished: boolean;
        };
        message: string;
    }>;
    enterBulkMarks(dto: BulkMarksDto, enteredBy: string): Promise<{
        data: {
            success: number;
            failed: number;
        };
        message: string;
    }>;
    getResults(examScheduleId: string, sectionId?: string): Promise<{
        data: ({
            subject: {
                name: string;
                code: string;
            };
            student: {
                admissionNo: string;
                rollNo: string;
                firstName: string;
                lastName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            sectionId: string;
            studentId: string;
            remarks: string | null;
            maxMarks: import("../../generated/school-client/runtime/library").Decimal;
            subjectId: string;
            marksObtained: import("../../generated/school-client/runtime/library").Decimal;
            isAbsent: boolean;
            examScheduleId: string;
            gradePoint: import("../../generated/school-client/runtime/library").Decimal | null;
            grade: string | null;
            isPass: boolean;
            enteredBy: string | null;
        })[];
    }>;
    getStudentReport(studentId: string, examScheduleId: string): Promise<{
        data: {
            student: {
                id: string;
                address: string | null;
                city: string | null;
                state: string | null;
                pincode: string | null;
                status: import("../../generated/school-client").$Enums.StudentStatus;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                admissionNo: string;
                rollNo: string | null;
                firstName: string;
                lastName: string;
                middleName: string | null;
                dateOfBirth: Date;
                gender: import("../../generated/school-client").$Enums.Gender;
                bloodGroup: string | null;
                religion: string | null;
                caste: string | null;
                category: import("../../generated/school-client").$Enums.StudentCategory;
                nationality: string;
                motherTongue: string | null;
                aadhaarNo: string | null;
                admissionDate: Date;
                previousSchool: string | null;
                transferCertNo: string | null;
                isRTE: boolean;
                medicalConditions: string | null;
                allergies: string | null;
                emergencyContact: string | null;
                photo: string | null;
            };
            schedule: {
                class: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    sortOrder: number;
                    displayName: string | null;
                    academicYearId: string;
                };
                examType: {
                    id: string;
                    name: string;
                    isActive: boolean;
                    sortOrder: number;
                    shortName: string;
                };
            } & {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                startDate: Date;
                endDate: Date;
                academicYearId: string;
                classId: string;
                examTypeId: string;
                isPublished: boolean;
            };
            results: ({
                subject: {
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
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                sectionId: string;
                studentId: string;
                remarks: string | null;
                maxMarks: import("../../generated/school-client/runtime/library").Decimal;
                subjectId: string;
                marksObtained: import("../../generated/school-client/runtime/library").Decimal;
                isAbsent: boolean;
                examScheduleId: string;
                gradePoint: import("../../generated/school-client/runtime/library").Decimal | null;
                grade: string | null;
                isPass: boolean;
                enteredBy: string | null;
            })[];
            summary: {
                totalMarks: number;
                maxMarks: number;
                percentage: string | number;
                cgpa: string | number;
                passCount: number;
                totalSubjects: number;
                overallPass: boolean;
                grade: string;
            };
        };
    }>;
    generateReportCards(examScheduleId: string, sectionId: string): Promise<{
        message: string;
    }>;
    getAnalysis(examScheduleId: string): Promise<{
        data: (import("../../generated/school-client").Prisma.PickEnumerable<import("../../generated/school-client").Prisma.ExamResultGroupByOutputType, "subjectId"[]> & {
            _count: {
                id: number;
            };
            _avg: {
                marksObtained: import("../../generated/school-client/runtime/library").Decimal;
            };
            _min: {
                marksObtained: import("../../generated/school-client/runtime/library").Decimal;
            };
            _max: {
                marksObtained: import("../../generated/school-client/runtime/library").Decimal;
            };
        })[];
        message: string;
    }>;
    private calculateGrade;
    private getOverallGrade;
}
