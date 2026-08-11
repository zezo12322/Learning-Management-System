import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

function makeDc(
  queryMap: Record<string, any>,
  mutationMap: Record<string, any> = {},
) {
  return {
    executeQuery: jest.fn((op: string) => Promise.resolve(queryMap[op])),
    executeMutation: jest.fn((op: string) =>
      Promise.resolve(mutationMap[op] ?? {}),
    ),
  };
}

describe('EnrollmentService', () => {
  describe('enrollInCourse', () => {
    it('404s for a missing/soft-deleted course', async () => {
      const dc = makeDc({
        GetCourseForEnrollment: {
          course: { status: 'PUBLISHED', deletedAt: 'x' },
        },
      });
      const svc = new EnrollmentService(dc as any);
      await expect(
        svc.enrollInCourse('c1', 'tok', 'u1'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('rejects enrollment in a non-published course', async () => {
      const dc = makeDc({
        GetCourseForEnrollment: {
          course: { status: 'DRAFT', deletedAt: null },
        },
      });
      const svc = new EnrollmentService(dc as any);
      await expect(
        svc.enrollInCourse('c1', 'tok', 'u1'),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('is idempotent when already actively enrolled', async () => {
      const dc = makeDc({
        GetCourseForEnrollment: {
          course: { status: 'PUBLISHED', deletedAt: null },
        },
        GetUserEnrollmentForCourse: {
          enrollments: [{ id: 'e1', status: 'ACTIVE' }],
        },
      });
      const svc = new EnrollmentService(dc as any);
      const res: any = await svc.enrollInCourse('c1', 'tok', 'u1');
      expect(res.alreadyEnrolled).toBe(true);
      expect(dc.executeMutation).not.toHaveBeenCalled();
    });

    it('reactivates a previously dropped enrollment instead of duplicating', async () => {
      const dc = makeDc({
        GetCourseForEnrollment: {
          course: { status: 'PUBLISHED', deletedAt: null },
        },
        GetUserEnrollmentForCourse: {
          enrollments: [{ id: 'e1', status: 'DROPPED' }],
        },
      });
      const svc = new EnrollmentService(dc as any);
      const res: any = await svc.enrollInCourse('c1', 'tok', 'u1');
      expect(res.reactivated).toBe(true);
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'UpdateEnrollmentStatus',
        { enrollmentId: 'e1', status: 'ACTIVE', completedAt: null },
        'tok',
      );
    });

    it('creates a fresh enrollment when none exists', async () => {
      const dc = makeDc(
        {
          GetCourseForEnrollment: {
            course: { status: 'PUBLISHED', deletedAt: null },
          },
          GetUserEnrollmentForCourse: { enrollments: [] },
        },
        { EnrollInCourse: { enrollment_insert: { id: 'new' } } },
      );
      const svc = new EnrollmentService(dc as any);
      const res: any = await svc.enrollInCourse('c1', 'tok', 'u1');
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'EnrollInCourse',
        { courseId: 'c1', userId: 'u1' },
        'tok',
      );
      expect(res.enrollment_insert.id).toBe('new');
    });
  });

  describe('enrollInMission', () => {
    it('404s for a missing mission', async () => {
      const dc = makeDc({ GetMissionForEnrollment: { mission: null } });
      const svc = new EnrollmentService(dc as any);
      await expect(
        svc.enrollInMission('m1', 'tok', 'u1'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('enrolls when the mission exists and there is no prior enrollment', async () => {
      const dc = makeDc(
        {
          GetMissionForEnrollment: { mission: { id: 'm1', deletedAt: null } },
          GetUserEnrollmentForMission: { enrollments: [] },
        },
        { EnrollInMission: { enrollment_insert: { id: 'new' } } },
      );
      const svc = new EnrollmentService(dc as any);
      await svc.enrollInMission('m1', 'tok', 'u1');
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'EnrollInMission',
        { missionId: 'm1', userId: 'u1' },
        'tok',
      );
    });

    it('refuses a course-linked mission when the caller is not in that course', async () => {
      // The gate this covers was dead: it keyed off `mission.courseId`, which
      // GetMissionForEnrollment did not select, so every course-linked mission
      // was joinable by anyone — and joining is what unlocks submitting to it.
      const dc = makeDc({
        GetMissionForEnrollment: {
          mission: { id: 'm1', deletedAt: null, course: { id: 'c1' } },
        },
      });
      const admin = { enrollments: [] };
      const svc = new EnrollmentService({
        ...dc,
        executeQueryAsAdmin: jest.fn().mockResolvedValue(admin),
      } as any);
      await expect(
        svc.enrollInMission('m1', 'tok', 'u1'),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(dc.executeMutation).not.toHaveBeenCalled();
    });

    it('allows a course-linked mission when the caller is enrolled in that course', async () => {
      const dc = makeDc(
        {
          GetMissionForEnrollment: {
            mission: { id: 'm1', deletedAt: null, course: { id: 'c1' } },
          },
          GetUserEnrollmentForMission: { enrollments: [] },
        },
        { EnrollInMission: { enrollment_insert: { id: 'new' } } },
      );
      const svc = new EnrollmentService({
        ...dc,
        executeQueryAsAdmin: jest
          .fn()
          .mockResolvedValue({ enrollments: [{ status: 'ACTIVE' }] }),
      } as any);
      await svc.enrollInMission('m1', 'tok', 'u1');
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'EnrollInMission',
        { missionId: 'm1', userId: 'u1' },
        'tok',
      );
    });
  });
});
