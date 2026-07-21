import { IsInt, IsBoolean, IsOptional, Min } from 'class-validator';

export class UpdateProgressDto {
  @IsInt()
  @Min(0)
  lastWatchedSecond: number;

  /**
   * @deprecated Accepted but IGNORED. Completion is derived server-side from
   * `lastWatchedSecond` vs the lecture duration (see ProgressService), so a
   * client can no longer assert completion. Retained only so existing clients
   * that still send it aren't rejected by `forbidNonWhitelisted`.
   */
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

/**
 * Payload for the high-throughput async heartbeat endpoint
 * (POST /lectures/:lectureId/progress). The client emits this every few seconds
 * during playback; it is queued (BullMQ) rather than written synchronously, so
 * the controller can validate cheaply and return 202 immediately.
 *
 * `completedAt` is intentionally NOT accepted from the client — completion is
 * derived server-side in the worker from `lastWatchedSecond` vs lecture.duration
 * so it cannot be spoofed.
 */
export class EnqueueProgressDto {
  /** Furthest point reached, in whole seconds. */
  @IsInt()
  @Min(0)
  lastWatchedSecond: number;

  /**
   * Total seconds actually watched in this session (optional analytics signal,
   * distinct from `lastWatchedSecond` which is a position). Carried through to
   * the worker for future watch-time aggregation.
   */
  @IsOptional()
  @IsInt()
  @Min(0)
  watchedSeconds?: number;
}
