import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ResourceOwnershipGuard } from '../common/guards/resource-ownership.guard';
import { OwnsResource } from '../common/decorators/owns-resource.decorator';
import { AuthToken } from '../common/decorators/auth-token.decorator';

@Controller('ai')
@UseGuards(FirebaseAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('lectures/:lectureId/status')
  getStatus(@Param('lectureId') lectureId: string) {
    return this.aiService.getStatus(lectureId);
  }

  @Post('lectures/:lectureId/chat')
  chat(
    @Param('lectureId') lectureId: string,
    @CurrentUser('uid') uid: string,
    @Body() payload: { message: string; playbackMs: number; sessionId: string },
    @AuthToken() token: string,
    @Req() req: any,
  ) {
    const isAdmin = (req.userRoles ?? []).includes('admin');
    return this.aiService.chat(lectureId, uid, payload, token, isAdmin);
  }

  @Post('lectures/:lectureId/retry')
  @UseGuards(RolesGuard, ResourceOwnershipGuard)
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  retryIngest(@Param('lectureId') lectureId: string) {
    return this.aiService.retryIngest(lectureId);
  }

  @Post('lectures/:lectureId/generate')
  @UseGuards(RolesGuard, ResourceOwnershipGuard)
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  generate(
    @Param('lectureId') lectureId: string,
    @CurrentUser('uid') uid: string,
    @Body() payload: any,
  ) {
    return this.aiService.generate(lectureId, uid, payload);
  }
}
