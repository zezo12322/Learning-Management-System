import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { RatingsService } from './ratings.service';

function makeDc(queryMap: Record<string, any>, mutationMap: Record<string, any> = {}) {
  return {
    executeQuery: jest.fn((op: string) => Promise.resolve(queryMap[op])),
    executeMutation: jest.fn((op: string) => Promise.resolve(mutationMap[op] ?? {})),
    executeMutationAsAdmin: jest.fn(() => Promise.resolve({})),
  };
}

const publishedCourse = { course: { id: 'c1', status: 'PUBLISHED', deletedAt: null } };
const activeEnrollment = { enrollments: [{ id: 'e1', status: 'ACTIVE' }] };

// A rateable course the user is enrolled in, plus two existing ratings so the
// post-write aggregate recompute has something to summarise.
const rateableCtx = {
  GetCourseForEnrollment: publishedCourse,
  GetUserEnrollmentForCourse: activeEnrollment,
  GetCourseRatingsForSummary: { courseRatings: [{ rating: 5 }, { rating: 4 }] },
};

describe('RatingsService', () => {
  describe('summarize', () => {
    const svc = new RatingsService({} as any);

    it('returns zeroed stats for no ratings', () => {
      expect(svc.summarize([])).toEqual({
        average: 0,
        count: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      });
    });

    it('computes average (1 dp), count and distribution', () => {
      const summary = svc.summarize([
        { rating: 5 },
        { rating: 4 },
        { rating: 4 },
        { rating: 2 },
      ]);
      expect(summary.count).toBe(4);
      expect(summary.average).toBe(3.8); // 15/4 = 3.75 -> 3.8
      expect(summary.distribution).toEqual({ 1: 0, 2: 1, 3: 0, 4: 2, 5: 1 });
    });

    it('ignores out-of-range values defensively', () => {
      const summary = svc.summarize([{ rating: 0 }, { rating: 6 }, { rating: 3 }]);
      expect(summary.count).toBe(1);
      expect(summary.average).toBe(3);
    });
  });

  describe('upsertRating', () => {
    it('upserts when the course is published and the user is enrolled', async () => {
      const dc = makeDc({ ...rateableCtx });
      const svc = new RatingsService(dc as any);
      await svc.upsertRating('c1', { rating: 5, review: 'Great' }, 'tok');
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'UpsertCourseRating',
        { courseId: 'c1', rating: 5, review: 'Great' },
        'tok',
      );
    });

    it('passes null review when omitted', async () => {
      const dc = makeDc({ ...rateableCtx });
      const svc = new RatingsService(dc as any);
      await svc.upsertRating('c1', { rating: 4 }, 'tok');
      expect(dc.executeMutation).toHaveBeenCalledWith(
        'UpsertCourseRating',
        { courseId: 'c1', rating: 4, review: null },
        'tok',
      );
    });

    it('recomputes and writes the denormalised course aggregate after writing', async () => {
      const dc = makeDc({ ...rateableCtx });
      const svc = new RatingsService(dc as any);
      await svc.upsertRating('c1', { rating: 5 }, 'tok');
      // Existing ratings [5,4] -> avg 4.5, count 2.
      expect(dc.executeMutationAsAdmin).toHaveBeenCalledWith(
        'AdminUpdateCourseRatingAggregate',
        { courseId: 'c1', avgRating: 4.5, ratingCount: 2 },
      );
    });

    it('does not fail the write if the aggregate recompute throws', async () => {
      const dc = makeDc({ ...rateableCtx });
      dc.executeMutationAsAdmin.mockRejectedValueOnce(new Error('boom'));
      const svc = new RatingsService(dc as any);
      await expect(svc.upsertRating('c1', { rating: 5 }, 'tok')).resolves.toBeDefined();
    });

    it('rejects when the course does not exist', async () => {
      const dc = makeDc({ GetCourseForEnrollment: { course: null } });
      const svc = new RatingsService(dc as any);
      await expect(svc.upsertRating('c1', { rating: 5 }, 'tok')).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(dc.executeMutation).not.toHaveBeenCalled();
    });

    it('rejects when the course is not published', async () => {
      const dc = makeDc({
        GetCourseForEnrollment: { course: { id: 'c1', status: 'DRAFT', deletedAt: null } },
      });
      const svc = new RatingsService(dc as any);
      await expect(svc.upsertRating('c1', { rating: 5 }, 'tok')).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });

    it('rejects when the user is not enrolled', async () => {
      const dc = makeDc({
        GetCourseForEnrollment: publishedCourse,
        GetUserEnrollmentForCourse: { enrollments: [] },
      });
      const svc = new RatingsService(dc as any);
      await expect(svc.upsertRating('c1', { rating: 5 }, 'tok')).rejects.toBeInstanceOf(
        ForbiddenException,
      );
      expect(dc.executeMutation).not.toHaveBeenCalled();
    });

    it('rejects when the enrollment was dropped', async () => {
      const dc = makeDc({
        GetCourseForEnrollment: publishedCourse,
        GetUserEnrollmentForCourse: { enrollments: [{ id: 'e1', status: 'DROPPED' }] },
      });
      const svc = new RatingsService(dc as any);
      await expect(svc.upsertRating('c1', { rating: 5 }, 'tok')).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });
  });

  describe('listRatings', () => {
    it('applies default paging when none is given', async () => {
      const dc = makeDc({ ListCourseRatings: { courseRatings: [] } });
      const svc = new RatingsService(dc as any);
      await svc.listRatings('c1');
      expect(dc.executeQuery).toHaveBeenCalledWith(
        'ListCourseRatings',
        { courseId: 'c1', limit: 20, offset: 0 },
        undefined,
      );
    });

    it('clamps limit to the max page size and floors negative offset', async () => {
      const dc = makeDc({ ListCourseRatings: { courseRatings: [] } });
      const svc = new RatingsService(dc as any);
      await svc.listRatings('c1', { limit: 500, offset: -5 });
      expect(dc.executeQuery).toHaveBeenCalledWith(
        'ListCourseRatings',
        { courseId: 'c1', limit: 50, offset: 0 },
        undefined,
      );
    });

    it('passes through valid paging', async () => {
      const dc = makeDc({ ListCourseRatings: { courseRatings: [] } });
      const svc = new RatingsService(dc as any);
      await svc.listRatings('c1', { limit: 10, offset: 30 });
      expect(dc.executeQuery).toHaveBeenCalledWith(
        'ListCourseRatings',
        { courseId: 'c1', limit: 10, offset: 30 },
        undefined,
      );
    });
  });

  describe('getMyRating', () => {
    it('returns the first rating row or null', async () => {
      const dc = makeDc({ GetMyCourseRating: { courseRatings: [{ rating: 3 }] } });
      const svc = new RatingsService(dc as any);
      expect(await svc.getMyRating('c1', 'tok')).toEqual({ rating: 3 });

      const empty = new RatingsService(makeDc({ GetMyCourseRating: { courseRatings: [] } }) as any);
      expect(await empty.getMyRating('c1', 'tok')).toBeNull();
    });
  });
});
