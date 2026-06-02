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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcryptjs");
const central_prisma_service_1 = require("../../database/central-prisma.service");
const tenant_prisma_service_1 = require("../../database/tenant-prisma.service");
const token_service_1 = require("./token.service");
const otp_service_1 = require("./otp.service");
let AuthService = AuthService_1 = class AuthService {
    constructor(centralPrisma, tenantPrisma, jwtService, configService, tokenService, otpService) {
        this.centralPrisma = centralPrisma;
        this.tenantPrisma = tenantPrisma;
        this.jwtService = jwtService;
        this.configService = configService;
        this.tokenService = tokenService;
        this.otpService = otpService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async superAdminLogin(dto, ip) {
        const user = await this.centralPrisma.platformUser.findUnique({
            where: { email: dto.email },
        });
        if (!user || !user.isActive) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isValid = await bcrypt.compare(dto.password, user.password);
        if (!isValid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        await this.centralPrisma.platformUser.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
        const tokens = await this.tokenService.generatePlatformTokens(user);
        return {
            data: { user: this.sanitizePlatformUser(user), ...tokens },
            message: 'Login successful',
        };
    }
    async schoolLogin(dto) {
        const db = this.tenantPrisma.db;
        const user = await db.user.findFirst({
            where: {
                OR: [{ email: dto.identifier }, { phone: dto.identifier }],
                isActive: true,
            },
            include: {
                student: { select: { id: true, firstName: true, lastName: true, admissionNo: true } },
                teacher: { select: { id: true, firstName: true, lastName: true, employeeId: true } },
                parent: { select: { id: true, firstName: true, lastName: true } },
                staff: { select: { id: true, firstName: true, lastName: true, employeeId: true } },
            },
        });
        if (!user)
            throw new common_1.UnauthorizedException('Invalid credentials');
        if (!user.passwordHash)
            throw new common_1.UnauthorizedException('Please use OTP login');
        const isValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isValid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        await db.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
        const tokens = await this.tokenService.generateSchoolTokens(user);
        return {
            data: { user: this.sanitizeSchoolUser(user), ...tokens },
            message: 'Login successful',
        };
    }
    async sendOtp(dto) {
        const db = this.tenantPrisma.db;
        const user = await db.user.findFirst({
            where: { phone: dto.phone, isActive: true },
        });
        if (!user)
            throw new common_1.BadRequestException('Phone number not registered');
        const otp = this.otpService.generate();
        const expiry = new Date(Date.now() + 10 * 60 * 1000);
        await db.user.update({
            where: { id: user.id },
            data: { otpSecret: await bcrypt.hash(otp, 8), otpExpiry: expiry },
        });
        this.logger.log(`OTP for ${dto.phone}: ${otp}`);
        return { message: 'OTP sent successfully', expiresIn: 600 };
    }
    async verifyOtp(dto) {
        const db = this.tenantPrisma.db;
        const user = await db.user.findFirst({
            where: { phone: dto.phone, isActive: true },
        });
        if (!user || !user.otpSecret || !user.otpExpiry) {
            throw new common_1.UnauthorizedException('Invalid or expired OTP');
        }
        if (new Date() > user.otpExpiry) {
            throw new common_1.UnauthorizedException('OTP has expired');
        }
        const isValid = await bcrypt.compare(dto.otp, user.otpSecret);
        if (!isValid)
            throw new common_1.UnauthorizedException('Invalid OTP');
        await db.user.update({
            where: { id: user.id },
            data: { otpSecret: null, otpExpiry: null, isPhoneVerified: true, lastLoginAt: new Date() },
        });
        const tokens = await this.tokenService.generateSchoolTokens(user);
        return { data: { user: this.sanitizeSchoolUser(user), ...tokens }, message: 'Login successful' };
    }
    async refreshToken(dto) {
        return this.tokenService.refreshAccessToken(dto.refreshToken);
    }
    async changePassword(userId, dto) {
        const db = this.tenantPrisma.db;
        const user = await db.user.findUnique({ where: { id: userId } });
        if (!user || !user.passwordHash)
            throw new common_1.BadRequestException('User not found');
        const isValid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
        if (!isValid)
            throw new common_1.UnauthorizedException('Current password is incorrect');
        const newHash = await bcrypt.hash(dto.newPassword, 12);
        await db.user.update({ where: { id: userId }, data: { passwordHash: newHash } });
        return { message: 'Password changed successfully' };
    }
    async forgotPassword(dto) {
        return { message: 'Password reset instructions sent' };
    }
    async resetPassword(dto) {
        return { message: 'Password reset successful' };
    }
    async logout(userId, refreshToken) {
        await this.tokenService.revokeToken(refreshToken);
        return { message: 'Logged out successfully' };
    }
    async getProfile(userId) {
        const db = this.tenantPrisma.db;
        const user = await db.user.findUnique({
            where: { id: userId },
            include: {
                student: true,
                teacher: true,
                parent: true,
                staff: true,
            },
        });
        return { data: this.sanitizeSchoolUser(user) };
    }
    async googleLogin(googleUser) {
        const db = this.tenantPrisma.db;
        let user = await db.user.findFirst({ where: { email: googleUser.email } });
        if (!user) {
            user = await db.user.create({
                data: {
                    email: googleUser.email,
                    role: 'PARENT',
                    isEmailVerified: true,
                    profilePhoto: googleUser.photo,
                    lastLoginAt: new Date(),
                },
            });
        }
        else {
            await db.user.update({
                where: { id: user.id },
                data: { lastLoginAt: new Date(), profilePhoto: googleUser.photo || user.profilePhoto },
            });
        }
        const tokens = await this.tokenService.generateSchoolTokens(user);
        return { data: { user: this.sanitizeSchoolUser(user), ...tokens }, message: 'Google login successful' };
    }
    sanitizePlatformUser(user) {
        const { password, ...rest } = user;
        return rest;
    }
    sanitizeSchoolUser(user) {
        const { passwordHash, otpSecret, ...rest } = user;
        return rest;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [central_prisma_service_1.CentralPrismaService,
        tenant_prisma_service_1.TenantPrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        token_service_1.TokenService,
        otp_service_1.OtpService])
], AuthService);
//# sourceMappingURL=auth.service.js.map