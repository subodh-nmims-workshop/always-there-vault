import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MFAService } from './mfa.service';
import { UsersModule } from '../users/users.module';
import { CryptoModule } from '../crypto/crypto.module';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';

import { TokenService } from './token.service';

@Module({
    imports: [UsersModule, CryptoModule, ConfigModule],
    controllers: [AuthController],
    providers: [AuthService, MFAService, JwtAuthGuard, TokenService],
    exports: [AuthService, MFAService, JwtAuthGuard, TokenService],
})
export class AuthModule { }
