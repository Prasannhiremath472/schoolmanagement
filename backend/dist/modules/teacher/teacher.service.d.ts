import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class TeacherService {
    private readonly tenantPrisma;
    constructor(tenantPrisma: TenantPrismaService);
    private get db();
    findAll(query: PaginationDto & {
        departmentId?: string;
        status?: string;
    }): Promise<{
        data: ({
            user: {
                email: string;
                phone: string;
            };
            subjects: ({
                subject: {
                    name: string;
                };
            } & {
                id: string;
                isPrimary: boolean;
                teacherId: string;
                subjectId: string;
            })[];
        } & {
            id: string;
            email: string | null;
            phone: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            status: import("../../generated/school-client").$Enums.StaffStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            firstName: string;
            lastName: string;
            dateOfBirth: Date | null;
            gender: import("../../generated/school-client").$Enums.Gender | null;
            aadhaarNo: string | null;
            photo: string | null;
            employeeId: string;
            qualification: string | null;
            experience: number;
            specialization: string | null;
            joiningDate: Date;
            designation: string | null;
            department: string | null;
            alternatePhone: string | null;
            pan: string | null;
            bankAccount: string | null;
            bankName: string | null;
            ifscCode: string | null;
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
            user: {
                email: string;
                phone: string;
            };
            subjects: ({
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
                isPrimary: boolean;
                teacherId: string;
                subjectId: string;
            })[];
            classTeacher: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                classId: string;
                classTeacherId: string | null;
                capacity: number;
            }[];
        } & {
            id: string;
            email: string | null;
            phone: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            status: import("../../generated/school-client").$Enums.StaffStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            firstName: string;
            lastName: string;
            dateOfBirth: Date | null;
            gender: import("../../generated/school-client").$Enums.Gender | null;
            aadhaarNo: string | null;
            photo: string | null;
            employeeId: string;
            qualification: string | null;
            experience: number;
            specialization: string | null;
            joiningDate: Date;
            designation: string | null;
            department: string | null;
            alternatePhone: string | null;
            pan: string | null;
            bankAccount: string | null;
            bankName: string | null;
            ifscCode: string | null;
        };
    }>;
    create(dto: any): Promise<{
        data: {
            id: string;
            email: string | null;
            phone: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            status: import("../../generated/school-client").$Enums.StaffStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            firstName: string;
            lastName: string;
            dateOfBirth: Date | null;
            gender: import("../../generated/school-client").$Enums.Gender | null;
            aadhaarNo: string | null;
            photo: string | null;
            employeeId: string;
            qualification: string | null;
            experience: number;
            specialization: string | null;
            joiningDate: Date;
            designation: string | null;
            department: string | null;
            alternatePhone: string | null;
            pan: string | null;
            bankAccount: string | null;
            bankName: string | null;
            ifscCode: string | null;
        };
        message: string;
    }>;
    update(id: string, dto: any): Promise<{
        data: {
            id: string;
            email: string | null;
            phone: string | null;
            address: string | null;
            city: string | null;
            state: string | null;
            status: import("../../generated/school-client").$Enums.StaffStatus;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            firstName: string;
            lastName: string;
            dateOfBirth: Date | null;
            gender: import("../../generated/school-client").$Enums.Gender | null;
            aadhaarNo: string | null;
            photo: string | null;
            employeeId: string;
            qualification: string | null;
            experience: number;
            specialization: string | null;
            joiningDate: Date;
            designation: string | null;
            department: string | null;
            alternatePhone: string | null;
            pan: string | null;
            bankAccount: string | null;
            bankName: string | null;
            ifscCode: string | null;
        };
        message: string;
    }>;
    getStats(): Promise<{
        data: {
            total: number;
            active: number;
            male: number;
            female: number;
        };
    }>;
}
