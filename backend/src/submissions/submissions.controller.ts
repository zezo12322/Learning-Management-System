import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto, GradeSubmissionDto } from './dto/submission.dto';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthToken } from '../common/decorators/auth-token.decorator';

@Controller()
@UseGuards(FirebaseAuthGuard, RolesGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  // ----- Student -----

  @Post('missions/:missionId/submissions')
  submit(
    @Param('missionId') missionId: string,
    @Body() dto: CreateSubmissionDto,
    @AuthToken() token: string,
    @CurrentUser('uid') uid: string,
  ) {
    return this.submissionsService.submit(missionId, dto, token, uid);
  }

  @Get('me/submissions')
  mySubmissions(@AuthToken() token: string) {
    return this.submissionsService.mySubmissions(token);
  }

  // ----- Instructor / Admin -----

  @Get('submissions/pending')
  @Roles('admin', 'instructor')
  pending(@AuthToken() token: string, @Req() req: any) {
    const isAdmin = (req.userRoles ?? []).includes('admin');
    return this.submissionsService.pending(token, isAdmin);
  }

  @Post('submissions/:submissionId/grade')
  @Roles('admin', 'instructor')
  grade(
    @Param('submissionId') submissionId: string,
    @Body() dto: GradeSubmissionDto,
    @CurrentUser('uid') uid: string,
    @AuthToken() token: string,
    @Req() req: any,
  ) {
    const isAdmin = (req.userRoles ?? []).includes('admin');
    return this.submissionsService.grade(
      submissionId,
      dto,
      token,
      uid,
      isAdmin,
    );
  }
}
