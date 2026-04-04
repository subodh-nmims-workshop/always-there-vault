import { Module, Global } from '@nestjs/common';
import { AuditService } from './audit.service';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
  imports: [UsersModule],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
