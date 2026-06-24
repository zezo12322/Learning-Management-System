import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, AppRole } from '../decorators/roles.decorator';

/**
 * Authorizes a request by the caller's global role, carried as a Firebase
 * custom claim on the ID token:
 *   - `role`  → 'admin' | 'instructor' | 'student'
 *   - `admin` → boolean convenience flag (true ⇒ admin)
 *
 * Claims are already decoded onto `request.user` by FirebaseAuthGuard, so this
 * guard needs no I/O. It also caches the normalized roles on `request.userRoles`
 * for downstream guards (e.g. CourseAccessGuard).
 *
 * MUST run after FirebaseAuthGuard.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest();
    const roles = this.resolveRoles(request);

    const required = this.reflector.getAllAndOverride<AppRole[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    // No @Roles on the route → any authenticated user may proceed.
    if (!required || required.length === 0) return true;

    if (!required.some((r) => roles.includes(r))) {
      throw new ForbiddenException(`Requires one of roles: ${required.join(', ')}`);
    }
    return true;
  }

  /** Normalize the token's role claim into an AppRole[] and memoize it. */
  private resolveRoles(request: any): AppRole[] {
    if (request.userRoles) return request.userRoles;

    const user = request.user ?? {};
    const roles: AppRole[] = [];

    if (user.admin === true) roles.push('admin');

    const claim = String(user.role ?? '').toLowerCase();
    if ((claim === 'admin' || claim === 'instructor' || claim === 'student') &&
        !roles.includes(claim as AppRole)) {
      roles.push(claim as AppRole);
    }

    // Every authenticated user is at least a student.
    if (!roles.includes('student')) roles.push('student');

    request.userRoles = roles;
    return roles;
  }
}
