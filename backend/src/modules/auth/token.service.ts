import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CentralPrismaService } from '../../database/central-prisma.service';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly centralPrisma: CentralPrismaService,
    private readonly tenantPrisma: TenantPrismaService,
  ) {}

  async generatePlatformTokens(user: any) {
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

  async generateSchoolTokens(user: any) {
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

  async refreshAccessToken(refreshToken: string) {
    // Try central DB first
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

    // Try school DB
    const db = this.tenantPrisma.db;
    const schoolToken = await db.userRefreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!schoolToken || schoolToken.isRevoked || schoolToken.expiresAt <= new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const tokens = await this.generateSchoolTokens(schoolToken.user);
    await db.userRefreshToken.update({
      where: { id: schoolToken.id },
      data: { isRevoked: true },
    });

    return { data: tokens, message: 'Token refreshed' };
  }

  async revokeToken(refreshToken: string) {
    try {
      await this.centralPrisma.refreshToken.update({
        where: { token: refreshToken },
        data: { isRevoked: true },
      });
    } catch {
      try {
        const db = this.tenantPrisma.db;
        await db.userRefreshToken.update({
          where: { token: refreshToken },
          data: { isRevoked: true },
        });
      } catch { /* ignore */ }
    }
  }
}
