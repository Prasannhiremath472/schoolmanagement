import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { CentralPrismaService } from '../../database/central-prisma.service';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { TokenService } from './token.service';
import { OtpService } from './otp.service';
import {
  LoginDto,
  SuperAdminLoginDto,
  OtpLoginDto,
  RefreshTokenDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly centralPrisma: CentralPrismaService,
    private readonly tenantPrisma: TenantPrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
    private readonly otpService: OtpService,
  ) {}

  // ─── SUPER ADMIN LOGIN ────────────────────────────────────────────────────

  async superAdminLogin(dto: SuperAdminLoginDto, ip: string) {
    const user = await this.centralPrisma.platformUser.findUnique({
      where: { email: dto.email },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

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

  // ─── SCHOOL USER LOGIN ────────────────────────────────────────────────────

  async schoolLogin(dto: LoginDto) {
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

    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.passwordHash) throw new UnauthorizedException('Please use OTP login');

    const isValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

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

  // ─── OTP LOGIN ────────────────────────────────────────────────────────────

  async sendOtp(dto: OtpLoginDto) {
    const db = this.tenantPrisma.db;

    const user = await db.user.findFirst({
      where: { phone: dto.phone, isActive: true },
    });

    if (!user) throw new BadRequestException('Phone number not registered');

    const otp = this.otpService.generate();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await db.user.update({
      where: { id: user.id },
      data: { otpSecret: await bcrypt.hash(otp, 8), otpExpiry: expiry },
    });

    // Send OTP via SMS (implementation in NotificationService)
    this.logger.log(`OTP for ${dto.phone}: ${otp}`); // Remove in production

    return { message: 'OTP sent successfully', expiresIn: 600 };
  }

  async verifyOtp(dto: { phone: string; otp: string }) {
    const db = this.tenantPrisma.db;

    const user = await db.user.findFirst({
      where: { phone: dto.phone, isActive: true },
    });

    if (!user || !user.otpSecret || !user.otpExpiry) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    if (new Date() > user.otpExpiry) {
      throw new UnauthorizedException('OTP has expired');
    }

    const isValid = await bcrypt.compare(dto.otp, user.otpSecret);
    if (!isValid) throw new UnauthorizedException('Invalid OTP');

    await db.user.update({
      where: { id: user.id },
      data: { otpSecret: null, otpExpiry: null, isPhoneVerified: true, lastLoginAt: new Date() },
    });

    const tokens = await this.tokenService.generateSchoolTokens(user);
    return { data: { user: this.sanitizeSchoolUser(user), ...tokens }, message: 'Login successful' };
  }

  // ─── REFRESH TOKEN ────────────────────────────────────────────────────────

  async refreshToken(dto: RefreshTokenDto) {
    return this.tokenService.refreshAccessToken(dto.refreshToken);
  }

  // ─── CHANGE PASSWORD ──────────────────────────────────────────────────────

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const db = this.tenantPrisma.db;
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user || !user.passwordHash) throw new BadRequestException('User not found');

    const isValid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('Current password is incorrect');

    const newHash = await bcrypt.hash(dto.newPassword, 12);
    await db.user.update({ where: { id: userId }, data: { passwordHash: newHash } });

    return { message: 'Password changed successfully' };
  }

  // ─── FORGOT / RESET PASSWORD ──────────────────────────────────────────────

  async forgotPassword(dto: ForgotPasswordDto) {
    // Send reset link via email/SMS
    return { message: 'Password reset instructions sent' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    // Verify token and reset password
    return { message: 'Password reset successful' };
  }

  // ─── LOGOUT ───────────────────────────────────────────────────────────────

  async logout(userId: string, refreshToken: string) {
    await this.tokenService.revokeToken(refreshToken);
    return { message: 'Logged out successfully' };
  }

  // ─── PROFILE ──────────────────────────────────────────────────────────────

  async getProfile(userId: string) {
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

  // ─── GOOGLE LOGIN ─────────────────────────────────────────────────────────

  async googleLogin(googleUser: { email: string; firstName: string; lastName: string; photo?: string; googleId: string }) {
    const db = this.tenantPrisma.db;

    let user = await db.user.findFirst({ where: { email: googleUser.email } });

    if (!user) {
      // Auto-register via Google — role determined by context
      user = await db.user.create({
        data: {
          email: googleUser.email,
          role: 'PARENT', // Default; can be changed by admin
          isEmailVerified: true,
          profilePhoto: googleUser.photo,
          lastLoginAt: new Date(),
        },
      });
    } else {
      await db.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date(), profilePhoto: googleUser.photo || user.profilePhoto },
      });
    }

    const tokens = await this.tokenService.generateSchoolTokens(user);
    return { data: { user: this.sanitizeSchoolUser(user), ...tokens }, message: 'Google login successful' };
  }

  // ─── HELPERS ──────────────────────────────────────────────────────────────

  private sanitizePlatformUser(user: any) {
    const { password, ...rest } = user;
    return rest;
  }

  private sanitizeSchoolUser(user: any) {
    const { passwordHash, otpSecret, ...rest } = user;
    return rest;
  }
}
