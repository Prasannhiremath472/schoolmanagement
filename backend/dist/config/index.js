"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageConfig = exports.jwtConfig = exports.redisConfig = exports.databaseConfig = exports.appConfig = void 0;
const config_1 = require("@nestjs/config");
exports.appConfig = (0, config_1.registerAs)('app', () => ({
    port: parseInt(process.env.PORT || '4000', 10),
    env: process.env.NODE_ENV || 'development',
    corsOrigins: process.env.CORS_ORIGINS || '*',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    apiPrefix: process.env.API_PREFIX || 'api',
}));
exports.databaseConfig = (0, config_1.registerAs)('database', () => ({
    centralUrl: process.env.CENTRAL_DATABASE_URL,
    poolMin: parseInt(process.env.DB_POOL_MIN || '2', 10),
    poolMax: parseInt(process.env.DB_POOL_MAX || '10', 10),
}));
exports.redisConfig = (0, config_1.registerAs)('redis', () => ({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
    ttl: parseInt(process.env.REDIS_TTL || '300', 10),
}));
exports.jwtConfig = (0, config_1.registerAs)('jwt', () => ({
    secret: process.env.JWT_SECRET || 'change-me-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'change-refresh-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
}));
exports.storageConfig = (0, config_1.registerAs)('storage', () => ({
    provider: process.env.STORAGE_PROVIDER || 's3',
    s3Endpoint: process.env.S3_ENDPOINT,
    s3Region: process.env.S3_REGION || 'ap-south-1',
    s3Bucket: process.env.S3_BUCKET || 'school-erp',
    s3AccessKey: process.env.S3_ACCESS_KEY,
    s3SecretKey: process.env.S3_SECRET_KEY,
    maxFileSizeMB: parseInt(process.env.MAX_FILE_SIZE_MB || '50', 10),
}));
//# sourceMappingURL=index.js.map