import { Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class B2Service {
  private readonly s3Client: S3Client;
  private readonly logger = new Logger(B2Service.name);
  private readonly bucketName: string;

  constructor(private configService: ConfigService) {
    const keyId = this.configService.get<string>('B2_KEY_ID');
    const applicationKey = this.configService.get<string>('B2_APPLICATION_KEY');
    const endpoint = this.configService.get<string>('B2_ENDPOINT'); // e.g. s3.us-west-004.backblazeb2.com
    this.bucketName = this.configService.get<string>('B2_BUCKET_NAME');

    if (!keyId || !applicationKey || !endpoint || !this.bucketName) {
      this.logger.warn('⚠️ Backblaze B2 credentials missing. Centralized storage will fail.');
    }

    this.s3Client = new S3Client({
      region: 'us-east-1', // B2 requires a region, though it often ignores it for the endpoint
      endpoint: `https://${endpoint}`,
      credentials: {
        accessKeyId: keyId,
        secretAccessKey: applicationKey,
      },
      forcePathStyle: true, // Required for Backblaze B2
    });
  }

  /**
   * Uploads an encrypted buffer to Backblaze B2
   */
  async uploadFile(key: string, body: Buffer, contentType: string): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: body,
        ContentType: contentType,
      });

      await this.s3Client.send(command);
      this.logger.log(`✅ File uploaded to B2: ${key}`);
      return key;
    } catch (error) {
      this.logger.error(`❌ B2 Upload Failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generates a Pre-signed URL for secure downloading
   * B2 allows time-limited access to private files
   */
  async getDownloadUrl(key: string, expiresIn: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (error) {
      this.logger.error(`❌ B2 Download URL Generation Failed: ${error.message}`);
      throw error;
    }
  }
}
