import { ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

function ctxFor(request: any, required: any) {
  const reflector = {
    getAllAndOverride: jest.fn().mockReturnValue(required),
  } as unknown as Reflector;
  const ctx = {
    switchToHttp: () => ({ getRequest: () => request }),
    getHandler: () => ({}),
    getClass: () => ({}),
  } as any;
  return { guard: new RolesGuard(reflector), ctx };
}

describe('RolesGuard', () => {
  it('allows any authenticated user when no roles are required', () => {
    const { guard, ctx } = ctxFor({ user: {} }, undefined);
    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('grants admin from the Firebase roles array', () => {
    const req: any = { user: { roles: ['admin'] } };
    const { guard, ctx } = ctxFor(req, ['admin']);
    expect(guard.canActivate(ctx)).toBe(true);
    expect(req.userRoles).toEqual(expect.arrayContaining(['admin', 'student']));
  });

  it('grants instructor from the roles array', () => {
    const { guard, ctx } = ctxFor({ user: { roles: ['instructor'] } }, [
      'instructor',
    ]);
    expect(guard.canActivate(ctx)).toBe(true);
  });

  // Regression: legacy single-role claims must NOT grant elevated access, so a
  // stale `admin: true` / `role: 'admin'` left over after a demotion is inert.
  it('ignores the legacy boolean admin claim', () => {
    const { guard, ctx } = ctxFor({ user: { admin: true } }, ['admin']);
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('ignores the legacy role string claim', () => {
    const { guard, ctx } = ctxFor({ user: { role: 'instructor' } }, [
      'instructor',
    ]);
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('rejects a student hitting an instructor-only route', () => {
    const { guard, ctx } = ctxFor({ user: { roles: ['student'] } }, [
      'admin',
      'instructor',
    ]);
    expect(() => guard.canActivate(ctx)).toThrow(ForbiddenException);
  });

  it('treats every authenticated user as at least a student', () => {
    const req: any = { user: {} };
    const { guard, ctx } = ctxFor(req, ['student']);
    expect(guard.canActivate(ctx)).toBe(true);
    expect(req.userRoles).toContain('student');
  });

  it('memoizes resolved roles on the request', () => {
    const req: any = { user: { roles: ['instructor'] } };
    const { guard, ctx } = ctxFor(req, ['instructor']);
    guard.canActivate(ctx);
    expect(req.userRoles).toEqual(
      expect.arrayContaining(['instructor', 'student']),
    );
  });
});
