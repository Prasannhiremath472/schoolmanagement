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
exports.ResellerPortalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const central_prisma_service_1 = require("../../database/central-prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let ResellerPortalController = class ResellerPortalController {
    constructor(centralPrisma) {
        this.centralPrisma = centralPrisma;
    }
    async getMyProfile(user) {
        const reseller = await this.centralPrisma.reseller.findFirst({
            where: { email: user.email },
            include: { _count: { select: { schools: true, commissions: true } } },
        });
        return { data: reseller };
    }
    async getMySchools(user, query) {
        const reseller = await this.centralPrisma.reseller.findFirst({ where: { email: user.email } });
        if (!reseller)
            return { data: [], meta: (0, pagination_dto_1.buildPaginationMeta)(0, query) };
        const where = { resellerId: reseller.id };
        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { slug: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.centralPrisma.school.findMany({
                where,
                skip: (query.page ?? 1 - 1) * (query.limit ?? 20),
                take: query.limit ?? 20,
                orderBy: { createdAt: 'desc' },
                include: {
                    subscriptions: {
                        where: { status: 'ACTIVE' },
                        include: { plan: { select: { name: true, price: true, billingCycle: true } } },
                        take: 1,
                        orderBy: { createdAt: 'desc' },
                    },
                },
            }),
            this.centralPrisma.school.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async getMyCommissions(user, query) {
        const reseller = await this.centralPrisma.reseller.findFirst({ where: { email: user.email } });
        if (!reseller)
            return { data: [], meta: (0, pagination_dto_1.buildPaginationMeta)(0, query) };
        const [data, total] = await Promise.all([
            this.centralPrisma.commission.findMany({
                where: { resellerId: reseller.id },
                skip: ((query.page ?? 1) - 1) * (query.limit ?? 20),
                take: query.limit ?? 20,
                orderBy: { createdAt: 'desc' },
                include: { school: { select: { name: true, slug: true, status: true } } },
            }),
            this.centralPrisma.commission.count({ where: { resellerId: reseller.id } }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async getMyStats(user) {
        const reseller = await this.centralPrisma.reseller.findFirst({
            where: { email: user.email },
            include: { _count: { select: { schools: true } } },
        });
        if (!reseller)
            return { data: null };
        const [totalCommission, pendingCommission, paidCommission] = await Promise.all([
            this.centralPrisma.commission.aggregate({ _sum: { amount: true }, where: { resellerId: reseller.id } }),
            this.centralPrisma.commission.aggregate({ _sum: { amount: true }, where: { resellerId: reseller.id, status: 'PENDING' } }),
            this.centralPrisma.commission.aggregate({ _sum: { amount: true }, where: { resellerId: reseller.id, status: 'PAID' } }),
        ]);
        const activeSchools = await this.centralPrisma.school.count({
            where: { resellerId: reseller.id, status: 'ACTIVE' },
        });
        const trialSchools = await this.centralPrisma.school.count({
            where: { resellerId: reseller.id, status: 'TRIAL' },
        });
        return {
            data: {
                reseller: {
                    name: reseller.name,
                    email: reseller.email,
                    commissionPct: Number(reseller.commissionPct),
                },
                totalSchools: reseller._count.schools,
                activeSchools,
                trialSchools,
                totalCommission: Number(totalCommission._sum.amount) || 0,
                pendingCommission: Number(pendingCommission._sum.amount) || 0,
                paidCommission: Number(paidCommission._sum.amount) || 0,
                projectedMonthly: activeSchools * 3000,
            },
        };
    }
};
exports.ResellerPortalController = ResellerPortalController;
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get my reseller profile' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResellerPortalController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Get)('schools'),
    (0, swagger_1.ApiOperation)({ summary: 'Get my schools' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ResellerPortalController.prototype, "getMySchools", null);
__decorate([
    (0, common_1.Get)('commissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get my commissions' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ResellerPortalController.prototype, "getMyCommissions", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get my earnings stats' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResellerPortalController.prototype, "getMyStats", null);
exports.ResellerPortalController = ResellerPortalController = __decorate([
    (0, swagger_1.ApiTags)('Reseller Portal'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('RESELLER', 'SUPER_ADMIN', 'ADMIN'),
    (0, common_1.Controller)({ path: 'reseller-portal', version: '1' }),
    __metadata("design:paramtypes", [central_prisma_service_1.CentralPrismaService])
], ResellerPortalController);
//# sourceMappingURL=reseller-portal.controller.js.map