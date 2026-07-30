import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, AppRole } from '../decorators/roles.decorator';

function normalizeRoles(request: any): AppRole[] {
  const existing = request.userRoles;
  if (Array.isArray(existing) && existing.length > 0) {
    return existing;
  }

  const user = request.user ?? {};
  const roles = new Set<string>();

  // Source of truth is the `roles` array only; legacy `role`/`admin` claims are
  // deliberately ignored (see FirebaseAuthGuard). In practice FirebaseAuthGuard
  // always pre-populates request.userRoles, so this fallback is defense-in-depth.
  if (Array.isArray(user.roles)) {
    for (const role of user.roles) {
      if (typeof role === 'string' && role.trim()) {
        roles.add(role.trim().toLowerCase());
      }
    }
  }

  roles.add('student');

  const normalized = Array.from(roles).filter(
    (role): role is AppRole =>
      role === 'admin' ||
      role === 'instructor' ||
      role === 'student' ||
      role === 'super_admin',
  );

  request.userRoles = normalized;
  return normalized;
}

/**
 * Authorizes a request by the caller's global role list, carried in the Firebase
 * `roles` custom claim and normalized onto `request.userRoles` by FirebaseAuthGuard.
 * Legacy single-role (`role`/`admin`) claims are NOT honored — see FirebaseAuthGuard.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const request = ctx.switchToHttp().getRequest();
    const roles = normalizeRoles(request);

    const required = this.reflector.getAllAndOverride<AppRole[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!required || required.length === 0) {
      return true;
    }

    if (!required.some((role) => roles.includes(role))) {
      throw new ForbiddenException(
        `Requires one of roles: ${required.join(', ')}`,
      );
    }

    return true;
  }
}
