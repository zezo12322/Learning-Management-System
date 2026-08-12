import { UnauthorizedException } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';

describe('FirebaseAuthGuard', () => {
  const firebaseService = {
    getAuth: () => ({
      verifyIdToken: jest.fn(),
    }),
  } as any;

  const guard = new FirebaseAuthGuard(firebaseService);

  function createContext(request: any) {
    return {
      switchToHttp: () => ({ getRequest: () => request }),
    } as any;
  }

  it('rejects requests without a bearer token', async () => {
    await expect(
      guard.canActivate(createContext({ headers: {} })),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('attaches normalized Firebase claims to the request', async () => {
    const verifyIdToken = jest.fn().mockResolvedValue({
      uid: 'uid-123',
      email: 'user@example.com',
      roles: ['Instructor'],
      companyId: 'company-1',
    });
    firebaseService.getAuth = () => ({ verifyIdToken }) as any;

    const request: any = {
      headers: {
        authorization: 'Bearer test-token',
      },
    };

    await expect(guard.canActivate(createContext(request))).resolves.toBe(true);
    expect(verifyIdToken).toHaveBeenCalledWith('test-token', true);
    expect(request.user).toMatchObject({
      uid: 'uid-123',
      email: 'user@example.com',
      roles: ['instructor', 'student'],
      role: 'instructor',
      admin: false,
      companyId: 'company-1',
    });
    expect(request.userRoles).toEqual(['instructor', 'student']);
  });

  // Regression: a token carrying only the legacy `admin`/`role` claims (no `roles`
  // array) must NOT be treated as admin — the `roles` array is the sole source of
  // truth, so a stale legacy claim left after a demotion cannot re-grant access.
  it('ignores legacy admin/role claims with no roles array', async () => {
    const verifyIdToken = jest.fn().mockResolvedValue({
      uid: 'uid-legacy',
      email: 'legacy@example.com',
      role: 'admin',
      admin: true,
    });
    firebaseService.getAuth = () => ({ verifyIdToken }) as any;

    const request: any = { headers: { authorization: 'Bearer test-token' } };

    await expect(guard.canActivate(createContext(request))).resolves.toBe(true);
    expect(request.user).toMatchObject({
      roles: ['student'],
      role: 'student',
      admin: false,
    });
    expect(request.userRoles).toEqual(['student']);
  });
});
