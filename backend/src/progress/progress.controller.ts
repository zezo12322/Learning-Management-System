import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProgressService } from './progress.service';
import { UpdateProgressDto } from './dto/progress.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller()
@UseGuards(FirebaseAuthGuard)
export class ProgressController {
  constructor(
    private readonly progressService: ProgressService,
    private readonly dc: DataConnectService,
  ) {}

  @Put('lectures/:lectureId/progress')
  updateProgress(
    @Param('lectureId') lectureId: string,
    @Body() dto: UpdateProgressDto,
    @Req() req: any,
  ) {
    return this.progressService.updateProgress(
      lectureId,
      dto,
      this.dc.extractToken(req),
    );
  }

  @Get('lectures/:lectureId/progress')
  getLectureProgress(@Param('lectureId') lectureId: string, @Req() req: any) {
    return this.progressService.getLectureProgress(
      lectureId,
      this.dc.extractToken(req),
    );
  }

  @Get('courses/:courseId/progress')
  getCourseProgress(@Param('courseId') courseId: string, @Req() req: any) {
    return this.progressService.getCourseProgress(
      courseId,
      this.dc.extractToken(req),
    );
  }
}
