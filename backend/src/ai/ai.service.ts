import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ForbiddenException,
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
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly aiUrl =
    process.env.AI_SERVICE_URL || 'http://localhost:8000';
  private readonly apiKey = process.env.INTERNAL_API_KEY || 'default-secret';

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
          tenant_id: '550e8400-e29b-41d4-a716-446655440000',
          user_id: userId,
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
          tenant_id: '550e8400-e29b-41d4-a716-446655440000',
          course_id: courseId,
          video_id: lectureId,
          video_title: lecture.title,
          video_url: signedVideoUrl,
          duration_ms: (duration || 0) * 1000,
          idempotency_key: `${lectureId}:transcribe_index_${Date.now()}`, // Use timestamp to force new ingestion
        }),
      });

      if (!ingestRes.ok && ingestRes.status !== 409) {
        throw new Error(`AI Ingest failed: ${ingestRes.status}`);
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
      this.logger.error(
        `AI retry ingestion failed for ${lectureId}: ${err?.message}`,
      );
      throw new InternalServerErrorException(
        'Failed to trigger AI ingestion retry',
      );
    }
  }
}
