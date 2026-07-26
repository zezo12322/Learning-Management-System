/**
 * Shared contract for the video-transcoding BullMQ queue.
 *
 * A producer (TranscodingService, invoked from the controller after an
 * instructor uploads a raw MP4) enqueues one job per lecture; the consumer
 * (TranscodingProcessor) runs FFmpeg to package AES-128 HLS.
 */

export const VIDEO_TRANSCODE_QUEUE = 'video-transcode';
export const PACKAGE_HLS_JOB = 'package-hls';

/**
 * Job payload. `sourcePath` is a PRIVATE storage path to the uploaded MP4,
 * validated by the producer to live under the lecture's own video directory so
 * a caller can't point the worker at an arbitrary object.
 */
export interface PackageHlsJob {
  courseId: string;
  lectureId: string;
  sourcePath: string;
  /** Firebase uid that requested it (audit only; the worker writes as admin). */
  requestedBy: string;
}

export const AI_CLEANUP_QUEUE = 'ai-cleanup';
export const AI_CLEANUP_JOB = 'ai-cleanup-job';

export interface AiCleanupJob {
  aiJobId: string;
  sourcePath: string;
  lectureId: string;
}
