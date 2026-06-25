import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { UpdateProgressDto } from './dto/progress.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { AuthToken } from '../common/decorators/auth-token.decorator';

@Controller()
@UseGuards(FirebaseAuthGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Put('lectures/:lectureId/progress')
  updateProgress(
    @Param('lectureId') lectureId: string,
    @Body() dto: UpdateProgressDto,
    @AuthToken() token: string,
  ) {
    return this.progressService.updateProgress(lectureId, dto, token);
  }

  @Get('lectures/:lectureId/progress')
  getLectureProgress(@Param('lectureId') lectureId: string, @AuthToken() token: string) {
    return this.progressService.getLectureProgress(lectureId, token);
  }

  @Get('courses/:courseId/progress')
  getCourseProgress(@Param('courseId') courseId: string, @AuthToken() token: string) {
    return this.progressService.getCourseProgress(courseId, token);
  }
}
