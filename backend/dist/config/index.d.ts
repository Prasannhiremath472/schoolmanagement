export declare const appConfig: (() => {
    port: number;
    env: string;
    corsOrigins: string;
    frontendUrl: string;
    apiPrefix: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    env: string;
    corsOrigins: string;
    frontendUrl: string;
    apiPrefix: string;
}>;
export declare const databaseConfig: (() => {
    centralUrl: string;
    poolMin: number;
    poolMax: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    centralUrl: string;
    poolMin: number;
    poolMax: number;
}>;
export declare const redisConfig: (() => {
    host: string;
    port: number;
    password: string;
    ttl: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    host: string;
    port: number;
    password: string;
    ttl: number;
}>;
export declare const jwtConfig: (() => {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
}>;
export declare const storageConfig: (() => {
    provider: string;
    s3Endpoint: string;
    s3Region: string;
    s3Bucket: string;
    s3AccessKey: string;
    s3SecretKey: string;
    maxFileSizeMB: number;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    provider: string;
    s3Endpoint: string;
    s3Region: string;
    s3Bucket: string;
    s3AccessKey: string;
    s3SecretKey: string;
    maxFileSizeMB: number;
}>;
