"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var StorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const uuid_1 = require("uuid");
const path = require("path");
let StorageService = StorageService_1 = class StorageService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(StorageService_1.name);
        const endpoint = configService.get('S3_ENDPOINT');
        this.bucket = configService.get('S3_BUCKET', 'school-erp');
        this.s3Client = new client_s3_1.S3Client({
            region: configService.get('S3_REGION', 'ap-south-1'),
            credentials: {
                accessKeyId: configService.get('S3_ACCESS_KEY', ''),
                secretAccessKey: configService.get('S3_SECRET_KEY', ''),
            },
            ...(endpoint && { endpoint }),
        });
    }
    async uploadFile(buffer, originalName, folder, mimeType) {
        const ext = path.extname(originalName);
        const key = `${folder}/${(0, uuid_1.v4)()}${ext}`;
        await this.s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: buffer,
            ContentType: mimeType,
        }));
        const url = `${this.configService.get('S3_ENDPOINT', `https://s3.amazonaws.com`)}/${this.bucket}/${key}`;
        this.logger.log(`Uploaded: ${key}`);
        return { url, key, size: buffer.length };
    }
    async deleteFile(key) {
        await this.s3Client.send(new client_s3_1.DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
    }
    async getPresignedUrl(key, expiresIn = 3600) {
        return (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, new client_s3_1.GetObjectCommand({ Bucket: this.bucket, Key: key }), { expiresIn });
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = StorageService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map