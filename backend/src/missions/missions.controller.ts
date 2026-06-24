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
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller('missions')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin', 'instructor')
export class MissionsController {
  constructor(
    private readonly missionsService: MissionsService,
    private readonly dc: DataConnectService,
  ) {}

  @Post()
  create(@Body() dto: CreateMissionDto, @Req() req: any) {
    const isAdmin = (req.userRoles ?? []).includes('admin');
    return this.missionsService.create(
      dto,
      this.dc.extractToken(req),
      req.user?.uid,
      isAdmin,
    );
  }

  @Get()
  findAll(@Req() req: any) {
    return this.missionsService.findMyList(this.dc.extractToken(req));
  }

  @Get(':missionId')
  @UseGuards(CourseAccessGuard)
  findOne(@Param('missionId') missionId: string, @Req() req: any) {
    return this.missionsService.findOne(missionId, this.dc.extractToken(req));
  }

  @Patch(':missionId')
  @UseGuards(CourseAccessGuard)
  update(
    @Param('missionId') missionId: string,
    @Body() dto: UpdateMissionDto,
    @Req() req: any,
  ) {
    return this.missionsService.update(missionId, dto, this.dc.extractToken(req));
  }

  @Delete(':missionId')
  @UseGuards(CourseAccessGuard)
  softDelete(@Param('missionId') missionId: string, @Req() req: any) {
    return this.missionsService.softDelete(missionId, this.dc.extractToken(req));
  }
}
