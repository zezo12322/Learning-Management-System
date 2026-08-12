import { Controller, Put, Param, Body, UseGuards, Req } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { FirebaseService } from '../firebase/firebase.service';
import { SetRoleDto } from './dto/set-role.dto';
import { AuditLoggingService } from '../logging/logging.service';

/**
 * Platform-wide user administration. Admin-only: assigns global roles by setting
 * Firebase custom claims, which RolesGuard reads on subsequent requests.
 *
 * Bootstrapping the FIRST admin (chicken-and-egg) is done out-of-band with a
 * one-off script using the Admin SDK. Write the `roles` array — the single
 * source of truth read by both Data Connect and the NestJS guards:
 *   admin.auth().setCustomUserClaims('<uid>', { roles: ['admin'] })
 */
@Controller('admin/users')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(
    private readonly firebase: FirebaseService,
    private readonly auditLoggingService: AuditLoggingService,
  ) {}

  // Strict rate limit: 5 role changes per 60 seconds (privilege escalation protection).
  @Put(':uid/role')
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  async setRole(
    @Param('uid') uid: string,
    @Body() dto: SetRoleDto,
    @Req() req: any,
  ) {
    // setUserRole only accepts admin/instructor/student — super_admin is a
    // display-only role derived from the roles array, not a Firebase claim.
    const role = dto.role === 'super_admin' ? 'admin' : dto.role;
    await this.firebase.setUserRole(uid, role);

    // fire-and-forget — logging failures must never affect the API response
    void this.auditLoggingService.createLog({
      action: 'UPDATE_ROLE',
      adminUid: req.user?.uid ?? 'unknown',
      targetUid: uid,
      ipAddress: req.ip,
      details: { newRole: dto.role },
    });

    return { uid, role: dto.role };
  }
}
