import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { AuditLoggingModule } from '../logging/logging.module';

@Module({
  imports: [FirebaseModule, AuditLoggingModule],
  providers: [PaymentsService],
  controllers: [PaymentsController],
  exports: [PaymentsService],
})
export class PaymentsModule {}
