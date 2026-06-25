import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MissionsService } from './missions.service';
import { CreateMissionDto, UpdateMissionDto } from './dto/mission.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CourseAccessGuard } from '../common/guards/course-access.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthToken } from '../common/decorators/auth-token.decorator';

@Controller('missions')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin', 'instructor')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Post()
  create(
    @Body() dto: CreateMissionDto,
    @CurrentUser('uid') uid: string,
    @AuthToken() token: string,
    @Req() req: any,
  ) {
    // create needs the caller's role (for the course-ownership check on dto.courseId),
    // which RolesGuard places on request.userRoles.
    const isAdmin = (req.userRoles ?? []).includes('admin');
    return this.missionsService.create(dto, token, uid, isAdmin);
  }

  @Get()
  findAll(@AuthToken() token: string) {
    return this.missionsService.findMyList(token);
  }

  @Get(':missionId')
  @UseGuards(CourseAccessGuard)
  findOne(@Param('missionId') missionId: string, @AuthToken() token: string) {
    return this.missionsService.findOne(missionId, token);
  }

  @Patch(':missionId')
  @UseGuards(CourseAccessGuard)
  update(
    @Param('missionId') missionId: string,
    @Body() dto: UpdateMissionDto,
    @AuthToken() token: string,
  ) {
    return this.missionsService.update(missionId, dto, token);
  }

  @Delete(':missionId')
  @UseGuards(CourseAccessGuard)
  softDelete(@Param('missionId') missionId: string, @AuthToken() token: string) {
    return this.missionsService.softDelete(missionId, token);
  }
}
