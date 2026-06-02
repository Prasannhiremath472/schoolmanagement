import { CentralPrismaService } from '../../database/central-prisma.service';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
export declare class SchoolService {
    private readonly centralPrisma;
    private readonly tenantPrisma;
    constructor(centralPrisma: CentralPrismaService, tenantPrisma: TenantPrismaService);
    getSchoolProfile(slug: string): Promise<{
        data: {
            id: string;
            email: string;
            name: string;
            phone: string;
            address: string;
            city: string;
            state: string;
            country: string;
            logo: string;
            favicon: string;
            primaryColor: string;
            secondaryColor: string;
            timezone: string;
            currency: string;
        };
    }>;
    updateSchoolSettings(slug: string, dto: any): Promise<{
        data: {
            s3AccessKey: string | null;
            s3SecretKey: string | null;
            s3Region: string | null;
            s3Bucket: string | null;
            id: string;
            updatedAt: Date;
            schoolId: string;
            smtpHost: string | null;
            smtpPort: number | null;
            smtpUser: string | null;
            smtpPass: string | null;
            smtpFrom: string | null;
            smsProvider: string | null;
            smsApiKey: string | null;
            whatsappApiKey: string | null;
            razorpayKeyId: string | null;
            razorpayKeySecret: string | null;
            stripePubKey: string | null;
            stripeSecretKey: string | null;
            zoomApiKey: string | null;
            zoomApiSecret: string | null;
            firebaseServerKey: string | null;
        };
        message: string;
    }>;
    getSchoolStats(slug: string): Promise<{
        data: {
            students: number;
            teachers: number;
            staff: number;
        };
    }>;
}
