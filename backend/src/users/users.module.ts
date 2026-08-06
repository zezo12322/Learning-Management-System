import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuditLoggingModule } from '../logging/logging.module';
import { ToSModule } from '../tos/tos.module';

@Module({
  imports: [AuditLoggingModule, ToSModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
