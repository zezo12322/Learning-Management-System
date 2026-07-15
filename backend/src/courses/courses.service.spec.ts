import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseStatus } from './dto/course.dto';

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

/** AccessService stub whose `assertCourseAccess` resolves (owner) or throws. */
function makeAccess(hasAccess: boolean) {
  return {
    assertCourseAccess: jest.fn(() =>
      hasAccess ? Promise.resolve() : Promise.reject(new Error('no access')),
    ),
  };
}

describe('CoursesService.updateStatus (publish gating)', () => {
  it('blocks publishing a course with no sections', async () => {
    const dc = makeDc({ AdminGetCourse: { course: { adminSections: [] } } });
    const svc = new CoursesService(dc as any, makeAccess(true) as any);
    await expect(
      svc.updateStatus('c1', { status: CourseStatus.PUBLISHED }, 'tok'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('blocks publishing when a section has no lectures', async () => {
    const dc = makeDc({
      AdminGetCourse: {
        course: { adminSections: [{ title: 'Intro', adminLectures: [] }] },
      },
    });
    const svc = new CoursesService(dc as any, makeAccess(true) as any);
    await expect(
      svc.updateStatus('c1', { status: CourseStatus.PUBLISHED }, 'tok'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('publishes when every section has at least one lecture', async () => {
    const dc = makeDc(
      {
        AdminGetCourse: {
          course: {
            adminSections: [{ title: 'Intro', adminLectures: [{ id: 'L1' }] }],
          },
        },
      },
      { AdminUpdateCourseStatus: { ok: true } },
    );
    const svc = new CoursesService(dc as any, makeAccess(true) as any);
    await svc.updateStatus('c1', { status: CourseStatus.PUBLISHED }, 'tok');
    expect(dc.executeMutation).toHaveBeenCalledWith(
      'AdminUpdateCourseStatus',
      { courseId: 'c1', status: CourseStatus.PUBLISHED },
      'tok',
    );
  });

  it('does not run content validation for non-publish transitions', async () => {
    const dc = makeDc({}, { AdminUpdateCourseStatus: { ok: true } });
    const svc = new CoursesService(dc as any, makeAccess(true) as any);
    await svc.updateStatus('c1', { status: CourseStatus.ARCHIVED }, 'tok');
    expect(dc.executeQuery).not.toHaveBeenCalled();
    expect(dc.executeMutation).toHaveBeenCalled();
  });
});


describe('CoursesService.getCourseVideos', () => {
  const courseData = {
    course: {
      id: 'c1',
      title: 'Intro to Cloud',
      status: 'PUBLISHED',
      deletedAt: null,
      author: { id: 'owner' },
      createdBy: { id: 'owner' },
      videoSections: [
        {
          id: 's1',
          title: 'Getting Started',
          videoLectures: [
            {
              id: 'v1',
              title: 'Welcome',
              content: 'Free intro description',
              duration: 120,
              isFreePreview: true,
              order: 1,
            },
            {
              id: 'v2',
              title: 'Deep Dive',
              content: 'Paid description',
              duration: 600,
              isFreePreview: false,
              order: 2,
            },
          ],
        },
      ],
    },
  };

  it('returns every video description for an entitled (owner/admin/enrolled) caller', async () => {
    const dc = makeDc({ GetCourseVideos: courseData });
    const svc = new CoursesService(dc as any, makeAccess(true) as any);
    const result = await svc.getCourseVideos('c1', 'tok', 'owner', false);
    expect(result.videos).toHaveLength(2);
    expect(result.videos[0].description).toBe('Free intro description');
    expect(result.videos[1].description).toBe('Paid description');
  });

  it('nulls non-free-preview descriptions for a non-entitled caller', async () => {
    const dc = makeDc({
      GetCourseVideos: courseData,
      GetUserEnrollmentForCourse: { enrollments: [] },
    });
    const svc = new CoursesService(dc as any, makeAccess(false) as any);
    const result = await svc.getCourseVideos('c1', 'tok', 'stranger', false);
    expect(result.videos).toHaveLength(2);
    expect(result.videos[0].description).toBe('Free intro description');
    expect(result.videos[1].description).toBeNull();
  });

  it('grants full access to a non-owner with an ACTIVE enrollment', async () => {
    const dc = makeDc({
      GetCourseVideos: courseData,
      GetUserEnrollmentForCourse: { enrollments: [{ status: 'ACTIVE' }] },
    });
    const svc = new CoursesService(dc as any, makeAccess(false) as any);
    const result = await svc.getCourseVideos('c1', 'tok', 'student', false);
    expect(result.videos[1].description).toBe('Paid description');
  });

  it('throws NotFound when the course is missing or soft-deleted', async () => {
    const dc = makeDc({ GetCourseVideos: { course: null } });
    const svc = new CoursesService(dc as any, makeAccess(true) as any);
    await expect(
      svc.getCourseVideos('c1', 'tok', 'owner', false),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});

describe('CoursesService.getOverview', () => {
  const overviewData = {
    course: {
      id: 'c1',
      title: 'Intro to Cloud',
      description: 'Deep dive',
      price: 9900,
      status: 'PUBLISHED',
      language: 'en',
      level: 'BEGINNER',
      thumbnail: null,
      tags: ['cloud'],
      avgRating: 4.5,
      ratingCount: 2,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-02-01T00:00:00Z',
      deletedAt: null,
      category: { id: 'cat1', name: 'Cloud' },
      author: { id: 'owner', name: 'Sam', email: 's@x.io', avatar: null },
      createdBy: { id: 'owner', name: 'Sam' },
      instructors: [
        { user: { id: 'owner', name: 'Sam', email: 's@x.io', avatar: null } },
      ],
      sections: [
        {
          id: 's1',
          title: 'Getting Started',
          order: 1,
          lectures: [
            {
              id: 'L1',
              type: 'VIDEO',
              duration: 120,
              // u1 completed, u2 in-progress (no completedAt)
              progress: [
                { completedAt: '2026-03-01T00:00:00Z', user: { id: 'u1' } },
                { completedAt: null, user: { id: 'u2' } },
              ],
            },
            {
              id: 'L2',
              type: 'QUIZ',
              duration: 0,
              // only u1 completed → u1 has completed all lectures
              progress: [
                { completedAt: '2026-03-02T00:00:00Z', user: { id: 'u1' } },
              ],
            },
          ],
        },
      ],
      enrollments: [
        { status: 'ACTIVE', user: { id: 'u1' } },
        { status: 'ACTIVE', user: { id: 'u2' } },
        { status: 'DROPPED', user: { id: 'u3' } },
      ],
      ratings: [{ rating: 5 }, { rating: 4 }],
      missions: [
        {
          id: 'm1',
          title: 'Capstone',
          difficulty: 'BEGINNER',
          submissions: [{ status: 'PENDING' }, { status: 'GRADED' }],
        },
      ],
    },
  };

  it('aggregates content, enrollment, progress, assignment and rating stats', async () => {
    const dc = makeDc({ AdminGetCourseOverview: overviewData });
    const svc = new CoursesService(dc as any, makeAccess(true) as any);
    const r = await svc.getOverview('c1', 'tok');

    expect(dc.executeQuery).toHaveBeenCalledWith(
      'AdminGetCourseOverview',
      { courseId: 'c1' },
      'tok',
    );

    // Content
    expect(r.content.totalSections).toBe(1);
    expect(r.content.totalLectures).toBe(2);
    expect(r.content.lecturesByType.VIDEO).toBe(1);
    expect(r.content.lecturesByType.QUIZ).toBe(1);
    expect(r.content.totalQuizzes).toBe(1);
    expect(r.content.totalDurationSeconds).toBe(120);

    // Enrollment breakdown (raw rows)
    expect(r.enrollments.total).toBe(3);
    expect(r.enrollments.byStatus.ACTIVE).toBe(2);
    expect(r.enrollments.byStatus.DROPPED).toBe(1);

    // Progress: learners = u1, u2 (ACTIVE). u1 completed 2/2, u2 completed 0/2.
    expect(r.progress.activeLearners).toBe(2);
    expect(r.progress.averageCompletionPercent).toBe(50); // (100 + 0) / 2
    expect(r.progress.fullyCompletedLearners).toBe(1);
    expect(r.progress.completionRatePercent).toBe(50);

    // Assignments
    expect(r.assignments.total).toBe(1);
    expect(r.assignments.submissions.total).toBe(2);
    expect(r.assignments.submissions.byStatus.PENDING).toBe(1);
    expect(r.assignments.submissions.byStatus.GRADED).toBe(1);

    // Ratings
    expect(r.ratings.average).toBe(4.5);
    expect(r.ratings.count).toBe(2);
    expect(r.ratings.distribution[5]).toBe(1);
    expect(r.ratings.distribution[4]).toBe(1);

    // Instructors flattened to the user node
    expect(r.instructors).toEqual([
      { id: 'owner', name: 'Sam', email: 's@x.io', avatar: null },
    ]);
  });

  it('returns zeroed stats for a brand-new course with no activity', async () => {
    const dc = makeDc({
      AdminGetCourseOverview: {
        course: {
          ...overviewData.course,
          sections: [],
          enrollments: [],
          ratings: [],
          missions: [],
          avgRating: 0,
          ratingCount: 0,
        },
      },
    });
    const svc = new CoursesService(dc as any, makeAccess(true) as any);
    const r = await svc.getOverview('c1', 'tok');
    expect(r.content.totalLectures).toBe(0);
    expect(r.progress.averageCompletionPercent).toBe(0);
    expect(r.progress.completionRatePercent).toBe(0);
    expect(r.enrollments.total).toBe(0);
    expect(r.assignments.total).toBe(0);
  });

  it('throws NotFound when the course is missing or soft-deleted', async () => {
    const dc = makeDc({ AdminGetCourseOverview: { course: null } });
    const svc = new CoursesService(dc as any, makeAccess(true) as any);
    await expect(svc.getOverview('c1', 'tok')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
