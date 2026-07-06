import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { AccessService } from './access.service';

describe('AccessService', () => {
  let dc: { executeQuery: jest.Mock };
  let service: AccessService;

  beforeEach(() => {
    dc = { executeQuery: jest.fn() };
    service = new AccessService(dc as any);
  });

  describe('assertCourseAccess', () => {
    it('short-circuits for admins without querying', async () => {
      await expect(
        service.assertCourseAccess('c1', 'someone', 'tok', true),
      ).resolves.toBeUndefined();
      expect(dc.executeQuery).not.toHaveBeenCalled();
    });

    it('allows the course author', async () => {
      dc.executeQuery.mockResolvedValue({
        course: { author: { id: 'u1' }, createdBy: { id: 'x' }, myInstructorLink: [] },
      });
      await expect(
        service.assertCourseAccess('c1', 'u1', 'tok', false),
      ).resolves.toBeUndefined();
    });

    it('allows an assigned instructor (non-empty instructor link)', async () => {
      dc.executeQuery.mockResolvedValue({
        course: { author: { id: 'x' }, createdBy: { id: 'y' }, myInstructorLink: [{ user: { id: 'u1' } }] },
      });
      await expect(
        service.assertCourseAccess('c1', 'u1', 'tok', false),
      ).resolves.toBeUndefined();
    });

    it('throws 403 for a non-owner', async () => {
      dc.executeQuery.mockResolvedValue({
        course: { author: { id: 'x' }, createdBy: { id: 'y' }, myInstructorLink: [] },
      });
      await expect(
        service.assertCourseAccess('c1', 'u1', 'tok', false),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });

    it('throws 404 when the course is missing', async () => {
      dc.executeQuery.mockResolvedValue({ course: null });
      await expect(
        service.assertCourseAccess('c1', 'u1', 'tok', false),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('assertMissionAccess', () => {
    it('allows mission author', async () => {
      dc.executeQuery.mockResolvedValue({
        mission: { author: { id: 'u1' }, createdBy: { id: 'x' }, course: null },
      });
      await expect(
        service.assertMissionAccess('m1', 'u1', 'tok', false),
      ).resolves.toBeUndefined();
    });

    it('falls back to owning-course ownership for a course-linked mission', async () => {
      dc.executeQuery.mockResolvedValue({
        mission: {
          author: { id: 'x' },
          createdBy: { id: 'y' },
          course: { author: { id: 'u1' }, createdBy: { id: 'z' }, myMissionCourseInstructorLink: [] },
        },
      });
      await expect(
        service.assertMissionAccess('m1', 'u1', 'tok', false),
      ).resolves.toBeUndefined();
    });

    it('throws 403 when caller owns neither mission nor its course', async () => {
      dc.executeQuery.mockResolvedValue({
        mission: { author: { id: 'x' }, createdBy: { id: 'y' }, course: null },
      });
      await expect(
        service.assertMissionAccess('m1', 'u1', 'tok', false),
      ).rejects.toBeInstanceOf(ForbiddenException);
    });
  });
});
