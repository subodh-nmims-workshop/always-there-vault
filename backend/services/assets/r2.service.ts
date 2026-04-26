import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class R2Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    this.bucketName = process.env.R2_BUCKET_NAME || 'deadman-protocol-assets';
    
    this.s3Client = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT || '',
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
      },
    });
  }

  async uploadBuffer(buffer: Buffer, key: string, contentType: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      });

      await this.s3Client.send(command);
      
      // Cloudflare R2 public URL format: https://<bucket>.<account-id>.r2.cloudflarestorage.com/<key>
      // Or if a custom domain is used. For now we return the key.
      return {
        key,
        bucket: this.bucketName,
        url: `${process.env.R2_PUBLIC_URL}/${key}`,
      };
    } catch (error) {
      console.error('R2 Upload Error:', error);
      throw new InternalServerErrorException('Failed to upload to Cloudflare R2');
    }
  }

  async getSignedDownloadUrl(key: string, expiresIn: number = 3600) {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (error) {
      console.error('R2 Signed URL Error:', error);
      throw new InternalServerErrorException('Failed to generate download link');
    }
  }

  async deleteFile(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
      return { success: true };
    } catch (error) {
      console.error('R2 Delete Error:', error);
      throw new InternalServerErrorException('Failed to delete from Cloudflare R2');
    }
  }
}
