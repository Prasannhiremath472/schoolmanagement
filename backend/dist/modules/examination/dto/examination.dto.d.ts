export declare class ExamTimetableDto {
    subjectId: string;
    examDate: string;
    startTime: string;
    endTime: string;
    venue?: string;
    maxMarks: number;
    passMarks: number;
}
export declare class CreateExamScheduleDto {
    examTypeId: string;
    classId: string;
    academicYearId: string;
    name: string;
    startDate: string;
    endDate: string;
    timetable: ExamTimetableDto[];
}
export declare class MarkRecordDto {
    studentId: string;
    subjectId: string;
    marksObtained: number;
    maxMarks: number;
    isAbsent?: boolean;
    remarks?: string;
}
export declare class BulkMarksDto {
    examScheduleId: string;
    sectionId: string;
    marks: MarkRecordDto[];
}
export declare class EnterMarksDto {
    studentId: string;
    examScheduleId: string;
    subjectId: string;
    sectionId: string;
    marksObtained: number;
    maxMarks: number;
    isAbsent?: boolean;
}
