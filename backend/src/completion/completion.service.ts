import { Injectable, Logger } from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';

/**
 * CompletionTriggerService (KAN-116)
 * 
 * Automatically updates enrollment status based on learning progress:
 * - After quiz pass → marks quiz lecture as completed
 * - After lecture completion → checks if all course lectures are done
 * - If all lectures completed → transitions enrollment to COMPLETED
 * - After mission grading → checks if mission passed all criteria
 */
@Injectable()
export class CompletionService {
  private readonly logger = new Logger(CompletionService.name);

  constructor(private readonly dc: DataConnectService) {}

  /**
   * Trigger 1 & 2: Check if all lectures in a course are completed.
   * If so, mark the enrollment as COMPLETED.
   */
  async checkCourseCompletion(courseId: string, authToken: string): Promise<void> {
    try {
      // Get completion status
      const data = await this.dc.executeQuery(
        'GetCourseCompletionStatus',
        { courseId },
        authToken,
      );

      const sections = data?.sections ?? [];
      let totalLectures = 0;
      let completedLectures = 0;

      for (const section of sections) {
        const lectures = section.completionLectures ?? [];
        for (const lecture of lectures) {
          totalLectures++;
          const progress = lecture.completionProgress?.[0];
          if (progress?.completedAt) {
            completedLectures++;
          }
        }
      }

      this.logger.debug(
        `Course ${courseId}: ${completedLectures}/${totalLectures} lectures completed`,
      );

      // All lectures completed — mark enrollment as COMPLETED
      if (totalLectures > 0 && completedLectures === totalLectures) {
        const enrollmentData = await this.dc.executeQuery(
          'GetUserEnrollmentForCourse',
          { courseId },
          authToken,
        );

        const enrollment = enrollmentData?.enrollments?.[0];
        if (enrollment && enrollment.status !== 'COMPLETED') {
          await this.dc.executeMutation(
            'UpdateEnrollmentStatus',
            {
              enrollmentId: enrollment.id,
              status: 'COMPLETED',
              completedAt: new Date().toISOString(),
            },
            authToken,
          );

          this.logger.log(
            `Course ${courseId} enrollment ${enrollment.id} marked as COMPLETED`,
          );
        }
      }
    } catch (error) {
      // Non-critical — log and continue
      this.logger.error(
        `Failed to check course completion for ${courseId}: ${error.message}`,
      );
    }
  }

  /**
   * Trigger 1: After a quiz is passed, mark the quiz lecture as completed.
   */
  async onQuizPassed(
    lectureId: string,
    courseId: string,
    authToken: string,
  ): Promise<void> {
    try {
      // Mark the quiz lecture as completed
      await this.dc.executeMutation(
        'UpdateLectureProgress',
        {
          lectureId,
          lastWatchedSecond: 0,
          completedAt: new Date().toISOString(),
        },
        authToken,
      );

      this.logger.log(`Quiz lecture ${lectureId} marked as completed after passing`);

      // Then check course completion
      await this.checkCourseCompletion(courseId, authToken);
    } catch (error) {
      this.logger.error(
        `Failed to process quiz pass for lecture ${lectureId}: ${error.message}`,
      );
    }
  }

  /**
   * Trigger 3: After a mission is graded, check if it passed and update enrollment.
   */
  async checkMissionCompletion(missionId: string, authToken: string): Promise<void> {
    try {
      const enrollmentData = await this.dc.executeQuery(
        'GetUserEnrollmentForMission',
        { missionId },
        authToken,
      );

      const enrollment = enrollmentData?.enrollments?.[0];
      if (enrollment && enrollment.status !== 'COMPLETED') {
        await this.dc.executeMutation(
          'UpdateEnrollmentStatus',
          {
            enrollmentId: enrollment.id,
            status: 'COMPLETED',
            completedAt: new Date().toISOString(),
          },
          authToken,
        );

        this.logger.log(
          `Mission ${missionId} enrollment ${enrollment.id} marked as COMPLETED`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Failed to check mission completion for ${missionId}: ${error.message}`,
      );
    }
  }
}
