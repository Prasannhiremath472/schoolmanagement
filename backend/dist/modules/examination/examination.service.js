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
var ExaminationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExaminationService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const bull_1 = require("@nestjs/bull");
let ExaminationService = ExaminationService_1 = class ExaminationService {
    constructor(tenantPrisma, eventEmitter, queue) {
        this.tenantPrisma = tenantPrisma;
        this.eventEmitter = eventEmitter;
        this.queue = queue;
        this.logger = new common_1.Logger(ExaminationService_1.name);
    }
    get db() { return this.tenantPrisma.db; }
    async getExamTypes() {
        const data = await this.db.examType.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
        });
        return { data };
    }
    async createExamType(dto) {
        const data = await this.db.examType.create({ data: dto });
        return { data, message: 'Exam type created' };
    }
    async getSchedules(query) {
        const data = await this.db.examSchedule.findMany({
            where: {
                ...(query.classId && { classId: query.classId }),
                ...(query.academicYearId && { academicYearId: query.academicYearId }),
                ...(query.examTypeId && { examTypeId: query.examTypeId }),
            },
            include: {
                examType: true,
                class: { select: { name: true } },
                examTimetable: {
                    include: { subject: { select: { name: true, code: true } } },
                    orderBy: { examDate: 'asc' },
                },
            },
            orderBy: { startDate: 'desc' },
        });
        return { data };
    }
    async createSchedule(dto) {
        const { timetable, ...scheduleData } = dto;
        const schedule = await this.db.examSchedule.create({
            data: {
                ...scheduleData,
                startDate: new Date(scheduleData.startDate),
                endDate: new Date(scheduleData.endDate),
                examTimetable: {
                    create: timetable.map((t) => ({
                        subjectId: t.subjectId,
                        examDate: new Date(t.examDate),
                        startTime: t.startTime,
                        endTime: t.endTime,
                        venue: t.venue,
                        maxMarks: t.maxMarks,
                        passMarks: t.passMarks,
                    })),
                },
            },
            include: { examTimetable: true },
        });
        return { data: schedule, message: 'Exam schedule created' };
    }
    async publishSchedule(id) {
        const schedule = await this.db.examSchedule.update({
            where: { id },
            data: { isPublished: true },
        });
        this.eventEmitter.emit('exam.published', { schedule });
        return { data: schedule, message: 'Exam schedule published' };
    }
    async enterBulkMarks(dto, enteredBy) {
        const db = this.db;
        const results = { success: 0, failed: 0 };
        for (const record of dto.marks) {
            try {
                const gradeInfo = await this.calculateGrade(record.marksObtained, record.maxMarks);
                await db.examResult.upsert({
                    where: {
                        studentId_examScheduleId_subjectId: {
                            studentId: record.studentId,
                            examScheduleId: dto.examScheduleId,
                            subjectId: record.subjectId,
                        },
                    },
                    update: {
                        marksObtained: record.marksObtained,
                        maxMarks: record.maxMarks,
                        isAbsent: record.isAbsent || false,
                        remarks: record.remarks,
                        grade: gradeInfo.grade,
                        gradePoint: gradeInfo.gradePoint,
                        isPass: gradeInfo.isPass,
                        enteredBy,
                    },
                    create: {
                        studentId: record.studentId,
                        examScheduleId: dto.examScheduleId,
                        subjectId: record.subjectId,
                        sectionId: dto.sectionId,
                        marksObtained: record.marksObtained,
                        maxMarks: record.maxMarks,
                        isAbsent: record.isAbsent || false,
                        remarks: record.remarks,
                        grade: gradeInfo.grade,
                        gradePoint: gradeInfo.gradePoint,
                        isPass: gradeInfo.isPass,
                        enteredBy,
                    },
                });
                results.success++;
            }
            catch (err) {
                results.failed++;
                this.logger.error(`Failed to enter marks for student ${record.studentId}: ${err.message}`);
            }
        }
        return { data: results, message: `Marks entered: ${results.success} success, ${results.failed} failed` };
    }
    async getResults(examScheduleId, sectionId) {
        const data = await this.db.examResult.findMany({
            where: {
                examScheduleId,
                ...(sectionId && { sectionId }),
            },
            include: {
                student: { select: { firstName: true, lastName: true, admissionNo: true, rollNo: true } },
                subject: { select: { name: true, code: true } },
            },
            orderBy: [{ subject: { name: 'asc' } }, { student: { rollNo: 'asc' } }],
        });
        return { data };
    }
    async getStudentReport(studentId, examScheduleId) {
        const db = this.db;
        const [student, results, schedule] = await Promise.all([
            db.student.findUnique({ where: { id: studentId } }),
            db.examResult.findMany({
                where: { studentId, examScheduleId },
                include: { subject: true },
            }),
            db.examSchedule.findUnique({
                where: { id: examScheduleId },
                include: { examType: true, class: true },
            }),
        ]);
        if (!student)
            throw new common_1.NotFoundException('Student not found');
        const totalMarks = results.reduce((s, r) => s + Number(r.marksObtained), 0);
        const maxMarks = results.reduce((s, r) => s + Number(r.maxMarks), 0);
        const percentage = maxMarks > 0 ? ((totalMarks / maxMarks) * 100).toFixed(2) : 0;
        const cgpa = results.length > 0
            ? (results.reduce((s, r) => s + Number(r.gradePoint || 0), 0) / results.length).toFixed(2)
            : 0;
        const passCount = results.filter((r) => r.isPass).length;
        const overallPass = passCount === results.length;
        return {
            data: {
                student,
                schedule,
                results,
                summary: {
                    totalMarks,
                    maxMarks,
                    percentage,
                    cgpa,
                    passCount,
                    totalSubjects: results.length,
                    overallPass,
                    grade: this.getOverallGrade(Number(percentage)),
                },
            },
        };
    }
    async generateReportCards(examScheduleId, sectionId) {
        await this.queue.add('generate-report-cards', {
            examScheduleId,
            sectionId,
        });
        return { message: 'Report card generation queued. You will be notified when ready.' };
    }
    async getAnalysis(examScheduleId) {
        const db = this.db;
        const results = await db.examResult.groupBy({
            by: ['subjectId'],
            where: { examScheduleId },
            _avg: { marksObtained: true },
            _max: { marksObtained: true },
            _min: { marksObtained: true },
            _count: { id: true },
        });
        return { data: results, message: 'Exam analysis' };
    }
    async calculateGrade(marksObtained, maxMarks) {
        const percentage = (marksObtained / maxMarks) * 100;
        const gradeScales = await this.db.gradeScale.findMany({
            orderBy: { minPercent: 'desc' },
        });
        const gradeScale = gradeScales.find((g) => percentage >= Number(g.minPercent) && percentage <= Number(g.maxPercent));
        return {
            grade: gradeScale?.name || 'F',
            gradePoint: gradeScale ? Number(gradeScale.gradePoint) : 0,
            isPass: percentage >= 33,
        };
    }
    getOverallGrade(percentage) {
        if (percentage >= 90)
            return 'A+';
        if (percentage >= 80)
            return 'A';
        if (percentage >= 70)
            return 'B+';
        if (percentage >= 60)
            return 'B';
        if (percentage >= 50)
            return 'C';
        if (percentage >= 33)
            return 'D';
        return 'F';
    }
};
exports.ExaminationService = ExaminationService;
exports.ExaminationService = ExaminationService = ExaminationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, bull_1.InjectQueue)('report-cards')),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService,
        event_emitter_1.EventEmitter2, Object])
], ExaminationService);
//# sourceMappingURL=examination.service.js.map