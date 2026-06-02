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
exports.LibraryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const library_service_1 = require("./library.service");
const library_qr_service_1 = require("./library-qr.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let LibraryController = class LibraryController {
    constructor(libraryService, libraryQrService) {
        this.libraryService = libraryService;
        this.libraryQrService = libraryQrService;
    }
    getCategories() { return this.libraryService.getCategories(); }
    getBooks(query, categoryId) { return this.libraryService.getBooks({ ...query, categoryId }); }
    createBook(dto) { return this.libraryService.createBook(dto); }
    issueBook(dto) { return this.libraryService.issueBook(dto); }
    returnBook(id) { return this.libraryService.returnBook(id); }
    issueCard(id) { return this.libraryService.issueCard(id); }
    getActiveIssues(query) { return this.libraryService.getActiveIssues(query); }
    getBookQR(id) { return this.libraryQrService.generateBookQR(id); }
    getCardQR(id) { return this.libraryQrService.generateLibraryCardQR(id); }
    quickIssue(dto) {
        return this.libraryQrService.quickIssueByQR(dto.bookQrPayload, dto.cardQrPayload, dto.dueDays);
    }
    quickReturn(dto) {
        return this.libraryQrService.quickReturnByQR(dto.bookQrPayload, dto.libraryCardId);
    }
};
exports.LibraryController = LibraryController;
__decorate([
    (0, common_1.Get)('categories'),
    (0, swagger_1.ApiOperation)({ summary: 'Get book categories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('books'),
    (0, swagger_1.ApiOperation)({ summary: 'Search books' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "getBooks", null);
__decorate([
    (0, common_1.Post)('books'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'LIBRARIAN'),
    (0, swagger_1.ApiOperation)({ summary: 'Add book' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "createBook", null);
__decorate([
    (0, common_1.Post)('issue'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'LIBRARIAN'),
    (0, swagger_1.ApiOperation)({ summary: 'Issue book to student' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "issueBook", null);
__decorate([
    (0, common_1.Post)('return/:issueId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'LIBRARIAN'),
    (0, swagger_1.ApiOperation)({ summary: 'Return book' }),
    __param(0, (0, common_1.Param)('issueId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "returnBook", null);
__decorate([
    (0, common_1.Post)('cards/:studentId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'LIBRARIAN'),
    (0, swagger_1.ApiOperation)({ summary: 'Issue library card' }),
    __param(0, (0, common_1.Param)('studentId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "issueCard", null);
__decorate([
    (0, common_1.Get)('active-issues'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'LIBRARIAN'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active issues' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "getActiveIssues", null);
__decorate([
    (0, common_1.Get)('qr/book/:bookId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'LIBRARIAN'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate QR code for a book' }),
    __param(0, (0, common_1.Param)('bookId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "getBookQR", null);
__decorate([
    (0, common_1.Get)('qr/card/:cardId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'LIBRARIAN'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate QR code for library card' }),
    __param(0, (0, common_1.Param)('cardId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "getCardQR", null);
__decorate([
    (0, common_1.Post)('qr/issue'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'LIBRARIAN'),
    (0, swagger_1.ApiOperation)({ summary: 'Quick issue book via QR scan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "quickIssue", null);
__decorate([
    (0, common_1.Post)('qr/return'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'LIBRARIAN'),
    (0, swagger_1.ApiOperation)({ summary: 'Quick return book via QR scan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LibraryController.prototype, "quickReturn", null);
exports.LibraryController = LibraryController = __decorate([
    (0, swagger_1.ApiTags)('Library'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)({ path: 'library', version: '1' }),
    __metadata("design:paramtypes", [library_service_1.LibraryService,
        library_qr_service_1.LibraryQrService])
], LibraryController);
//# sourceMappingURL=library.controller.js.map