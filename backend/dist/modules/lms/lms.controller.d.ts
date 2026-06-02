import { LmsService } from './lms.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class LmsController {
    private readonly lmsService;
    constructor(lmsService: LmsService);
    getAssignments(query: PaginationDto, subjectId?: string): Promise<{
        data: ({
            _count: {
                submissions: number;
            };
            subject: {
                name: string;
            };
            teacher: {
                firstName: string;
                lastName: string;
            };
        } & {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            attachments: import("../../generated/school-client/runtime/library").JsonValue;
            maxMarks: number;
            teacherId: string;
            subjectId: string;
            dueDate: Date;
            isPublished: boolean;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    createAssignment(dto: any, teacherId: string): Promise<{
        data: {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            attachments: import("../../generated/school-client/runtime/library").JsonValue;
            maxMarks: number;
            teacherId: string;
            subjectId: string;
            dueDate: Date;
            isPublished: boolean;
        };
        message: string;
    }>;
    submitAssignment(id: string, user: any, dto: any): Promise<{
        data: {
            id: string;
            status: import("../../generated/school-client").$Enums.SubmitStatus;
            studentId: string;
            remarks: string | null;
            assignmentId: string;
            files: import("../../generated/school-client/runtime/library").JsonValue;
            marksGiven: import("../../generated/school-client/runtime/library").Decimal | null;
            feedback: string | null;
            submittedAt: Date;
            evaluatedAt: Date | null;
        };
        message: string;
    }>;
    evaluate(id: string, dto: any): Promise<{
        data: {
            id: string;
            status: import("../../generated/school-client").$Enums.SubmitStatus;
            studentId: string;
            remarks: string | null;
            assignmentId: string;
            files: import("../../generated/school-client/runtime/library").JsonValue;
            marksGiven: import("../../generated/school-client/runtime/library").Decimal | null;
            feedback: string | null;
            submittedAt: Date;
            evaluatedAt: Date | null;
        };
        message: string;
    }>;
    getHomework(query: PaginationDto, subjectId?: string): Promise<{
        data: ({
            subject: {
                name: string;
            };
        } & {
            description: string;
            id: string;
            createdAt: Date;
            title: string;
            attachments: import("../../generated/school-client/runtime/library").JsonValue;
            teacherId: string;
            subjectId: string;
            dueDate: Date;
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
    }>;
    createHomework(dto: any, teacherId: string): Promise<{
        data: {
            description: string;
            id: string;
            createdAt: Date;
            title: string;
            attachments: import("../../generated/school-client/runtime/library").JsonValue;
            teacherId: string;
            subjectId: string;
            dueDate: Date;
        };
        message: string;
    }>;
    getMaterials(subjectId?: string): Promise<{
        data: ({
            subject: {
                name: string;
            };
        } & {
            description: string | null;
            id: string;
            createdAt: Date;
            type: import("../../generated/school-client").$Enums.MaterialType;
            title: string;
            fileUrl: string;
            subjectId: string;
            isPublished: boolean;
            fileSize: number | null;
            uploadedBy: string | null;
        })[];
    }>;
    uploadMaterial(dto: any, userId: string): Promise<{
        data: {
            description: string | null;
            id: string;
            createdAt: Date;
            type: import("../../generated/school-client").$Enums.MaterialType;
            title: string;
            fileUrl: string;
            subjectId: string;
            isPublished: boolean;
            fileSize: number | null;
            uploadedBy: string | null;
        };
        message: string;
    }>;
    getQuizzes(subjectId?: string): Promise<{
        data: ({
            _count: {
                questions: number;
                attempts: number;
            };
        } & {
            description: string | null;
            id: string;
            createdAt: Date;
            title: string;
            maxMarks: number;
            subjectId: string;
            isPublished: boolean;
            duration: number;
            startAt: Date | null;
            endAt: Date | null;
        })[];
    }>;
    createQuiz(dto: any): Promise<{
        data: {
            questions: {
                id: string;
                options: import("../../generated/school-client/runtime/library").JsonValue;
                sortOrder: number;
                marks: number;
                questionText: string;
                questionType: import("../../generated/school-client").$Enums.QuestionType;
                explanation: string | null;
                quizId: string;
            }[];
        } & {
            description: string | null;
            id: string;
            createdAt: Date;
            title: string;
            maxMarks: number;
            subjectId: string;
            isPublished: boolean;
            duration: number;
            startAt: Date | null;
            endAt: Date | null;
        };
        message: string;
    }>;
    submitQuiz(id: string, user: any, answers: any): Promise<{
        data: {
            score: number;
            id: string;
            studentId: string;
            submittedAt: Date | null;
            quizId: string;
            answers: import("../../generated/school-client/runtime/library").JsonValue;
            startedAt: Date;
            timeTaken: number | null;
        };
        message: string;
    }>;
    getLiveClasses(teacherId?: string): Promise<{
        data: ({
            teacher: {
                firstName: string;
                lastName: string;
            };
        } & {
            description: string | null;
            id: string;
            status: import("../../generated/school-client").$Enums.LiveStatus;
            createdAt: Date;
            platform: string;
            title: string;
            teacherId: string;
            duration: number;
            meetingId: string | null;
            meetingUrl: string | null;
            meetingPass: string | null;
            scheduledAt: Date;
            recordingUrl: string | null;
        })[];
    }>;
    createLiveClass(dto: any, teacherId: string): Promise<{
        data: {
            description: string | null;
            id: string;
            status: import("../../generated/school-client").$Enums.LiveStatus;
            createdAt: Date;
            platform: string;
            title: string;
            teacherId: string;
            duration: number;
            meetingId: string | null;
            meetingUrl: string | null;
            meetingPass: string | null;
            scheduledAt: Date;
            recordingUrl: string | null;
        };
        message: string;
    }>;
    startLiveClass(id: string): Promise<{
        data: {
            description: string | null;
            id: string;
            status: import("../../generated/school-client").$Enums.LiveStatus;
            createdAt: Date;
            platform: string;
            title: string;
            teacherId: string;
            duration: number;
            meetingId: string | null;
            meetingUrl: string | null;
            meetingPass: string | null;
            scheduledAt: Date;
            recordingUrl: string | null;
        };
        message: string;
    }>;
    endLiveClass(id: string, url?: string): Promise<{
        data: {
            description: string | null;
            id: string;
            status: import("../../generated/school-client").$Enums.LiveStatus;
            createdAt: Date;
            platform: string;
            title: string;
            teacherId: string;
            duration: number;
            meetingId: string | null;
            meetingUrl: string | null;
            meetingPass: string | null;
            scheduledAt: Date;
            recordingUrl: string | null;
        };
        message: string;
    }>;
    getRecorded(teacherId?: string): Promise<{
        data: ({
            teacher: {
                firstName: string;
                lastName: string;
            };
        } & {
            description: string | null;
            id: string;
            status: import("../../generated/school-client").$Enums.LiveStatus;
            createdAt: Date;
            platform: string;
            title: string;
            teacherId: string;
            duration: number;
            meetingId: string | null;
            meetingUrl: string | null;
            meetingPass: string | null;
            scheduledAt: Date;
            recordingUrl: string | null;
        })[];
    }>;
}
