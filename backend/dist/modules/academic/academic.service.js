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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
let AcademicService = class AcademicService {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
    }
    get db() { return this.tenantPrisma.db; }
    async getAcademicYears() {
        return { data: await this.db.academicYear.findMany({ orderBy: { startDate: 'desc' } }) };
    }
    async createAcademicYear(dto) {
        const data = await this.db.academicYear.create({
            data: { name: dto.name, startDate: new Date(dto.startDate), endDate: new Date(dto.endDate) },
        });
        return { data, message: 'Academic year created' };
    }
    async setCurrentYear(id) {
        await this.db.academicYear.updateMany({ data: { isCurrent: false } });
        const data = await this.db.academicYear.update({ where: { id }, data: { isCurrent: true } });
        return { data, message: 'Current academic year set' };
    }
    async getClasses(academicYearId) {
        return {
            data: await this.db.class.findMany({
                where: { academicYearId },
                include: { sections: { include: { _count: { select: { students: true } } } } },
                orderBy: { sortOrder: 'asc' },
            }),
        };
    }
    async createClass(dto) {
        const data = await this.db.class.create({ data: dto });
        return { data, message: 'Class created' };
    }
    async getSections(classId, teacherId) {
        const where = {};
        if (classId)
            where.classId = classId;
        if (teacherId) {
            where.OR = [
                { classTeacherId: teacherId },
                { timetableSlots: { some: { teacherId } } },
            ];
        }
        return {
            data: await this.db.section.findMany({
                where,
                include: {
                    class: { select: { name: true, sortOrder: true } },
                    classTeacher: { select: { id: true, firstName: true, lastName: true } },
                    _count: { select: { students: true } },
                },
                orderBy: [{ class: { sortOrder: 'asc' } }, { name: 'asc' }],
            }),
        };
    }
    async createSection(dto) {
        const data = await this.db.section.create({ data: dto });
        return { data, message: 'Section created' };
    }
    async getSubjects(classId) {
        return {
            data: await this.db.subject.findMany({
                where: classId ? { classId } : undefined,
                include: { class: { select: { name: true } } },
                orderBy: { name: 'asc' },
            }),
        };
    }
    async createSubject(dto) {
        const data = await this.db.subject.create({ data: dto });
        return { data, message: 'Subject created' };
    }
    async getTimetable(sectionId) {
        return {
            data: await this.db.timetableSlot.findMany({
                where: { sectionId },
                include: {
                    subject: { select: { name: true, code: true } },
                    teacher: { select: { firstName: true, lastName: true } },
                },
                orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
            }),
        };
    }
    async createTimetable(dto) {
        const timetable = await this.db.timetable.create({
            data: {
                name: dto.name,
                sectionId: dto.sectionId,
                effectiveFrom: new Date(dto.effectiveFrom),
                slots: {
                    create: dto.slots.map((s) => ({
                        sectionId: dto.sectionId,
                        subjectId: s.subjectId,
                        teacherId: s.teacherId,
                        dayOfWeek: s.dayOfWeek,
                        startTime: s.startTime,
                        endTime: s.endTime,
                        roomNo: s.roomNo,
                    })),
                },
            },
            include: { slots: true },
        });
        return { data: timetable, message: 'Timetable created' };
    }
};
exports.AcademicService = AcademicService;
exports.AcademicService = AcademicService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], AcademicService);
//# sourceMappingURL=academic.service.js.map