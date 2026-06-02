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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const central_prisma_service_1 = require("../../database/central-prisma.service");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const crypto = require("crypto");
let TokenService = class TokenService {
    constructor(jwtService, configService, centralPrisma, tenantPrisma) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.centralPrisma = centralPrisma;
        this.tenantPrisma = tenantPrisma;
    }
    async generatePlatformTokens(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            type: 'platform',
        };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = crypto.randomBytes(64).toString('hex');
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.centralPrisma.refreshToken.create({
            data: { token: refreshToken, platformUserId: user.id, expiresAt },
        });
        return { accessToken, refreshToken, expiresIn: 900 };
    }
    async generateSchoolTokens(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            phone: user.phone,
            role: user.role,
            type: 'school',
        };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = crypto.randomBytes(64).toString('hex');
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        const db = this.tenantPrisma.db;
        await db.userRefreshToken.create({
            data: { token: refreshToken, userId: user.id, expiresAt },
        });
        return { accessToken, refreshToken, expiresIn: 900 };
    }
    async refreshAccessToken(refreshToken) {
        const platformToken = await this.centralPrisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { platformUser: true },
        });
        if (platformToken && !platformToken.isRevoked && platformToken.expiresAt > new Date()) {
            const tokens = await this.generatePlatformTokens(platformToken.platformUser);
            await this.centralPrisma.refreshToken.update({
                where: { id: platformToken.id },
                data: { isRevoked: true },
            });
            return { data: tokens, message: 'Token refreshed' };
        }
        const db = this.tenantPrisma.db;
        const schoolToken = await db.userRefreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: true },
        });
        if (!schoolToken || schoolToken.isRevoked || schoolToken.expiresAt <= new Date()) {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        const tokens = await this.generateSchoolTokens(schoolToken.user);
        await db.userRefreshToken.update({
            where: { id: schoolToken.id },
            data: { isRevoked: true },
        });
        return { data: tokens, message: 'Token refreshed' };
    }
    async revokeToken(refreshToken) {
        try {
            await this.centralPrisma.refreshToken.update({
                where: { token: refreshToken },
                data: { isRevoked: true },
            });
        }
        catch {
            try {
                const db = this.tenantPrisma.db;
                await db.userRefreshToken.update({
                    where: { token: refreshToken },
                    data: { isRevoked: true },
                });
            }
            catch { }
        }
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        central_prisma_service_1.CentralPrismaService,
        tenant_prisma_service_1.TenantPrismaService])
], TokenService);
//# sourceMappingURL=token.service.js.map