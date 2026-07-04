import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';

/**
 * Platform administration (Admin-only). FirebaseService it depends on is
 * provided globally by FirebaseModule.
 */
@Module({
  controllers: [AdminController],
})
export class AdminModule {}
