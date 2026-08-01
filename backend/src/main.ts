import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ForbiddenException,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ShutdownService } from './health/shutdown.service';

/**
 * How long readiness reports 503 before the HTTP server stops accepting
 * connections (KAN-147). A router needs at least one failed probe to take an
 * instance out of rotation; closing immediately would drop the requests it
 * routes in the meantime — the exact gap that makes a "zero-downtime" deploy
 * still drop traffic.
 */
const DRAIN_DELAY_MS = Number(process.env.SHUTDOWN_DRAIN_DELAY_MS ?? 5000);

/**
 * Hard ceiling on the whole shutdown. Must stay comfortably below Railway's
 * `drainingSeconds` (30s in railway.json) — past that the platform sends
 * SIGKILL and nothing gets to clean up at all.
 */
const SHUTDOWN_TIMEOUT_MS = Number(process.env.SHUTDOWN_TIMEOUT_MS ?? 20000);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // The global error filter + access log (KAN-60) are registered as APP_FILTER /
  // APP_INTERCEPTOR providers in AppModule, so they resolve through the DI
  // container (and are exercised by e2e tests that build from AppModule).

  // Enable global validation pipe with transform
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not in DTO
      forbidNonWhitelisted: true, // Throw if unknown properties sent
      transform: true, // Auto-transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable CORS for known frontend origins (M8). Explicit production origins are
  // configured via the CORS_ORIGINS env var (comma-separated). Any localhost /
  // 127.0.0.1 origin (any port) is always allowed so browser-based dev/testing
  // (Next.js web, Flutter web) works without reconfiguring per port. Requests
  // with no Origin header (native mobile apps, curl, server-to-server) pass too.
  const corsOrigins = (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  const localhostOrigin = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
  app.enableCors({
    origin: (origin, callback) => {
      if (
        !origin ||
        localhostOrigin.test(origin) ||
        corsOrigins.includes(origin)
      ) {
        return callback(null, true);
      }
      // A ForbiddenException (not a bare Error) so a disallowed origin is logged
      // as a 403 client error rather than an error-level 5xx, which would be a
      // false positive in the incident signal (see AllExceptionsFilter).
      return callback(
        new ForbiddenException(`Origin ${origin} not allowed by CORS`),
        false,
      );
    },
    credentials: true,
  });

  // Behind Railway's proxy every request arrives with the same socket address,
  // so the throttler buckets all clients together and a handful of concurrent
  // users (the video progress heartbeat alone) 429s everyone. Trust the single
  // platform proxy hop so req.ip is the real client.
  app.set('trust proxy', 1);

  // Global prefix for all routes
  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 3000);

  installShutdownHandlers(app);
}

/**
 * Graceful shutdown (KAN-147) — the half of zero-downtime that lives in the app.
 *
 * Railway's `overlapSeconds`/`drainingSeconds` only decide *when* the old
 * instance is signalled and killed; what it does in between is up to us. Before
 * this, SIGTERM killed the process outright: in-flight requests were severed,
 * BullMQ workers died mid-job, and Redis sockets were never closed.
 *
 * The sequence is deliberate:
 *   1. flip readiness to 503, so the router stops choosing this instance;
 *   2. keep serving for DRAIN_DELAY_MS, so requests already routed here finish;
 *   3. `app.close()` — stops accepting connections, waits for open ones, then
 *      runs every module's shutdown hook (Redis quit, BullMQ worker close);
 *   4. exit, with a hard timeout so a stuck handle cannot outlive the platform's
 *      SIGKILL deadline.
 *
 * Nest's own `enableShutdownHooks()` is intentionally NOT used: it wires signals
 * straight to `app.close()`, which would begin tearing the app down during step 2
 * and skip the drain entirely. `close()` runs the lifecycle hooks either way —
 * `enableShutdownHooks` only adds the signal listeners we are replacing here.
 */
function installShutdownHandlers(app: INestApplication): void {
  const logger = new Logger('Shutdown');
  const shutdown = app.get(ShutdownService);
  let started = false;

  const handle = (signal: NodeJS.Signals): void => {
    // A second SIGTERM (or SIGINT from an impatient operator) must not start a
    // parallel teardown on top of the one already running.
    if (started) return;
    started = true;

    void (async () => {
      logger.log(`${signal} received — draining for ${DRAIN_DELAY_MS}ms.`);
      shutdown.beginDraining();

      // unref'd so it never keeps an otherwise-finished process alive; it still
      // fires if the shutdown itself is what is hanging.
      const hardStop = setTimeout(() => {
        logger.error(
          `Shutdown exceeded ${SHUTDOWN_TIMEOUT_MS}ms — forcing exit.`,
        );
        process.exit(1);
      }, SHUTDOWN_TIMEOUT_MS);
      hardStop.unref();

      try {
        await new Promise((resolve) => setTimeout(resolve, DRAIN_DELAY_MS));
        await app.close();
        clearTimeout(hardStop);
        logger.log('Shutdown complete.');
        process.exit(0);
      } catch (err: unknown) {
        const reason = err instanceof Error ? err.message : String(err);
        logger.error(`Shutdown failed: ${reason}`);
        process.exit(1);
      }
    })();
  };

  process.on('SIGTERM', handle);
  process.on('SIGINT', handle);
}

void bootstrap();
