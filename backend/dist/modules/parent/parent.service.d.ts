import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class ParentService {
    private readonly tenantPrisma;
    constructor(tenantPrisma: TenantPrismaService);
    private get db();
    findAll(query: PaginationDto): Promise<{
        data: ({
            students: ({
                student: {
                    admissionNo: string;
                    firstName: string;
                    lastName: string;
                };
            } & {
                id: string;
                studentId: string;
                parentId: string;
                isPrimary: boolean;
            })[];
        } & {
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
    findOne(id: string): Promise<{
        data: {
            students: ({
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
            } & {
                id: string;
                studentId: string;
                parentId: string;
                isPrimary: boolean;
            })[];
        } & {
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
    }>;
    create(dto: any): Promise<{
        data: {
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
        message: string;
    }>;
    getChildrenDashboard(parentId: string): Promise<{
        data: {
            students: ({
                student: {
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
                };
            } & {
                id: string;
                studentId: string;
                parentId: string;
                isPrimary: boolean;
            })[];
        } & {
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
    }>;
}
