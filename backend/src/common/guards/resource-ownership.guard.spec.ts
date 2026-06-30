import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ResourceOwnershipGuard } from './resource-ownership.guard';
import { AccessService } from '../services/access.service';
import { OwnsResourceMeta } from '../decorators/owns-resource.decorator';

/**
 * Uses a REAL AccessService over a shared mocked DataConnectService so we can
 * assert the *number* of queries: a creator is authorized from the leaf query
 * alone (1 call); an assigned instructor / non-owner re-queries ownership
 * (2 calls).
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

  // Leaf→owner result for a course the caller created (fast-pathable).
  const createdCourse = (uid: string) => ({ id: 'c1', author: { id: uid }, createdBy: { id: 'x' } });
  // ...and one created by someone else (forces the fallback query).
  const otherCourse = () => ({ id: 'c1', author: { id: 'someone' }, createdBy: { id: 'x' } });

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
    it('fast path: authorizes a course creator from the leaf query alone (no second query)', async () => {
      meta({ type: 'section', param: 'sectionId' });
      dc.executeQuery.mockResolvedValue({ courseSection: { course: createdCourse('u1') } });
      const ctx = ctxWith({ userRoles: ['instructor'], user: { uid: 'u1' }, params: { sectionId: 's1' } });

      await expect(guard.canActivate(ctx)).resolves.toBe(true);
      expect(dc.executeQuery).toHaveBeenCalledTimes(1);
      expect(dc.executeQuery).toHaveBeenCalledWith('GetSectionCourse', { sectionId: 's1' }, 'tok');
    });

    it('fallback: authorizes an assigned (non-creator) instructor via the second query', async () => {
      meta({ type: 'section', param: 'sectionId' });
      dc.executeQuery.mockImplementation((op: string) => {
        if (op === 'GetSectionCourse') return Promise.resolve({ courseSection: { course: otherCourse() } });
        // The authoritative query carries the assigned-instructor link.
        if (op === 'GetMyCourseAccess')
          return Promise.resolve({ course: { author: { id: 'someone' }, createdBy: { id: 'x' }, myInstructorLink: [{ user: { id: 'u1' } }] } });
        return Promise.resolve({});
      });
      const ctx = ctxWith({ userRoles: ['instructor'], user: { uid: 'u1' }, params: { sectionId: 's1' } });

      await expect(guard.canActivate(ctx)).resolves.toBe(true);
      expect(dc.executeQuery).toHaveBeenCalledTimes(2);
      expect(dc.executeQuery).toHaveBeenNthCalledWith(2, 'GetMyCourseAccess', { courseId: 'c1' }, 'tok');
    });

    it('fallback: denies a non-owner after the authoritative query', async () => {
      meta({ type: 'section', param: 'sectionId' });
      dc.executeQuery.mockImplementation((op: string) => {
        if (op === 'GetSectionCourse') return Promise.resolve({ courseSection: { course: otherCourse() } });
        if (op === 'GetMyCourseAccess')
          return Promise.resolve({ course: { author: { id: 'someone' }, createdBy: { id: 'x' }, myInstructorLink: [] } });
        return Promise.resolve({});
      });
      const ctx = ctxWith({ userRoles: ['instructor'], user: { uid: 'u1' }, params: { sectionId: 's1' } });

      await expect(guard.canActivate(ctx)).rejects.toBeInstanceOf(ForbiddenException);
      expect(dc.executeQuery).toHaveBeenCalledTimes(2);
    });

    it('fallback: re-queries when the leaf query omits author/createdBy (older connector)', async () => {
      meta({ type: 'section', param: 'sectionId' });
      dc.executeQuery.mockImplementation((op: string) => {
        if (op === 'GetSectionCourse') return Promise.resolve({ courseSection: { course: { id: 'c1' } } });
        if (op === 'GetMyCourseAccess') return Promise.resolve({ course: createdCourse('u1') });
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
