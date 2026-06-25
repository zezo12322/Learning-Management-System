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
import { SectionsService } from './sections.service';
import { CreateSectionDto, UpdateSectionDto } from './dto/section.dto';
import { ReorderDto } from '../common/dto/reorder.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CourseAccessGuard } from '../common/guards/course-access.guard';
import { ResourceOwnershipGuard } from '../common/guards/resource-ownership.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { OwnsResource } from '../common/decorators/owns-resource.decorator';
import { AuthToken } from '../common/decorators/auth-token.decorator';

@Controller('courses/:courseId/sections')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin', 'instructor')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  @UseGuards(CourseAccessGuard)
  create(
    @Param('courseId') courseId: string,
    @Body() dto: CreateSectionDto,
    @AuthToken() token: string,
  ) {
    return this.sectionsService.create(courseId, dto, token);
  }

  @Patch(':sectionId')
  @OwnsResource('section')
  @UseGuards(ResourceOwnershipGuard)
  update(
    @Param('sectionId') sectionId: string,
    @Body() dto: UpdateSectionDto,
    @AuthToken() token: string,
  ) {
    return this.sectionsService.update(sectionId, dto, token);
  }

  @Delete(':sectionId')
  @OwnsResource('section')
  @UseGuards(ResourceOwnershipGuard)
  delete(
    @Param('courseId') courseId: string,
    @Param('sectionId') sectionId: string,
    @AuthToken() token: string,
  ) {
    return this.sectionsService.delete(courseId, sectionId, token);
  }

  @Put('reorder')
  @UseGuards(CourseAccessGuard)
  reorder(
    @Param('courseId') courseId: string,
    @Body() dto: ReorderDto,
    @AuthToken() token: string,
  ) {
    return this.sectionsService.reorder(courseId, dto.orderedIds, token);
  }
}
