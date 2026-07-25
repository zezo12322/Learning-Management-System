import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  // Liveness probe consumed by Railway's healthcheck (see railway.json) and any
  // external uptime monitor. Deliberately dependency-free so a transient DB/Redis
  // blip never flaps the deployment healthcheck; it reports process liveness plus
  // uptime/env for at-a-glance monitoring (KAN-60).
  @Get('health')
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      // `||` not `??`: a defined-but-empty NODE_ENV should read as unset.
      env: process.env.NODE_ENV || 'unknown',
    };
  }
}
