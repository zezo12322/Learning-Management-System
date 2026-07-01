import { Module } from '@nestjs/common';
import { MicroLessonsController } from './micro-lessons.controller';
import { MicroLessonsService } from './micro-lessons.service';

@Module({
  controllers: [MicroLessonsController],
  providers: [MicroLessonsService],
  exports: [MicroLessonsService],
})
export class MicroLessonsModule {}
