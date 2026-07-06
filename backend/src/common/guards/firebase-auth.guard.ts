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
  // Legacy single-role claims. Deliberately NOT read for authorization anymore:
  // the `roles` array is the single source of truth (see normalizeRoles). Kept in
  // the type only because older tokens may still carry them until they refresh.
  role?: string;
  admin?: boolean;
  companyId?: string | null;
  [key: string]: unknown;
};

/**
 * Roles are derived SOLELY from the `roles` array claim — the single source of
 * truth that Data Connect `@auth(expr:)` rules also read (`auth.token.roles`).
 * The legacy `role` (string) and `admin` (bool) claims are intentionally ignored:
 * honoring them let a stale legacy claim (which the Functions role path never
 * cleared) keep granting admin after a demotion, so the two enforcement layers
 * disagreed. Every authenticated principal is at least a `student`.
 */
function normalizeRoles(claims: FirebaseClaims): string[] {
  const roles = new Set<string>();

  if (Array.isArray(claims.roles)) {
    for (const role of claims.roles) {
      if (typeof role === 'string' && role.trim()) {
        roles.add(role.trim().toLowerCase());
      }
    }
  }

  roles.add('student');
  return Array.from(roles);
}

/** Highest-privilege role, for the display-only `request.user.role` field. */
function primaryRole(roles: string[]): string {
  if (roles.includes('admin')) return 'admin';
  if (roles.includes('instructor')) return 'instructor';
  return 'student';
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
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    try {
      const decodedToken = (await this.firebaseService
        .getAuth()
        .verifyIdToken(idToken)) as FirebaseClaims;
      const roles = normalizeRoles(decodedToken);

      // Spread the raw token first, then OVERRIDE role/admin from the normalized
      // roles array so any stale legacy `role`/`admin` claim on the token cannot
      // leak through into the request context.
      request.user = {
        ...decodedToken,
        roles,
        role: primaryRole(roles),
        admin: roles.includes('admin'),
      };
      request.userRoles = roles;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired Firebase ID token');
    }
  }
}
