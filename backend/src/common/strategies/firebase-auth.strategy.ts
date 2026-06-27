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
            // Verifies the token cryptographically and decodes the payload
            const decodedToken = await admin.auth().verifyIdToken(token);

            // Map the payload to the Express req.user object
            return {
                uid: decodedToken.uid,
                email: decodedToken.email,
                roles: decodedToken.roles || [], // Extracted from your custom claims
                companyId: decodedToken.companyId || null,
            };
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired Firebase token');
        }
    }
}