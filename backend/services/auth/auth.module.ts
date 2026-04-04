import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MFAService } from './mfa.service';
import { UsersModule } from '../users/users.module';
import { CryptoModule } from '../crypto/crypto.module';

@Module({
    imports: [UsersModule, CryptoModule],
    controllers: [AuthController],
    providers: [AuthService, MFAService],
    exports: [AuthService, MFAService],
})
export class AuthModule { }
