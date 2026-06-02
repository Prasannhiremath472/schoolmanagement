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
exports.AccountingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const accounting_service_1 = require("./accounting.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let AccountingController = class AccountingController {
    constructor(accountingService) {
        this.accountingService = accountingService;
    }
    getAccounts() { return this.accountingService.getAccountHeads(); }
    createAccount(dto) { return this.accountingService.createAccountHead(dto); }
    getTransactions(q, fromDate, toDate, type) {
        return this.accountingService.getTransactions({ ...q, fromDate, toDate, type });
    }
    createTransaction(dto) { return this.accountingService.createTransaction(dto); }
    createJournal(dto, userId) {
        return this.accountingService.createJournalEntry({ ...dto, createdBy: userId });
    }
    getCashBook(fromDate, toDate) {
        return this.accountingService.getCashBook(fromDate, toDate);
    }
    getBankBook(fromDate, toDate, bankAccountId) {
        return this.accountingService.getBankBook(fromDate, toDate, bankAccountId);
    }
    getBalanceSheet(fromDate, toDate) {
        return this.accountingService.getBalanceSheet(fromDate, toDate);
    }
    getProfitLoss(fromDate, toDate) {
        return this.accountingService.getProfitAndLoss(fromDate, toDate);
    }
    getGstReport(fromDate, toDate) {
        return this.accountingService.getGstReport(fromDate, toDate);
    }
    getLedger(id, fromDate, toDate) {
        return this.accountingService.getLedger(id, fromDate, toDate);
    }
    getExpenses(q, fromDate, toDate) {
        return this.accountingService.getExpenses({ ...q, fromDate, toDate });
    }
    createExpense(dto, userId) {
        return this.accountingService.createExpense(dto, userId);
    }
};
exports.AccountingController = AccountingController;
__decorate([
    (0, common_1.Get)('accounts'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get account heads (chart of accounts)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "getAccounts", null);
__decorate([
    (0, common_1.Post)('accounts'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN'),
    (0, swagger_1.ApiOperation)({ summary: 'Create account head' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "createAccount", null);
__decorate([
    (0, common_1.Get)('transactions'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all transactions' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __param(3, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String, String, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "getTransactions", null);
__decorate([
    (0, common_1.Post)('transactions'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Record a transaction' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "createTransaction", null);
__decorate([
    (0, common_1.Post)('journal'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Create double-entry journal entry' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "createJournal", null);
__decorate([
    (0, common_1.Get)('cash-book'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get cash book' }),
    (0, swagger_1.ApiQuery)({ name: 'fromDate', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'toDate', required: true }),
    __param(0, (0, common_1.Query)('fromDate')),
    __param(1, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "getCashBook", null);
__decorate([
    (0, common_1.Get)('bank-book'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get bank book' }),
    (0, swagger_1.ApiQuery)({ name: 'fromDate', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'toDate', required: true }),
    __param(0, (0, common_1.Query)('fromDate')),
    __param(1, (0, common_1.Query)('toDate')),
    __param(2, (0, common_1.Query)('bankAccountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "getBankBook", null);
__decorate([
    (0, common_1.Get)('balance-sheet'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get balance sheet' }),
    (0, swagger_1.ApiQuery)({ name: 'fromDate', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'toDate', required: true }),
    __param(0, (0, common_1.Query)('fromDate')),
    __param(1, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "getBalanceSheet", null);
__decorate([
    (0, common_1.Get)('profit-loss'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Profit & Loss statement' }),
    (0, swagger_1.ApiQuery)({ name: 'fromDate', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'toDate', required: true }),
    __param(0, (0, common_1.Query)('fromDate')),
    __param(1, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "getProfitLoss", null);
__decorate([
    (0, common_1.Get)('gst-report'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get GST report' }),
    (0, swagger_1.ApiQuery)({ name: 'fromDate', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'toDate', required: true }),
    __param(0, (0, common_1.Query)('fromDate')),
    __param(1, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "getGstReport", null);
__decorate([
    (0, common_1.Get)('ledger/:accountHeadId'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get account ledger' }),
    (0, swagger_1.ApiQuery)({ name: 'fromDate', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'toDate', required: true }),
    __param(0, (0, common_1.Param)('accountHeadId')),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "getLedger", null);
__decorate([
    (0, common_1.Get)('expenses'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get expenses' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('fromDate')),
    __param(2, (0, common_1.Query)('toDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "getExpenses", null);
__decorate([
    (0, common_1.Post)('expenses'),
    (0, roles_decorator_1.Roles)('SCHOOL_ADMIN', 'ACCOUNTANT'),
    (0, swagger_1.ApiOperation)({ summary: 'Record expense' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AccountingController.prototype, "createExpense", null);
exports.AccountingController = AccountingController = __decorate([
    (0, swagger_1.ApiTags)('Accounting'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)({ path: 'accounting', version: '1' }),
    __metadata("design:paramtypes", [accounting_service_1.AccountingService])
], AccountingController);
//# sourceMappingURL=accounting.controller.js.map