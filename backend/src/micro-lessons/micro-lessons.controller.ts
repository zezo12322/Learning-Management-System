import {
  Controller,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MicroLessonsService } from './micro-lessons.service';
import { CreateMicroLessonDto, UpdateMicroLessonDto } from './dto/micro-lesson.dto';
import { ReorderDto } from '../common/dto/reorder.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CourseAccessGuard } from '../common/guards/course-access.guard';
import { ResourceOwnershipGuard } from '../common/guards/resource-ownership.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { OwnsResource } from '../common/decorators/owns-resource.decorator';
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller('missions/:missionId/micro-lessons')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin', 'instructor')
export class MicroLessonsController {
  constructor(
    private readonly microLessonsService: MicroLessonsService,
    private readonly dc: DataConnectService,
  ) {}

  @Post()
  @UseGuards(CourseAccessGuard)
  create(
    @Param('missionId') missionId: string,
    @Body() dto: CreateMicroLessonDto,
    @Req() req: any,
  ) {
    return this.microLessonsService.create(missionId, dto, this.dc.extractToken(req));
  }

  @Patch(':microLessonId')
  @OwnsResource('microLesson')
  @UseGuards(ResourceOwnershipGuard)
  update(
    @Param('microLessonId') microLessonId: string,
    @Body() dto: UpdateMicroLessonDto,
    @Req() req: any,
  ) {
    return this.microLessonsService.update(microLessonId, dto, this.dc.extractToken(req));
  }

  @Delete(':microLessonId')
  @OwnsResource('microLesson')
  @UseGuards(ResourceOwnershipGuard)
  delete(
    @Param('missionId') missionId: string,
    @Param('microLessonId') microLessonId: string,
    @Req() req: any,
  ) {
    return this.microLessonsService.delete(
      missionId,
      microLessonId,
      this.dc.extractToken(req),
    );
  }

  @Put('reorder')
  @UseGuards(CourseAccessGuard)
  reorder(
    @Param('missionId') missionId: string,
    @Body() dto: ReorderDto,
    @Req() req: any,
  ) {
    return this.microLessonsService.reorder(missionId, dto.orderedIds, this.dc.extractToken(req));
  }
}
