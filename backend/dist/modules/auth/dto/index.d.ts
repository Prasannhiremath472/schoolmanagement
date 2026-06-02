export declare class LoginDto {
    identifier: string;
    password: string;
}
export declare class SuperAdminLoginDto {
    email: string;
    password: string;
}
export declare class OtpLoginDto {
    phone: string;
}
export declare class VerifyOtpDto {
    phone: string;
    otp: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
export declare class ForgotPasswordDto {
    email?: string;
    phone?: string;
}
export declare class ResetPasswordDto {
    token: string;
    newPassword: string;
}
