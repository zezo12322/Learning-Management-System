import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { DataConnectService } from '../firebase/dataconnect.service';
import { FirebaseService } from '../firebase/firebase.service';
import { getQueueToken } from '@nestjs/bullmq';
import { AI_CLEANUP_QUEUE } from '../transcoding/transcoding.queue';
import { AccessService } from '../common/services/access.service';
import { HttpException } from '@nestjs/common';

const mockDataConnectService = {
  executeQueryAsAdmin: jest.fn(),
};

describe('AiService', () => {
  let service: AiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        { provide: DataConnectService, useValue: mockDataConnectService },
        { provide: FirebaseService, useValue: {} },
        { provide: getQueueToken(AI_CLEANUP_QUEUE), useValue: {} },
        { provide: AccessService, useValue: {} },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('generate', () => {
    it('should propagate a non-2xx response from the AI service with status and body', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue({
        courseLecture: {
          id: 'lecture-123',
          section: { course: { id: 'course-123' } },
        },
      });

      const errorBody = { error: 'Bad Request', code: 422 };
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 422,
        json: async () => errorBody,
        text: async () => JSON.stringify(errorBody),
      });

      try {
        await service.generate('lecture-123', 'user-123', { message: 'hello' });
        fail('Expected generate to throw HttpException');
      } catch (e: any) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toBe(422);
        expect(e.getResponse()).toEqual(errorBody);
      }
    });
  });
});
