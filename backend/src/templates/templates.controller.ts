import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TemplatesService } from './templates.service';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CourseAccessGuard } from '../common/guards/course-access.guard';
import { ResourceOwnershipGuard } from '../common/guards/resource-ownership.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { OwnsResource } from '../common/decorators/owns-resource.decorator';
import { FileValidationPipe } from '../common/pipes/file-validation.pipe';
import { DataConnectService } from '../firebase/dataconnect.service';

@Controller('missions/:missionId/templates')
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class TemplatesController {
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly dc: DataConnectService,
  ) {}

  @Post()
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  @UseInterceptors(FileInterceptor('file', { storage: undefined }))
  upload(
    @Param('missionId') missionId: string,
    @Body('title') title: string,
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
    @Req() req: any,
  ) {
    return this.templatesService.upload(
      missionId,
      title,
      file,
      this.dc.extractToken(req),
    );
  }

  @Get()
  findAll(@Param('missionId') missionId: string, @Req() req: any) {
    return this.templatesService.findAll(missionId, this.dc.extractToken(req));
  }

  @Delete(':templateId')
  @Roles('admin', 'instructor')
  @OwnsResource('template')
  @UseGuards(ResourceOwnershipGuard)
  delete(
    @Param('missionId') missionId: string,
    @Param('templateId') templateId: string,
    @Req() req: any,
  ) {
    return this.templatesService.delete(
      missionId,
      templateId,
      this.dc.extractToken(req),
    );
  }
}
