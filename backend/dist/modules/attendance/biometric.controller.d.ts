import { BiometricService } from './biometric.service';
export declare class BiometricController {
    private readonly biometricService;
    constructor(biometricService: BiometricService);
    syncFromDevice(dto: {
        deviceIp: string;
        devicePort?: number;
        date: string;
        academicYearId: string;
    }): Promise<{
        data: {
            synced: number;
            notFound: number;
            errors: number;
        };
        message: string;
    }>;
    syncFromAdms(dto: {
        admsUrl: string;
        apiKey: string;
        date: string;
        academicYearId: string;
    }): Promise<{
        data: {
            synced: number;
            notFound: number;
            errors: number;
        };
        message: string;
    }>;
    rfidScan(dto: {
        rfidCode: string;
        sectionId: string;
        academicYearId: string;
    }): Promise<{
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
