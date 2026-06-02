import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../src/modules/auth/auth.service';
import { TokenService } from '../../src/modules/auth/token.service';
import { OtpService } from '../../src/modules/auth/otp.service';
import { CentralPrismaService } from '../../src/database/central-prisma.service';
import { TenantPrismaService } from '../../src/database/tenant-prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let authService: AuthService;
  let centralPrisma: jest.Mocked<CentralPrismaService>;
  let tenantPrisma: jest.Mocked<TenantPrismaService>;
  let tokenService: jest.Mocked<TokenService>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser = {
    id: 'user-uuid-123',
    email: 'teacher@school.com',
    phone: '+919876543210',
    passwordHash: bcrypt.hashSync('Password@123', 10),
    role: 'TEACHER',
    isActive: true,
    student: null,
    teacher: { id: 't1', firstName: 'John', lastName: 'Doe', employeeId: 'EMP001' },
    parent: null,
    staff: null,
  };

  beforeEach(async () => {
    const centralPrismaMock = { platformUser: { findUnique: jest.fn(), update: jest.fn() } };
    const tenantPrismaMock = { db: { user: { findFirst: jest.fn(), update: jest.fn() }, userRefreshToken: { create: jest.fn() } } };
    const tokenServiceMock = { generateSchoolTokens: jest.fn().mockResolvedValue({ accessToken: 'access.token.jwt', refreshToken: 'refresh-token-hex', expiresIn: 900 }), generatePlatformTokens: jest.fn(), revokeToken: jest.fn() };
    const jwtServiceMock = { sign: jest.fn().mockReturnValue('signed.jwt.token'), verify: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: CentralPrismaService, useValue: centralPrismaMock },
        { provide: TenantPrismaService, useValue: tenantPrismaMock },
        { provide: TokenService, useValue: tokenServiceMock },
        { provide: OtpService, useValue: { generate: jest.fn().mockReturnValue('123456') } },
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: ConfigService, useValue: { get: jest.fn().mockReturnValue('secret') } },
        { provide: EventEmitter2, useValue: { emit: jest.fn() } },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    centralPrisma = module.get(CentralPrismaService);
    tenantPrisma = module.get(TenantPrismaService);
    tokenService = module.get(TokenService);
  });

  describe('schoolLogin', () => {
    it('should return tokens on valid credentials', async () => {
      (tenantPrisma.db.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (tenantPrisma.db.user.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.schoolLogin({
        identifier: 'teacher@school.com',
        password: 'Password@123',
      });

      expect(result.data.accessToken).toBe('access.token.jwt');
      expect(result.data.refreshToken).toBe('refresh-token-hex');
      expect(result.message).toBe('Login successful');
    });

    it('should throw UnauthorizedException for wrong password', async () => {
      (tenantPrisma.db.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

      await expect(
        authService.schoolLogin({ identifier: 'teacher@school.com', password: 'wrongpassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user not found', async () => {
      (tenantPrisma.db.user.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        authService.schoolLogin({ identifier: 'nonexistent@school.com', password: 'Password@123' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('changePassword', () => {
    it('should update password on correct current password', async () => {
      (tenantPrisma.db.user.findUnique as jest.Mock) = jest.fn().mockResolvedValue(mockUser);
      (tenantPrisma.db.user.update as jest.Mock) = jest.fn().mockResolvedValue({ ...mockUser });

      const result = await authService.changePassword(mockUser.id, {
        currentPassword: 'Password@123',
        newPassword: 'NewPassword@456',
      });

      expect(result.message).toBe('Password changed successfully');
    });
  });
});
