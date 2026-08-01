import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  MaxLength,
} from 'class-validator';

/**
 * Provisions/refreshes the authenticated user's core record (M9). The uid is
 * taken server-side from the verified token (auth.uid) — never from the body.
 * Egyptian legal compliance requires ToS acceptance.
 * The frontend MUST send acceptedToS: true for registration to proceed.
 */
export class SyncUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  avatar?: string;

  @IsOptional()
  @IsBoolean()
  acceptedToS?: boolean;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  bio?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  company?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;

  // Free-form JSON blob of synced client preferences (schema type: Any).
  @IsOptional()
  preferences?: Record<string, any>;
}
