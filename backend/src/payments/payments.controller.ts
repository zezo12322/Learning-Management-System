import {
  Body,
  Controller,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { AuthToken } from '../common/decorators/auth-token.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PaymentsService } from './payments.service';
import { PaymobService } from './paymob.service';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly payments: PaymentsService,
    private readonly paymob: PaymobService,
  ) {}

  /**
   * Start a checkout for a paid course/mission. Authenticated: the price and
   * target are resolved server-side from the caller's token; the client only
   * names what it wants to buy.
   */
  @Post('checkout')
  @UseGuards(FirebaseAuthGuard)
  createCheckout(
    @Body() dto: CheckoutDto,
    @AuthToken() token: string,
    @CurrentUser() user: { uid: string; email?: string; name?: string },
  ) {
    return this.payments.createCheckout(dto, token, user);
  }

  /**
   * Paymob "transaction processed" callback. PUBLIC by necessity (Paymob is the
   * caller, not a logged-in user), so authenticity rests entirely on the HMAC:
   * an unverified callback is dropped with a 200 (so Paymob does not retry a
   * forged request forever) but produces NO side effects. Only the verified
   * transaction object is acted on.
   */
  @Post('webhook')
  @HttpCode(200)
  async webhook(
    @Query('hmac') hmac: string,
    @Body() payload: { type?: string; obj?: Record<string, any> },
  ): Promise<{ received: boolean }> {
    const obj = payload?.obj;
    if (!obj || !this.paymob.verifyWebhookHmac(obj, hmac)) {
      // Do not reveal why; do not act.
      return { received: false };
    }
    await this.payments.processVerifiedWebhook(obj);
    return { received: true };
  }
}
