import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { spawn } from 'child_process';
import { randomBytes } from 'crypto';
import { promises as fs } from 'fs';
import * as os from 'os';
import * as path from 'path';
import ffmpegPath from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import { FirebaseService } from '../firebase/firebase.service';
import { DataConnectService } from '../firebase/dataconnect.service';
import { CourseStoragePaths } from '../common/constants/storage-paths';
import {
  VIDEO_TRANSCODE_QUEUE,
  PackageHlsJob,
} from './transcoding.queue';

const HLS_SEGMENT_SECONDS = 6;

/** Content types for the packaged HLS artefacts uploaded to Storage. */
const CONTENT_TYPES: Record<string, string> = {
  '.m3u8': 'application/vnd.apple.mpegurl',
  '.ts': 'video/mp2t',
  '.key': 'application/octet-stream',
};

/**
 * In-process video transcoding worker.
 *
 * Pulls the uploaded MP4 from private Storage, packages it into AES-128
 * encrypted HLS with FFmpeg (bundled via ffmpeg-static — no system install),
 * uploads the playlist/segments/key back to the lecture's private HLS dir, and
 * records the master path + probed duration on the lecture (as admin — the
 * worker has no end-user token).
 *
 * Concurrency is capped at 1: transcoding is CPU-heavy and shares the API host.
 * For higher throughput, move this worker to a dedicated process/Cloud Run job
 * (the queue contract stays identical).
 */
@Processor(VIDEO_TRANSCODE_QUEUE, { concurrency: 1 })
export class TranscodingProcessor extends WorkerHost {
  private readonly logger = new Logger(TranscodingProcessor.name);

  constructor(
    private readonly firebase: FirebaseService,
    private readonly dc: DataConnectService,
  ) {
    super();
  }

  async process(job: Job<PackageHlsJob>): Promise<void> {
    const { courseId, lectureId, sourcePath } = job.data;
    if (!ffmpegPath) {
      throw new Error('ffmpeg-static binary path could not be resolved');
    }

    const workDir = await fs.mkdtemp(path.join(os.tmpdir(), `hls-${lectureId}-`));
    const srcFile = path.join(workDir, 'source.mp4');
    const outDir = path.join(workDir, 'hls');
    await fs.mkdir(outDir);

    try {
      // 1. Pull the source MP4 from private Storage to local disk.
      this.logger.log(`Transcoding lecture ${lectureId} from ${sourcePath}`);
      await fs.writeFile(srcFile, await this.firebase.downloadFile(sourcePath));

      // 2. Probe duration (used for the lecture record + progress reporting).
      const duration = await this.probeDuration(srcFile);

      // 3. Generate the AES-128 key + IV and the FFmpeg key-info file.
      await fs.writeFile(path.join(outDir, 'enc.key'), randomBytes(16));
      const iv = randomBytes(16).toString('hex');
      const keyInfoPath = path.join(workDir, 'enc.keyinfo');
      // Line 1 = key URI written into the playlist (rewritten at serve time),
      // line 2 = local key file, line 3 = IV.
      await fs.writeFile(
        keyInfoPath,
        `enc.key\n${path.join(outDir, 'enc.key')}\n${iv}\n`,
      );

      // 4. Run FFmpeg → AES-128 HLS.
      await this.runFfmpeg(ffmpegPath, srcFile, outDir, keyInfoPath, duration, job);

      // 5. Upload every produced artefact to the private HLS dir.
      const hlsDir = CourseStoragePaths.lectureHlsDir(courseId, lectureId);
      const files = await fs.readdir(outDir);
      await Promise.all(
        files.map(async (name) => {
          const buffer = await fs.readFile(path.join(outDir, name));
          const ext = path.extname(name).toLowerCase();
          await this.firebase.uploadFile(
            `${hlsDir}/${name}`,
            buffer,
            CONTENT_TYPES[ext] ?? 'application/octet-stream',
          );
        }),
      );

      // 6. Point the lecture at the packaged master playlist + store duration.
      await this.dc.executeMutationAsAdmin('AdminUpdateLecture', {
        lectureId,
        videoUrl: CourseStoragePaths.lectureHlsMaster(courseId, lectureId),
        duration,
      });

      await job.updateProgress(100);
      this.logger.log(
        `Lecture ${lectureId} packaged: ${files.length} files, ${duration}s`,
      );
    } finally {
      // Always clean up the scratch dir, even on failure.
      await fs.rm(workDir, { recursive: true, force: true }).catch(() => undefined);
    }
  }

  /** Resolve media duration (whole seconds) via ffprobe. */
  private async probeDuration(file: string): Promise<number> {
    const out = await this.run(ffprobeStatic.path, [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      file,
    ]);
    const seconds = parseFloat(out.trim());
    return Number.isFinite(seconds) ? Math.round(seconds) : 0;
  }

  private async runFfmpeg(
    ffmpeg: string,
    srcFile: string,
    outDir: string,
    keyInfoPath: string,
    duration: number,
    job: Job,
  ): Promise<void> {
    const args = [
      '-y',
      '-i', srcFile,
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22',
      '-c:a', 'aac', '-b:a', '128k',
      '-hls_time', String(HLS_SEGMENT_SECONDS),
      '-hls_playlist_type', 'vod',
      '-hls_key_info_file', keyInfoPath,
      '-hls_segment_filename', path.join(outDir, 'seg_%03d.ts'),
      '-f', 'hls',
      path.join(outDir, 'master.m3u8'),
    ];

    await this.run(ffmpeg, args, (stderr) => {
      // FFmpeg reports progress as "time=HH:MM:SS.xx" on stderr.
      const m = stderr.match(/time=(\d+):(\d+):(\d+)/);
      if (m && duration > 0) {
        const secs = +m[1] * 3600 + +m[2] * 60 + +m[3];
        const pct = Math.min(99, Math.round((secs / duration) * 100));
        void job.updateProgress(pct);
      }
    });
  }

  /** Spawn a binary, capture stdout, surface a stderr tail on failure. */
  private run(
    bin: string,
    args: string[],
    onStderr?: (chunk: string) => void,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const child = spawn(bin, args);
      let stdout = '';
      let stderrTail = '';

      child.stdout.on('data', (d) => (stdout += d.toString()));
      child.stderr.on('data', (d) => {
        const chunk = d.toString();
        onStderr?.(chunk);
        // Keep only the tail to bound memory on chatty FFmpeg output.
        stderrTail = (stderrTail + chunk).slice(-4000);
      });
      child.on('error', reject);
      child.on('close', (code) => {
        if (code === 0) resolve(stdout);
        else reject(new Error(`${path.basename(bin)} exited ${code}: ${stderrTail}`));
      });
    });
  }
}
