import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CentralPrismaService } from '../../database/central-prisma.service';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import { TokenService } from './token.service';
import { OtpService } from './otp.service';
import { LoginDto, SuperAdminLoginDto, OtpLoginDto, RefreshTokenDto, ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto } from './dto';
export declare class AuthService {
    private readonly centralPrisma;
    private readonly tenantPrisma;
    private readonly jwtService;
    private readonly configService;
    private readonly tokenService;
    private readonly otpService;
    private readonly logger;
    constructor(centralPrisma: CentralPrismaService, tenantPrisma: TenantPrismaService, jwtService: JwtService, configService: ConfigService, tokenService: TokenService, otpService: OtpService);
    superAdminLogin(dto: SuperAdminLoginDto, ip: string): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
            user: any;
        };
        message: string;
    }>;
    schoolLogin(dto: LoginDto): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
            user: any;
        };
        message: string;
    }>;
    sendOtp(dto: OtpLoginDto): Promise<{
        message: string;
        expiresIn: number;
    }>;
    verifyOtp(dto: {
        phone: string;
        otp: string;
    }): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
            user: any;
        };
        message: string;
    }>;
    refreshToken(dto: RefreshTokenDto): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
        };
        message: string;
    }>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    logout(userId: string, refreshToken: string): Promise<{
        message: string;
    }>;
    getProfile(userId: string): Promise<{
        data: any;
    }>;
    googleLogin(googleUser: {
        email: string;
        firstName: string;
        lastName: string;
        photo?: string;
        googleId: string;
    }): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
            user: any;
        };
        message: string;
    }>;
    private sanitizePlatformUser;
    private sanitizeSchoolUser;
}
