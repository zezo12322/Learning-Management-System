import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { LectureType } from './dto/lecture.dto';

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

describe('LecturesService', () => {
  let ordering: any;
  let access: { assertCourseAccess: jest.Mock };
  let firebase: { resolveReadUrl: jest.Mock };

  beforeEach(() => {
    ordering = { nextOrder: jest.fn(), applyOrder: jest.fn() };
    access = { assertCourseAccess: jest.fn() };
    firebase = {
      resolveReadUrl: jest.fn((v: string) =>
        Promise.resolve(v ? `signed:${v}` : v),
      ),
    };
  });

  const lecture = {
    courseLecture: {
      id: 'L1',
      isFreePreview: false,
      videoUrl: 'courses/c1/v.mp4',
      transcriptUrl: null,
      content: null,
      section: { course: { id: 'c1' } },
    },
  };

  describe('getContent (H1 access gating)', () => {
    it('returns free-preview lectures to anyone, signing the URLs', async () => {
      const dc = makeDc({
        GetLectureContent: {
          courseLecture: { ...lecture.courseLecture, isFreePreview: true },
        },
      });
      const svc = new LecturesService(
        dc as any,
        ordering,
        access as any,
        firebase as any,
      );
      const res = await svc.getContent('L1', 'tok', 'u1', false);
      expect(res.videoUrl).toBe('signed:courses/c1/v.mp4');
      expect(access.assertCourseAccess).not.toHaveBeenCalled();
    });

    it('returns content to the course owner', async () => {
      const dc = makeDc({ GetLectureContent: lecture });
      access.assertCourseAccess.mockResolvedValue(undefined);
      const svc = new LecturesService(
        dc as any,
        ordering,
        access as any,
        firebase as any,
      );
      const res = await svc.getContent('L1', 'tok', 'u1', false);
      expect(res.id).toBe('L1');
    });

    it('returns content to an active enrollee (non-owner)', async () => {
      const dc = makeDc({
        GetLectureContent: lecture,
        GetUserEnrollmentForCourse: { enrollments: [{ status: 'ACTIVE' }] },
      });
      access.assertCourseAccess.mockRejectedValue(new ForbiddenException());
      const svc = new LecturesService(
        dc as any,
        ordering,
        access as any,
        firebase as any,
      );
      const res = await svc.getContent('L1', 'tok', 'u1', false);
      expect(res.id).toBe('L1');
    });

    it('blocks a non-owner, non-enrolled user', async () => {
      const dc = makeDc({
        GetLectureContent: lecture,
        GetUserEnrollmentForCourse: { enrollments: [] },
      });
      access.assertCourseAccess.mockRejectedValue(new ForbiddenException());
      const svc = new LecturesService(
        dc as any,
        ordering,
        access as any,
        firebase as any,
      );
      await expect(
        svc.getContent('L1', 'tok', 'u1', false),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('404s when the lecture does not exist', async () => {
      const dc = makeDc({ GetLectureContent: { courseLecture: null } });
      const svc = new LecturesService(
        dc as any,
        ordering,
        access as any,
        firebase as any,
      );
      await expect(
        svc.getContent('L1', 'tok', 'u1', false),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('update (M1 merge-then-validate)', () => {
    it('does NOT reject type=VIDEO when videoUrl already exists on the record', async () => {
      const dc = makeDc(
        {
          GetLectureContent: {
            courseLecture: { videoUrl: 'existing.mp4', content: null },
          },
        },
        { AdminUpdateLecture: { ok: true } },
      );
      const svc = new LecturesService(
        dc as any,
        ordering,
        access as any,
        firebase as any,
      );
      await expect(
        svc.update('L1', { type: LectureType.VIDEO } as any, 'tok'),
      ).resolves.toBeDefined();
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'AdminUpdateLecture',
        expect.any(Object),
        'tok',
      );
    });

    it('rejects type=VIDEO when neither the dto nor the record has a videoUrl', async () => {
      const dc = makeDc({
        GetLectureContent: { courseLecture: { videoUrl: null, content: null } },
      });
      const svc = new LecturesService(
        dc as any,
        ordering,
        access as any,
        firebase as any,
      );
      await expect(
        svc.update('L1', { type: LectureType.VIDEO } as any, 'tok'),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('skips type validation entirely when type is not being changed', async () => {
      const dc = makeDc({}, { AdminUpdateLecture: { ok: true } });
      const svc = new LecturesService(
        dc as any,
        ordering,
        access as any,
        firebase as any,
      );
      await svc.update('L1', { title: 'New title' }, 'tok');
      expect(dc.executeQuery).not.toHaveBeenCalled();
    });
  });
});
