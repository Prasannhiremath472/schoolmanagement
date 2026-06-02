import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MarkAttendanceDto, BulkAttendanceDto } from './dto/attendance.dto';
import { PaginationDto, buildPaginationMeta, getPaginationArgs } from '../../common/dto/pagination.dto';

@Injectable()
export class AttendanceService {
  private readonly logger = new Logger(AttendanceService.name);

  constructor(
    private readonly tenantPrisma: TenantPrismaService,
    private readonly eventEmitter: EventEmitter2,
    @InjectQueue('attendance-notifications') private readonly queue: Queue,
  ) {}

  private get db() { return this.tenantPrisma.db; }

  async markBulkAttendance(dto: BulkAttendanceDto, markedById: string) {
    const db = this.db;
    const date = new Date(dto.date);
    const results = { marked: 0, updated: 0, errors: [] as any[] };

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
          update: { status: record.status as any, remarks: record.remarks, markedById },
          create: {
            studentId: record.studentId,
            sectionId: dto.sectionId,
            academicYearId: dto.academicYearId,
            date,
            status: record.status as any,
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
      } catch (err) {
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

  async getSectionAttendance(sectionId: string, date: string) {
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

  async getStudentAttendance(
    studentId: string,
    query: { fromDate: string; toDate: string } & PaginationDto,
  ) {
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
        ...buildPaginationMeta(total, query),
        present,
        absent,
        percentage: total > 0 ? ((present / total) * 100).toFixed(2) : 0,
      },
    };
  }

  async getMonthlyReport(sectionId: string, month: number, year: number) {
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

  async generateQrCode(sectionId: string, date: string) {
    const qrcode = await import('qrcode');
    const payload = JSON.stringify({ sectionId, date, type: 'attendance', ts: Date.now() });
    const qr = await qrcode.toDataURL(payload);
    return { data: { qr, payload }, message: 'QR code generated' };
  }
}
