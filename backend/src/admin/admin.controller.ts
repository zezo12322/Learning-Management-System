import { Controller, Put, Param, Body, UseGuards } from '@nestjs/common';
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
 * one-off script using the Admin SDK, e.g.:
 *   admin.auth().setCustomUserClaims('<uid>', { role: 'admin', admin: true })
 */
@Controller('admin/users')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly firebase: FirebaseService) {}

  @Put(':uid/role')
  async setRole(@Param('uid') uid: string, @Body() dto: SetRoleDto) {
    await this.firebase.setUserRole(uid, dto.role);
    return { uid, role: dto.role };
  }
}
