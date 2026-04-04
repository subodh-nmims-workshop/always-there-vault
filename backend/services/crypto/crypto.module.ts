import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { SecureEncryptionService } from './secure-encryption.service';

@Module({
    providers: [CryptoService, SecureEncryptionService],
    exports: [CryptoService, SecureEncryptionService],
})
export class CryptoModule {}
