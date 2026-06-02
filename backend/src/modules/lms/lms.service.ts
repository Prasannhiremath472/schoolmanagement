import { Injectable, NotFoundException } from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { PaginationDto, buildPaginationMeta, getPaginationArgs } from '../../common/dto/pagination.dto';

@Injectable()
export class LmsService {
  constructor(private readonly tenantPrisma: TenantPrismaService) {}
  private get db() { return this.tenantPrisma.db; }

  // ─── ASSIGNMENTS ──────────────────────────────────────────────────────────

  async getAssignments(query: PaginationDto & { subjectId?: string; teacherId?: string }) {
    const where: any = { isPublished: true };
    if (query.subjectId) where.subjectId = query.subjectId;
    if (query.teacherId) where.teacherId = query.teacherId;

    const [data, total] = await Promise.all([
      this.db.assignment.findMany({
        where,   orderBy: { dueDate: 'asc' },
        include: {
          subject: { select: { name: true } },
          teacher: { select: { firstName: true, lastName: true } },
          _count: { select: { submissions: true } },
        },
      }),
      this.db.assignment.count({ where }),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  async createAssignment(dto: any, teacherId: string) {
    const data = await this.db.assignment.create({
      data: {
        title: dto.title,
        description: dto.description,
        subjectId: dto.subjectId,
        teacherId,
        dueDate: new Date(dto.dueDate),
        maxMarks: dto.maxMarks || 100,
        attachments: dto.attachments || [],
        isPublished: dto.isPublished ?? false,
      },
    });
    return { data, message: 'Assignment created' };
  }

  async submitAssignment(assignmentId: string, studentId: string, dto: any) {
    const data = await this.db.assignmentSubmission.upsert({
      where: { assignmentId_studentId: { assignmentId, studentId } },
      update: { files: dto.files || [], remarks: dto.remarks, status: 'SUBMITTED' },
      create: {
        assignmentId,
        studentId,
        files: dto.files || [],
        remarks: dto.remarks,
        status: 'SUBMITTED',
      },
    });
    return { data, message: 'Assignment submitted' };
  }

  async evaluateSubmission(submissionId: string, dto: { marksGiven: number; feedback: string }) {
    const data = await this.db.assignmentSubmission.update({
      where: { id: submissionId },
      data: { marksGiven: dto.marksGiven, feedback: dto.feedback, status: 'EVALUATED', evaluatedAt: new Date() },
    });
    return { data, message: 'Submission evaluated' };
  }

  // ─── HOMEWORK ─────────────────────────────────────────────────────────────

  async getHomework(query: PaginationDto & { subjectId?: string }) {
    const where: any = {};
    if (query.subjectId) where.subjectId = query.subjectId;
    const [data, total] = await Promise.all([
      this.db.homework.findMany({ where, ...getPaginationArgs(query), orderBy: { dueDate: 'asc' }, include: { subject: { select: { name: true } } } }),
      this.db.homework.count({ where }),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  async createHomework(dto: any, teacherId: string) {
    const data = await this.db.homework.create({
      data: { title: dto.title, description: dto.description, subjectId: dto.subjectId, teacherId, dueDate: new Date(dto.dueDate), attachments: dto.attachments || [] },
    });
    return { data, message: 'Homework assigned' };
  }

  // ─── STUDY MATERIALS ──────────────────────────────────────────────────────

  async getMaterials(subjectId?: string) {
    const data = await this.db.studyMaterial.findMany({
      where: { ...(subjectId && { subjectId }), isPublished: true },
      include: { subject: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return { data };
  }

  async uploadMaterial(dto: any, uploadedBy: string) {
    const data = await this.db.studyMaterial.create({
      data: { title: dto.title, description: dto.description, subjectId: dto.subjectId, type: dto.type, fileUrl: dto.fileUrl, fileSize: dto.fileSize, uploadedBy },
    });
    return { data, message: 'Material uploaded' };
  }

  // ─── QUIZZES ──────────────────────────────────────────────────────────────

  async getQuizzes(subjectId?: string) {
    const data = await this.db.quiz.findMany({
      where: { ...(subjectId && { subjectId }), isPublished: true },
      include: { _count: { select: { questions: true, attempts: true } } },
    });
    return { data };
  }

  async createQuiz(dto: any) {
    const { questions, ...quizData } = dto;
    const data = await this.db.quiz.create({
      data: {
        ...quizData,
        startAt: quizData.startAt ? new Date(quizData.startAt) : null,
        endAt: quizData.endAt ? new Date(quizData.endAt) : null,
        questions: { create: questions || [] },
      },
      include: { questions: true },
    });
    return { data, message: 'Quiz created' };
  }

  async submitQuiz(quizId: string, studentId: string, answers: any) {
    const quiz = await this.db.quiz.findUnique({ where: { id: quizId }, include: { questions: true } });
    if (!quiz) throw new NotFoundException('Quiz not found');

    let score = 0;
    for (const question of quiz.questions) {
      const answer = answers[question.id];
      const options = question.options as any[];
      const correct = options.find((o) => o.isCorrect);
      if (correct && answer === correct.text) score += question.marks;
    }

    const data = await this.db.quizAttempt.upsert({
      where: { quizId_studentId: { quizId, studentId } },
      update: { answers, score, submittedAt: new Date() },
      create: { quizId, studentId, answers, score, submittedAt: new Date() },
    });
    return { data: { ...data, score }, message: `Quiz submitted. Score: ${score}` };
  }

  // ─── LIVE CLASSES ─────────────────────────────────────────────────────────

  async getLiveClasses(teacherId?: string) {
    const data = await this.db.liveClass.findMany({
      where: { ...(teacherId && { teacherId }) },
      include: { teacher: { select: { firstName: true, lastName: true } } },
      orderBy: { scheduledAt: 'desc' },
    });
    return { data };
  }

  async createLiveClass(dto: any, teacherId: string) {
    // Generate meeting credentials based on platform
    let meetingDetails: any = {};

    if (dto.platform === 'zoom') {
      meetingDetails = await this.generateZoomMeeting(dto.title, dto.scheduledAt, dto.duration);
    } else if (dto.platform === 'gmeet') {
      meetingDetails = this.generateGoogleMeetLink();
    }

    const data = await this.db.liveClass.create({
      data: {
        ...dto,
        teacherId,
        scheduledAt: new Date(dto.scheduledAt),
        meetingId: meetingDetails.meetingId || dto.meetingId,
        meetingUrl: meetingDetails.joinUrl || dto.meetingUrl,
        meetingPass: meetingDetails.password || dto.meetingPass,
      },
    });
    return { data, message: 'Live class scheduled' };
  }

  async startLiveClass(liveClassId: string) {
    const data = await this.db.liveClass.update({
      where: { id: liveClassId },
      data: { status: 'LIVE' },
    });
    return { data, message: 'Live class started' };
  }

  async endLiveClass(liveClassId: string, recordingUrl?: string) {
    const data = await this.db.liveClass.update({
      where: { id: liveClassId },
      data: { status: 'COMPLETED', ...(recordingUrl && { recordingUrl }) },
    });
    return { data, message: 'Live class ended' };
  }

  async getRecordedClasses(teacherId?: string) {
    const data = await this.db.liveClass.findMany({
      where: {
        status: 'COMPLETED',
        recordingUrl: { not: null },
        ...(teacherId && { teacherId }),
      },
      include: { teacher: { select: { firstName: true, lastName: true } } },
      orderBy: { scheduledAt: 'desc' },
    });
    return { data };
  }

  // ─── ZOOM INTEGRATION ─────────────────────────────────────────────────────

  private async generateZoomMeeting(topic: string, startTime: string, duration: number) {
    // In production: use Zoom API with JWT credentials
    // const zoomClient = new Zoom({ apiKey, apiSecret });
    // const meeting = await zoomClient.meetings.create({ userId: 'me', topic, type: 2, start_time: startTime, duration });

    // For now, generate a mock meeting ID
    const meetingId = Math.floor(Math.random() * 9000000000) + 1000000000;
    const password = Math.random().toString(36).substring(2, 8).toUpperCase();

    return {
      meetingId: String(meetingId),
      joinUrl: `https://zoom.us/j/${meetingId}?pwd=${password}`,
      hostUrl: `https://zoom.us/s/${meetingId}?zak=HOST_TOKEN`,
      password,
    };
  }

  private generateGoogleMeetLink() {
    // Generate Google Meet link (requires Google Calendar API in production)
    const meetCode = Math.random().toString(36).substring(2, 5) + '-' +
      Math.random().toString(36).substring(2, 5) + '-' +
      Math.random().toString(36).substring(2, 5);
    return { meetingId: meetCode, joinUrl: `https://meet.google.com/${meetCode}` };
  }
}
