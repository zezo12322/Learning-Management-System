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

  if (Array.isArray(user.roles)) {
    for (const role of user.roles) {
      if (typeof role === 'string' && role.trim()) {
        roles.add(role.trim().toLowerCase());
      }
    }
  }

  if (typeof user.role === 'string' && user.role.trim()) {
    roles.add(user.role.trim().toLowerCase());
  }

  if (user.admin === true) {
    roles.add('admin');
  }

  roles.add('student');

  const normalized = Array.from(roles).filter(
    (role): role is AppRole =>
      role === 'admin' || role === 'instructor' || role === 'student',
  );

  request.userRoles = normalized;
  return normalized;
}

/**
 * Authorizes a request by the caller's global role list, carried in Firebase
 * custom claims and normalized onto `request.userRoles` by FirebaseAuthGuard.
 * The guard also tolerates legacy single-role claims for backwards compatibility.
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
      throw new ForbiddenException(`Requires one of roles: ${required.join(', ')}`);
    }

    return true;
  }
}
