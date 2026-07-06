import { IsString, MaxLength } from 'class-validator';

export class TranscodeVideoDto {
  /**
   * Private storage path of the uploaded source MP4 (the path returned by the
   * upload flow, e.g. `courses/<c>/lectures/<l>/video/<file>.mp4`). The service
   * verifies it belongs to this lecture before queueing.
   */
  @IsString()
  @MaxLength(1024)
  sourcePath: string;
}
