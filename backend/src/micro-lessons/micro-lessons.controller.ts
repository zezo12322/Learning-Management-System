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
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller('missions/:missionId/micro-lessons')
@UseGuards(FirebaseAuthGuard)
export class MicroLessonsController {
  constructor(
    private readonly microLessonsService: MicroLessonsService,
    private readonly dc: DataConnectService,
  ) {}

  @Post()
  create(
    @Param('missionId') missionId: string,
    @Body() dto: CreateMicroLessonDto,
    @Req() req: any,
  ) {
    return this.microLessonsService.create(missionId, dto, this.dc.extractToken(req));
  }

  @Patch(':microLessonId')
  update(
    @Param('microLessonId') microLessonId: string,
    @Body() dto: UpdateMicroLessonDto,
    @Req() req: any,
  ) {
    return this.microLessonsService.update(microLessonId, dto, this.dc.extractToken(req));
  }

  @Delete(':microLessonId')
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
  reorder(
    @Param('missionId') missionId: string,
    @Body() dto: ReorderDto,
    @Req() req: any,
  ) {
    return this.microLessonsService.reorder(missionId, dto.orderedIds, this.dc.extractToken(req));
  }
}
