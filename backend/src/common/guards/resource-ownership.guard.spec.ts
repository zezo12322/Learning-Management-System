import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ResourceOwnershipGuard } from './resource-ownership.guard';
import { AccessService } from '../services/access.service';
import { OwnsResourceMeta } from '../decorators/owns-resource.decorator';

/**
 * Uses a REAL AccessService over a shared mocked DataConnectService so we can
 * assert the *number* of queries: the fast path authorizes from the leaf query
 * alone (1 call), the fallback re-queries ownership (2 calls).
 */
describe('ResourceOwnershipGuard', () => {
  let dc: { executeQuery: jest.Mock; extractToken: jest.Mock };
  let access: AccessService;
  let reflector: { getAllAndOverride: jest.Mock };
  let guard: ResourceOwnershipGuard;

  beforeEach(() => {
    dc = { executeQuery: jest.fn(), extractToken: jest.fn().mockReturnValue('tok') };
    access = new AccessService(dc as any);
    reflector = { getAllAndOverride: jest.fn() };
    guard = new ResourceOwnershipGuard(reflector as any, dc as any, access);
  });

  const ctxWith = (request: any) =>
    ({ switchToHttp: () => ({ getRequest: () => request }), getHandler: () => ({}), getClass: () => ({}) }) as any;

  const meta = (m: OwnsResourceMeta) => reflector.getAllAndOverride.mockReturnValue(m);

  const ownedCourse = (uid: string) => ({
    id: 'c1',
    author: { id: uid },
    createdBy: { id: 'x' },
    myInstructorLink: [],
  });

  it('allows the route when no @OwnsResource metadata is present', async () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    await expect(guard.canActivate(ctxWith({}))).resolves.toBe(true);
    expect(dc.executeQuery).not.toHaveBeenCalled();
  });

  it('bypasses for admins without any query', async () => {
    meta({ type: 'section', param: 'sectionId' });
    const ctx = ctxWith({ userRoles: ['admin'], params: { sectionId: 's1' } });
    await expect(guard.canActivate(ctx)).resolves.toBe(true);
    expect(dc.executeQuery).not.toHaveBeenCalled();
  });

  it('throws 403 when the leaf id param is missing', async () => {
    meta({ type: 'section', param: 'sectionId' });
    const ctx = ctxWith({ userRoles: ['instructor'], params: {} });
    await expect(guard.canActivate(ctx)).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('throws 404 when the leaf resolves to no owner', async () => {
    meta({ type: 'section', param: 'sectionId' });
    dc.executeQuery.mockResolvedValue({ courseSection: { course: null } });
    const ctx = ctxWith({ userRoles: ['instructor'], user: { uid: 'u1' }, params: { sectionId: 's1' } });
    await expect(guard.canActivate(ctx)).rejects.toBeInstanceOf(NotFoundException);
  });

  describe('course-rooted leaf (section)', () => {
    it('fast path: authorizes the owner from the leaf query alone (no second query)', async () => {
      meta({ type: 'section', param: 'sectionId' });
      dc.executeQuery.mockResolvedValue({ courseSection: { course: ownedCourse('u1') } });
      const ctx = ctxWith({ userRoles: ['instructor'], user: { uid: 'u1' }, params: { sectionId: 's1' } });

      await expect(guard.canActivate(ctx)).resolves.toBe(true);
      expect(dc.executeQuery).toHaveBeenCalledTimes(1);
      expect(dc.executeQuery).toHaveBeenCalledWith('GetSectionCourse', { sectionId: 's1' }, 'tok');
    });

    it('fast path: rejects a non-owner without a second query', async () => {
      meta({ type: 'section', param: 'sectionId' });
      dc.executeQuery.mockResolvedValue({ courseSection: { course: ownedCourse('someone-else') } });
      const ctx = ctxWith({ userRoles: ['instructor'], user: { uid: 'u1' }, params: { sectionId: 's1' } });

      await expect(guard.canActivate(ctx)).rejects.toBeInstanceOf(ForbiddenException);
      expect(dc.executeQuery).toHaveBeenCalledTimes(1);
    });

    it('fallback: re-queries ownership when the leaf query lacks ownership facts', async () => {
      meta({ type: 'section', param: 'sectionId' });
      dc.executeQuery.mockImplementation((op: string) => {
        if (op === 'GetSectionCourse') return Promise.resolve({ courseSection: { course: { id: 'c1' } } });
        if (op === 'GetMyCourseAccess') return Promise.resolve({ course: ownedCourse('u1') });
        return Promise.resolve({});
      });
      const ctx = ctxWith({ userRoles: ['instructor'], user: { uid: 'u1' }, params: { sectionId: 's1' } });

      await expect(guard.canActivate(ctx)).resolves.toBe(true);
      expect(dc.executeQuery).toHaveBeenCalledTimes(2);
      expect(dc.executeQuery).toHaveBeenNthCalledWith(2, 'GetMyCourseAccess', { courseId: 'c1' }, 'tok');
    });
  });

  describe('mission-rooted leaf (criterion)', () => {
    it('fast path: authorizes the mission author from the leaf query alone', async () => {
      meta({ type: 'criterion', param: 'criterionId' });
      dc.executeQuery.mockResolvedValue({
        rubricCriterion: { mission: { id: 'm1', author: { id: 'u1' }, createdBy: { id: 'x' }, course: null } },
      });
      const ctx = ctxWith({ userRoles: ['instructor'], user: { uid: 'u1' }, params: { criterionId: 'cr1' } });

      await expect(guard.canActivate(ctx)).resolves.toBe(true);
      expect(dc.executeQuery).toHaveBeenCalledTimes(1);
    });

    it('fallback: re-queries mission ownership when facts are absent', async () => {
      meta({ type: 'criterion', param: 'criterionId' });
      dc.executeQuery.mockImplementation((op: string) => {
        if (op === 'GetCriterionMission') return Promise.resolve({ rubricCriterion: { mission: { id: 'm1' } } });
        if (op === 'GetMyMissionAccess')
          return Promise.resolve({ mission: { author: { id: 'u1' }, createdBy: { id: 'x' }, course: null } });
        return Promise.resolve({});
      });
      const ctx = ctxWith({ userRoles: ['instructor'], user: { uid: 'u1' }, params: { criterionId: 'cr1' } });

      await expect(guard.canActivate(ctx)).resolves.toBe(true);
      expect(dc.executeQuery).toHaveBeenCalledTimes(2);
      expect(dc.executeQuery).toHaveBeenNthCalledWith(2, 'GetMyMissionAccess', { missionId: 'm1' }, 'tok');
    });
  });
});
