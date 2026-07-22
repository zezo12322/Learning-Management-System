import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { UpdateProgressDto } from './dto/progress.dto';
import { CompletionService } from '../completion/completion.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { COMPLETION_THRESHOLD } from './lecture-progress.queue';

@Injectable()
export class ProgressService {
  constructor(
    private readonly dc: DataConnectService,
    private readonly completionService: CompletionService,
    private readonly enrollmentService: EnrollmentService,
  ) {}

  async updateProgress(
    lectureId: string,
    dto: UpdateProgressDto,
    authToken: string,
    uid: string,
  ) {
    // Load the authoritative lecture duration (+ owning course) so completion is
    // derived server-side, exactly like the async worker (ProgressProcessor).
    // The client's `dto.completed` is deliberately NOT trusted — otherwise a user
    // could PUT `{ completed: true }` to mark any lecture done without watching
    // it, spoofing completion (and cascading to certificates via KAN-116).
    const lectureData = await this.dc.executeQuery(
      'GetLectureContent',
      { lectureId },
      authToken,
    );
    const lecture = lectureData?.courseLecture;
    if (!lecture) {
      throw new NotFoundException(`Lecture ${lectureId} not found`);
    }

    const courseId = lecture?.section?.course?.id;
    const isFreePreview = lecture?.isFreePreview ?? false;

    // ENROLLMENT VERIFICATION: Only enrolled students can record progress.
    // Free-preview lectures are exempt — anyone can preview them.
    if (courseId && !isFreePreview) {
      const enrollment = await this.enrollmentService.getCourseEnrollment(
        courseId,
        authToken,
      );
      if (
        !enrollment ||
        (enrollment.status !== 'ACTIVE' && enrollment.status !== 'COMPLETED')
      ) {
        throw new ForbiddenException(
          'You must be enrolled in the course to update lecture progress',
        );
      }
    }

    const duration = lecture?.duration ?? 0;

    // Only a positive duration can complete; lectures with unknown/zero duration
    // never auto-complete here.
    const completed =
      duration > 0 && dto.lastWatchedSecond >= duration * COMPLETION_THRESHOLD;
    const completedAt = completed ? new Date().toISOString() : null;

    // Clamp the stored position to the lecture length so a bad client can't
    // persist a position past the end.
    const storedSecond =
      duration > 0
        ? Math.min(dto.lastWatchedSecond, duration)
        : dto.lastWatchedSecond;

    // UpdateLectureProgress is NO_ACCESS (backend-only) and runs via the service
    // account, so the progress owner is passed explicitly rather than derived
    // from auth.uid. This prevents a client from faking lecture completion.
    await this.dc.executeMutation(
      'UpdateLectureProgress',
      {
        lectureId,
        lastWatchedSecond: storedSecond,
        completedAt,
        userId: uid,
      },
      authToken,
    );

    // Trigger completion check only on a real, server-derived completion (KAN-116)
    if (completed) {
      const courseId = lecture?.section?.course?.id;
      if (courseId) {
        await this.completionService.checkCourseCompletion(courseId, authToken);
      }
    }

    return { success: true, completed };
  }

  async getLectureProgress(lectureId: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'GetUserLectureProgress',
      { lectureId },
      authToken,
    );
    return (
      data?.lectureProgresses?.[0] ?? {
        lastWatchedSecond: 0,
        completedAt: null,
      }
    );
  }

  async getCourseProgress(courseId: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'GetMyCourseProgress',
      { courseId },
      authToken,
    );

    const sections = data?.sections ?? [];
    let totalLectures = 0;
    let completedLectures = 0;

    const sectionProgress = sections.map((section: any) => {
      const lectures = section.progressLectures ?? [];
      const sectionTotal = lectures.length;
      const sectionCompleted = lectures.filter(
        (l: any) => l.userProgress?.[0]?.completedAt != null,
      ).length;

      totalLectures += sectionTotal;
      completedLectures += sectionCompleted;

      return {
        sectionId: section.id,
        sectionTitle: section.title,
        totalLectures: sectionTotal,
        completedLectures: sectionCompleted,
        percentage:
          sectionTotal > 0
            ? Math.round((sectionCompleted / sectionTotal) * 100)
            : 0,
      };
    });

    return {
      totalLectures,
      completedLectures,
      overallPercentage:
        totalLectures > 0
          ? Math.round((completedLectures / totalLectures) * 100)
          : 0,
      sections: sectionProgress,
    };
  }
}
