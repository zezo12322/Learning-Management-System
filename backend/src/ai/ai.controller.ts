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
import { Throttle } from '@nestjs/throttler';
import { GenerateContentDto } from './dto/generate.dto';
import type { GenerateResponse } from './dto/generate.dto';

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

  /**
   * Structured generation from the lecture transcript — summary, learning
   * outcomes, quiz questions, or a lesson plan (KAN-181).
   *
   * Rate-limited well below the app-wide 100/min: one call runs a full-transcript
   * LLM pass, so this is the most expensive route in the API and the limit is
   * about upstream cost, not abuse alone.
   */
  @Post('lectures/:lectureId/generate')
  @UseGuards(RolesGuard, ResourceOwnershipGuard)
  @Roles('admin', 'instructor')
  @OwnsResource('lecture')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  generate(
    @Param('lectureId') lectureId: string,
    @CurrentUser('uid') uid: string,
    @Body() dto: GenerateContentDto,
  ): Promise<GenerateResponse> {
    return this.aiService.generate(lectureId, uid, dto);
  }
}
