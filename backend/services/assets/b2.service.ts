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
      endpoint: endpoint ? `https://${endpoint}` : 'https://s3.us-east-005.backblazeb2.com',
      credentials: {
        accessKeyId: keyId || 'dummy-key-id',
        secretAccessKey: applicationKey || 'dummy-application-key',
      },
      forcePathStyle: true, // Required for Backblaze B2
    });
  }

  /**
   * Uploads an encrypted buffer to Backblaze B2
   */
  async uploadFile(key: string, body: Buffer, contentType: string): Promise<string> {
    const isDev = this.configService.get<string>('NODE_ENV') === 'development';
    const credentialsMissing = !this.configService.get<string>('B2_KEY_ID') || 
                                 !this.configService.get<string>('B2_APPLICATION_KEY') || 
                                 !this.configService.get<string>('B2_ENDPOINT') || 
                                 !this.bucketName;

    try {
      if (credentialsMissing && isDev) {
        this.logger.warn(`[DEV MODE] B2 credentials missing. Using local simulated storage for key: ${key}`);
        const fs = await import('fs/promises');
        const path = await import('path');
        const uploadDir = path.join(process.cwd(), 'uploads');
        await fs.mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, encodeURIComponent(key));
        await fs.writeFile(filePath, body);
        return `local-simulated://${key}`;
      }

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
      if (isDev) {
        this.logger.warn(`[DEV MODE] B2 Upload failed: ${error.message}. Falling back to local simulated storage for key: ${key}`);
        try {
          const fs = await import('fs/promises');
          const path = await import('path');
          const uploadDir = path.join(process.cwd(), 'uploads');
          await fs.mkdir(uploadDir, { recursive: true });
          const filePath = path.join(uploadDir, encodeURIComponent(key));
          await fs.writeFile(filePath, body);
          return `local-simulated://${key}`;
        } catch (localError) {
          this.logger.error(`❌ Local fallback upload also failed: ${localError.message}`);
        }
      }
      this.logger.error(`❌ B2 Upload Failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generates a Pre-signed URL for secure downloading
   * B2 allows time-limited access to private files
   */
  async getDownloadUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const isDev = this.configService.get<string>('NODE_ENV') === 'development';
    if (key.startsWith('local-simulated://')) {
      const actualKey = key.replace('local-simulated://', '');
      const backendUrl = isDev ? 'http://localhost:7001' : (this.configService.get<string>('API_URL') || 'http://localhost:7001');
      return `${backendUrl}/api/claim-assets/local-download/${encodeURIComponent(actualKey)}`;
    }

    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (error) {
      if (isDev) {
        this.logger.warn(`[DEV MODE] B2 getDownloadUrl failed: ${error.message}. Returning local API fallback URL.`);
        const backendUrl = 'http://localhost:7001';
        return `${backendUrl}/api/claim-assets/local-download/${encodeURIComponent(key)}`;
      }
      this.logger.error(`❌ B2 Download URL Generation Failed: ${error.message}`);
      throw error;
    }
  }
}
