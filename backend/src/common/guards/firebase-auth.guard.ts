import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';
import { extractBearerToken } from '../decorators/auth-token.decorator';

type FirebaseClaims = {
  uid: string;
  email?: string;
  roles?: string[];
  role?: string;
  admin?: boolean;
  companyId?: string | null;
  [key: string]: unknown;
};

function normalizeRoles(claims: FirebaseClaims): string[] {
  const roles = new Set<string>();

  if (Array.isArray(claims.roles)) {
    for (const role of claims.roles) {
      if (typeof role === 'string' && role.trim()) {
        roles.add(role.trim().toLowerCase());
      }
    }
  }

  if (typeof claims.role === 'string' && claims.role.trim()) {
    roles.add(claims.role.trim().toLowerCase());
  }

  if (claims.admin === true) {
    roles.add('admin');
  }

  roles.add('student');
  return Array.from(roles);
}

/**
 * Verifies the Firebase ID token from the Authorization header and attaches a
 * normalized auth context to the request.
 */
@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const idToken = extractBearerToken(request);

    if (!idToken) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    try {
      const decodedToken = (await this.firebaseService
        .getAuth()
        .verifyIdToken(idToken)) as FirebaseClaims;
      const roles = normalizeRoles(decodedToken);

      request.user = {
        ...decodedToken,
        roles,
        role: decodedToken.role ?? roles[0],
        admin: decodedToken.admin === true || roles.includes('admin'),
      };
      request.userRoles = roles;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired Firebase ID token');
    }
  }
}
