import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { AuthToken } from '../common/decorators/auth-token.decorator';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  // Public course discovery — no authentication required.
  @Get('courses')
  listPublished() {
    return this.catalogService.listPublished();
  }

  // Curriculum outline for a course (authenticated).
  @Get('courses/:courseId/curriculum')
  @UseGuards(FirebaseAuthGuard)
  getCurriculum(@Param('courseId') courseId: string, @AuthToken() token: string) {
    return this.catalogService.getCurriculum(courseId, token);
  }
}
