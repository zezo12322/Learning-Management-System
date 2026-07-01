import { Global, Module } from '@nestjs/common';
import { AccessService } from './services/access.service';
import { OrderingService } from './services/ordering.service';
import { FirebaseAuthGuard } from './guards/firebase-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { CourseAccessGuard } from './guards/course-access.guard';
import { ResourceOwnershipGuard } from './guards/resource-ownership.guard';

/**
 * Global module for cross-cutting helpers (authorization + ordering). Makes them
 * injectable into guards and feature services everywhere without per-module imports.
 * (DataConnectService they depend on is already provided globally by FirebaseModule.)
 */
@Global()
@Module({
  providers: [
    AccessService,
    OrderingService,
    FirebaseAuthGuard,
    RolesGuard,
    CourseAccessGuard,
    ResourceOwnershipGuard,
  ],
  exports: [
    AccessService,
    OrderingService,
    FirebaseAuthGuard,
    RolesGuard,
    CourseAccessGuard,
    ResourceOwnershipGuard,
  ],
})
export class CommonModule {}
