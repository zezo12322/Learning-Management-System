import { BadRequestException } from '@nestjs/common';
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

describe('CoursesService.updateStatus (publish gating)', () => {
  it('blocks publishing a course with no sections', async () => {
    const dc = makeDc({ AdminGetCourse: { course: { adminSections: [] } } });
    const svc = new CoursesService(dc as any);
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
    const svc = new CoursesService(dc as any);
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
    const svc = new CoursesService(dc as any);
    await svc.updateStatus('c1', { status: CourseStatus.PUBLISHED }, 'tok');
    expect(dc.executeMutation).toHaveBeenCalledWith(
      'AdminUpdateCourseStatus',
      { courseId: 'c1', status: CourseStatus.PUBLISHED },
      'tok',
    );
  });

  it('does not run content validation for non-publish transitions', async () => {
    const dc = makeDc({}, { AdminUpdateCourseStatus: { ok: true } });
    const svc = new CoursesService(dc as any);
    await svc.updateStatus('c1', { status: CourseStatus.ARCHIVED }, 'tok');
    expect(dc.executeQuery).not.toHaveBeenCalled();
    expect(dc.executeMutation).toHaveBeenCalled();
  });
});
