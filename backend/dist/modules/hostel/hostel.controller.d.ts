import { HostelService } from './hostel.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class HostelController {
    private readonly hostelService;
    constructor(hostelService: HostelService);
    getHostels(): Promise<{
        data: ({
            _count: {
                rooms: number;
            };
            rooms: ({
                _count: {
                    allocations: number;
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
            })[];
        } & {
            id: string;
            name: string;
            address: string | null;
            createdAt: Date;
            isActive: boolean;
            type: string;
            capacity: number;
            wardenName: string | null;
            wardenPhone: string | null;
        })[];
    }>;
    getStats(hostelId?: string): Promise<{
        data: {
            id: string;
            name: string;
            type: string;
            totalRooms: number;
            totalCapacity: number;
            occupied: number;
            vacant: number;
            occupancyRate: string | number;
        }[];
    }>;
    getHostel(id: string): Promise<{
        data: {
            rooms: ({
                allocations: ({
                    student: {
                        admissionNo: string;
                        firstName: string;
                        lastName: string;
                    };
                } & {
                    id: string;
                    createdAt: Date;
                    isActive: boolean;
                    studentId: string;
                    roomId: string;
                    joinDate: Date;
                    leaveDate: Date | null;
                })[];
            } & {
                id: string;
                isActive: boolean;
                capacity: number;
                monthlyFare: import("../../generated/school-client/runtime/library").Decimal;
                hostelId: string;
                roomNo: string;
                floor: string | null;
                roomType: string;
            })[];
        } & {
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
    }>;
    createHostel(dto: any): Promise<{
        data: {
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
        message: string;
    }>;
    updateHostel(id: string, dto: any): Promise<{
        data: {
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
        message: string;
    }>;
    getRooms(hostelId: string): Promise<{
        data: ({
            _count: {
                allocations: number;
            };
            allocations: ({
                student: {
                    admissionNo: string;
                    firstName: string;
                    lastName: string;
                };
            } & {
                id: string;
                createdAt: Date;
                isActive: boolean;
                studentId: string;
                roomId: string;
                joinDate: Date;
                leaveDate: Date | null;
            })[];
        } & {
            id: string;
            isActive: boolean;
            capacity: number;
            monthlyFare: import("../../generated/school-client/runtime/library").Decimal;
            hostelId: string;
            roomNo: string;
            floor: string | null;
            roomType: string;
        })[];
    }>;
    createRoom(dto: any): Promise<{
        data: {
            id: string;
            isActive: boolean;
            capacity: number;
            monthlyFare: import("../../generated/school-client/runtime/library").Decimal;
            hostelId: string;
            roomNo: string;
            floor: string | null;
            roomType: string;
        };
        message: string;
    }>;
    allocate(dto: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            isActive: boolean;
            studentId: string;
            roomId: string;
            joinDate: Date;
            leaveDate: Date | null;
        };
        message: string;
    }>;
    vacate(studentId: string, leaveDate?: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            isActive: boolean;
            studentId: string;
            roomId: string;
            joinDate: Date;
            leaveDate: Date | null;
        };
        message: string;
    }>;
    getAllocations(query: PaginationDto, hostelId?: string): Promise<{
        data: ({
            student: {
                admissionNo: string;
                firstName: string;
                lastName: string;
            };
            room: {
                hostel: {
                    name: string;
                    type: string;
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
    collectFee(dto: any, userId: string): Promise<{
        data: {
            receiptNo: string;
            studentId: string;
            hostelName: string;
            roomNo: string;
            month: number;
            year: number;
            amount: number;
            paymentMode: string;
            collectedAt: Date;
        };
        message: string;
    }>;
    getFeeDues(hostelId: string, month: number, year: number): Promise<{
        data: {
            studentId: string;
            studentName: string;
            admissionNo: string;
            roomNo: string;
            monthlyFare: number;
            month: number;
            year: number;
            isPaid: boolean;
        }[];
    }>;
    markAttendance(dto: any): Promise<{
        data: {
            marked: number;
            errors: number;
        };
        message: string;
    }>;
    getAttendance(hostelId: string, date: string): Promise<{
        data: {
            date: string;
            rooms: any[];
            totalStudents: number;
        };
    }>;
    getMessMenu(hostelId: string): Promise<{
        data: {
            hostelId: string;
            weeklyMenu: {
                monday: {
                    breakfast: string;
                    lunch: string;
                    dinner: string;
                };
                tuesday: {
                    breakfast: string;
                    lunch: string;
                    dinner: string;
                };
                wednesday: {
                    breakfast: string;
                    lunch: string;
                    dinner: string;
                };
                thursday: {
                    breakfast: string;
                    lunch: string;
                    dinner: string;
                };
                friday: {
                    breakfast: string;
                    lunch: string;
                    dinner: string;
                };
                saturday: {
                    breakfast: string;
                    lunch: string;
                    dinner: string;
                };
                sunday: {
                    breakfast: string;
                    lunch: string;
                    dinner: string;
                };
            };
        };
    }>;
    updateMessMenu(hostelId: string, dto: any): Promise<{
        data: any;
        message: string;
    }>;
}
