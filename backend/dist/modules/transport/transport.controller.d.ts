import { TransportService } from './transport.service';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class TransportController {
    private readonly transportService;
    constructor(transportService: TransportService);
    getStats(): Promise<{
        data: {
            totalVehicles: number;
            totalRoutes: number;
            totalAllocations: number;
        };
    }>;
    getVehicles(): Promise<{
        data: ({
            routes: {
                name: string;
                routeNo: string;
                startPoint: string;
                endPoint: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            model: string | null;
            isActive: boolean;
            capacity: number;
            vehicleNo: string;
            vehicleType: string;
            driverName: string | null;
            driverPhone: string | null;
            driverLicense: string | null;
            insuranceExpiry: Date | null;
            fcExpiry: Date | null;
            gpsDeviceId: string | null;
        })[];
    }>;
    getVehicle(id: string): Promise<{
        data: {
            routes: ({
                pickupPoints: {
                    id: string;
                    name: string;
                    address: string | null;
                    sortOrder: number;
                    routeId: string;
                    morningTime: string | null;
                    landmark: string | null;
                    eveningTime: string | null;
                    latitude: import("../../generated/school-client/runtime/library").Decimal | null;
                    longitude: import("../../generated/school-client/runtime/library").Decimal | null;
                }[];
                allocations: {
                    id: string;
                    createdAt: Date;
                    isActive: boolean;
                    studentId: string;
                    routeId: string;
                    pickupAddress: string | null;
                }[];
            } & {
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
            })[];
        } & {
            id: string;
            createdAt: Date;
            model: string | null;
            isActive: boolean;
            capacity: number;
            vehicleNo: string;
            vehicleType: string;
            driverName: string | null;
            driverPhone: string | null;
            driverLicense: string | null;
            insuranceExpiry: Date | null;
            fcExpiry: Date | null;
            gpsDeviceId: string | null;
        };
    }>;
    createVehicle(dto: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            model: string | null;
            isActive: boolean;
            capacity: number;
            vehicleNo: string;
            vehicleType: string;
            driverName: string | null;
            driverPhone: string | null;
            driverLicense: string | null;
            insuranceExpiry: Date | null;
            fcExpiry: Date | null;
            gpsDeviceId: string | null;
        };
        message: string;
    }>;
    updateVehicle(id: string, dto: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            model: string | null;
            isActive: boolean;
            capacity: number;
            vehicleNo: string;
            vehicleType: string;
            driverName: string | null;
            driverPhone: string | null;
            driverLicense: string | null;
            insuranceExpiry: Date | null;
            fcExpiry: Date | null;
            gpsDeviceId: string | null;
        };
        message: string;
    }>;
    getDrivers(): Promise<{
        data: {
            id: string;
            vehicleNo: string;
            vehicleType: string;
            driverName: string;
            driverPhone: string;
            driverLicense: string;
            insuranceExpiry: Date;
            fcExpiry: Date;
        }[];
    }>;
    assignDriver(id: string, dto: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            model: string | null;
            isActive: boolean;
            capacity: number;
            vehicleNo: string;
            vehicleType: string;
            driverName: string | null;
            driverPhone: string | null;
            driverLicense: string | null;
            insuranceExpiry: Date | null;
            fcExpiry: Date | null;
            gpsDeviceId: string | null;
        };
        message: string;
    }>;
    getRoutes(): Promise<{
        data: ({
            _count: {
                allocations: number;
            };
            vehicle: {
                capacity: number;
                vehicleNo: string;
                vehicleType: string;
                driverName: string;
                driverPhone: string;
            };
            pickupPoints: {
                id: string;
                name: string;
                address: string | null;
                sortOrder: number;
                routeId: string;
                morningTime: string | null;
                landmark: string | null;
                eveningTime: string | null;
                latitude: import("../../generated/school-client/runtime/library").Decimal | null;
                longitude: import("../../generated/school-client/runtime/library").Decimal | null;
            }[];
        } & {
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
        })[];
    }>;
    getRoute(id: string): Promise<{
        data: {
            vehicle: {
                id: string;
                createdAt: Date;
                model: string | null;
                isActive: boolean;
                capacity: number;
                vehicleNo: string;
                vehicleType: string;
                driverName: string | null;
                driverPhone: string | null;
                driverLicense: string | null;
                insuranceExpiry: Date | null;
                fcExpiry: Date | null;
                gpsDeviceId: string | null;
            };
            pickupPoints: {
                id: string;
                name: string;
                address: string | null;
                sortOrder: number;
                routeId: string;
                morningTime: string | null;
                landmark: string | null;
                eveningTime: string | null;
                latitude: import("../../generated/school-client/runtime/library").Decimal | null;
                longitude: import("../../generated/school-client/runtime/library").Decimal | null;
            }[];
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
                routeId: string;
                pickupAddress: string | null;
            })[];
        } & {
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
    }>;
    createRoute(dto: any): Promise<{
        data: {
            pickupPoints: {
                id: string;
                name: string;
                address: string | null;
                sortOrder: number;
                routeId: string;
                morningTime: string | null;
                landmark: string | null;
                eveningTime: string | null;
                latitude: import("../../generated/school-client/runtime/library").Decimal | null;
                longitude: import("../../generated/school-client/runtime/library").Decimal | null;
            }[];
        } & {
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
        message: string;
    }>;
    updateRoute(id: string, dto: any): Promise<{
        data: {
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
        message: string;
    }>;
    addPickupPoint(routeId: string, dto: any): Promise<{
        data: {
            id: string;
            name: string;
            address: string | null;
            sortOrder: number;
            routeId: string;
            morningTime: string | null;
            landmark: string | null;
            eveningTime: string | null;
            latitude: import("../../generated/school-client/runtime/library").Decimal | null;
            longitude: import("../../generated/school-client/runtime/library").Decimal | null;
        };
        message: string;
    }>;
    allocate(dto: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            isActive: boolean;
            studentId: string;
            routeId: string;
            pickupAddress: string | null;
        };
        message: string;
    }>;
    deallocate(studentId: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            isActive: boolean;
            studentId: string;
            routeId: string;
            pickupAddress: string | null;
        };
        message: string;
    }>;
    getAllocations(query: PaginationDto, routeId?: string): Promise<{
        data: ({
            route: {
                name: string;
                vehicle: {
                    vehicleNo: string;
                };
                routeNo: string;
            };
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
            routeId: string;
            pickupAddress: string | null;
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
    getLiveLocations(routeId?: string): Promise<{
        data: ({
            isOnline: boolean;
            vehicleId: string;
            vehicleNo: string;
            lat: number;
            lng: number;
            speed: number;
            heading: number;
            timestamp: Date;
            driverName: string;
            vehicleType: string;
            driverPhone: string;
            capacity: number;
            gpsDeviceId: string;
        } | {
            isOnline: boolean;
            lat: any;
            lng: any;
            speed: number;
            heading: number;
            timestamp: any;
            vehicleId: string;
            vehicleNo: string;
            vehicleType: string;
            driverName: string;
            driverPhone: string;
            capacity: number;
            gpsDeviceId: string;
        })[];
    }>;
    getVehicleLocation(vehicleId: string): Promise<{
        data: {
            vehicleId: string;
            vehicleNo: string;
            currentLocation: {
                vehicleId: string;
                vehicleNo: string;
                lat: number;
                lng: number;
                speed: number;
                heading: number;
                timestamp: Date;
                driverName?: string;
            };
            isOnline: boolean;
        };
    }>;
    updateLocation(vehicleId: string, dto: {
        lat: number;
        lng: number;
        speed?: number;
        heading?: number;
    }): Promise<{
        data: {
            vehicleId: string;
            vehicleNo: string;
            lat: number;
            lng: number;
            speed: number;
            heading: number;
            timestamp: Date;
            driverName: string;
        };
        message: string;
    }>;
}
