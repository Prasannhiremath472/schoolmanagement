import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { StudentRepository } from './student.repository';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class StudentService {
    private readonly studentRepo;
    private readonly tenantPrisma;
    private readonly eventEmitter;
    private readonly logger;
    constructor(studentRepo: StudentRepository, tenantPrisma: TenantPrismaService, eventEmitter: EventEmitter2);
    findAll(query: Partial<PaginationDto> & {
        classId?: string;
        sectionId?: string;
        status?: string;
    }): Promise<{
        data: ({
            user: {
                email: string;
                phone: string;
                isActive: boolean;
            };
            sections: ({
                section: {
                    class: {
                        name: string;
                    };
                } & {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    classId: string;
                    classTeacherId: string | null;
                    capacity: number;
                };
            } & {
                id: string;
                isActive: boolean;
                rollNo: string | null;
                sectionId: string;
                studentId: string;
                joinedAt: Date;
                leftAt: Date | null;
            })[];
        } & {
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNext: boolean;
            hasPrev: boolean;
        };
        message: string;
    }>;
    findOne(id: string): Promise<{
        data: {
            user: {
                email: string;
                phone: string;
                isActive: boolean;
                fcmToken: string;
            };
            transportAllocation: {
                route: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    isActive: boolean;
                    routeNo: string;
                    vehicleId: string;
                    startPoint: string;
                    endPoint: string;
                    morningTime: string | null;
                    afternoonTime: string | null;
                    monthlyFare: import("../../generated/school-client/runtime/library").Decimal;
                };
            } & {
                id: string;
                createdAt: Date;
                isActive: boolean;
                studentId: string;
                routeId: string;
                pickupAddress: string | null;
            };
            hostelAllocation: {
                room: {
                    hostel: {
                        id: string;
                        name: string;
                        address: string | null;
                        createdAt: Date;
                        isActive: boolean;
                        type: string;
                        capacity: number;
                        wardenName: string | null;
                        wardenPhone: string | null;
                    };
                } & {
                    id: string;
                    isActive: boolean;
                    capacity: number;
                    monthlyFare: import("../../generated/school-client/runtime/library").Decimal;
                    hostelId: string;
                    roomNo: string;
                    floor: string | null;
                    roomType: string;
                };
            } & {
                id: string;
                createdAt: Date;
                isActive: boolean;
                studentId: string;
                roomId: string;
                joinDate: Date;
                leaveDate: Date | null;
            };
            sections: ({
                section: {
                    class: {
                        id: string;
                        name: string;
                        createdAt: Date;
                        updatedAt: Date;
                        sortOrder: number;
                        displayName: string | null;
                        academicYearId: string;
                    };
                    classTeacher: {
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
                };
            } & {
                id: string;
                isActive: boolean;
                rollNo: string | null;
                sectionId: string;
                studentId: string;
                joinedAt: Date;
                leftAt: Date | null;
            })[];
            parents: ({
                parent: {
                    id: string;
                    email: string | null;
                    phone: string | null;
                    address: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    firstName: string;
                    lastName: string;
                    aadhaarNo: string | null;
                    photo: string | null;
                    qualification: string | null;
                    alternatePhone: string | null;
                    relation: import("../../generated/school-client").$Enums.ParentRelation;
                    occupation: string | null;
                    annualIncome: import("../../generated/school-client/runtime/library").Decimal | null;
                };
            } & {
                id: string;
                studentId: string;
                parentId: string;
                isPrimary: boolean;
            })[];
            documents: {
                id: string;
                type: string;
                studentId: string;
                fileName: string;
                fileUrl: string;
                uploadedAt: Date;
            }[];
        } & {
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
        message: string;
    }>;
    create(dto: CreateStudentDto): Promise<{
        data: {
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
        message: string;
    }>;
    update(id: string, dto: UpdateStudentDto): Promise<{
        data: {
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
        message: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
    promoteStudents(sectionId: string, newSectionId: string, studentIds: string[]): Promise<{
        data: any[];
        message: string;
    }>;
    getStats(): Promise<{
        data: {
            total: number;
            active: number;
            inactive: number;
            male: number;
            female: number;
        };
    }>;
    bulkImport(students: CreateStudentDto[]): Promise<{
        data: {
            success: number;
            failed: number;
            errors: any[];
        };
        message: string;
    }>;
    getAttendanceSummary(studentId: string, month: number, year: number): Promise<{
        data: {
            total: number;
            present: number;
            absent: number;
            late: number;
            percentage: string | number;
        };
    }>;
    transferStudent(studentId: string, dto: {
        transferCertNo?: string;
        transferDate: string;
        reason?: string;
        destinationSchool?: string;
    }): Promise<{
        data: {
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
        message: string;
    }>;
    promoteToAlumni(studentId: string, dto: {
        graduationYear: number;
        remarks?: string;
    }): Promise<{
        data: {
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
        message: string;
    }>;
    getAlumni(query: Partial<PaginationDto> & {
        year?: number;
    }): Promise<{
        data: {
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
    getMedicalInfo(studentId: string): Promise<{
        data: {
            id: string;
            admissionNo: string;
            firstName: string;
            lastName: string;
            bloodGroup: string;
            medicalConditions: string;
            allergies: string;
            emergencyContact: string;
        };
    }>;
    updateMedicalInfo(studentId: string, dto: {
        bloodGroup?: string;
        medicalConditions?: string;
        allergies?: string;
        emergencyContact?: string;
    }): Promise<{
        data: {
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
        message: string;
    }>;
    getDocuments(studentId: string): Promise<{
        data: {
            id: string;
            type: string;
            studentId: string;
            fileName: string;
            fileUrl: string;
            uploadedAt: Date;
        }[];
    }>;
    addDocument(studentId: string, dto: {
        type: string;
        fileName: string;
        fileUrl: string;
    }): Promise<{
        data: {
            id: string;
            type: string;
            studentId: string;
            fileName: string;
            fileUrl: string;
            uploadedAt: Date;
        };
        message: string;
    }>;
    removeDocument(documentId: string): Promise<{
        message: string;
    }>;
}
