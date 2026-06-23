import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, cert, App } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

@Injectable()
export class FirebaseService implements OnModuleInit {
    private firebaseApp: App;

    constructor(private configService: ConfigService) { }

    onModuleInit() {
        const credentialPath = this.configService.get<string>('GOOGLE_APPLICATION_CREDENTIALS') || '';

        this.firebaseApp = initializeApp({
            credential: cert(credentialPath),
            storageBucket: this.configService.get<string>(
                'FIREBASE_STORAGE_BUCKET',
                'learning-management-syst-3cc3a.firebasestorage.app',
            ),
        });
    }

    // Firebase Authentication service
    getAuth(): Auth {
        return getAuth(this.firebaseApp);
    }

    // Firestore service
    getFirestore(): Firestore {
        return getFirestore(this.firebaseApp);
    }

    // Get the default storage bucket
    getBucket() {
        return getStorage(this.firebaseApp).bucket();
    }

    /**
     * Upload a file buffer to Firebase Storage.
     * Returns the public download URL.
     */
    async uploadFile(
        filePath: string,
        buffer: Buffer,
        contentType: string,
        metadata?: Record<string, string>,
    ): Promise<string> {
        const bucket = this.getBucket();
        const file = bucket.file(filePath);

        await file.save(buffer, {
            metadata: {
                contentType,
                metadata: metadata ?? {},
            },
        });

        // Make the file publicly readable
        await file.makePublic();

        return `https://storage.googleapis.com/${bucket.name}/${filePath}`;
    }

    /**
     * Delete a file from Firebase Storage.
     */
    async deleteFile(filePath: string): Promise<void> {
        const bucket = this.getBucket();
        const file = bucket.file(filePath);

        const [exists] = await file.exists();
        if (exists) {
            await file.delete();
        }
    }

    /**
     * Delete all files under a given prefix/directory in Storage.
     */
    async deleteDirectory(prefix: string): Promise<void> {
        const bucket = this.getBucket();
        await bucket.deleteFiles({ prefix });
    }

    /**
     * Generate a signed upload URL for direct client uploads.
     * Returns a V4 signed PUT URL: the client uploads the bytes with
     * `PUT <uploadUrl>` and header `Content-Type: <contentType>`.
     * Valid for the specified duration (default 15 minutes).
     */
    async generateSignedUploadUrl(
        filePath: string,
        contentType: string,
        expiresInMinutes = 15,
    ): Promise<{ uploadUrl: string; downloadUrl: string }> {
        const bucket = this.getBucket();
        const file = bucket.file(filePath);

        const [uploadUrl] = await file.getSignedUrl({
            version: 'v4',
            action: 'write',
            expires: Date.now() + expiresInMinutes * 60 * 1000,
            contentType,
        });

        const downloadUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

        return { uploadUrl, downloadUrl };
    }

    /**
     * Check if a file exists at the given path.
     */
    async fileExists(filePath: string): Promise<boolean> {
        const bucket = this.getBucket();
        const file = bucket.file(filePath);
        const [exists] = await file.exists();
        return exists;
    }
}
