import { Injectable } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { UpdateProgressDto } from './dto/progress.dto';
import { CompletionService } from '../completion/completion.service';

@Injectable()
export class ProgressService {
  constructor(
    private readonly dc: DataConnectService,
    private readonly completionService: CompletionService,
  ) {}

  async updateProgress(
    lectureId: string,
    dto: UpdateProgressDto,
    authToken: string,
  ) {
    const completedAt = dto.completed ? new Date().toISOString() : null;

    await this.dc.executeMutation(
      'UpdateLectureProgress',
      {
        lectureId,
        lastWatchedSecond: dto.lastWatchedSecond,
        completedAt,
      },
      authToken,
    );

    // Trigger completion check if marked as completed (KAN-116)
    if (dto.completed) {
      // Get lecture's course ID for the completion check
      const lectureData = await this.dc.executeQuery(
        'GetLectureContent',
        { lectureId },
        authToken,
      );
      const courseId = lectureData?.courseLecture?.section?.course?.id;
      if (courseId) {
        await this.completionService.checkCourseCompletion(courseId, authToken);
      }
    }

    return { success: true };
  }

  async getLectureProgress(lectureId: string, authToken: string) {
    const data = await this.dc.executeQuery(
      'GetUserLectureProgress',
      { lectureId },
      authToken,
    );
    return data?.lectureProgresses?.[0] ?? { lastWatchedSecond: 0, completedAt: null };
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
        percentage: sectionTotal > 0 ? Math.round((sectionCompleted / sectionTotal) * 100) : 0,
      };
    });

    return {
      totalLectures,
      completedLectures,
      overallPercentage: totalLectures > 0
        ? Math.round((completedLectures / totalLectures) * 100)
        : 0,
      sections: sectionProgress,
    };
  }
}
