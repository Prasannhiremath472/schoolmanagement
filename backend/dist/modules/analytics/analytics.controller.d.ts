import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getOverview(): Promise<{
        data: {
            students: number;
            teachers: number;
            staff: number;
            totalFees: number;
        };
    }>;
    getAttendanceTrend(days?: string): Promise<{
        data: (import("../../generated/school-client").Prisma.PickEnumerable<import("../../generated/school-client").Prisma.AttendanceGroupByOutputType, ("status" | "date")[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
    getFeeTrend(months?: string): Promise<{
        data: (import("../../generated/school-client").Prisma.PickEnumerable<import("../../generated/school-client").Prisma.FeePaymentGroupByOutputType, "paymentDate"[]> & {
            _sum: {
                paidAmount: import("../../generated/school-client/runtime/library").Decimal;
            };
        })[];
    }>;
}
