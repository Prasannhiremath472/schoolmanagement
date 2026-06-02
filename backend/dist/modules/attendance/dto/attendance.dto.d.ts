export declare enum AttendanceStatus {
    PRESENT = "PRESENT",
    ABSENT = "ABSENT",
    LATE = "LATE",
    HALF_DAY = "HALF_DAY",
    EXCUSED = "EXCUSED"
}
export declare class AttendanceRecordDto {
    studentId: string;
    status: AttendanceStatus;
    remarks?: string;
}
export declare class BulkAttendanceDto {
    sectionId: string;
    academicYearId: string;
    date: string;
    records: AttendanceRecordDto[];
}
export declare class MarkAttendanceDto {
    studentId: string;
    sectionId: string;
    academicYearId: string;
    date: string;
    status: AttendanceStatus;
    remarks?: string;
}
