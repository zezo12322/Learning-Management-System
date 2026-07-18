import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

/**
 * What the learner is paying for. Mirrors the PaymentItemTarget enum in the
 * Data Connect schema (COURSE / MISSION / SUBSCRIPTION). Only COURSE and
 * MISSION are wired for one-off checkout today.
 */
export enum CheckoutTarget {
  COURSE = 'COURSE',
  MISSION = 'MISSION',
}

export class CheckoutDto {
  @IsEnum(CheckoutTarget)
  targetType: CheckoutTarget;

  /** Required when targetType = COURSE. */
  @IsOptional()
  @IsString()
  @MaxLength(64)
  courseId?: string;

  /** Required when targetType = MISSION. */
  @IsOptional()
  @IsString()
  @MaxLength(64)
  missionId?: string;
}
