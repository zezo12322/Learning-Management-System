import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuditLoggingService } from '../logging/logging.service';
import {
  AddKnowledgeDto,
  EnrollDto,
  ListLeadsQueryDto,
  PatchLeadDto,
  PreviewChatDto,
  SendMessageDto,
} from './dto/sales.dto';
import { SalesService } from './sales.service';

/**
 * Sales CRM surface for the web app.
 *
 * Admin and instructor only. The sales agent's own API is guarded by a shared
 * secret that must never reach a browser, so every CRM read and write comes
 * through here, where a Firebase token and a role are already established.
 *
 * Actions that reach a customer (sending a message, starting a cadence) carry
 * the caller's uid to the agent so the lead timeline records who did it, and are
 * written to the LMS audit log as well.
 */
@Controller('sales')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@Roles('admin', 'instructor')
export class SalesController {
  constructor(
    private readonly sales: SalesService,
    private readonly audit: AuditLoggingService,
  ) {}

  @Get('leads')
  listLeads(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    query: ListLeadsQueryDto,
  ) {
    return this.sales.listLeads({ ...query });
  }

  @Get('leads/:leadId')
  getLead(@Param('leadId') leadId: string) {
    return this.sales.getLead(leadId);
  }

  @Patch('leads/:leadId')
  async patchLead(
    @Param('leadId') leadId: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: PatchLeadDto,
    @CurrentUser('uid') uid: string,
  ) {
    const result = await this.sales.patchLead(leadId, { ...body, actor: uid });

    // fire-and-forget — logging failures must never affect the API response
    void this.audit.createLog({
      action: 'SALES_LEAD_UPDATE',
      adminUid: uid,
      targetUid: leadId,
      details: JSON.stringify(body).slice(0, 1000),
    } as any);

    return result;
  }

  /**
   * Send as a human. Rate-limited because this reaches a real person on WhatsApp
   * and a burst from the UI would be indistinguishable from spam at Meta's end.
   */
  @Post('leads/:leadId/messages')
  @Throttle({ default: { ttl: 60000, limit: 20 } })
  async sendMessage(
    @Param('leadId') leadId: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: SendMessageDto,
    @CurrentUser('uid') uid: string,
  ) {
    const result = await this.sales.sendMessage(leadId, {
      ...body,
      actor: uid,
    });

    void this.audit.createLog({
      action: 'SALES_HUMAN_MESSAGE',
      adminUid: uid,
      targetUid: leadId,
      details: `channel=${body.channel ?? 'default'} chars=${body.text.length}`,
    } as any);

    return result;
  }

  @Post('leads/:leadId/sequences')
  enroll(
    @Param('leadId') leadId: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: EnrollDto,
  ) {
    return this.sales.enrollInSequence(leadId, body);
  }

  @Delete('leads/:leadId/sequences')
  stopSequences(
    @Param('leadId') leadId: string,
    @Query('reason') reason?: string,
  ) {
    return this.sales.stopSequences(leadId, reason);
  }

  @Get('stats')
  stats() {
    return this.sales.stats();
  }

  @Get('sequences')
  sequences() {
    return this.sales.listSequences();
  }

  @Get('readiness')
  @Roles('admin')
  readiness() {
    return this.sales.readiness();
  }

  // --- Knowledge base -----------------------------------------------
  @Get('knowledge')
  listKnowledge(@Query('include_inactive') includeInactive?: string) {
    return this.sales.listKnowledge(includeInactive === 'true');
  }

  @Post('knowledge')
  @Roles('admin')
  async addKnowledge(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: AddKnowledgeDto,
    @CurrentUser('uid') uid: string,
  ) {
    const result = await this.sales.addKnowledge(body);
    void this.audit.createLog({
      action: 'SALES_KB_ADD',
      adminUid: uid,
      targetUid: body.title.slice(0, 200),
      details: `type=${body.doc_type ?? 'PRODUCT'} audience=${body.audience ?? 'ALL'}`,
    } as any);
    return result;
  }

  @Delete('knowledge/:documentId')
  @Roles('admin')
  async retireKnowledge(
    @Param('documentId') documentId: string,
    @CurrentUser('uid') uid: string,
  ) {
    const result = await this.sales.retireKnowledge(documentId);
    void this.audit.createLog({
      action: 'SALES_KB_RETIRE',
      adminUid: uid,
      targetUid: documentId,
      details: 'retired from retrieval',
    } as any);
    return result;
  }

  @Post('knowledge/seed')
  @Roles('admin')
  seedKnowledge() {
    return this.sales.seedKnowledge();
  }

  /**
   * Talk to the agent from the admin UI with no Meta connection.
   *
   * Sessions are namespaced by the caller's uid so two admins testing at the
   * same time do not land in one conversation — and so a preview lead is never
   * confused with a real prospect.
   */
  @Post('preview/chat')
  @Roles('admin')
  @Throttle({ default: { ttl: 60000, limit: 30 } })
  previewChat(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: PreviewChatDto,
    @CurrentUser('uid') uid: string,
  ) {
    return this.sales.previewChat({
      ...body,
      session_id: `${uid}:${body.session_id}`,
    });
  }

  @Post('outbound/drain')
  @Roles('admin')
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  drainOutbound(@Body('limit') limit?: number) {
    return this.sales.drainOutbound(limit ?? 50);
  }
}
