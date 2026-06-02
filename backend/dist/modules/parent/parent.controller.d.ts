import { ParentService } from './parent.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class ParentController {
    private readonly parentService;
    constructor(parentService: ParentService);
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
}
