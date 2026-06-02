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
var TenantPrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantPrismaService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const prisma_client_manager_service_1 = require("./prisma-client-manager.service");
let TenantPrismaService = TenantPrismaService_1 = class TenantPrismaService {
    constructor(request, manager) {
        this.request = request;
        this.manager = manager;
        this.logger = new common_1.Logger(TenantPrismaService_1.name);
    }
    get db() {
        const dbUrl = this.request.tenantDb;
        const slug = this.request.tenantSlug;
        if (!dbUrl || !slug) {
            throw new Error('Tenant context not set. Ensure TenantMiddleware runs first.');
        }
        return this.manager.getClient(dbUrl, slug);
    }
};
exports.TenantPrismaService = TenantPrismaService;
exports.TenantPrismaService = TenantPrismaService = TenantPrismaService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [Object, prisma_client_manager_service_1.PrismaClientManager])
], TenantPrismaService);
//# sourceMappingURL=tenant-prisma.service.js.map