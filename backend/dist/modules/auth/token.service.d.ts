import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CentralPrismaService } from '../../database/central-prisma.service';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
export declare class TokenService {
    private readonly jwtService;
    private readonly configService;
    private readonly centralPrisma;
    private readonly tenantPrisma;
    constructor(jwtService: JwtService, configService: ConfigService, centralPrisma: CentralPrismaService, tenantPrisma: TenantPrismaService);
    generatePlatformTokens(user: any): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    generateSchoolTokens(user: any): Promise<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
    }>;
    refreshAccessToken(refreshToken: string): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
        message: string;
    }>;
    revokeToken(refreshToken: string): Promise<void>;
}
