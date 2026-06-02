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
exports.ResellerService = void 0;
const common_1 = require("@nestjs/common");
const central_prisma_service_1 = require("../../database/central-prisma.service");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
let ResellerService = class ResellerService {
    constructor(centralPrisma) {
        this.centralPrisma = centralPrisma;
    }
    async findAll(query) {
        const where = {};
        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { email: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.centralPrisma.reseller.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                include: {
                    _count: { select: { schools: true, commissions: true } },
                },
            }),
            this.centralPrisma.reseller.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async findOne(id) {
        const reseller = await this.centralPrisma.reseller.findUnique({
            where: { id },
            include: {
                schools: { select: { id: true, name: true, slug: true, status: true } },
                commissions: { orderBy: { createdAt: 'desc' }, take: 20 },
            },
        });
        if (!reseller)
            throw new common_1.NotFoundException('Reseller not found');
        return { data: reseller };
    }
    async create(dto) {
        const existing = await this.centralPrisma.reseller.findUnique({ where: { email: dto.email } });
        if (existing)
            throw new common_1.ConflictException('Reseller with this email already exists');
        const data = await this.centralPrisma.reseller.create({
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                company: dto.company,
                commissionPct: dto.commissionPct ?? 10,
            },
        });
        return { data, message: 'Reseller created successfully' };
    }
    async update(id, dto) {
        await this.findOne(id);
        const data = await this.centralPrisma.reseller.update({ where: { id }, data: dto });
        return { data, message: 'Reseller updated' };
    }
    async delete(id) {
        await this.findOne(id);
        await this.centralPrisma.school.updateMany({ where: { resellerId: id }, data: { resellerId: null } });
        await this.centralPrisma.reseller.delete({ where: { id } });
        return { message: 'Reseller deleted' };
    }
    async getCommissions(resellerId, query) {
        const [data, total] = await Promise.all([
            this.centralPrisma.commission.findMany({
                where: { resellerId },
                orderBy: { createdAt: 'desc' },
                include: { school: { select: { name: true, slug: true } } },
            }),
            this.centralPrisma.commission.count({ where: { resellerId } }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async getRevenueStats(resellerId) {
        const [totalCommission, pendingCommission, paidCommission] = await Promise.all([
            this.centralPrisma.commission.aggregate({ _sum: { amount: true }, where: { resellerId } }),
            this.centralPrisma.commission.aggregate({ _sum: { amount: true }, where: { resellerId, status: 'PENDING' } }),
            this.centralPrisma.commission.aggregate({ _sum: { amount: true }, where: { resellerId, status: 'PAID' } }),
        ]);
        const schoolCount = await this.centralPrisma.school.count({ where: { resellerId } });
        return {
            data: {
                totalCommission: Number(totalCommission._sum.amount) || 0,
                pendingCommission: Number(pendingCommission._sum.amount) || 0,
                paidCommission: Number(paidCommission._sum.amount) || 0,
                schoolCount,
            },
        };
    }
    async markCommissionPaid(commissionId) {
        const commission = await this.centralPrisma.commission.update({
            where: { id: commissionId },
            data: { status: 'PAID', paidAt: new Date() },
        });
        return { data: commission, message: 'Commission marked as paid' };
    }
    async assignSchool(resellerId, schoolId) {
        await this.findOne(resellerId);
        const school = await this.centralPrisma.school.update({
            where: { id: schoolId },
            data: { resellerId },
        });
        return { data: school, message: 'School assigned to reseller' };
    }
    async calculateCommission(subscriptionAmount, resellerId) {
        const reseller = await this.centralPrisma.reseller.findUnique({ where: { id: resellerId } });
        if (!reseller)
            return 0;
        return (subscriptionAmount * Number(reseller.commissionPct)) / 100;
    }
};
exports.ResellerService = ResellerService;
exports.ResellerService = ResellerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [central_prisma_service_1.CentralPrismaService])
], ResellerService);
//# sourceMappingURL=reseller.service.js.map