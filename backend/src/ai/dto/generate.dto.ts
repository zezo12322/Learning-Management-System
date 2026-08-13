import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

/**
 * Structured-generation contract for `POST /v1/rag/generate` on the AI service
 * (KAN-181 / KAN-159). The upstream service retrieves the *whole* transcript in
 * chronological order — not a semantic top-k — and asks the model for a JSON
 * document matching the requested `kind`.
 *
 * These types mirror the AI service's schema on purpose: the response is proxied
 * through unchanged (snake_case included), exactly like the RAG chat payload, so
 * that clients written against the AI service contract keep working.
 */
export enum GenerateKind {
  SUMMARY = 'SUMMARY',
  OUTCOMES = 'OUTCOMES',
  QUIZ = 'QUIZ',
  LESSON_PLAN = 'LESSON_PLAN',
}

/** Upper bound the AI service enforces on `count`; rejected here to save a round trip. */
export const MAX_GENERATE_COUNT = 20;
export const DEFAULT_GENERATE_COUNT = 3;
export const DEFAULT_GENERATE_LANGUAGE = 'auto';

export class GenerateContentDto {
  /** What to generate. Drives which response field is populated. */
  @IsEnum(GenerateKind)
  kind: GenerateKind;

  /**
   * How many items to produce (quiz questions, outcomes, lesson-plan steps).
   * Ignored by the upstream service for `SUMMARY`.
   */
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(MAX_GENERATE_COUNT)
  count?: number = DEFAULT_GENERATE_COUNT;

  /**
   * Target output language, or `"auto"` to follow the video's detected spoken
   * language (KAN-159).
   *
   * The value is interpolated into the upstream model prompt, so it is
   * constrained to something that can only *be* a language: letters and hyphens,
   * which admits both tags (`en`, `ar`, `pt-BR`) and names (`English`,
   * `Modern-Standard-Arabic`) while leaving no room for injected instructions.
   */
  @IsOptional()
  @IsString()
  @MaxLength(35)
  @Matches(/^[A-Za-z][A-Za-z-]*$/, {
    message:
      'language must be "auto", a language tag (e.g. "en", "pt-BR") or a language name',
  })
  language?: string = DEFAULT_GENERATE_LANGUAGE;
}

/** Transcript chunk a generated item is grounded in. Timestamps are server-resolved. */
export interface SourceRef {
  chunk_id: string;
  start_ms: number;
  end_ms: number;
}

export interface QuizOptionOut {
  text: string;
  is_correct: boolean;
}

export interface QuizQuestionOut {
  question: string;
  options: QuizOptionOut[];
  explanation: string;
  source: SourceRef;
}

/**
 * Dynamic by `kind`: `summary` for SUMMARY, `items` for OUTCOMES / LESSON_PLAN,
 * `questions` for QUIZ. The other fields come back `null`.
 */
export interface GenerateResponse {
  kind: GenerateKind;
  summary: string | null;
  items: string[] | null;
  questions: QuizQuestionOut[] | null;
}

/** Error body shape shared with the AI service (`EMPTY_TRANSCRIPT`, `VIDEO_NOT_READY`, …). */
export interface AiErrorBody {
  error: {
    code: string;
    message: string;
    request_id: string;
  };
}
