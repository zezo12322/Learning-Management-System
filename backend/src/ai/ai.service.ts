import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  BadGatewayException,
  GatewayTimeoutException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { FirebaseService } from '../firebase/firebase.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  AI_CLEANUP_QUEUE,
  AiCleanupJob,
} from '../transcoding/transcoding.queue';
import { AccessService } from '../common/services/access.service';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import {
  DEFAULT_GENERATE_COUNT,
  DEFAULT_GENERATE_LANGUAGE,
  GenerateContentDto,
  GenerateKind,
} from './dto/generate.dto';
import type { AiErrorBody, GenerateResponse } from './dto/generate.dto';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly aiUrl =
    process.env.AI_SERVICE_URL || 'http://localhost:8000';
  private readonly apiKey = process.env.INTERNAL_API_KEY || 'default-secret';
  private readonly aiTenantId =
    process.env.AI_TENANT_ID || '00000000-0000-5000-8000-000000000001';
  private readonly uuidNamespace = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';

  /**
   * Structured generation reads the *entire* transcript before the model writes
   * a word, so it runs far longer than chat: minutes on a long lecture. The
   * default is deliberately generous — a premature abort here wastes the whole
   * upstream inference, which is the expensive part.
   */
  private readonly generateTimeoutMs = Number(
    process.env.AI_GENERATE_TIMEOUT_MS ?? 180000,
  );

  constructor(
    private readonly dc: DataConnectService,
    private readonly firebase: FirebaseService,
    @InjectQueue(AI_CLEANUP_QUEUE)
    private readonly cleanupQueue: Queue<AiCleanupJob>,
    private readonly access: AccessService,
  ) {}

  async getStatus(lectureId: string) {
    const data = await this.dc.executeQueryAsAdmin('GetLectureContent', {
      lectureId,
    });
    const lecture = data?.courseLecture;
    if (!lecture) throw new NotFoundException('Lecture not found');

    const aiJobId = lecture.aiJobId;
    if (!aiJobId) {
      // If there's no job ID, it's either not a video or not ingested yet
      return { status: 'UNKNOWN' };
    }

    try {
      const res = await fetch(`${this.aiUrl}/v1/jobs/${aiJobId}`, {
        headers: { 'X-Internal-Api-Key': this.apiKey },
      });
      if (!res.ok) {
        if (res.status === 404) return { status: 'UNKNOWN' };
        throw new Error(`AI API returned ${res.status}`);
      }
      return await res.json();
    } catch (err: any) {
      this.logger.error(
        `Failed to fetch AI status for lecture ${lectureId}: ${err.message}`,
      );
      throw new InternalServerErrorException(
        'Failed to communicate with AI Service',
      );
    }
  }

  async chat(
    lectureId: string,
    userId: string,
    payload: { message: string; playbackMs: number; sessionId: string },
    token: string,
    isAdmin: boolean = false,
  ) {
    const data = await this.dc.executeQueryAsAdmin('GetLectureContent', {
      lectureId,
    });
    const lecture = data?.courseLecture;
    if (!lecture) throw new NotFoundException('Lecture not found');

    const courseId = lecture.section?.course?.id;
    if (!courseId)
      throw new BadRequestException('Course ID not found for lecture');

    if (!lecture.isFreePreview) {
      let hasAccess = false;
      try {
        await this.access.assertCourseAccess(courseId, userId, token, isAdmin);
        hasAccess = true;
      } catch {
        // Not owner, check enrollment
        const enrollmentData = await this.dc.executeQuery(
          'GetUserEnrollmentForCourse',
          { courseId },
          token,
        );
        const enrollmentStatus = enrollmentData?.enrollments?.[0]?.status;
        if (enrollmentStatus === 'ACTIVE' || enrollmentStatus === 'COMPLETED') {
          hasAccess = true;
        }
      }

      if (!hasAccess) {
        throw new ForbiddenException(
          'You must be enrolled in this course to chat with this lecture',
        );
      }
    }

    try {
      const res = await fetch(`${this.aiUrl}/v1/rag/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Internal-Api-Key': this.apiKey,
        },
        body: JSON.stringify({
          request_id: uuidv4(),
          tenant_id: this.aiTenantId,
          user_id: uuidv5(userId, this.uuidNamespace),
          course_id: courseId,
          video_id: lectureId,
          session_id: payload.sessionId,
          playback_ms: payload.playbackMs,
          message: payload.message,
        }),
      });

      if (!res.ok) {
        throw new Error(`AI API returned ${res.status}: ${await res.text()}`);
      }
      return await res.json();
    } catch (err: any) {
      this.logger.error(
        `Failed to send chat for lecture ${lectureId}: ${err.message}`,
      );
      throw new InternalServerErrorException(
        'Failed to communicate with AI Service',
      );
    }
  }

  /**
   * Structured generation over a lecture's transcript — summary, learning
   * outcomes, quiz questions, or a lesson plan (KAN-181).
   *
   * The heavy lifting is the AI service's: it verifies the video is READY,
   * resolves `language: "auto"` to the video's spoken language (KAN-159), pulls
   * every transcript chunk in chronological order, and — for quizzes — resolves
   * the model's `chunk_id` references to real `start_ms`/`end_ms` so timestamps
   * cannot be hallucinated. This method owns the LMS half: authorization has
   * already run in the guards, so what is left is resolving the lecture to the
   * ids the AI service keys on, refusing videos that were never sent for
   * indexing, and translating upstream failures into an honest HTTP status.
   *
   * The response is passed through in the AI service's own shape (snake_case
   * `is_correct` / `chunk_id` / `start_ms`), matching how the RAG chat payload
   * is proxied.
   */
  async generate(
    lectureId: string,
    userId: string,
    dto: GenerateContentDto,
  ): Promise<GenerateResponse> {
    const data = await this.dc.executeQueryAsAdmin('GetLectureContent', {
      lectureId,
    });
    const lecture = data?.courseLecture;
    if (!lecture) throw new NotFoundException('Lecture not found');

    const courseId = lecture.section?.course?.id;
    if (!courseId)
      throw new BadRequestException('Course ID not found for lecture');

    const requestId = uuidv4();

    // A lecture only gets an aiJobId when ingestion is triggered (transcoding
    // processor, or a manual retry). Without one there is nothing indexed
    // upstream, so the AI service's own readiness check would 422 after a full
    // round trip — answer it here, in the same shape it would have used.
    if (!lecture.aiJobId) {
      throw new UnprocessableEntityException(
        this.aiError(
          'VIDEO_NOT_READY',
          'This video has not been processed by the AI service yet.',
          requestId,
        ),
      );
    }

    const kind = dto.kind;
    const body = {
      request_id: requestId,
      tenant_id: this.aiTenantId,
      user_id: uuidv5(userId, this.uuidNamespace),
      course_id: courseId,
      video_id: lectureId,
      kind,
      count: dto.count ?? DEFAULT_GENERATE_COUNT,
      language: dto.language ?? DEFAULT_GENERATE_LANGUAGE,
    };

    let res: Response;
    try {
      res = await fetch(`${this.aiUrl}/v1/rag/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Internal-Api-Key': this.apiKey,
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(this.generateTimeoutMs),
      });
    } catch (err: any) {
      if (err?.name === 'TimeoutError' || err?.name === 'AbortError') {
        this.logger.error(
          `AI generate (${kind}) timed out after ${this.generateTimeoutMs}ms for lecture ${lectureId}`,
        );
        throw new GatewayTimeoutException(
          this.aiError(
            'AI_TIMEOUT',
            'Generation took too long. Please try again.',
            requestId,
          ),
        );
      }
      this.logger.error(
        `AI generate (${kind}) network error for lecture ${lectureId}: ${err?.message}`,
      );
      throw new BadGatewayException(
        this.aiError(
          'AI_UNAVAILABLE',
          'Failed to communicate with AI Service',
          requestId,
        ),
      );
    }

    if (!res.ok) {
      throw await this.toUpstreamException(res, lectureId, kind, requestId);
    }

    let parsed: unknown;
    try {
      parsed = await res.json();
    } catch (err: any) {
      this.logger.error(
        `AI generate (${kind}) returned unparseable JSON for lecture ${lectureId}: ${err?.message}`,
      );
      parsed = null;
    }

    return this.parseGenerateResponse(parsed, kind, lectureId, requestId);
  }

  /** Builds the `{ error: { code, message, request_id } }` body the AI service uses. */
  private aiError(
    code: string,
    message: string,
    requestId: string,
  ): AiErrorBody {
    return { error: { code, message, request_id: requestId } };
  }

  /**
   * Maps a non-2xx from the AI service to an exception for the client.
   *
   * An upstream 4xx describes the *caller's* situation (`VIDEO_NOT_READY`,
   * `EMPTY_TRANSCRIPT`), so the status is forwarded and the client keeps a
   * meaningful reason. The status is what decides that — NOT whether the body
   * happens to match the documented envelope: only `EMPTY_TRANSCRIPT` is spelled
   * out in the spec, and a FastAPI upstream may well answer `{"detail": …}`
   * instead. Demanding the envelope would have turned a real 422 into a 502 and
   * told instructors the AI was down when their video was merely still indexing.
   * Where no machine-readable code is found, the status still carries the truth
   * and `AI_REJECTED` says plainly that the code is unknown.
   *
   * 5xx and auth failures (a bad INTERNAL_API_KEY) are this deployment's
   * problem, not the caller's: logged in full, returned as a generic 502 so
   * upstream internals never reach the client.
   */
  private async toUpstreamException(
    res: Response,
    lectureId: string,
    kind: GenerateKind,
    requestId: string,
  ): Promise<HttpException> {
    const raw = await res.text().catch(() => '');
    const isForwardable =
      res.status >= 400 &&
      res.status < 500 &&
      res.status !== HttpStatus.UNAUTHORIZED &&
      res.status !== HttpStatus.FORBIDDEN;

    if (isForwardable) {
      const { code, message } = extractUpstreamError(raw);
      this.logger.warn(
        `AI generate (${kind}) rejected for lecture ${lectureId}: ${res.status} ${code ?? raw.slice(0, 200)}`,
      );
      return new HttpException(
        this.aiError(
          code ?? 'AI_REJECTED',
          message ?? 'The AI service could not fulfil this request.',
          requestId,
        ),
        res.status,
      );
    }

    this.logger.error(
      `AI generate (${kind}) failed for lecture ${lectureId}: ${res.status} ${raw.slice(0, 500)}`,
    );
    return new BadGatewayException(
      this.aiError(
        'AI_UNAVAILABLE',
        'Failed to communicate with AI Service',
        requestId,
      ),
    );
  }

  /**
   * Checks that the payload actually carries the field the requested `kind`
   * promises before handing it to a client.
   *
   * A structurally empty success (`{"kind":"QUIZ","questions":null}`) is worse
   * than an error: the instructor's UI renders nothing with no explanation, and
   * the failure is invisible in the logs. Treated as an upstream fault (502).
   */
  private parseGenerateResponse(
    parsed: unknown,
    kind: GenerateKind,
    lectureId: string,
    requestId: string,
  ): GenerateResponse {
    const payload = (
      typeof parsed === 'object' && parsed !== null ? parsed : {}
    ) as Partial<GenerateResponse>;

    const summary =
      typeof payload.summary === 'string' ? payload.summary : null;
    const items = Array.isArray(payload.items)
      ? payload.items.filter((item): item is string => typeof item === 'string')
      : null;
    const questions = Array.isArray(payload.questions)
      ? payload.questions
      : null;

    const populated =
      kind === GenerateKind.SUMMARY
        ? !!summary?.trim()
        : kind === GenerateKind.QUIZ
          ? !!questions?.length
          : !!items?.length;

    if (!populated) {
      this.logger.error(
        `AI generate (${kind}) returned no content for lecture ${lectureId}`,
      );
      throw new BadGatewayException(
        this.aiError(
          'AI_EMPTY_RESULT',
          'The AI service returned no content for this request.',
          requestId,
        ),
      );
    }

    // Normalized to the documented shape: exactly one field populated per kind,
    // the rest explicitly null, so clients can switch on `kind` alone.
    return {
      kind,
      summary: kind === GenerateKind.SUMMARY ? summary : null,
      items:
        kind === GenerateKind.OUTCOMES || kind === GenerateKind.LESSON_PLAN
          ? items
          : null,
      questions: kind === GenerateKind.QUIZ ? questions : null,
    };
  }

  async retryIngest(lectureId: string) {
    const data = await this.dc.executeQueryAsAdmin('GetLectureContent', {
      lectureId,
    });
    const lecture = data?.courseLecture;
    if (!lecture) throw new NotFoundException('Lecture not found');

    const originalVideoUrl = lecture.originalVideoUrl;
    if (!originalVideoUrl) {
      throw new BadRequestException(
        'Original video file is no longer available. Please re-upload the video.',
      );
    }

    const courseId = lecture.section?.course?.id;
    const authorId = lecture.section?.course?.author?.id || 'default-author-id';
    const duration = lecture.duration;
    const aiJobId = uuidv4();

    // Generate signed URL
    const signedVideoUrl = await this.firebase.generateSignedReadUrl(
      originalVideoUrl,
      120,
    );

    // Update DB with new Job ID
    await this.dc.executeMutationAsAdmin('AdminUpdateLecture', {
      lectureId,
      aiJobId,
    });

    try {
      const ingestRes = await fetch(`${this.aiUrl}/v1/ingest/video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Internal-Api-Key': this.apiKey,
        },
        body: JSON.stringify({
          job_id: aiJobId,
          tenant_id: this.aiTenantId,
          user_id: uuidv5(authorId, this.uuidNamespace),
          course_id: courseId,
          video_id: lectureId,
          video_title: lecture.title,
          video_url: signedVideoUrl,
          duration_ms: (duration || 0) * 1000,
          idempotency_key: `${lectureId}:transcribe_index_${Date.now()}`, // Use timestamp to force new ingestion
        }),
      });

      if (!ingestRes.ok && ingestRes.status !== 409) {
        let errorBody;
        try {
          errorBody = await ingestRes.json();
        } catch {
          errorBody = await ingestRes.text();
        }
        throw new HttpException(errorBody, ingestRes.status);
      }

      // Add to cleanup queue
      await this.cleanupQueue.add(
        'ai-cleanup-job',
        { aiJobId, sourcePath: originalVideoUrl, lectureId },
        {
          jobId: `cleanup-${aiJobId}`,
          attempts: 500,
          backoff: { type: 'fixed', delay: 15000 },
          removeOnComplete: true,
          removeOnFail: { age: 86400 * 7 },
        },
      );

      return { success: true, aiJobId };
    } catch (err: any) {
      if (err instanceof HttpException) throw err;
      this.logger.error(
        `AI retry ingestion failed for ${lectureId}: ${err?.message}`,
      );
      throw new InternalServerErrorException(
        'Failed to trigger AI ingestion retry',
      );
    }
  }
}

/** Longest upstream message forwarded to the client, matching AllExceptionsFilter. */
const MAX_UPSTREAM_MESSAGE_LENGTH = 300;

/**
 * Digs a machine-readable code and a human message out of an upstream error
 * body, whatever shape it arrived in.
 *
 * The AI service documents `{ error: { code, message } }`, but only for
 * `EMPTY_TRANSCRIPT`; the rest of its 4xx surface is unspecified, and FastAPI's
 * own errors come back as `{ detail: … }` — a string for `HTTPException`, an
 * object when the handler raises a structured detail. All three are checked so
 * a real error code survives the hop instead of being flattened away.
 *
 * Returns nulls rather than guessing: the caller supplies the fallback. A
 * non-string message (pydantic's validation array) is deliberately dropped — it
 * describes *our* request to the AI service, which is nothing the instructor
 * can act on, and it stays in the log either way.
 */
function extractUpstreamError(raw: string): {
  code: string | null;
  message: string | null;
} {
  const body = safeParseJson(raw);

  const candidates = [
    (body as AiErrorBody | null)?.error,
    (body as { detail?: unknown } | null)?.detail,
    body,
  ];

  for (const candidate of candidates) {
    if (typeof candidate !== 'object' || candidate === null) continue;
    const { code, message } = candidate as {
      code?: unknown;
      message?: unknown;
    };
    if (typeof code === 'string' && code) {
      return {
        code,
        message: typeof message === 'string' ? truncate(message) : null,
      };
    }
  }

  // No code anywhere, but FastAPI's `{"detail": "Video is still processing"}`
  // still tells the instructor something true about their video.
  const detail = (body as { detail?: unknown } | null)?.detail;
  return {
    code: null,
    message: typeof detail === 'string' && detail ? truncate(detail) : null,
  };
}

/** JSON.parse that yields null instead of throwing — an error body is not guaranteed JSON. */
function safeParseJson(raw: string): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function truncate(message: string): string {
  return message.length > MAX_UPSTREAM_MESSAGE_LENGTH
    ? `${message.slice(0, MAX_UPSTREAM_MESSAGE_LENGTH)}… (truncated)`
    : message;
}
