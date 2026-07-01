import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { DataConnectService } from '../firebase/dataconnect.service';
import { AccessService } from '../common/services/access.service';
import { CompletionService } from '../completion/completion.service';
import { CreateSubmissionDto, GradeSubmissionDto } from './dto/submission.dto';

/**
 * Mission submission & grading (H6). Implements the assignment loop that was
 * previously absent: student submits → instructor (mission owner) grades against
 * the rubric → student's mission enrollment is completed.
 */
@Injectable()
export class SubmissionsService {
  constructor(
    private readonly dc: DataConnectService,
    private readonly access: AccessService,
    private readonly completion: CompletionService,
  ) {}

  // ----- Student -----

  async submit(missionId: string, dto: CreateSubmissionDto, authToken: string) {
    // Must be actively enrolled in the mission to submit.
    const enrollmentData = await this.dc.executeQuery(
      'GetUserEnrollmentForMission',
      { missionId },
      authToken,
    );
    if (enrollmentData?.enrollments?.[0]?.status !== 'ACTIVE') {
      throw new ForbiddenException(
        'You must have an active enrollment in this mission to submit',
      );
    }

    return this.dc.executeMutation(
      'SubmitMission',
      { missionId, fileUrl: dto.fileUrl },
      authToken,
    );
  }

  async mySubmissions(authToken: string) {
    const data = await this.dc.executeQuery('MySubmissions', {}, authToken);
    return data?.missionSubmissions ?? [];
  }

  // ----- Instructor -----

  async pending(authToken: string) {
    const data = await this.dc.executeQuery('GetPendingSubmissions', {}, authToken);
    return data?.missionSubmissions ?? [];
  }

  async grade(
    submissionId: string,
    dto: GradeSubmissionDto,
    authToken: string,
    uid: string,
    isAdmin: boolean,
  ) {
    // Resolve the submission → owning mission + student.
    const subData = await this.dc.executeQuery(
      'GetSubmissionForGrading',
      { submissionId },
      authToken,
    );
    const submission = subData?.missionSubmission;
    if (!submission) {
      throw new NotFoundException(`Submission ${submissionId} not found`);
    }
    const missionId = submission.mission?.id;
    if (!missionId) {
      throw new NotFoundException('Submission is not attached to a mission');
    }

    // Authorize: the grader must own the mission (admins bypass inside).
    await this.access.assertMissionAccess(missionId, uid, authToken, isAdmin);

    // Validate every score against the mission's own rubric criteria.
    if (dto.scores && dto.scores.length > 0) {
      const missionData = await this.dc.executeQuery(
        'AdminGetMission',
        { missionId },
        authToken,
      );
      const criteria: any[] = missionData?.mission?.criteria ?? [];
      const byId = new Map(criteria.map((c) => [c.id, c]));

      for (const s of dto.scores) {
        const criterion = byId.get(s.criterionId);
        if (!criterion) {
          throw new BadRequestException(
            `Criterion ${s.criterionId} does not belong to this mission`,
          );
        }
        if (s.score > criterion.maxPoints) {
          throw new BadRequestException(
            `Score ${s.score} exceeds maxPoints ${criterion.maxPoints} for "${criterion.criterionName}"`,
          );
        }
      }

      await Promise.all(
        dto.scores.map((s) =>
          this.dc.executeMutation(
            'AddCriterionScore',
            { submissionId, criterionId: s.criterionId, score: s.score },
            authToken,
          ),
        ),
      );
    }

    // Mark graded (sets grader, status=GRADED, feedback, updatedAt).
    await this.dc.executeMutation(
      'GradeSubmission',
      { submissionId, feedback: dto.feedback ?? null },
      authToken,
    );

    // Completion trigger: mark the student's mission enrollment COMPLETED.
    const studentUid = submission.student?.id;
    if (studentUid) {
      await this.completion.markMissionEnrollmentCompleted(
        missionId,
        studentUid,
        authToken,
      );
    }

    return { success: true };
  }
}
