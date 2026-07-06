import { SetMetadata } from '@nestjs/common';

/** Global platform roles. Source of truth is the DB (UserRole/Role tables). */
export type AppRole = 'admin' | 'instructor' | 'student';

export const ROLES_KEY = 'roles';

/**
 * Restricts a route (or controller) to the given global roles.
 * Requires RolesGuard to be applied. Example: `@Roles('admin', 'instructor')`.
 */
export const Roles = (...roles: AppRole[]) => SetMetadata(ROLES_KEY, roles);
