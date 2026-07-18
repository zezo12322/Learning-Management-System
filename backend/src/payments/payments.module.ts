import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymobService } from './paymob.service';

/**
 * Payments (Paymob). DataConnectService/FirebaseService come from the global
 * FirebaseModule; ConfigService from the global ConfigModule.
 */
@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymobService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
