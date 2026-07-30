import {
  IsNumber,
  IsArray,
  IsObject,
  IsString,
  IsOptional,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Validation DTO for checkout requests.
 * Server validates and computes the actual price from the database.
 */
export class CheckoutItem {
  @IsString()
  targetType: 'COURSE' | 'MISSION' | 'SUBSCRIPTION';

  @IsString()
  @IsOptional()
  courseId?: string;

  @IsString()
  @IsOptional()
  missionId?: string;

  @IsString()
  @IsOptional()
  subscriptionTierId?: string;

  // Server computes the actual price from the database.
  // Client-provided price is IGNORED and never used for payment.
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;
}

export class CheckoutBillingData {
  @IsString()
  @IsOptional()
  apartment?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  floor?: string;

  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  building?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  shipping_method?: string;

  @IsString()
  @IsOptional()
  postal_code?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  state?: string;
}

export class CheckoutDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItem)
  items: CheckoutItem[];

  @IsObject()
  @ValidateNested()
  @Type(() => CheckoutBillingData)
  @IsOptional()
  billingData?: CheckoutBillingData;

  @IsString()
  @IsOptional()
  returnUrl?: string;
}
