import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { UpsellOutcomeDto, UpsellRequestDto } from './dto/sales.dto';
import { SalesService } from './sales.service';

/**
 * In-product upgrade suggestions for the signed-in learner.
 *
 * Separate from the admin CRM controller because the audience is different: any
 * authenticated user may ask, and the uid comes from their own token — never
 * from the body. A client that could name another user here would be able to
 * read that user's suggestion history.
 *
 * The response is frequently `{ recommendation: null }`, which is the point: the
 * agent stays quiet unless the usage signals justify saying something.
 */
@Controller('sales/upsell')
@UseGuards(FirebaseAuthGuard)
export class SalesUpsellController {
  constructor(private readonly sales: SalesService) {}

  @Post('me')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  recommend(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: UpsellRequestDto,
    @CurrentUser('uid') uid: string,
  ) {
    return this.sales.recommendUpsell({ ...body, lms_user_id: uid });
  }

  /**
   * Report what the learner did with a suggestion, so conversion of these is
   * measurable rather than assumed.
   */
  @Post(':recommendationId/outcome')
  @Throttle({ default: { ttl: 60000, limit: 30 } })
  outcome(
    @Param('recommendationId') recommendationId: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: UpsellOutcomeDto,
  ) {
    return this.sales.recordUpsellOutcome(recommendationId, body.outcome);
  }
}
