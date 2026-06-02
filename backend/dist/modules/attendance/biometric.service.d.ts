import { TenantPrismaService } from '../../database/tenant-prisma.service';
interface BiometricRecord {
    employeeId: string;
    punchTime: string;
    punchType: 'IN' | 'OUT';
    deviceId: string;
}
export declare class BiometricService {
    private readonly tenantPrisma;
    private readonly logger;
    constructor(tenantPrisma: TenantPrismaService);
    private get db();
    fetchFromDevice(deviceIp: string, devicePort?: number): Promise<BiometricRecord[]>;
    fetchFromAdmsApi(admsUrl: string, apiKey: string, date: string): Promise<BiometricRecord[]>;
    syncBiometricAttendance(records: BiometricRecord[], date: string, academicYearId: string): Promise<{
        data: {
            synced: number;
            notFound: number;
            errors: number;
        };
        message: string;
    }>;
    markRfidAttendance(rfidCode: string, sectionId: string, academicYearId: string): Promise<{
        success: boolean;
        message: string;
        student?: undefined;
    } | {
        success: boolean;
        student: {
            id: string;
            name: string;
            admissionNo: string;
        };
        message: string;
    }>;
}
export {};
