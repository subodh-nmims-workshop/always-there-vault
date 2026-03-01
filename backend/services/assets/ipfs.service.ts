import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { Web3Storage, File } from 'web3.storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IpfsService {
    private readonly logger = new Logger(IpfsService.name);
    private client: Web3Storage | null = null;

    constructor(private configService: ConfigService) {
        const token = this.configService.get<string>('WEB3_STORAGE_TOKEN');
        if (token) {
            this.client = new Web3Storage({ token });
        } else {
            this.logger.warn('No WEB3_STORAGE_TOKEN provided. Encrypted files will not be uploaded to IPFS. Local simulation only.');
        }
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        if (!this.client) {
            this.logger.warn('Mock IPFS Upload: returning a simulated CID.');
            // Simulate a realistic IPFS CID v1 string
            return `bafybei${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        }

        try {
            this.logger.log(`Uploading file ${file.originalname} to IPFS...`);
            // Convert Multer Buffer to web3.storage File
            const web3File = new File([new Uint8Array(file.buffer)], file.originalname, { type: file.mimetype });
            const cid = await this.client.put([web3File]);
            this.logger.log(`Successfully uploaded file. CID: ${cid}`);
            return cid;
        } catch (error) {
            this.logger.error('Failed to upload file to IPFS', error);
            throw new InternalServerErrorException('Failed to upload encrypted asset to decentralized storage.');
        }
    }
}
