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
var TenantMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantMiddleware = void 0;
const common_1 = require("@nestjs/common");
const central_prisma_service_1 = require("../../database/central-prisma.service");
const config_1 = require("@nestjs/config");
const tenantCache = new Map();
const PUBLIC_ROUTES = [
    '/api/v1/auth/super-admin',
    '/api/v1/super-admin',
    '/api/v1/health',
    '/api/docs',
    '/api/v1/tenant',
];
let TenantMiddleware = TenantMiddleware_1 = class TenantMiddleware {
    constructor(centralPrisma, configService) {
        this.centralPrisma = centralPrisma;
        this.configService = configService;
        this.logger = new common_1.Logger(TenantMiddleware_1.name);
    }
    async use(req, res, next) {
        const isPublicRoute = PUBLIC_ROUTES.some((r) => req.path.startsWith(r));
        if (isPublicRoute)
            return next();
        const slug = this.extractTenantSlug(req);
        if (!slug)
            return next();
        try {
            const tenant = await this.resolveTenant(slug);
            if (!tenant) {
                return res.status(404).json({ message: 'School not found', error: 'TENANT_NOT_FOUND' });
            }
            if (tenant.status === 'SUSPENDED') {
                return res.status(403).json({ message: 'School account is suspended', error: 'TENANT_SUSPENDED' });
            }
            if (tenant.status === 'EXPIRED') {
                return res.status(403).json({ message: 'School subscription has expired', error: 'TENANT_EXPIRED' });
            }
            const dbHost = this.configService.get('DB_HOST', 'localhost');
            const dbPort = this.configService.get('DB_PORT', '5432');
            const dbUser = this.configService.get('DB_USER', 'postgres');
            const dbPass = this.configService.get('DB_PASSWORD', '');
            req.tenantId = tenant.id;
            req.tenantSlug = tenant.slug;
            req.tenantDb = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${tenant.dbName}?schema=public`;
            next();
        }
        catch (err) {
            this.logger.error(`Tenant resolution failed for slug: ${slug}`, err);
            next(err);
        }
    }
    extractTenantSlug(req) {
        const headerTenant = req.headers['x-tenant-id'];
        if (headerTenant)
            return headerTenant;
        const authHeader = req.headers.authorization;
        if (authHeader?.startsWith('Bearer ')) {
            try {
                const token = authHeader.split(' ')[1];
                const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                if (payload.tenantSlug)
                    return payload.tenantSlug;
            }
            catch { }
        }
        const host = req.hostname;
        const parts = host.split('.');
        if (parts.length >= 3)
            return parts[0];
        return null;
    }
    async resolveTenant(slug) {
        const cacheKey = `tenant:${slug}`;
        const now = Date.now();
        const cached = tenantCache.get(cacheKey);
        if (cached && cached.expiresAt > now) {
            return cached.data;
        }
        const school = await this.centralPrisma.school.findUnique({
            where: { slug },
            select: { id: true, slug: true, dbName: true, status: true },
        });
        if (school) {
            tenantCache.set(cacheKey, { data: school, expiresAt: now + 10 * 60 * 1000 });
        }
        return school;
    }
};
exports.TenantMiddleware = TenantMiddleware;
exports.TenantMiddleware = TenantMiddleware = TenantMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [central_prisma_service_1.CentralPrismaService,
        config_1.ConfigService])
], TenantMiddleware);
//# sourceMappingURL=tenant.middleware.js.map