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
var SuperAdminService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperAdminService = void 0;
const common_1 = require("@nestjs/common");
const central_prisma_service_1 = require("../../database/central-prisma.service");
const prisma_client_manager_service_1 = require("../../database/prisma-client-manager.service");
const config_1 = require("@nestjs/config");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const bcrypt = require("bcryptjs");
let SuperAdminService = SuperAdminService_1 = class SuperAdminService {
    constructor(centralPrisma, prismaManager, configService) {
        this.centralPrisma = centralPrisma;
        this.prismaManager = prismaManager;
        this.configService = configService;
        this.logger = new common_1.Logger(SuperAdminService_1.name);
    }
    async getDashboardStats() {
        const [totalSchools, activeSchools, trialSchools, suspendedSchools, expiredSchools,] = await Promise.all([
            this.centralPrisma.school.count(),
            this.centralPrisma.school.count({ where: { status: 'ACTIVE' } }),
            this.centralPrisma.school.count({ where: { status: 'TRIAL' } }),
            this.centralPrisma.school.count({ where: { status: 'SUSPENDED' } }),
            this.centralPrisma.school.count({ where: { status: 'EXPIRED' } }),
        ]);
        const revenueResult = await this.centralPrisma.payment.aggregate({
            _sum: { amount: true },
            where: { status: 'SUCCESS' },
        });
        const monthlyRevenue = await this.centralPrisma.payment.aggregate({
            _sum: { amount: true },
            where: {
                status: 'SUCCESS',
                paidAt: {
                    gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                },
            },
        });
        return {
            data: {
                schools: { total: totalSchools, active: activeSchools, trial: trialSchools, suspended: suspendedSchools, expired: expiredSchools },
                revenue: {
                    total: Number(revenueResult._sum.amount) || 0,
                    monthly: Number(monthlyRevenue._sum.amount) || 0,
                },
            },
        };
    }
    async getSchools(query) {
        const where = {};
        if (query.status)
            where.status = query.status;
        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { email: { contains: query.search, mode: 'insensitive' } },
                { slug: { contains: query.search, mode: 'insensitive' } },
            ];
        }
        const [data, total] = await Promise.all([
            this.centralPrisma.school.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                include: {
                    subscriptions: {
                        where: { status: 'ACTIVE' },
                        include: { plan: { select: { name: true, billingCycle: true } } },
                        take: 1,
                        orderBy: { createdAt: 'desc' },
                    },
                    reseller: { select: { name: true } },
                },
            }),
            this.centralPrisma.school.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async getSchool(id) {
        const school = await this.centralPrisma.school.findUnique({
            where: { id },
            include: {
                subscriptions: { include: { plan: true }, orderBy: { createdAt: 'desc' } },
                schoolSettings: true,
                reseller: true,
                usageMetrics: { orderBy: { metricDate: 'desc' }, take: 7 },
            },
        });
        if (!school)
            throw new common_1.NotFoundException('School not found');
        return { data: school };
    }
    async createSchool(dto) {
        const existingSlug = await this.centralPrisma.school.findUnique({ where: { slug: dto.slug } });
        if (existingSlug)
            throw new common_1.ConflictException(`Slug "${dto.slug}" already exists`);
        const existingEmail = await this.centralPrisma.school.findUnique({ where: { email: dto.email } });
        if (existingEmail)
            throw new common_1.ConflictException(`Email "${dto.email}" already registered`);
        const dbName = `school_${dto.slug.replace(/-/g, '_')}_db`;
        const school = await this.centralPrisma.school.create({
            data: {
                name: dto.name,
                slug: dto.slug,
                email: dto.email,
                phone: dto.phone,
                address: dto.address,
                city: dto.city,
                state: dto.state,
                country: dto.country || 'India',
                dbName,
                status: 'TRIAL',
                timezone: dto.timezone || 'Asia/Kolkata',
            },
        });
        await this.provisionSchoolDatabase(school.dbName);
        await this.createSchoolAdminUser(school, dto.adminEmail, dto.adminPassword);
        this.logger.log(`School created: ${school.slug} (DB: ${dbName})`);
        return { data: school, message: 'School created and provisioned successfully' };
    }
    async updateSchool(id, dto) {
        await this.getSchool(id);
        const school = await this.centralPrisma.school.update({ where: { id }, data: dto });
        return { data: school, message: 'School updated' };
    }
    async updateSchoolStatus(id, status) {
        const school = await this.centralPrisma.school.update({
            where: { id },
            data: { status: status },
        });
        return { data: school, message: `School ${status.toLowerCase()}` };
    }
    async deleteSchool(id) {
        const school = await this.getSchool(id);
        await this.centralPrisma.school.delete({ where: { id } });
        return { message: `School ${school.data.name} deleted` };
    }
    async getPlans() {
        const data = await this.centralPrisma.subscriptionPlan.findMany({
            where: { isActive: true },
            orderBy: [{ billingCycle: 'asc' }, { price: 'asc' }],
        });
        return { data };
    }
    async createPlan(dto) {
        const plan = await this.centralPrisma.subscriptionPlan.create({ data: dto });
        return { data: plan, message: 'Plan created' };
    }
    async getResellers(query) {
        const [data, total] = await Promise.all([
            this.centralPrisma.reseller.findMany({
                include: { _count: { select: { schools: true } } },
            }),
            this.centralPrisma.reseller.count(),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async getAuditLogs(query) {
        const [data, total] = await Promise.all([
            this.centralPrisma.auditLog.findMany({
                orderBy: { createdAt: 'desc' },
                include: { platformUser: { select: { name: true, email: true } } },
            }),
            this.centralPrisma.auditLog.count(),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async getRevenueReport(period) {
        const payments = await this.centralPrisma.payment.findMany({
            where: { status: 'SUCCESS' },
            orderBy: { paidAt: 'desc' },
            take: 100,
            include: {
                subscription: { include: { school: { select: { name: true } } } },
            },
        });
        return { data: payments };
    }
    async getSystemSettings(group) {
        const where = {};
        if (group)
            where.group = group;
        const settings = await this.centralPrisma.systemSetting.findMany({
            where,
            orderBy: [{ group: 'asc' }, { key: 'asc' }],
        });
        const masked = settings.map((s) => ({
            ...s,
            value: s.isSecret ? '••••••••' : s.value,
        }));
        return { data: masked };
    }
    async upsertSystemSetting(dto) {
        const setting = await this.centralPrisma.systemSetting.upsert({
            where: { key: dto.key },
            update: { value: dto.value, group: dto.group || 'general' },
            create: { key: dto.key, value: dto.value, group: dto.group || 'general', isSecret: dto.isSecret || false },
        });
        return { data: { ...setting, value: setting.isSecret ? '••••••••' : setting.value }, message: 'Setting saved' };
    }
    async bulkUpsertSettings(settings) {
        const results = [];
        for (const s of settings) {
            results.push(await this.upsertSystemSetting(s));
        }
        return { data: results, message: `${results.length} settings saved` };
    }
    async deleteSystemSetting(key) {
        await this.centralPrisma.systemSetting.delete({ where: { key } });
        return { message: 'Setting deleted' };
    }
    async getSchoolBranding(schoolId) {
        const school = await this.centralPrisma.school.findUnique({
            where: { id: schoolId },
            select: { id: true, name: true, slug: true, logo: true, favicon: true, primaryColor: true, secondaryColor: true, customDomain: true, website: true },
        });
        if (!school)
            throw new Error('School not found');
        return { data: school };
    }
    async updateSchoolBranding(schoolId, dto) {
        const school = await this.centralPrisma.school.update({
            where: { id: schoolId },
            data: dto,
        });
        return { data: school, message: 'Branding updated successfully' };
    }
    async getCustomDomains() {
        const schools = await this.centralPrisma.school.findMany({
            where: { customDomain: { not: null }, status: 'ACTIVE' },
            select: { slug: true, customDomain: true, name: true },
        });
        return { data: schools };
    }
    async getPlatformNotifications(query) {
        const notifications = await this.centralPrisma.auditLog.findMany({
            where: { action: { startsWith: 'NOTIFY' } },
            orderBy: { createdAt: 'desc' },
        });
        return { data: notifications, meta: (0, pagination_dto_1.buildPaginationMeta)(0, query) };
    }
    async sendPlatformNotification(dto) {
        const schools = await this.centralPrisma.school.findMany({
            where: { status: dto.targetStatus || 'ACTIVE' },
            select: { id: true, name: true, email: true },
        });
        await this.centralPrisma.auditLog.create({
            data: {
                action: 'NOTIFY_SCHOOLS',
                entity: 'School',
                newValues: { subject: dto.subject, count: schools.length, targetStatus: dto.targetStatus },
            },
        });
        return { data: { sent: schools.length, subject: dto.subject }, message: `Notification queued for ${schools.length} schools` };
    }
    async getPlatformUsers(query) {
        const [data, total] = await Promise.all([
            this.centralPrisma.platformUser.findMany({
                orderBy: { createdAt: 'desc' },
                select: { id: true, name: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true },
            }),
            this.centralPrisma.platformUser.count(),
        ]);
        return { data, meta: (0, pagination_dto_1.buildPaginationMeta)(total, query) };
    }
    async createPlatformUser(dto) {
        const passwordHash = await bcrypt.hash(dto.password, 12);
        const user = await this.centralPrisma.platformUser.create({
            data: { name: dto.name, email: dto.email, password: passwordHash, role: dto.role },
            select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
        });
        return { data: user, message: 'Platform user created' };
    }
    async updatePlatformUserStatus(id, isActive) {
        const user = await this.centralPrisma.platformUser.update({ where: { id }, data: { isActive } });
        return { data: user, message: `User ${isActive ? 'activated' : 'deactivated'}` };
    }
    async getResourceMetrics(schoolId) {
        const where = {};
        if (schoolId)
            where.schoolId = schoolId;
        const metrics = await this.centralPrisma.usageMetric.findMany({
            where,
            orderBy: { metricDate: 'desc' },
            take: 30,
            include: { school: { select: { name: true, slug: true } } },
        });
        const aggregated = {
            totalStudents: metrics.reduce((s, m) => s + m.students, 0),
            totalTeachers: metrics.reduce((s, m) => s + m.teachers, 0),
            totalStorageUsed: metrics.reduce((s, m) => s + Number(m.storageUsed), 0),
            totalApiCalls: metrics.reduce((s, m) => s + m.apiCalls, 0),
        };
        return { data: { metrics, aggregated } };
    }
    async updateUsageMetrics(schoolId, data) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const metric = await this.centralPrisma.usageMetric.upsert({
            where: { schoolId_metricDate: { schoolId, metricDate: today } },
            update: data,
            create: { schoolId, metricDate: today, ...data },
        });
        return { data: metric };
    }
    async provisionSchoolDatabase(dbName) {
        this.logger.log(`Provisioning database: ${dbName}`);
    }
    async createSchoolAdminUser(school, email, password) {
        const dbHost = this.configService.get('DB_HOST', 'localhost');
        const dbPort = this.configService.get('DB_PORT', '5432');
        const dbUser = this.configService.get('DB_USER', 'postgres');
        const dbPass = this.configService.get('DB_PASSWORD', '');
        const dbUrl = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${school.dbName}`;
        const client = this.prismaManager.getClient(dbUrl, school.slug);
        const passwordHash = await bcrypt.hash(password || 'SchoolAdmin@123', 12);
        await client.user.create({
            data: {
                email,
                passwordHash,
                role: 'SCHOOL_ADMIN',
                isActive: true,
            },
        });
    }
};
exports.SuperAdminService = SuperAdminService;
exports.SuperAdminService = SuperAdminService = SuperAdminService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [central_prisma_service_1.CentralPrismaService,
        prisma_client_manager_service_1.PrismaClientManager,
        config_1.ConfigService])
], SuperAdminService);
//# sourceMappingURL=super-admin.service.js.map