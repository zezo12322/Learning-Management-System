import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
    private firebaseApp: admin.app.App;

    constructor(private configService: ConfigService) { }

    onModuleInit() {
        const credentialPath = this.configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS');

        this.firebaseApp = admin.initializeApp({
            credential: admin.credential.cert(credentialPath),
        });
    }

    // Example helper to easily get the Auth service anywhere
    getAuth(): admin.auth.Auth {
        return admin.auth();
    }

    // Example helper to easily get Firestore anywhere
    getFirestore(): admin.firestore.Firestore {
        return admin.firestore();
    }
}
