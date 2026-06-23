import { FirebaseService } from './firebase/firebase.service';
export declare class AppController {
    private firebaseService;
    constructor(firebaseService: FirebaseService);
    getUserCount(): Promise<{
        status: string;
        sampleUserCount: number;
    }>;
}
