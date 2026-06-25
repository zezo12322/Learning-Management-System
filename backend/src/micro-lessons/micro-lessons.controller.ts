import {
  Controller,
  Post,
  Patch,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
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
import { AuthToken } from '../common/decorators/auth-token.decorator';

@Controller('missions/:missionId/micro-lessons')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin', 'instructor')
export class MicroLessonsController {
  constructor(private readonly microLessonsService: MicroLessonsService) {}

  @Post()
  @UseGuards(CourseAccessGuard)
  create(
    @Param('missionId') missionId: string,
    @Body() dto: CreateMicroLessonDto,
    @AuthToken() token: string,
  ) {
    return this.microLessonsService.create(missionId, dto, token);
  }

  @Patch(':microLessonId')
  @OwnsResource('microLesson')
  @UseGuards(ResourceOwnershipGuard)
  update(
    @Param('microLessonId') microLessonId: string,
    @Body() dto: UpdateMicroLessonDto,
    @AuthToken() token: string,
  ) {
    return this.microLessonsService.update(microLessonId, dto, token);
  }

  @Delete(':microLessonId')
  @OwnsResource('microLesson')
  @UseGuards(ResourceOwnershipGuard)
  delete(
    @Param('missionId') missionId: string,
    @Param('microLessonId') microLessonId: string,
    @AuthToken() token: string,
  ) {
    return this.microLessonsService.delete(missionId, microLessonId, token);
  }

  @Put('reorder')
  @UseGuards(CourseAccessGuard)
  reorder(
    @Param('missionId') missionId: string,
    @Body() dto: ReorderDto,
    @AuthToken() token: string,
  ) {
    return this.microLessonsService.reorder(missionId, dto.orderedIds, token);
  }
}
