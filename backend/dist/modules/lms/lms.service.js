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
exports.LmsService = void 0;
const common_1 = require("@nestjs/common");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let LmsService = class LmsService {
    constructor(tenantPrisma) {
        this.tenantPrisma = tenantPrisma;
    }
    get db() { return this.tenantPrisma.db; }
    async getAssignments(query) {
        const where = { isPublished: true };
        if (query.subjectId)
            where.subjectId = query.subjectId;
        if (query.teacherId)
            where.teacherId = query.teacherId;
        const [data, total] = await Promise.all([
            this.db.assignment.findMany({
                where, orderBy: { dueDate: 'asc' },
                include: {
                    subject: { select: { name: true } },
                    teacher: { select: { firstName: true, lastName: true } },
                    _count: { select: { submissions: true } },
                },
            }),
            this.db.assignment.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async createAssignment(dto, teacherId) {
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
    async submitAssignment(assignmentId, studentId, dto) {
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
    async evaluateSubmission(submissionId, dto) {
        const data = await this.db.assignmentSubmission.update({
            where: { id: submissionId },
            data: { marksGiven: dto.marksGiven, feedback: dto.feedback, status: 'EVALUATED', evaluatedAt: new Date() },
        });
        return { data, message: 'Submission evaluated' };
    }
    async getHomework(query) {
        const where = {};
        if (query.subjectId)
            where.subjectId = query.subjectId;
        const [data, total] = await Promise.all([
            this.db.homework.findMany({ where, ...(0, pagination_dto_1.getPaginationArgs)(query), orderBy: { dueDate: 'asc' }, include: { subject: { select: { name: true } } } }),
            this.db.homework.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async createHomework(dto, teacherId) {
        const data = await this.db.homework.create({
            data: { title: dto.title, description: dto.description, subjectId: dto.subjectId, teacherId, dueDate: new Date(dto.dueDate), attachments: dto.attachments || [] },
        });
        return { data, message: 'Homework assigned' };
    }
    async getMaterials(subjectId) {
        const data = await this.db.studyMaterial.findMany({
            where: { ...(subjectId && { subjectId }), isPublished: true },
            include: { subject: { select: { name: true } } },
            orderBy: { createdAt: 'desc' },
        });
        return { data };
    }
    async uploadMaterial(dto, uploadedBy) {
        const data = await this.db.studyMaterial.create({
            data: { title: dto.title, description: dto.description, subjectId: dto.subjectId, type: dto.type, fileUrl: dto.fileUrl, fileSize: dto.fileSize, uploadedBy },
        });
        return { data, message: 'Material uploaded' };
    }
    async getQuizzes(subjectId) {
        const data = await this.db.quiz.findMany({
            where: { ...(subjectId && { subjectId }), isPublished: true },
            include: { _count: { select: { questions: true, attempts: true } } },
        });
        return { data };
    }
    async createQuiz(dto) {
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
    async submitQuiz(quizId, studentId, answers) {
        const quiz = await this.db.quiz.findUnique({ where: { id: quizId }, include: { questions: true } });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        let score = 0;
        for (const question of quiz.questions) {
            const answer = answers[question.id];
            const options = question.options;
            const correct = options.find((o) => o.isCorrect);
            if (correct && answer === correct.text)
                score += question.marks;
        }
        const data = await this.db.quizAttempt.upsert({
            where: { quizId_studentId: { quizId, studentId } },
            update: { answers, score, submittedAt: new Date() },
            create: { quizId, studentId, answers, score, submittedAt: new Date() },
        });
        return { data: { ...data, score }, message: `Quiz submitted. Score: ${score}` };
    }
    async getLiveClasses(teacherId) {
        const data = await this.db.liveClass.findMany({
            where: { ...(teacherId && { teacherId }) },
            include: { teacher: { select: { firstName: true, lastName: true } } },
            orderBy: { scheduledAt: 'desc' },
        });
        return { data };
    }
    async createLiveClass(dto, teacherId) {
        let meetingDetails = {};
        if (dto.platform === 'zoom') {
            meetingDetails = await this.generateZoomMeeting(dto.title, dto.scheduledAt, dto.duration);
        }
        else if (dto.platform === 'gmeet') {
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
    async startLiveClass(liveClassId) {
        const data = await this.db.liveClass.update({
            where: { id: liveClassId },
            data: { status: 'LIVE' },
        });
        return { data, message: 'Live class started' };
    }
    async endLiveClass(liveClassId, recordingUrl) {
        const data = await this.db.liveClass.update({
            where: { id: liveClassId },
            data: { status: 'COMPLETED', ...(recordingUrl && { recordingUrl }) },
        });
        return { data, message: 'Live class ended' };
    }
    async getRecordedClasses(teacherId) {
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
    async generateZoomMeeting(topic, startTime, duration) {
        const meetingId = Math.floor(Math.random() * 9000000000) + 1000000000;
        const password = Math.random().toString(36).substring(2, 8).toUpperCase();
        return {
            meetingId: String(meetingId),
            joinUrl: `https://zoom.us/j/${meetingId}?pwd=${password}`,
            hostUrl: `https://zoom.us/s/${meetingId}?zak=HOST_TOKEN`,
            password,
        };
    }
    generateGoogleMeetLink() {
        const meetCode = Math.random().toString(36).substring(2, 5) + '-' +
            Math.random().toString(36).substring(2, 5) + '-' +
            Math.random().toString(36).substring(2, 5);
        return { meetingId: meetCode, joinUrl: `https://meet.google.com/${meetCode}` };
    }
};
exports.LmsService = LmsService;
exports.LmsService = LmsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenant_prisma_service_1.TenantPrismaService])
], LmsService);
//# sourceMappingURL=lms.service.js.map