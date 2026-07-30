import { Module } from '@nestjs/common';
import { AuditLoggingService } from './logging.service';
import { AuditLoggingController } from './logging.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [AuditLoggingService],
  controllers: [AuditLoggingController],
  exports: [AuditLoggingService],
})
export class AuditLoggingModule {}
