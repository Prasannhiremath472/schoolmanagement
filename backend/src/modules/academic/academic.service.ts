import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';

@Injectable()
export class AcademicService {
  constructor(private readonly tenantPrisma: TenantPrismaService) {}
  private get db() { return this.tenantPrisma.db; }

  // Academic Years
  async getAcademicYears() {
    return { data: await this.db.academicYear.findMany({ orderBy: { startDate: 'desc' } }) };
  }

  async createAcademicYear(dto: { name: string; startDate: string; endDate: string }) {
    const data = await this.db.academicYear.create({
      data: { name: dto.name, startDate: new Date(dto.startDate), endDate: new Date(dto.endDate) },
    });
    return { data, message: 'Academic year created' };
  }

  async setCurrentYear(id: string) {
    await this.db.academicYear.updateMany({ data: { isCurrent: false } });
    const data = await this.db.academicYear.update({ where: { id }, data: { isCurrent: true } });
    return { data, message: 'Current academic year set' };
  }

  // Classes
  async getClasses(academicYearId: string) {
    return {
      data: await this.db.class.findMany({
        where: { academicYearId },
        include: { sections: { include: { _count: { select: { students: true } } } } },
        orderBy: { sortOrder: 'asc' },
      }),
    };
  }

  async createClass(dto: { name: string; displayName?: string; academicYearId: string; sortOrder?: number }) {
    const data = await this.db.class.create({ data: dto });
    return { data, message: 'Class created' };
  }

  // Sections — supports optional classId and teacherId filters
  async getSections(classId?: string, teacherId?: string) {
    const where: any = {};
    if (classId) where.classId = classId;
    if (teacherId) {
      // Get sections where this teacher is class teacher OR teaches a subject
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

  async createSection(dto: { name: string; classId: string; classTeacherId?: string; capacity?: number }) {
    const data = await this.db.section.create({ data: dto });
    return { data, message: 'Section created' };
  }

  // Subjects
  async getSubjects(classId?: string) {
    return {
      data: await this.db.subject.findMany({
        where: classId ? { classId } : undefined,
        include: { class: { select: { name: true } } },
        orderBy: { name: 'asc' },
      }),
    };
  }

  async createSubject(dto: {
    name: string; code: string; classId: string; subjectType?: string; maxMarks?: number; passMarks?: number;
  }) {
    const data = await this.db.subject.create({ data: dto as any });
    return { data, message: 'Subject created' };
  }

  // Timetable
  async getTimetable(sectionId: string) {
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

  async createTimetable(dto: any) {
    const timetable = await this.db.timetable.create({
      data: {
        name: dto.name,
        sectionId: dto.sectionId,
        effectiveFrom: new Date(dto.effectiveFrom),
        slots: {
          create: dto.slots.map((s: any) => ({
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
}
