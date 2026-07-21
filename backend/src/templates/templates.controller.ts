import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
  UseFilters,
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
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { FileValidationPipe } from '../common/pipes/file-validation.pipe';
import { MulterExceptionFilter } from '../common/filters/multer-exception.filter';
import { FILE_SIZE_LIMITS } from '../common/constants/storage-paths';
import { CreateTemplateDto } from './dto/template.dto';

@Controller('missions/:missionId/templates')
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  @Roles('admin', 'instructor')
  @UseGuards(CourseAccessGuard)
  @UseFilters(MulterExceptionFilter)
  // Cap the upload at the Multer layer so an oversized body is rejected while
  // streaming, before the whole file is buffered into memory. FileValidationPipe
  // re-checks size, but that runs only AFTER Multer has read the full body — on
  // its own it can't prevent a memory-exhaustion DoS.
  @UseInterceptors(
    FileInterceptor('file', {
      storage: undefined,
      limits: { fileSize: FILE_SIZE_LIMITS.TEMPLATE, files: 1 },
    }),
  )
  upload(
    @Param('missionId') missionId: string,
    @Body() dto: CreateTemplateDto,
    @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
    @AuthToken() token: string,
  ) {
    return this.templatesService.upload(missionId, dto.title, file, token);
  }

  @Get()
  findAll(
    @Param('missionId') missionId: string,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
    @Req() req: any,
  ) {
    const isAdmin = (req.userRoles ?? []).includes('admin');
    return this.templatesService.findAll(missionId, token, uid, isAdmin);
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
