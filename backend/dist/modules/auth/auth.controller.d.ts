import { AuthService } from './auth.service';
import { LoginDto, SuperAdminLoginDto, OtpLoginDto, VerifyOtpDto, RefreshTokenDto, ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    superAdminLogin(dto: SuperAdminLoginDto, ip: string): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
            user: any;
        };
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
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
    verifyOtp(dto: VerifyOtpDto): Promise<{
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
    logout(user: any, dto: RefreshTokenDto): Promise<{
        message: string;
    }>;
    changePassword(user: any, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    getProfile(user: any): Promise<{
        data: any;
    }>;
    googleAuth(): void;
    googleCallback(req: any): Promise<{
        data: {
            accessToken: string;
            refreshToken: string;
            expiresIn: number;
            user: any;
        };
        message: string;
    }>;
}
