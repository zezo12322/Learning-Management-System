import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export const LEAD_STAGES = [
  'NEW',
  'ENGAGED',
  'QUALIFYING',
  'QUALIFIED',
  'DEMO_BOOKED',
  'PROPOSAL_SENT',
  'WON',
  'LOST',
  'UNQUALIFIED',
  'NURTURE',
] as const;

export const CHANNELS = ['WHATSAPP', 'MESSENGER', 'WEB', 'EMAIL'] as const;
export const SEGMENTS = ['UNKNOWN', 'B2C', 'B2B'] as const;
export const DOC_TYPES = [
  'PRODUCT',
  'PRICING',
  'FAQ',
  'OBJECTION',
  'CASE_STUDY',
  'POLICY',
  'COURSE',
] as const;
export const AUDIENCES = ['ALL', 'B2B', 'B2C'] as const;

export class ListLeadsQueryDto {
  @IsOptional()
  @IsIn(LEAD_STAGES as unknown as string[])
  stage?: string;

  @IsOptional()
  @IsIn(CHANNELS as unknown as string[])
  channel?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  min_score?: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  owner_user_id?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  awaiting_human?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  q?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number;
}

export class PatchLeadDto {
  @IsOptional()
  @IsIn(LEAD_STAGES as unknown as string[])
  stage?: string;

  @IsOptional()
  @IsIn(SEGMENTS as unknown as string[])
  segment?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  owner_user_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  notes?: string;

  @IsOptional()
  @IsBoolean()
  human_takeover?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  full_name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(320)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  company_name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1_000_000)
  company_size?: number;

  /** Records an opt-out on the lead's behalf (they told a rep). One-way. */
  @IsOptional()
  @IsBoolean()
  opt_out?: boolean;
}

export class SendMessageDto {
  @IsString()
  @MinLength(1)
  @MaxLength(4000)
  text!: string;

  @IsOptional()
  @IsIn(CHANNELS as unknown as string[])
  channel?: string;

  /**
   * Defaults to true in the agent: sending as a human takes the thread over so a
   * colleague and the model never answer the same question twice.
   */
  @IsOptional()
  @IsBoolean()
  take_over?: boolean;
}

export class EnrollDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  sequence_name!: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(8760)
  start_delay_hours?: number;
}

export class AddKnowledgeDto {
  @IsString()
  @MinLength(1)
  @MaxLength(300)
  title!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(200_000)
  content!: string;

  @IsOptional()
  @IsIn(DOC_TYPES as unknown as string[])
  doc_type?: string;

  @IsOptional()
  @IsIn(AUDIENCES as unknown as string[])
  audience?: string;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  locale?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  source_uri?: string;
}

export class PreviewChatDto {
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  session_id!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  message!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  display_name?: string;
}

export class UpsellOutcomeDto {
  @IsIn(['SHOWN', 'CLICKED', 'CONVERTED', 'DISMISSED'])
  outcome!: string;
}

/**
 * Usage signals the client may report for an upsell decision.
 *
 * Everything here is advisory and bounded — the agent decides whether to say
 * anything at all, and a client that inflates its numbers only changes the copy
 * it is shown, never an entitlement.
 */
export class UpsellRequestDto {
  @IsOptional()
  @IsString()
  @MaxLength(8)
  locale?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  current_plan?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100_000)
  enrolled_courses?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100_000)
  completed_courses?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1_000_000)
  completed_lectures?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  quiz_pass_rate?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100_000)
  days_active?: number;

  @IsOptional()
  @IsBoolean()
  hit_limit?: boolean;
}

/** Shape returned to the sales agent by the internal pricing endpoint. */
export class PricingTierResponse {
  @IsString()
  id!: string;

  @IsString()
  name!: string;

  @IsInt()
  price!: number;

  @IsString()
  billingCycle!: string;

  @IsArray()
  features!: string[];
}
