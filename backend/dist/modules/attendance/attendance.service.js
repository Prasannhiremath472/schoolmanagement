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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AttendanceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const bull_1 = require("@nestjs/bull");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let AttendanceService = AttendanceService_1 = class AttendanceService {
    constructor(tenantPrisma, eventEmitter, queue) {
        this.tenantPrisma = tenantPrisma;
        this.eventEmitter = eventEmitter;
        this.queue = queue;
        this.logger = new common_1.Logger(AttendanceService_1.name);
    }
    get db() { return this.tenantPrisma.db; }
    async markBulkAttendance(dto, markedById) {
        const db = this.db;
        const date = new Date(dto.date);
        const results = { marked: 0, updated: 0, errors: [] };
        for (const record of dto.records) {
            try {
                await db.attendance.upsert({
                    where: {
                        studentId_date_sectionId: {
                            studentId: record.studentId,
                            date,
                            sectionId: dto.sectionId,
                        },
                    },
                    update: { status: record.status, remarks: record.remarks, markedById },
                    create: {
                        studentId: record.studentId,
                        sectionId: dto.sectionId,
                        academicYearId: dto.academicYearId,
                        date,
                        status: record.status,
                        remarks: record.remarks,
                        markedById,
                    },
                });
                if (record.status === 'ABSENT') {
                    await this.queue.add('send-absent-notification', {
                        studentId: record.studentId,
                        date: dto.date,
                    }, { delay: 1000 });
                }
                results.marked++;
            }
            catch (err) {
                results.errors.push({ studentId: record.studentId, error: err.message });
            }
        }
        this.eventEmitter.emit('attendance.marked', {
            sectionId: dto.sectionId,
            date: dto.date,
            count: results.marked,
        });
        return { data: results, message: `Attendance marked for ${results.marked} students` };
    }
    async getSectionAttendance(sectionId, date) {
        const db = this.db;
        const attendanceDate = new Date(date);
        const [students, attendances] = await Promise.all([
            db.studentSection.findMany({
                where: { sectionId, isActive: true },
                include: {
                    student: {
                        select: { id: true, firstName: true, lastName: true, admissionNo: true, rollNo: true, photo: true },
                    },
                },
                orderBy: { student: { rollNo: 'asc' } },
            }),
            db.attendance.findMany({
                where: { sectionId, date: attendanceDate },
            }),
        ]);
        const attendanceMap = new Map(attendances.map((a) => [a.studentId, a]));
        const result = students.map((ss) => ({
            studentId: ss.student.id,
            admissionNo: ss.student.admissionNo,
            rollNo: ss.rollNo || ss.student.rollNo,
            name: `${ss.student.firstName} ${ss.student.lastName}`,
            photo: ss.student.photo,
            status: attendanceMap.get(ss.student.id)?.status || 'NOT_MARKED',
            remarks: attendanceMap.get(ss.student.id)?.remarks || null,
        }));
        return { data: result, message: 'Section attendance retrieved' };
    }
    async getStudentAttendance(studentId, query) {
        const db = this.db;
        const [data, total] = await Promise.all([
            db.attendance.findMany({
                where: {
                    studentId,
                    date: {
                        gte: new Date(query.fromDate),
                        lte: new Date(query.toDate),
                    },
                },
                orderBy: { date: 'desc' },
            }),
            db.attendance.count({
                where: {
                    studentId,
                    date: { gte: new Date(query.fromDate), lte: new Date(query.toDate) },
                },
            }),
        ]);
        const present = data.filter((a) => a.status === 'PRESENT').length;
        const absent = data.filter((a) => a.status === 'ABSENT').length;
        return {
            data,
            meta: {
                ...(0, pagination_dto_1.buildPaginationMeta)(total, query),
                present,
                absent,
                percentage: total > 0 ? ((present / total) * 100).toFixed(2) : 0,
            },
        };
    }
    async getMonthlyReport(sectionId, month, year) {
        const db = this.db;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const students = await db.studentSection.findMany({
            where: { sectionId, isActive: true },
            include: {
                student: {
                    select: { id: true, firstName: true, lastName: true, admissionNo: true },
                    include: {
                        attendances: {
                            where: {
                                sectionId,
                                date: { gte: startDate, lte: endDate },
                            },
                        },
                    },
                },
            },
        });
        const report = students.map((ss) => {
            const atts = ss.student.attendances;
            const present = atts.filter((a) => a.status === 'PRESENT').length;
            const absent = atts.filter((a) => a.status === 'ABSENT').length;
            const total = atts.length;
            return {
                studentId: ss.student.id,
                name: `${ss.student.firstName} ${ss.student.lastName}`,
                admissionNo: ss.student.admissionNo,
                present,
                absent,
                total,
                percentage: total > 0 ? ((present / total) * 100).toFixed(2) : 0,
            };
        });
        return { data: report, message: `Monthly report for ${month}/${year}` };
    }
    async generateQrCode(sectionId, date) {
        const qrcode = await Promise.resolve().then(() => require('qrcode'));
        const payload = JSON.stringify({ sectionId, date, type: 'attendance', ts: Date.now() });
        const qr = await qrcode.toDataURL(payload);
        return { data: { qr, payload }, message: 'QR code generated' };
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = AttendanceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, bull_1.InjectQueue)('attendance-notifications')),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService,
        event_emitter_1.EventEmitter2, Object])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map