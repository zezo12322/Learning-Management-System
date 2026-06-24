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
import { SectionsService } from './sections.service';
import { CreateSectionDto, UpdateSectionDto } from './dto/section.dto';
import { ReorderDto } from '../common/dto/reorder.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CourseAccessGuard } from '../common/guards/course-access.guard';
import { ResourceOwnershipGuard } from '../common/guards/resource-ownership.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { OwnsResource } from '../common/decorators/owns-resource.decorator';
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller('courses/:courseId/sections')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin', 'instructor')
export class SectionsController {
  constructor(
    private readonly sectionsService: SectionsService,
    private readonly dc: DataConnectService,
  ) {}

  @Post()
  @UseGuards(CourseAccessGuard)
  create(
    @Param('courseId') courseId: string,
    @Body() dto: CreateSectionDto,
    @Req() req: any,
  ) {
    return this.sectionsService.create(courseId, dto, this.dc.extractToken(req));
  }

  @Patch(':sectionId')
  @OwnsResource('section')
  @UseGuards(ResourceOwnershipGuard)
  update(
    @Param('sectionId') sectionId: string,
    @Body() dto: UpdateSectionDto,
    @Req() req: any,
  ) {
    return this.sectionsService.update(sectionId, dto, this.dc.extractToken(req));
  }

  @Delete(':sectionId')
  @OwnsResource('section')
  @UseGuards(ResourceOwnershipGuard)
  delete(
    @Param('courseId') courseId: string,
    @Param('sectionId') sectionId: string,
    @Req() req: any,
  ) {
    return this.sectionsService.delete(courseId, sectionId, this.dc.extractToken(req));
  }

  @Put('reorder')
  @UseGuards(CourseAccessGuard)
  reorder(
    @Param('courseId') courseId: string,
    @Body() dto: ReorderDto,
    @Req() req: any,
  ) {
    return this.sectionsService.reorder(courseId, dto.orderedIds, this.dc.extractToken(req));
  }
}
