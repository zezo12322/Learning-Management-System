import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TranscodingService } from './transcoding.service';

describe('TranscodingService', () => {
  let queue: { getJob: jest.Mock; add: jest.Mock };
  let svc: TranscodingService;

  const valid = 'courses/c1/lectures/L1/video/x.mp4';

  beforeEach(() => {
    queue = { getJob: jest.fn().mockResolvedValue(null), add: jest.fn().mockResolvedValue({}) };
    svc = new TranscodingService(queue as any);
  });

  describe('enqueue', () => {
    it('rejects a sourcePath outside the lecture directory', async () => {
      await expect(
        svc.enqueue('c1', 'L1', 'courses/c1/lectures/OTHER/video/x.mp4', 'u1'),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(queue.add).not.toHaveBeenCalled();
    });

    it('rejects a sourcePath containing traversal', async () => {
      await expect(
        svc.enqueue('c1', 'L1', 'courses/c1/lectures/L1/video/../../x.mp4', 'u1'),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(queue.add).not.toHaveBeenCalled();
    });

    it('enqueues with a stable per-lecture jobId and the right payload', async () => {
      const res = await svc.enqueue('c1', 'L1', valid, 'u1');
      const [, payload, opts] = queue.add.mock.calls[0];
      expect(payload).toEqual({
        courseId: 'c1',
        lectureId: 'L1',
        sourcePath: valid,
        requestedBy: 'u1',
      });
      expect(opts.jobId).toBe('transcode-L1');
      expect(res).toEqual({ jobId: 'transcode-L1', status: 'queued' });
    });

    it('does not re-queue when a job is already active/waiting', async () => {
      queue.getJob.mockResolvedValue({ getState: jest.fn().mockResolvedValue('active') });
      const res = await svc.enqueue('c1', 'L1', valid, 'u1');
      expect(queue.add).not.toHaveBeenCalled();
      expect(res).toEqual({ jobId: 'transcode-L1', status: 'active' });
    });

    it('clears a finished job with the same id before re-queueing', async () => {
      const remove = jest.fn().mockResolvedValue(undefined);
      queue.getJob.mockResolvedValue({
        getState: jest.fn().mockResolvedValue('completed'),
        remove,
      });
      await svc.enqueue('c1', 'L1', valid, 'u1');
      expect(remove).toHaveBeenCalled();
      expect(queue.add).toHaveBeenCalled();
    });
  });

  describe('getStatus', () => {
    it('throws when no job exists for the lecture', async () => {
      queue.getJob.mockResolvedValue(null);
      await expect(svc.getStatus('L1')).rejects.toBeInstanceOf(NotFoundException);
    });

    it('reports state and progress for an existing job', async () => {
      queue.getJob.mockResolvedValue({
        getState: jest.fn().mockResolvedValue('active'),
        progress: 42,
        failedReason: undefined,
      });
      await expect(svc.getStatus('L1')).resolves.toEqual({
        status: 'active',
        progress: 42,
        failedReason: undefined,
      });
    });
  });
});
