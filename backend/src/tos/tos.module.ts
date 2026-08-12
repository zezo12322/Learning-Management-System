import { Module } from '@nestjs/common';
import { FirebaseModule } from '../firebase/firebase.module';
import { ToSService } from './tos.service';
import {
  ToSController,
  PublicToSController,
  UserToSController,
} from './tos.controller';

@Module({
  imports: [FirebaseModule],
  providers: [ToSService],
  controllers: [ToSController, PublicToSController, UserToSController],
  exports: [ToSService],
})
export class ToSModule {}
