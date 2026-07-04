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
    await expect(guard.canActivate(createContext({ headers: {} }))).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
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
    expect(verifyIdToken).toHaveBeenCalledWith('test-token');
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
});
