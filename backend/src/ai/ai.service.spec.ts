import { Test, TestingModule } from '@nestjs/testing';
import { AiService } from './ai.service';
import { DataConnectService } from '../firebase/dataconnect.service';
import { FirebaseService } from '../firebase/firebase.service';
import { getQueueToken } from '@nestjs/bullmq';
import { AI_CLEANUP_QUEUE } from '../transcoding/transcoding.queue';
import { AccessService } from '../common/services/access.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { GenerateKind } from './dto/generate.dto';

const mockDataConnectService = {
  executeQueryAsAdmin: jest.fn(),
};

/** Lecture that has been through ingestion — the happy-path fixture. */
const readyLecture = {
  courseLecture: {
    id: 'lecture-123',
    aiJobId: 'job-123',
    section: { course: { id: 'course-123' } },
  },
};

/** Minimal stand-in for the fetch Response the service reads. */
function aiResponse(status: number, body: unknown) {
  const raw = JSON.stringify(body);
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => JSON.parse(raw),
    text: async () => raw,
  };
}

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
    it('sends the resolved ids, kind, count and language to the AI service', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue(
        readyLecture,
      );
      (global.fetch as jest.Mock).mockResolvedValue(
        aiResponse(200, { kind: 'SUMMARY', summary: 'A summary.' }),
      );

      await service.generate('lecture-123', 'firebase-uid', {
        kind: GenerateKind.SUMMARY,
        count: 1,
        language: 'en',
      });

      const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
      expect(url).toContain('/v1/rag/generate');
      const sent = JSON.parse(init.body);
      expect(sent).toMatchObject({
        course_id: 'course-123',
        video_id: 'lecture-123',
        kind: 'SUMMARY',
        count: 1,
        language: 'en',
      });
      // The caller never supplies these — they are minted/derived server-side.
      expect(sent.request_id).toEqual(expect.any(String));
      expect(sent.tenant_id).toEqual(expect.any(String));
      expect(sent.user_id).not.toBe('firebase-uid');
      expect(init.signal).toBeDefined();
    });

    it('applies the documented defaults when count and language are omitted', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue(
        readyLecture,
      );
      (global.fetch as jest.Mock).mockResolvedValue(
        aiResponse(200, { kind: 'OUTCOMES', items: ['a', 'b', 'c'] }),
      );

      await service.generate('lecture-123', 'firebase-uid', {
        kind: GenerateKind.OUTCOMES,
      });

      const sent = JSON.parse(
        (global.fetch as jest.Mock).mock.calls[0][1].body,
      );
      expect(sent.count).toBe(3);
      expect(sent.language).toBe('auto');
    });

    it('returns quiz questions with their source attribution intact', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue(
        readyLecture,
      );
      const question = {
        question: 'What is the first law of thermodynamics?',
        options: [
          { text: 'Energy cannot be created or destroyed', is_correct: true },
          { text: 'Entropy always increases', is_correct: false },
        ],
        explanation: 'The first law is the conservation of energy.',
        source: { chunk_id: 'chunk-1', start_ms: 12000, end_ms: 45000 },
      };
      (global.fetch as jest.Mock).mockResolvedValue(
        aiResponse(200, { kind: 'QUIZ', questions: [question] }),
      );

      const result = await service.generate('lecture-123', 'firebase-uid', {
        kind: GenerateKind.QUIZ,
        count: 1,
      });

      expect(result).toEqual({
        kind: GenerateKind.QUIZ,
        summary: null,
        items: null,
        questions: [question],
      });
    });

    it('nulls the fields that do not belong to the requested kind', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue(
        readyLecture,
      );
      (global.fetch as jest.Mock).mockResolvedValue(
        aiResponse(200, {
          kind: 'SUMMARY',
          summary: 'A summary.',
          items: ['leaked'],
          questions: [{ question: 'leaked' }],
        }),
      );

      const result = await service.generate('lecture-123', 'firebase-uid', {
        kind: GenerateKind.SUMMARY,
      });

      expect(result).toEqual({
        kind: GenerateKind.SUMMARY,
        summary: 'A summary.',
        items: null,
        questions: null,
      });
    });

    it('rejects a lecture that was never ingested without calling the AI service', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue({
        courseLecture: {
          id: 'lecture-123',
          aiJobId: null,
          section: { course: { id: 'course-123' } },
        },
      });

      await expect(
        service.generate('lecture-123', 'firebase-uid', {
          kind: GenerateKind.SUMMARY,
        }),
      ).rejects.toMatchObject({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        response: { error: { code: 'VIDEO_NOT_READY' } },
      });
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('forwards a 422 EMPTY_TRANSCRIPT from the AI service with its code', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue(
        readyLecture,
      );
      (global.fetch as jest.Mock).mockResolvedValue(
        aiResponse(422, {
          error: {
            code: 'EMPTY_TRANSCRIPT',
            message:
              'This video has no transcript chunks available for generation.',
            request_id: 'upstream-request-id',
          },
        }),
      );

      try {
        await service.generate('lecture-123', 'firebase-uid', {
          kind: GenerateKind.QUIZ,
        });
        fail('Expected generate to throw HttpException');
      } catch (e: any) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toBe(422);
        expect(e.getResponse().error).toMatchObject({
          code: 'EMPTY_TRANSCRIPT',
          message:
            'This video has no transcript chunks available for generation.',
        });
      }
    });

    // The spec only documents a body for EMPTY_TRANSCRIPT. These are the shapes
    // a FastAPI upstream actually produces for everything else — a 422 must stay
    // a 422 through all of them, or an instructor whose video is still indexing
    // is told the AI service is down.
    it.each([
      [
        'a structured FastAPI detail',
        { detail: { code: 'VIDEO_NOT_READY', message: 'Video is not ready.' } },
        'VIDEO_NOT_READY',
        'Video is not ready.',
      ],
      [
        'a flat code/message body',
        { code: 'VIDEO_NOT_READY', message: 'Video is not ready.' },
        'VIDEO_NOT_READY',
        'Video is not ready.',
      ],
      [
        'a bare FastAPI detail string',
        { detail: 'Video is still processing.' },
        'AI_REJECTED',
        'Video is still processing.',
      ],
    ])(
      'forwards a 422 carrying %s',
      async (_case, body, expectedCode, expectedMessage) => {
        mockDataConnectService.executeQueryAsAdmin.mockResolvedValue(
          readyLecture,
        );
        (global.fetch as jest.Mock).mockResolvedValue(aiResponse(422, body));

        await expect(
          service.generate('lecture-123', 'firebase-uid', {
            kind: GenerateKind.SUMMARY,
          }),
        ).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          response: { error: { code: expectedCode, message: expectedMessage } },
        });
      },
    );

    it('keeps the status of a 4xx whose body is not JSON at all', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue(
        readyLecture,
      );
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 429,
        text: async () => 'Too Many Requests',
        json: async () => {
          throw new Error('not json');
        },
      });

      await expect(
        service.generate('lecture-123', 'firebase-uid', {
          kind: GenerateKind.SUMMARY,
        }),
      ).rejects.toMatchObject({
        status: HttpStatus.TOO_MANY_REQUESTS,
        response: { error: { code: 'AI_REJECTED' } },
      });
    });

    it('drops a pydantic validation array rather than forwarding it', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue(
        readyLecture,
      );
      (global.fetch as jest.Mock).mockResolvedValue(
        aiResponse(422, {
          detail: [{ loc: ['body', 'count'], msg: 'field required' }],
        }),
      );

      try {
        await service.generate('lecture-123', 'firebase-uid', {
          kind: GenerateKind.SUMMARY,
        });
        fail('Expected generate to throw HttpException');
      } catch (e: any) {
        expect(e.getStatus()).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
        expect(e.getResponse().error).toMatchObject({
          code: 'AI_REJECTED',
          message: 'The AI service could not fulfil this request.',
        });
        expect(JSON.stringify(e.getResponse())).not.toContain('field required');
      }
    });

    it('truncates a long upstream message', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue(
        readyLecture,
      );
      (global.fetch as jest.Mock).mockResolvedValue(
        aiResponse(422, { detail: 'x'.repeat(1000) }),
      );

      try {
        await service.generate('lecture-123', 'firebase-uid', {
          kind: GenerateKind.SUMMARY,
        });
        fail('Expected generate to throw HttpException');
      } catch (e: any) {
        expect(e.getResponse().error.message).toHaveLength(
          300 + '… (truncated)'.length,
        );
      }
    });

    it('hides an upstream 5xx behind a generic 502', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue(
        readyLecture,
      );
      (global.fetch as jest.Mock).mockResolvedValue(
        aiResponse(500, { detail: 'AZURE_OPENAI_KEY missing in env' }),
      );

      try {
        await service.generate('lecture-123', 'firebase-uid', {
          kind: GenerateKind.SUMMARY,
        });
        fail('Expected generate to throw HttpException');
      } catch (e: any) {
        expect(e.getStatus()).toBe(HttpStatus.BAD_GATEWAY);
        expect(e.getResponse().error.code).toBe('AI_UNAVAILABLE');
        expect(JSON.stringify(e.getResponse())).not.toContain('AZURE_OPENAI');
      }
    });

    it('does not forward an upstream auth failure as a client error', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue(
        readyLecture,
      );
      (global.fetch as jest.Mock).mockResolvedValue(
        aiResponse(401, {
          error: {
            code: 'INVALID_API_KEY',
            message: 'bad key',
            request_id: 'x',
          },
        }),
      );

      await expect(
        service.generate('lecture-123', 'firebase-uid', {
          kind: GenerateKind.SUMMARY,
        }),
      ).rejects.toMatchObject({ status: HttpStatus.BAD_GATEWAY });
    });

    it('reports a timeout as 504 rather than a failed generation', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue(
        readyLecture,
      );
      const timeout = Object.assign(new Error('The operation was aborted'), {
        name: 'TimeoutError',
      });
      (global.fetch as jest.Mock).mockRejectedValue(timeout);

      await expect(
        service.generate('lecture-123', 'firebase-uid', {
          kind: GenerateKind.LESSON_PLAN,
        }),
      ).rejects.toMatchObject({
        status: HttpStatus.GATEWAY_TIMEOUT,
        response: { error: { code: 'AI_TIMEOUT' } },
      });
    });

    it('rejects a structurally empty success instead of returning it', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue(
        readyLecture,
      );
      (global.fetch as jest.Mock).mockResolvedValue(
        aiResponse(200, { kind: 'QUIZ', questions: [] }),
      );

      await expect(
        service.generate('lecture-123', 'firebase-uid', {
          kind: GenerateKind.QUIZ,
        }),
      ).rejects.toMatchObject({
        status: HttpStatus.BAD_GATEWAY,
        response: { error: { code: 'AI_EMPTY_RESULT' } },
      });
    });

    it('404s an unknown lecture', async () => {
      mockDataConnectService.executeQueryAsAdmin.mockResolvedValue({
        courseLecture: null,
      });

      await expect(
        service.generate('nope', 'firebase-uid', {
          kind: GenerateKind.SUMMARY,
        }),
      ).rejects.toMatchObject({ status: HttpStatus.NOT_FOUND });
    });
  });
});
