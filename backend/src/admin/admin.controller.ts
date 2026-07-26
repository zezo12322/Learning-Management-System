import { Controller, Put, Param, Body, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { FirebaseService } from '../firebase/firebase.service';
import { SetRoleDto } from './dto/set-role.dto';

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
  constructor(private readonly firebase: FirebaseService) {}

  // Strict rate limit: 5 role changes per 60 seconds (privilege escalation protection).
  @Put(':uid/role')
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  async setRole(@Param('uid') uid: string, @Body() dto: SetRoleDto) {
    await this.firebase.setUserRole(uid, dto.role);
    return { uid, role: dto.role };
  }
}
