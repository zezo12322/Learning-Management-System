import { Controller, Get } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';

@Controller()
export class AppController {
  constructor(private firebaseService: FirebaseService) { }

  @Get('users-count')
  async getUserCount() {
    // Calls Firebase Authentication to pull down project data safely
    const listUsersResult = await this.firebaseService.getAuth().listUsers(1);
    return { status: 'Connected', sampleUserCount: listUsersResult.users.length };
  }
}
