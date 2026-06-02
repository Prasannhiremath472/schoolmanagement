import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {
  CreateExamScheduleDto,
  EnterMarksDto,
  BulkMarksDto,
} from './dto/examination.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class ExaminationService {
  private readonly logger = new Logger(ExaminationService.name);

  constructor(
    private readonly tenantPrisma: TenantPrismaService,
    private readonly eventEmitter: EventEmitter2,
    @InjectQueue('report-cards') private readonly queue: Queue,
  ) {}

  private get db() { return this.tenantPrisma.db; }

  // ─── EXAM TYPES ───────────────────────────────────────────────────────────

  async getExamTypes() {
    const data = await this.db.examType.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    return { data };
  }

  async createExamType(dto: { name: string; shortName: string; sortOrder?: number }) {
    const data = await this.db.examType.create({ data: dto });
    return { data, message: 'Exam type created' };
  }

  // ─── EXAM SCHEDULES ───────────────────────────────────────────────────────

  async getSchedules(query: { classId?: string; academicYearId?: string; examTypeId?: string }) {
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

  async createSchedule(dto: CreateExamScheduleDto) {
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

  async publishSchedule(id: string) {
    const schedule = await this.db.examSchedule.update({
      where: { id },
      data: { isPublished: true },
    });
    this.eventEmitter.emit('exam.published', { schedule });
    return { data: schedule, message: 'Exam schedule published' };
  }

  // ─── MARKS ENTRY ──────────────────────────────────────────────────────────

  async enterBulkMarks(dto: BulkMarksDto, enteredBy: string) {
    const db = this.db;
    const results = { success: 0, failed: 0 };

    for (const record of dto.marks) {
      try {
        const gradeInfo = await this.calculateGrade(
          record.marksObtained,
          record.maxMarks,
        );

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
      } catch (err) {
        results.failed++;
        this.logger.error(`Failed to enter marks for student ${record.studentId}: ${err.message}`);
      }
    }

    return { data: results, message: `Marks entered: ${results.success} success, ${results.failed} failed` };
  }

  async getResults(examScheduleId: string, sectionId?: string) {
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

  async getStudentReport(studentId: string, examScheduleId: string) {
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

    if (!student) throw new NotFoundException('Student not found');

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

  async generateReportCards(examScheduleId: string, sectionId: string) {
    await this.queue.add('generate-report-cards', {
      examScheduleId,
      sectionId,
    });
    return { message: 'Report card generation queued. You will be notified when ready.' };
  }

  async getAnalysis(examScheduleId: string) {
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

  private async calculateGrade(marksObtained: number, maxMarks: number) {
    const percentage = (marksObtained / maxMarks) * 100;
    const gradeScales = await this.db.gradeScale.findMany({
      orderBy: { minPercent: 'desc' },
    });

    const gradeScale = gradeScales.find(
      (g) => percentage >= Number(g.minPercent) && percentage <= Number(g.maxPercent),
    );

    return {
      grade: gradeScale?.name || 'F',
      gradePoint: gradeScale ? Number(gradeScale.gradePoint) : 0,
      isPass: percentage >= 33,
    };
  }

  private getOverallGrade(percentage: number): string {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 33) return 'D';
    return 'F';
  }
}
