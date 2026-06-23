import { IsString } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  title: string;
}

export class UpdateSectionDto {
  @IsString()
  title: string;
}
