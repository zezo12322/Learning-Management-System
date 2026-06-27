import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy, 'firebase-auth') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(token: string) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);

            // Map the payload, including the custom claims we set in the Cloud Function
            return {
                uid: decodedToken.uid,
                email: decodedToken.email,
                roles: decodedToken.roles || [],
                companyId: decodedToken.companyId || null,
            };
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired Firebase token');
        }
    }
}