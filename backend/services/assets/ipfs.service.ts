import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import FormData from 'form-data';

@Injectable()
export class IpfsService {
    private readonly logger = new Logger(IpfsService.name);
    private readonly pinataApiKey: string;
    private readonly pinataSecretApiKey: string;
    private readonly pinataJwt: string;

    constructor(private configService: ConfigService) {
        this.pinataApiKey = this.configService.get<string>('PINATA_API_KEY') || '';
        this.pinataSecretApiKey = this.configService.get<string>('PINATA_SECRET_API_KEY') || this.configService.get<string>('PINATA_SECRET') || '';
        this.pinataJwt = this.configService.get<string>('PINATA_JWT') || '';

        if (!this.pinataJwt && (!this.pinataApiKey || !this.pinataSecretApiKey)) {
            this.logger.warn('No PINATA_JWT or PINATA_API_KEY/SECRET credentials provided. IPFS will use simulated CID.');
        }
    }

    async uploadFile(file: Express.Multer.File): Promise<{ cid: string; size: number }> {
        const hasJwt = !!this.pinataJwt;
        const hasKeys = !!(this.pinataApiKey && this.pinataSecretApiKey);

        if (!hasJwt && !hasKeys) {
            this.logger.warn('Mock IPFS Upload: returning a simulated CID.');
            const cid = `bafybei${Math.random().toString(36).substring(2, 15)}`;
            return { cid, size: file.size };
        }

        try {
            this.logger.log(`Uploading and pinning file ${file.originalname} to IPFS using Pinata...`);
            
            const formData = new FormData();
            formData.append('file', file.buffer, {
                filename: file.originalname || 'encrypted-asset.bin',
                contentType: file.mimetype || 'application/octet-stream',
            });

            formData.append('pinataMetadata', JSON.stringify({
                name: file.originalname || 'encrypted-asset',
                keyvalues: {
                    project: 'Always There Vault',
                    type: 'vault-asset'
                }
            }));

            const headers: any = {
                ...formData.getHeaders(),
            };

            if (this.pinataJwt) {
                headers['Authorization'] = `Bearer ${this.pinataJwt}`;
            } else {
                headers['pinata_api_key'] = this.pinataApiKey;
                headers['pinata_secret_api_key'] = this.pinataSecretApiKey;
            }

            const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
                headers,
                maxBodyLength: Infinity,
            });

            const cid = response.data.IpfsHash;
            this.logger.log(`Successfully pinned file to IPFS. CID: ${cid}`);
            return { cid, size: response.data.PinSize || file.size };
        } catch (error) {
            this.logger.error('Failed to upload to IPFS via Pinata', error.response?.data || error.message);
            throw new InternalServerErrorException('Failed to upload encrypted asset to decentralized storage.');
        }
    }

    async uploadBuffer(buffer: Buffer, filename: string): Promise<{ cid: string; size: number }> {
        const hasJwt = !!this.pinataJwt;
        const hasKeys = !!(this.pinataApiKey && this.pinataSecretApiKey);

        if (!hasJwt && !hasKeys) {
            this.logger.warn('Mock IPFS Upload: returning a simulated CID.');
            const cid = `bafybei_buffer_${Math.random().toString(36).substring(2, 12)}`;
            return { cid, size: buffer.length };
        }

        try {
            this.logger.log(`Uploading buffer ${filename} to IPFS using Pinata...`);
            const formData = new FormData();
            formData.append('file', buffer, { filename });
            
            const headers: any = {
                ...formData.getHeaders(),
            };

            if (this.pinataJwt) {
                headers['Authorization'] = `Bearer ${this.pinataJwt}`;
            } else {
                headers['pinata_api_key'] = this.pinataApiKey;
                headers['pinata_secret_api_key'] = this.pinataSecretApiKey;
            }

            const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
                headers,
                maxBodyLength: Infinity,
            });

            const cid = response.data.IpfsHash;
            return { cid, size: response.data.PinSize || buffer.length };
        } catch (error) {
            this.logger.error('Failed to upload buffer to IPFS', error.message);
            throw new InternalServerErrorException('Failed to upload encrypted buffer to IPFS.');
        }
    }
}
