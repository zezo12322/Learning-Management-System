import { Module } from '@nestjs/common';
import { LecturesController } from './lectures.controller';
import { LecturesService } from './lectures.service';
import { AuditLoggingModule } from '../logging/logging.module';

@Module({
  imports: [AuditLoggingModule],
  controllers: [LecturesController],
  providers: [LecturesService],
  exports: [LecturesService],
})
export class LecturesModule {}
