import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TranscodingService } from './transcoding.service';
import { TranscodeVideoDto } from './dto/transcode.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ResourceOwnershipGuard } from '../common/guards/resource-ownership.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { OwnsResource } from '../common/decorators/owns-resource.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller()
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class TranscodingController {
  constructor(private readonly transcoding: TranscodingService) {}

  /**
   * Queue secure-HLS packaging for an uploaded lecture video. Returns 202 with
   * the job id; the instructor UI polls the status endpoint below.
   */
  @Post('courses/:courseId/lectures/:lectureId/video/transcode')
  @HttpCode(HttpStatus.ACCEPTED)
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  @UseGuards(ResourceOwnershipGuard)
  transcode(
    @Param('courseId') courseId: string,
    @Param('lectureId') lectureId: string,
    @Body() dto: TranscodeVideoDto,
    @CurrentUser('uid') uid: string,
  ) {
    return this.transcoding.enqueue(courseId, lectureId, dto.sourcePath, uid);
  }

  @Get('courses/:courseId/lectures/:lectureId/video/transcode/status')
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  @UseGuards(ResourceOwnershipGuard)
  status(@Param('lectureId') lectureId: string) {
    return this.transcoding.getStatus(lectureId);
  }
}
