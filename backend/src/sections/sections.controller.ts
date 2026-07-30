import { Controller, Post, Patch, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
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
import { AuditLoggingService } from '../logging/logging.service';

@Controller('courses/:courseId/sections')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin', 'instructor')
export class SectionsController {
  constructor(
    private readonly sectionsService: SectionsService,
    private readonly auditLoggingService: AuditLoggingService,
  ) {}

  @Post()
  @UseGuards(CourseAccessGuard)
  async create(
    @Param('courseId') courseId: string,
    @Body() dto: CreateSectionDto,
    @AuthToken() token: string,
    @Req() req: any,
  ) {
    const result = await this.sectionsService.create(courseId, dto, token);
    // fire-and-forget — a Firestore failure must never affect the API response
    this.auditLoggingService.createLog({
      action: 'CREATE_SECTION',
      adminUid: req.user?.uid ?? 'unknown',
      targetUid: result?.section_insert?.id ?? null,
      ipAddress: req.ip,
      details: dto,
    });
    return result;
  }

  @Patch(':sectionId')
  @OwnsResource('section')
  @UseGuards(ResourceOwnershipGuard)
  async update(
    @Param('sectionId') sectionId: string,
    @Body() dto: UpdateSectionDto,
    @AuthToken() token: string,
    @Req() req: any,
  ) {
    const result = await this.sectionsService.update(sectionId, dto, token);
    this.auditLoggingService.createLog({
      action: 'UPDATE_SECTION',
      adminUid: req.user?.uid ?? 'unknown',
      targetUid: sectionId,
      ipAddress: req.ip,
      details: dto,
    });
    return result;
  }

  @Delete(':sectionId')
  @OwnsResource('section')
  @UseGuards(ResourceOwnershipGuard)
  async delete(
    @Param('courseId') courseId: string,
    @Param('sectionId') sectionId: string,
    @AuthToken() token: string,
    @Req() req: any,
  ) {
    const result = await this.sectionsService.delete(courseId, sectionId, token);
    this.auditLoggingService.createLog({
      action: 'DELETE_SECTION',
      adminUid: req.user?.uid ?? 'unknown',
      targetUid: sectionId,
      ipAddress: req.ip,
      details: { courseId, sectionId },
    });
    return result;
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
