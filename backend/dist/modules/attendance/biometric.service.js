"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BiometricService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiometricService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const axios_1 = require("axios");
let BiometricService = BiometricService_1 = class BiometricService {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
        this.logger = new common_1.Logger(BiometricService_1.name);
    }
    get db() { return this.tenantPrisma.db; }
    async fetchFromDevice(deviceIp, devicePort = 4370) {
        this.logger.log(`Fetching attendance from ZKTeco device at ${deviceIp}:${devicePort}`);
        return [];
    }
    async fetchFromAdmsApi(admsUrl, apiKey, date) {
        try {
            const response = await axios_1.default.get(`${admsUrl}/iclock/getattlog`, {
                params: { stn: date, day_begin: date, day_end: date },
                headers: { Authorization: `Bearer ${apiKey}` },
                timeout: 15000,
            });
            if (response.data && Array.isArray(response.data.data)) {
                return response.data.data.map((record) => ({
                    employeeId: record.pin || record.employee_id,
                    punchTime: record.punch_time,
                    punchType: record.punch_state === '0' ? 'IN' : 'OUT',
                    deviceId: record.device_id || admsUrl,
                }));
            }
            return [];
        }
        catch (err) {
            this.logger.error(`Failed to fetch from ADMS API: ${err.message}`);
            return [];
        }
    }
    async syncBiometricAttendance(records, date, academicYearId) {
        const db = this.db;
        const results = { synced: 0, notFound: 0, errors: 0 };
        const dateObj = new Date(date);
        for (const record of records) {
            try {
                const teacher = await db.teacher.findFirst({ where: { employeeId: record.employeeId } });
                const staff = await db.staff.findFirst({ where: { employeeId: record.employeeId } });
                if (!teacher && !staff) {
                    results.notFound++;
                    continue;
                }
                const checkIn = record.punchType === 'IN' ? new Date(record.punchTime) : null;
                const checkOut = record.punchType === 'OUT' ? new Date(record.punchTime) : null;
                await db.staffAttendance.upsert({
                    where: {
                        id: `${teacher?.id || staff?.id}-${date}`,
                    },
                    update: {
                        ...(checkIn && { checkIn }),
                        ...(checkOut && { checkOut }),
                    },
                    create: {
                        teacherId: teacher?.id,
                        staffId: staff?.id,
                        date: dateObj,
                        checkIn: checkIn || undefined,
                        checkOut: checkOut || undefined,
                        status: 'PRESENT',
                    },
                });
                results.synced++;
            }
            catch (err) {
                this.logger.error(`Error syncing record ${record.employeeId}: ${err.message}`);
                results.errors++;
            }
        }
        return { data: results, message: `Synced: ${results.synced}, not found: ${results.notFound}, errors: ${results.errors}` };
    }
    async markRfidAttendance(rfidCode, sectionId, academicYearId) {
        const db = this.db;
        const student = await db.student.findFirst({
            where: { aadhaarNo: rfidCode },
        });
        if (!student) {
            return { success: false, message: 'Student not found for RFID code' };
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        await db.attendance.upsert({
            where: {
                studentId_date_sectionId: { studentId: student.id, date: today, sectionId },
            },
            update: { status: 'PRESENT' },
            create: {
                studentId: student.id,
                sectionId,
                academicYearId,
                date: today,
                status: 'PRESENT',
            },
        });
        return {
            success: true,
            student: { id: student.id, name: `${student.firstName} ${student.lastName}`, admissionNo: student.admissionNo },
            message: `Attendance marked for ${student.firstName} ${student.lastName}`,
        };
    }
};
exports.BiometricService = BiometricService;
exports.BiometricService = BiometricService = BiometricService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], BiometricService);
//# sourceMappingURL=biometric.service.js.map