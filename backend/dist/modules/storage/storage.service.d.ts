import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private readonly configService;
    private readonly logger;
    private s3Client;
    private bucket;
    constructor(configService: ConfigService);
    uploadFile(buffer: Buffer, originalName: string, folder: string, mimeType: string): Promise<{
        url: string;
        key: string;
        size: number;
    }>;
    deleteFile(key: string): Promise<void>;
    getPresignedUrl(key: string, expiresIn?: number): Promise<string>;
}
