import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user; // This is populated by FirebaseAuthGuard

        if (!user || !user.roles || user.roles.length === 0) {
            throw new ForbiddenException('User has no assigned roles');
        }

        // Convert to lowercase to match your controller's @Roles('admin', 'instructor')
        const userRoles = user.roles.map(r => r.toLowerCase());
        const hasRole = requiredRoles.some((role) => userRoles.includes(role.toLowerCase()));

        if (!hasRole) {
            throw new ForbiddenException('Insufficient permissions for this resource');
        }

        return true;
    }
}