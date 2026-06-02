import { TenantPrismaService } from '../../database/tenant-prisma.service';
export declare class AnalyticsService {
    private readonly tenantPrisma;
    constructor(tenantPrisma: TenantPrismaService);
    private get db();
    getOverview(): Promise<{
        data: {
            students: number;
            teachers: number;
            staff: number;
            totalFees: number;
        };
    }>;
    getAttendanceTrend(days?: number): Promise<{
        data: (import("../../generated/school-client").Prisma.PickEnumerable<import("../../generated/school-client").Prisma.AttendanceGroupByOutputType, ("status" | "date")[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
    getFeeTrend(months?: number): Promise<{
        data: (import("../../generated/school-client").Prisma.PickEnumerable<import("../../generated/school-client").Prisma.FeePaymentGroupByOutputType, "paymentDate"[]> & {
            _sum: {
                paidAmount: import("../../generated/school-client/runtime/library").Decimal;
            };
        })[];
    }>;
}
