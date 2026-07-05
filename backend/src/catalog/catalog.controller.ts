import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { AuthToken } from '../common/decorators/auth-token.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  // Public course discovery — no authentication required.
  @Get('courses')
  listPublished() {
    return this.catalogService.listPublished();
  }

  // Curriculum outline for a course (authenticated). Full lecture content is
  // returned only to the owner/admin or an active enrollee; others get the
  // structure plus free-preview content (see CatalogService).
  @Get('courses/:courseId/curriculum')
  @UseGuards(FirebaseAuthGuard)
  getCurriculum(
    @Param('courseId') courseId: string,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
    @Req() req: any,
  ) {
    const isAdmin =
      (req.userRoles ?? []).includes('admin') || req.user?.admin === true;
    return this.catalogService.getCurriculum(courseId, token, uid, isAdmin);
  }
}
