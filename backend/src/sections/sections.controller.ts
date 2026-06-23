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
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller('courses/:courseId/sections')
@UseGuards(FirebaseAuthGuard)
export class SectionsController {
  constructor(
    private readonly sectionsService: SectionsService,
    private readonly dc: DataConnectService,
  ) {}

  @Post()
  create(
    @Param('courseId') courseId: string,
    @Body() dto: CreateSectionDto,
    @Req() req: any,
  ) {
    return this.sectionsService.create(courseId, dto, this.dc.extractToken(req));
  }

  @Patch(':sectionId')
  update(
    @Param('sectionId') sectionId: string,
    @Body() dto: UpdateSectionDto,
    @Req() req: any,
  ) {
    return this.sectionsService.update(sectionId, dto, this.dc.extractToken(req));
  }

  @Delete(':sectionId')
  delete(
    @Param('courseId') courseId: string,
    @Param('sectionId') sectionId: string,
    @Req() req: any,
  ) {
    return this.sectionsService.delete(courseId, sectionId, this.dc.extractToken(req));
  }

  @Put('reorder')
  reorder(
    @Param('courseId') courseId: string,
    @Body() dto: ReorderDto,
    @Req() req: any,
  ) {
    return this.sectionsService.reorder(courseId, dto.orderedIds, this.dc.extractToken(req));
  }
}
