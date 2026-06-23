import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { FirebaseService } from './firebase/firebase.service';

describe('AppController', () => {
  let appController: AppController;
  const listUsers = jest.fn().mockResolvedValue({ users: [{ uid: 'u1' }] });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: FirebaseService,
          useValue: { getAuth: () => ({ listUsers }) },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('users-count', () => {
    it('reports a connected status with a sample user count', async () => {
      await expect(appController.getUserCount()).resolves.toEqual({
        status: 'Connected',
        sampleUserCount: 1,
      });
      expect(listUsers).toHaveBeenCalledWith(1);
    });
  });
});
