import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuditLoggingModule } from '../logging/logging.module';

/**
 * Platform administration (Admin-only). FirebaseService it depends on is
 * provided globally by FirebaseModule.
 */
@Module({
  imports: [AuditLoggingModule],
  controllers: [AdminController],
})
export class AdminModule {}
