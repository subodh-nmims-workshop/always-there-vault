import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { WalletAuthService } from './wallet-auth.service';
import { PasskeyAuthService } from './passkey-auth.service';
import { WalletAuthController } from './wallet-auth.controller';
import { PasskeyAuthController } from './passkey-auth.controller';
import { EmailAuthService } from './services/email-auth.service';
import { SessionService } from './services/session.service';
import { SessionController } from './controllers/session.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from './entities/user.entity';
import { Session } from './entities/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Session]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || (() => { throw new Error('JWT_SECRET is not defined'); })(),
      signOptions: { 
        expiresIn: '24h',
        algorithm: 'HS256',
        issuer: 'digital-will-protocol',
        audience: 'digital-will-users'
      },
    }),
  ],
  controllers: [
    AuthController,
    WalletAuthController,
    PasskeyAuthController,
    SessionController,
  ],
  providers: [
    AuthService,
    WalletAuthService,
    PasskeyAuthService,
    EmailAuthService,
    SessionService,
    JwtStrategy,
  ],
  exports: [
    AuthService,
    WalletAuthService,
    PasskeyAuthService,
    SessionService,
    JwtModule,
    PassportModule,
  ],
})
export class AuthModule {}
