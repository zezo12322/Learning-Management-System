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

describe('CoursesService.getPopular', () => {
  it('clamps a missing limit to the default and returns the course list', async () => {
    const dc = makeDc({ ListPopularCourses: { courses: [{ id: 'c1' }] } });
    const svc = new CoursesService(dc as any, makeAccess(false) as any);
    const result = await svc.getPopular();
    expect(result).toEqual([{ id: 'c1' }]);
    expect(dc.executeQuery).toHaveBeenCalledWith(
      'ListPopularCourses',
      { limit: 10 },
      undefined,
    );
  });

  it('caps an oversized limit at the maximum', async () => {
    const dc = makeDc({ ListPopularCourses: { courses: [] } });
    const svc = new CoursesService(dc as any, makeAccess(false) as any);
    await svc.getPopular(9999);
    expect(dc.executeQuery).toHaveBeenCalledWith(
      'ListPopularCourses',
      { limit: 50 },
      undefined,
    );
  });

  it('returns an empty array when the query yields nothing', async () => {
    const dc = makeDc({ ListPopularCourses: {} });
    const svc = new CoursesService(dc as any, makeAccess(false) as any);
    expect(await svc.getPopular(5)).toEqual([]);
  });
});

describe('CoursesService.getRecommended', () => {
  it('recommends courses in the categories the user is enrolled in, excluding enrolled ones', async () => {
    const dc = makeDc({
      GetMyEnrolledCourseCategories: {
        enrollments: [
          { course: { id: 'c1', deletedAt: null, category: { id: 'cat-a' } } },
          { course: { id: 'c2', deletedAt: null, category: { id: 'cat-b' } } },
        ],
      },
      ListRecommendedCourses: { courses: [{ id: 'c9' }] },
    });
    const svc = new CoursesService(dc as any, makeAccess(false) as any);
    const result = await svc.getRecommended('tok', 5);
    expect(result).toEqual([{ id: 'c9' }]);
    const call = dc.executeQuery.mock.calls.find(
      (c: any[]) => c[0] === 'ListRecommendedCourses',
    );
    expect(call[1].limit).toBe(5);
    expect(new Set(call[1].categoryIds)).toEqual(new Set(['cat-a', 'cat-b']));
    expect(new Set(call[1].excludeIds)).toEqual(new Set(['c1', 'c2']));
  });

  it('skips soft-deleted enrolled courses when building the interest set', async () => {
    const dc = makeDc({
      GetMyEnrolledCourseCategories: {
        enrollments: [
          {
            course: {
              id: 'c1',
              deletedAt: '2026-01-01T00:00:00Z',
              category: { id: 'cat-a' },
            },
          },
          { course: { id: 'c2', deletedAt: null, category: { id: 'cat-b' } } },
        ],
      },
      ListRecommendedCourses: { courses: [{ id: 'c9' }] },
    });
    const svc = new CoursesService(dc as any, makeAccess(false) as any);
    await svc.getRecommended('tok');
    const call = dc.executeQuery.mock.calls.find(
      (c: any[]) => c[0] === 'ListRecommendedCourses',
    );
    expect(new Set(call[1].categoryIds)).toEqual(new Set(['cat-b']));
    expect(new Set(call[1].excludeIds)).toEqual(new Set(['c2']));
  });

  it('falls back to popular when the user has no enrollments', async () => {
    const dc = makeDc({
      GetMyEnrolledCourseCategories: { enrollments: [] },
      ListPopularCourses: { courses: [{ id: 'pop' }] },
    });
    const svc = new CoursesService(dc as any, makeAccess(false) as any);
    const result = await svc.getRecommended('tok');
    expect(result).toEqual([{ id: 'pop' }]);
    expect(
      dc.executeQuery.mock.calls.some(
        (c: any[]) => c[0] === 'ListRecommendedCourses',
      ),
    ).toBe(false);
  });

  it('falls back to popular when the categories yield no new courses', async () => {
    const dc = makeDc({
      GetMyEnrolledCourseCategories: {
        enrollments: [
          { course: { id: 'c1', deletedAt: null, category: { id: 'cat-a' } } },
        ],
      },
      ListRecommendedCourses: { courses: [] },
      ListPopularCourses: { courses: [{ id: 'pop' }] },
    });
    const svc = new CoursesService(dc as any, makeAccess(false) as any);
    expect(await svc.getRecommended('tok')).toEqual([{ id: 'pop' }]);
  });
});

describe('CoursesService.getContinueLearning', () => {
  const enrollmentWith = (
    id: string,
    completed: number,
    total: number,
    overrides: Record<string, any> = {},
  ) => ({
    id,
    status: 'ACTIVE',
    enrolledAt: '2026-01-01T00:00:00Z',
    completedAt: null,
    course: {
      id: `course-${id}`,
      title: `Course ${id}`,
      thumbnail: null,
      level: 'BEGINNER',
      price: 0,
      deletedAt: null,
      category: { name: 'Cloud' },
      author: { name: 'Jane', avatar: null },
      clSections: [
        {
          clLectures: Array.from({ length: total }, (_, i) => ({
            id: `${id}-l${i}`,
            clProgress: i < completed ? [{ completedAt: 'x' }] : [],
          })),
        },
      ],
      ...overrides,
    },
  });

  it('sorts enrolled courses by completed-lesson count (desc) and computes percentage', async () => {
    const dc = makeDc({
      GetMyContinueLearning: {
        enrollments: [
          enrollmentWith('a', 2, 10), // 2 completed, 20%
          enrollmentWith('b', 5, 10), // 5 completed, 50%
          enrollmentWith('c', 5, 5), // 5 completed, 100%
        ],
      },
    });
    const svc = new CoursesService(dc as any, makeAccess(false) as any);
    const result = await svc.getContinueLearning('tok');

    expect(result.map((r: any) => r.enrollmentId)).toEqual(['c', 'b', 'a']);
    expect(result[0]).toMatchObject({
      completedLessons: 5,
      totalLessons: 5,
      percentage: 100,
    });
    expect(result[2]).toMatchObject({
      completedLessons: 2,
      totalLessons: 10,
      percentage: 20,
    });
  });

  it('excludes enrollments whose course was soft-deleted', async () => {
    const dc = makeDc({
      GetMyContinueLearning: {
        enrollments: [
          enrollmentWith('a', 1, 4),
          enrollmentWith('gone', 3, 4, { deletedAt: '2026-01-01T00:00:00Z' }),
        ],
      },
    });
    const svc = new CoursesService(dc as any, makeAccess(false) as any);
    const result = await svc.getContinueLearning('tok');
    expect(result).toHaveLength(1);
    expect(result[0].enrollmentId).toBe('a');
  });

  it('reports 0% for a course with no lectures', async () => {
    const dc = makeDc({
      GetMyContinueLearning: { enrollments: [enrollmentWith('a', 0, 0)] },
    });
    const svc = new CoursesService(dc as any, makeAccess(false) as any);
    const result = await svc.getContinueLearning('tok');
    expect(result[0]).toMatchObject({
      completedLessons: 0,
      totalLessons: 0,
      percentage: 0,
    });
  });

  it('returns an empty array when the user has no enrollments', async () => {
    const dc = makeDc({ GetMyContinueLearning: { enrollments: [] } });
    const svc = new CoursesService(dc as any, makeAccess(false) as any);
    expect(await svc.getContinueLearning('tok')).toEqual([]);
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
