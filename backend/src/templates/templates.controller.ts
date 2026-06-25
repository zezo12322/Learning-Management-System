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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TemplatesService } from './templates.service';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CourseAccessGuard } from '../common/guards/course-access.guard';
import { ResourceOwnershipGuard } from '../common/guards/resource-ownership.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { OwnsResource } from '../common/decorators/owns-resource.decorator';
import { AuthToken } from '../common/decorators/auth-token.decorator';
import { FileValidationPipe } from '../common/pipes/file-validation.pipe';
import { CreateTemplateDto } from './dto/template.dto';

@Controller('missions/:missionId/templates')
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  @UseInterceptors(FileInterceptor('file', { storage: undefined }))
  upload(
    @Param('missionId') missionId: string,
    @Body() dto: CreateTemplateDto,
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
    @AuthToken() token: string,
  ) {
    return this.templatesService.upload(missionId, dto.title, file, token);
  }

  @Get()
  findAll(@Param('missionId') missionId: string, @AuthToken() token: string) {
    return this.templatesService.findAll(missionId, token);
  }

  @Delete(':templateId')
  @Roles('admin', 'instructor')
  @OwnsResource('template')
  @UseGuards(ResourceOwnershipGuard)
  delete(
    @Param('missionId') missionId: string,
    @Param('templateId') templateId: string,
    @AuthToken() token: string,
  ) {
    return this.templatesService.delete(missionId, templateId, token);
  }
}
