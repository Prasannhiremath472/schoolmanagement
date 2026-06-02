import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private s3Client: S3Client;
  private bucket: string;

  constructor(private readonly configService: ConfigService) {
    const endpoint = configService.get('S3_ENDPOINT');
    this.bucket = configService.get('S3_BUCKET', 'school-erp');

    this.s3Client = new S3Client({
      region: configService.get('S3_REGION', 'ap-south-1'),
      credentials: {
        accessKeyId: configService.get('S3_ACCESS_KEY', ''),
        secretAccessKey: configService.get('S3_SECRET_KEY', ''),
      },
      ...(endpoint && { endpoint }),
    });
  }

  async uploadFile(buffer: Buffer, originalName: string, folder: string, mimeType: string): Promise<{ url: string; key: string; size: number }> {
    const ext = path.extname(originalName);
    const key = `${folder}/${uuidv4()}${ext}`;

    await this.s3Client.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    }));

    const url = `${this.configService.get('S3_ENDPOINT', `https://s3.amazonaws.com`)}/${this.bucket}/${key}`;
    this.logger.log(`Uploaded: ${key}`);

    return { url, key, size: buffer.length };
  }

  async deleteFile(key: string): Promise<void> {
    await this.s3Client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }));
  }

  async getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
    return getSignedUrl(this.s3Client, new GetObjectCommand({ Bucket: this.bucket, Key: key }), { expiresIn });
  }
}
