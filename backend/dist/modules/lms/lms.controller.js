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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LmsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lms_service_1 = require("./lms.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let LmsController = class LmsController {
    constructor(lmsService) {
        this.lmsService = lmsService;
    }
    getAssignments(query, subjectId) {
        return this.lmsService.getAssignments({ ...query, subjectId });
    }
    createAssignment(dto, teacherId) {
        return this.lmsService.createAssignment(dto, teacherId);
    }
    submitAssignment(id, user, dto) {
        return this.lmsService.submitAssignment(id, user.studentId, dto);
    }
    evaluate(id, dto) {
        return this.lmsService.evaluateSubmission(id, dto);
    }
    getHomework(query, subjectId) {
        return this.lmsService.getHomework({ ...query, subjectId });
    }
    createHomework(dto, teacherId) {
        return this.lmsService.createHomework(dto, teacherId);
    }
    getMaterials(subjectId) { return this.lmsService.getMaterials(subjectId); }
    uploadMaterial(dto, userId) { return this.lmsService.uploadMaterial(dto, userId); }
    getQuizzes(subjectId) { return this.lmsService.getQuizzes(subjectId); }
    createQuiz(dto) { return this.lmsService.createQuiz(dto); }
    submitQuiz(id, user, answers) {
        return this.lmsService.submitQuiz(id, user.id, answers);
    }
    getLiveClasses(teacherId) { return this.lmsService.getLiveClasses(teacherId); }
    createLiveClass(dto, teacherId) { return this.lmsService.createLiveClass(dto, teacherId); }
    startLiveClass(id) { return this.lmsService.startLiveClass(id); }
    endLiveClass(id, url) { return this.lmsService.endLiveClass(id, url); }
    getRecorded(teacherId) { return this.lmsService.getRecordedClasses(teacherId); }
};
exports.LmsController = LmsController;
__decorate([
    (0, common_1.Get)('assignments'),
    (0, swagger_1.ApiOperation)({ summary: 'Get assignments' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "getAssignments", null);
__decorate([
    (0, common_1.Post)('assignments'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'TEACHER'),
    (0, swagger_1.ApiOperation)({ summary: 'Create assignment' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "createAssignment", null);
__decorate([
    (0, common_1.Post)('assignments/:id/submit'),
    (0, roles_decorator_1.Roles)('STUDENT'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit assignment' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "submitAssignment", null);
__decorate([
    (0, common_1.Patch)('submissions/:id/evaluate'),
    (0, roles_decorator_1.Roles)('TEACHER', 'SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Evaluate submission' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "evaluate", null);
__decorate([
    (0, common_1.Get)('homework'),
    (0, swagger_1.ApiOperation)({ summary: 'Get homework list' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "getHomework", null);
__decorate([
    (0, common_1.Post)('homework'),
    (0, roles_decorator_1.Roles)('TEACHER', 'SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign homework' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "createHomework", null);
__decorate([
    (0, common_1.Get)('materials'),
    (0, swagger_1.ApiOperation)({ summary: 'Get study materials' }),
    __param(0, (0, common_1.Query)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "getMaterials", null);
__decorate([
    (0, common_1.Post)('materials'),
    (0, roles_decorator_1.Roles)('TEACHER', 'SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload study material' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "uploadMaterial", null);
__decorate([
    (0, common_1.Get)('quizzes'),
    (0, swagger_1.ApiOperation)({ summary: 'Get quizzes' }),
    __param(0, (0, common_1.Query)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "getQuizzes", null);
__decorate([
    (0, common_1.Post)('quizzes'),
    (0, roles_decorator_1.Roles)('TEACHER', 'SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create quiz' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "createQuiz", null);
__decorate([
    (0, common_1.Post)('quizzes/:id/submit'),
    (0, roles_decorator_1.Roles)('STUDENT'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit quiz answers' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)('answers')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "submitQuiz", null);
__decorate([
    (0, common_1.Get)('live-classes'),
    (0, swagger_1.ApiOperation)({ summary: 'Get live classes' }),
    __param(0, (0, common_1.Query)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "getLiveClasses", null);
__decorate([
    (0, common_1.Post)('live-classes'),
    (0, roles_decorator_1.Roles)('TEACHER', 'SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Schedule live class (auto-creates Zoom/Meet link)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "createLiveClass", null);
__decorate([
    (0, common_1.Patch)('live-classes/:id/start'),
    (0, roles_decorator_1.Roles)('TEACHER', 'SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Start live class' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "startLiveClass", null);
__decorate([
    (0, common_1.Patch)('live-classes/:id/end'),
    (0, roles_decorator_1.Roles)('TEACHER', 'SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'End live class' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)('recordingUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "endLiveClass", null);
__decorate([
    (0, common_1.Get)('recorded-classes'),
    (0, swagger_1.ApiOperation)({ summary: 'Get recorded/completed classes' }),
    __param(0, (0, common_1.Query)('teacherId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LmsController.prototype, "getRecorded", null);
exports.LmsController = LmsController = __decorate([
    (0, swagger_1.ApiTags)('LMS'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)({ path: 'lms', version: '1' }),
    __metadata("design:paramtypes", [lms_service_1.LmsService])
], LmsController);
//# sourceMappingURL=lms.controller.js.map