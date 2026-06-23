import { Global, Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { DataConnectService } from './dataconnect.service';

@Global()
@Module({
  providers: [FirebaseService, DataConnectService],
  exports: [FirebaseService, DataConnectService],
})
export class FirebaseModule { }
