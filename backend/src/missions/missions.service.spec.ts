import { ForbiddenException } from '@nestjs/common';
import { MissionsService } from './missions.service';

function makeDc(mutationMap: Record<string, any> = {}) {
  return {
    executeQuery: jest.fn(),
    executeMutation: jest.fn((op: string) => Promise.resolve(mutationMap[op] ?? {})),
  };
}

describe('MissionsService', () => {
  let access: { assertCourseAccess: jest.Mock };

  beforeEach(() => {
    access = { assertCourseAccess: jest.fn().mockResolvedValue(undefined) };
  });

  describe('create', () => {
    it('checks ownership of the linked course before creating', async () => {
      const dc = makeDc();
      const svc = new MissionsService(dc as any, access as any);
      await svc.create({ title: 'M', courseId: 'c1' } as any, 'tok', 'u1', false);
      expect(access.assertCourseAccess).toHaveBeenCalledWith('c1', 'u1', 'tok', false);
      expect(dc.executeMutation).toHaveBeenCalledWith('AdminCreateMission', expect.any(Object), 'tok');
    });

    it('skips the course check for a standalone mission', async () => {
      const dc = makeDc();
      const svc = new MissionsService(dc as any, access as any);
      await svc.create({ title: 'M' } as any, 'tok', 'u1', false);
      expect(access.assertCourseAccess).not.toHaveBeenCalled();
    });
  });

  describe('update (M5)', () => {
    it('re-checks ownership when the update reassigns a courseId', async () => {
      access.assertCourseAccess.mockRejectedValue(new ForbiddenException());
      const dc = makeDc();
      const svc = new MissionsService(dc as any, access as any);
      await expect(
        svc.update('m1', { courseId: 'foreign' } as any, 'tok', 'u1', false),
      ).rejects.toBeInstanceOf(ForbiddenException);
      expect(dc.executeMutation).not.toHaveBeenCalled();
    });

    it('does not require a course check when courseId is absent', async () => {
      const dc = makeDc();
      const svc = new MissionsService(dc as any, access as any);
      await svc.update('m1', { title: 'renamed' } as any, 'tok', 'u1', false);
      expect(access.assertCourseAccess).not.toHaveBeenCalled();
      expect(dc.executeMutation).toHaveBeenCalledWith('AdminUpdateMission', expect.any(Object), 'tok');
    });
  });
});
